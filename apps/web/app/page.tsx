"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sun,
  Moon,
  Quote,
} from "lucide-react";
import { isAuthenticated } from "~/lib/auth";
import { useTheme } from "~/providers/theme-provider";
import { Logo } from "~/components/brand/logo";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  const ctaHref = loggedIn ? "/dashboard" : "/auth/register";
  const signInHref = loggedIn ? "/dashboard" : "/auth/login";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top bar ─────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/explore" className="hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#craft" className="hover:text-foreground transition-colors">
              The craft
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {loggedIn ? (
              <Link
                href="/dashboard"
                className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90 transition-colors"
              >
                Open dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90 transition-colors"
                >
                  Begin
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="pt-36 pb-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <span className="ef-eyebrow">Est. Edinburgh · 2026</span>
              <span className="h-px w-12 bg-foreground/30" />
              <span className="ef-eyebrow">Vol. 01</span>
            </div>

            <h1 className="font-serif font-normal text-foreground leading-[0.95] tracking-tight text-[clamp(3rem,7.5vw,6.75rem)]">
              Considered forms
              <br />
              for considered{" "}
              <span className="italic text-[color:var(--color-sandstone)]">teams</span>.
            </h1>

            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              EdinForm is a quieter place to draft a form, share it with the
              right people, and read what comes back. Built with the rigour of
              Edinburgh stonework and the clarity of Swiss design.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 rounded-md text-sm font-medium hover:bg-foreground/90 transition-all"
              >
                {loggedIn ? "Open dashboard" : "Begin a draft"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/40 hover:border-foreground pb-0.5 transition-colors"
              >
                Browse the library
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {!loggedIn && (
              <p className="text-xs text-muted-foreground mt-5">
                No card. No clutter. A generous free tier for as long as you need it.
              </p>
            )}
          </div>

          <div className="lg:col-span-5">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                <Image
                  src="/images/hero.jpg"
                  alt="A paper questionnaire on a slate desk, with a fountain pen and brass ruler"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-xs ef-eyebrow">
                <span>Plate i.</span>
                <span>A draft, before send</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Logo strip / trust ──────────────────────────────── */}
      <section className="border-y border-border bg-card/40 py-8 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <p className="ef-eyebrow">Trusted by independent studios and quiet teams</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-muted-foreground">
            {["Northwick & Co.", "Atelier Munro", "Holyrood Labs", "Stone Press", "Field Notes"].map(
              (n) => (
                <span key={n} className="font-serif text-base tracking-wide">
                  {n}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Stat band ───────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
          {[
            { n: "10,000+", l: "Drafts written" },
            { n: "500k+", l: "Replies gathered" },
            { n: "99.9%", l: "Quiet uptime" },
            { n: "4.9 / 5", l: "Readers' rating" },
          ].map((s, i) => (
            <div
              key={s.l}
              className={
                "pl-5 border-l border-foreground/20 " +
                (i === 1 ? "md:border-l" : "")
              }
            >
              <div className="font-serif text-4xl md:text-5xl text-foreground">{s.n}</div>
              <div className="mt-2 ef-eyebrow">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The craft ───────────────────────────────────────── */}
      <section
        id="craft"
        className="border-t border-border px-6 lg:px-10 py-24 bg-card/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-16 items-end">
            <div className="lg:col-span-5">
              <span className="ef-eyebrow">§ 02 — The craft</span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">
                Everything you need.
                <br />
                Nothing in your way.
              </h2>
            </div>
            <p className="lg:col-span-6 lg:col-start-7 text-muted-foreground leading-relaxed">
              We took the long list of features other tools brag about and
              quietly polished each one until it disappeared into the page. A
              form should feel like good stationery, not a control panel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {[
              {
                n: "01",
                t: "Nine kinds of question",
                d: "Short answers, long answers, ratings, dates, single or multiple choice — composed so each one looks intentional.",
              },
              {
                n: "02",
                t: "Public or by invitation",
                d: "Publish to the world, or share a quiet link with only the people you trust. You choose, always.",
              },
              {
                n: "03",
                t: "Readable analytics",
                d: "See views, replies, and how often people complete what they start — in plain figures, not vanity charts.",
              },
              {
                n: "04",
                t: "Sensible by default",
                d: "Rate limiting, anti-spam, and proper validation are quietly switched on. You shouldn't have to think about them.",
              },
              {
                n: "05",
                t: "Made for sharing",
                d: "Respondents never need an account. Open the link, write the reply, and they're done.",
              },
              {
                n: "06",
                t: "Themes with taste",
                d: "A small, curated set of looks. Each one feels considered — none of them shout.",
              },
            ].map((f) => (
              <div
                key={f.n}
                className="bg-background p-8 ef-card-hover"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="ef-eyebrow">{f.n}</span>
                  <span className="h-px w-10 bg-foreground/30" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3">
                  {f.t}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="ef-eyebrow">§ 03 — The process</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight mb-10">
              Three steps.
              <br />
              No fuss.
            </h2>
            <ol className="space-y-8">
              {[
                {
                  n: "i.",
                  t: "Draft",
                  d: "Open a blank page. Add the questions you actually need.",
                },
                {
                  n: "ii.",
                  t: "Send",
                  d: "Share the link by email, message, QR — wherever your readers are.",
                },
                {
                  n: "iii.",
                  t: "Read",
                  d: "Replies arrive in a quiet, ordered list. Read them, export them, act on them.",
                },
              ].map((s) => (
                <li key={s.n} className="flex gap-6 border-t border-border pt-6">
                  <span className="font-serif italic text-2xl text-[color:var(--color-sandstone)] w-10 shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground mb-1">{s.t}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="/images/edinburgh.jpg"
                alt="Sandstone Georgian facade at dawn — a perfect grid of windows"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </figure>
            <figcaption className="mt-3 flex items-center justify-between text-xs ef-eyebrow">
              <span>Plate ii.</span>
              <span>A facade, in order</span>
            </figcaption>
          </div>
        </div>
      </section>

      {/* ── Quote / testimonial ─────────────────────────────── */}
      <section className="border-y border-border bg-card/40 px-6 lg:px-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-8 h-8 mx-auto text-[color:var(--color-sandstone)] mb-6" />
          <blockquote className="font-serif text-3xl md:text-4xl leading-snug text-foreground">
            “It feels like writing on good paper. Our reply rate went up just
            because the forms look like something worth answering.”
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center font-serif">
              M
            </div>
            <div className="text-left">
              <div className="text-foreground font-medium">Maeve Sinclair</div>
              <div className="text-xs">Editor, Stone Press</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-28 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="ef-eyebrow">§ 04 — Begin</span>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl leading-[0.95]">
            {loggedIn ? "Back to the desk?" : "A blank page is waiting."}
          </h2>
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto">
            {loggedIn
              ? "Your dashboard is just as you left it."
              : "Open EdinForm, draft your first questionnaire, and send it within the hour."}
          </p>
          <div className="mt-10">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              {loggedIn ? "Open dashboard" : "Begin — it's free"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-border px-6 lg:px-10 py-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center">
          <Logo />
          <div className="flex md:justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/explore" className="hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href={signInHref} className="hover:text-foreground transition-colors">
              {loggedIn ? "Dashboard" : "Sign in"}
            </Link>
          </div>
          <div className="flex md:justify-end items-center gap-4 text-xs text-muted-foreground">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <span className="h-3 w-px bg-border" />
            <span>© 2026 EdinForm</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
