import Link from "next/link";
import { Check } from "lucide-react";
import { Logo } from "~/components/brand/logo";

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    desc: "For the curious — try it on a small project.",
    features: [
      "Up to 5 forms",
      "100 replies a month",
      "All nine question types",
      "Plain analytics",
      "Public or invitation-only",
      "Email notifications",
    ],
    cta: "Begin for free",
    href: "/auth/register",
    highlight: false,
  },
  {
    name: "Studio",
    price: "£12",
    period: "per month",
    desc: "For makers who send things into the world regularly.",
    features: [
      "Unlimited forms",
      "10,000 replies a month",
      "Every question type",
      "Considered analytics",
      "CSV export",
      "Custom slug",
      "Priority support",
      "EdinForm mark removed",
    ],
    cta: "Start a trial",
    href: "/auth/register",
    highlight: true,
  },
  {
    name: "Atelier",
    price: "£49",
    period: "per month",
    desc: "For teams and the people who run them.",
    features: [
      "Everything in Studio",
      "Unlimited replies",
      "Team collaboration",
      "SSO / SAML",
      "Audit trail",
      "Service level agreement",
      "Dedicated support",
      "Bring your own domain",
    ],
    cta: "Talk to us",
    href: "/auth/register",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border px-6 lg:px-10 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className="text-sm bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90"
          >
            Begin
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
        <div className="text-center mb-16">
          <span className="ef-eyebrow">§ Pricing</span>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl leading-tight">
            Plain prices.
            <br />
            <span className="italic text-[color:var(--color-sandstone)]">No surprises.</span>
          </h1>
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto">
            Begin for free and stay there if it serves you. Move up only when
            you actually need to.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                "relative p-10 flex flex-col " +
                (plan.highlight
                  ? "bg-foreground text-background"
                  : "bg-background")
              }
            >
              {plan.highlight && (
                <span className="absolute top-6 right-6 ef-eyebrow text-[color:var(--color-sandstone-soft)]">
                  Most chosen
                </span>
              )}
              <h2
                className={
                  "font-serif text-3xl mb-1 " +
                  (plan.highlight ? "text-background" : "text-foreground")
                }
              >
                {plan.name}
              </h2>
              <p
                className={
                  "text-sm mb-8 " +
                  (plan.highlight
                    ? "text-background/70"
                    : "text-muted-foreground")
                }
              >
                {plan.desc}
              </p>
              <div className="flex items-end gap-2 mb-10">
                <span
                  className={
                    "font-serif text-6xl leading-none " +
                    (plan.highlight ? "text-background" : "text-foreground")
                  }
                >
                  {plan.price}
                </span>
                <span
                  className={
                    "text-sm mb-2 " +
                    (plan.highlight
                      ? "text-background/60"
                      : "text-muted-foreground")
                  }
                >
                  / {plan.period}
                </span>
              </div>
              <Link
                href={plan.href}
                className={
                  "block text-center py-3 rounded-md font-medium text-sm mb-10 transition-colors " +
                  (plan.highlight
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-foreground text-background hover:bg-foreground/90")
                }
              >
                {plan.cta}
              </Link>
              <ul className="space-y-3 mt-auto">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={
                        "w-4 h-4 mt-0.5 shrink-0 " +
                        (plan.highlight
                          ? "text-[color:var(--color-sandstone-soft)]"
                          : "text-[color:var(--color-sandstone)]")
                      }
                    />
                    <span
                      className={
                        plan.highlight ? "text-background/85" : "text-foreground/80"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          A fourteen-day trial sits on every plan. No card asked for.
          Payment processing in this demo is a placeholder.
        </p>
      </div>

      <footer className="border-t border-border px-6 lg:px-10 py-8 text-center text-xs text-muted-foreground">
        © 2026 EdinForm
      </footer>
    </div>
  );
}
