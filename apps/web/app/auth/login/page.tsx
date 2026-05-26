"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "~/trpc/client";
import { setToken, isAuthenticated } from "~/lib/auth";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { env } from "~/env.js";
import { Logo } from "~/components/brand/logo";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

const GOOGLE_AUTH_URL =
  (env.NEXT_PUBLIC_API_BASE_URL ??
    (env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace("/trpc", "")) +
  "/auth/google";

function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isAuthenticated()) router.replace("/dashboard");
    const oauthError = searchParams.get("oauth_error");
    if (oauthError) toast.error(decodeURIComponent(oauthError));
  }, [router, searchParams]);

  const signIn = trpc.auth.signIn.useMutation({
    onSuccess: (data) => {
      setToken(data.token);
      toast.success("Welcome back, " + data.user.fullName + ".");
      window.location.href = "/dashboard";
    },
    onError: (err) => toast.error(err.message || "Those details didn't match."),
  });

  return (
    <div className="min-h-screen bg-background text-foreground grid lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <Logo size="lg" />
          </div>

          <span className="ef-eyebrow">§ Sign in</span>
          <h1 className="mt-3 font-serif text-4xl leading-tight">Welcome back.</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to return to your drafts.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={GOOGLE_AUTH_URL}
              className="flex items-center justify-center gap-3 w-full border border-border rounded-md py-3 px-4 text-sm font-medium hover:border-foreground transition-colors"
            >
              <GoogleIcon />
              Continue with Google
            </a>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 ef-eyebrow">or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit((d) => signIn.mutate(d))} className="space-y-4">
              <div>
                <label className="block text-xs ef-eyebrow mb-2">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-colors"
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1.5">
                    A valid email, please.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs ef-eyebrow mb-2">Password</label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground pr-10 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-xs mt-1.5">Password required.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={signIn.isPending}
                className="w-full bg-foreground text-background py-3 rounded-md text-sm font-medium hover:bg-foreground/90 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
              >
                {signIn.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Sign in
              </button>

              <div className="text-center">
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  Forgotten your password?
                </Link>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link
              href="/auth/register"
              className="text-foreground font-medium underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right — picture */}
      <div className="hidden lg:block relative border-l border-border">
        <Image
          src="/images/edinburgh.jpg"
          alt="Sandstone facade in soft morning light"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-foreground">
          <span className="ef-eyebrow">Plate ii.</span>
          <p className="mt-2 font-serif text-2xl leading-snug max-w-md">
            A quiet place to write, send, and read.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A9 9 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}
