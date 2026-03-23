import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitLead } from "@/hooks/useQueries";
import {
  ArrowRight,
  Banknote,
  BarChart3,
  CheckCircle2,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  Users,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// --- Reusable animated section wrapper ---
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Navbar ---
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Why StayNGo", href: "#why-stayngo" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/assets/uploads/img-20260226-wa0067-019d1b43-4ff7-727c-98e7-8ddc9955e1a9-1.jpg"
              alt="StayNGo"
              className="h-10 w-auto object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-ocid={`nav.${l.label.toLowerCase().replace(/ /g, "-")}.link`}
                className={`text-sm font-medium transition-colors hover:text-teal ${
                  scrolled ? "text-foreground" : "text-white/90"
                }`}
              >
                {l.label}
              </a>
            ))}
            <Button
              data-ocid="nav.onboard_now.button"
              asChild
              className="gradient-teal text-white font-semibold px-6 shadow-teal hover:opacity-90 transition-opacity border-0"
            >
              <a href="#contact">Onboard Now</a>
            </Button>
          </div>

          <button
            type="button"
            className={`md:hidden p-2 ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-foreground hover:text-teal"
                >
                  {l.label}
                </a>
              ))}
              <Button
                data-ocid="nav.mobile_onboard.button"
                className="gradient-teal text-white font-semibold border-0"
                onClick={() => setMobileOpen(false)}
                asChild
              >
                <a href="#contact">Onboard Now</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// --- Hero ---
function Hero() {
  return (
    <section className="gradient-hero min-h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.13 185), transparent)",
          }}
        />
        <div
          className="absolute top-1/2 -left-40 w-80 h-80 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.67 0.14 168), transparent)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <FadeUp>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: "oklch(1 0 0 / 0.1)",
                color: "oklch(0.85 0.10 168)",
              }}
            >
              <Star size={14} />
              Fair Pricing. Full Control. Real Profits.
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Your Property.
              <br />
              <span className="text-gradient-teal">Your Price.</span>
              <br />
              Your Profit.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Welcome to StayNGo — a fair-pricing booking ecosystem built for
              modern property owners. Instead of losing up to{" "}
              <strong className="text-white">25% of every booking</strong> to
              commissions, StayNGo lets you operate on a prepaid booking plan
              giving you full control over pricing, guests, and earnings.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                data-ocid="hero.onboard_now.primary_button"
                size="lg"
                className="gradient-teal text-white font-semibold px-8 py-4 text-base shadow-teal hover:opacity-90 transition-opacity border-0 h-auto"
                asChild
              >
                <a href="#contact">
                  Onboard Now <ArrowRight className="ml-2" size={18} />
                </a>
              </Button>
              <Button
                data-ocid="hero.learn_more.secondary_button"
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white bg-transparent font-semibold px-8 py-4 text-base h-auto"
                asChild
              >
                <a href="#why-stayngo">Learn More</a>
              </Button>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.5} className="mt-16">
          <div className="relative max-w-5xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              style={{ boxShadow: "0 40px 80px oklch(0.10 0.08 264 / 0.6)" }}
            >
              <img
                src="/assets/generated/stayngo-dashboard.dim_1200x700.jpg"
                alt="StayNGo Dashboard"
                className="w-full h-auto block"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 gradient-teal rounded-2xl px-5 py-3 shadow-teal">
              <p className="text-white text-xs font-semibold">
                Zero Commission
              </p>
              <p className="text-white/80 text-xs">Always & forever</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// --- Stats Bar ---
function StatsBar() {
  const stats = [
    {
      icon: <Banknote size={32} />,
      label: "Zero Commission",
      desc: "Keep every rupee you earn",
    },
    {
      icon: <Zap size={32} />,
      label: "Instant Bank Settlement",
      desc: "Funds land directly in your account",
    },
    {
      icon: <Users size={32} />,
      label: "Direct Guest Connect",
      desc: "Build real guest relationships",
    },
  ];

  return (
    <section className="bg-white py-16 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center gap-3 p-6">
                <div className="text-teal">{s.icon}</div>
                <h3 className="font-display text-xl font-bold text-navy">
                  {s.label}
                </h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Why StayNGo Comparison ---
function WhyStayNGo() {
  const bad = [
    {
      title: "15–25% Cut from Every Booking",
      desc: "Revenue bled away before it reaches you",
    },
    {
      title: "Revenue Held by Platform",
      desc: "Payouts delayed days or weeks",
    },
    {
      title: "Platform Takes the Credit",
      desc: "You deliver the experience, platform owns the loyalty",
    },
  ];
  const good = [
    {
      title: "Zero Commission",
      desc: "No commission cuts — just happy earnings",
    },
    {
      title: "Instant Bank Settlement",
      desc: "Funds go straight to you, no delays",
    },
    {
      title: "Build Guests, Not Just Stays",
      desc: "Real connections that turn stays into repeat business",
    },
  ];

  return (
    <section id="why-stayngo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4">
            Why StayNGo?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A side-by-side view of what you lose vs. what you gain.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeUp delay={0.1}>
            <Card className="overflow-hidden border-2 border-red-100">
              <div className="bg-red-50 px-6 py-4 flex items-center gap-3">
                <XCircle className="text-red-500" size={22} />
                <h3 className="font-semibold text-red-700 text-lg">
                  Traditional OTAs
                </h3>
              </div>
              <CardContent className="p-6 flex flex-col gap-5">
                {bad.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <XCircle
                      className="text-red-400 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {item.title}
                      </p>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeUp>

          <FadeUp delay={0.2}>
            <Card className="overflow-hidden border-2 border-teal/30">
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{ background: "oklch(0.95 0.04 168)" }}
              >
                <CheckCircle2 className="text-teal" size={22} />
                <h3 className="font-semibold text-teal text-lg">
                  The StayNGo Standard
                </h3>
              </div>
              <CardContent className="p-6 flex flex-col gap-5">
                {good.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-teal flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {item.title}
                      </p>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeUp>
        </div>

        <FadeUp delay={0.3} className="mt-12 text-center">
          <blockquote className="inline-block font-display text-2xl sm:text-3xl italic font-semibold text-navy max-w-2xl">
            &ldquo;Your success should be celebrated — not charged.&rdquo;
          </blockquote>
        </FadeUp>
      </div>
    </section>
  );
}

// --- Features ---
function Features() {
  const features = [
    {
      icon: <Phone size={28} />,
      title: "Direct Connect",
      desc: "Guests reach you directly via WhatsApp or Call — perfect for building trust and repeat stays.",
    },
    {
      icon: <Shield size={28} />,
      title: "Request to Book",
      desc: "Approve guests yourself after reviewing profiles and ratings. You decide who stays.",
    },
    {
      icon: <Zap size={28} />,
      title: "Instant Pay Settled",
      desc: "With instant fund settlement, your earnings reach your bank as soon as the booking is confirmed — no waiting, no uncertainty.",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Unified Owner Dashboard",
      desc: "Manage your entire portfolio from a single interface. Track booking credits, revenue, occupancy, and future demand in real time.",
    },
  ];

  return (
    <section id="features" className="gradient-features py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Built for Efficiency.
            <br />
            <span style={{ color: "oklch(0.85 0.12 168)" }}>
              Designed for Control.
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Every feature designed to put you in the driver&apos;s seat of your
            hospitality business.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.1}>
              <div
                className="card-hover rounded-2xl p-6 h-full flex flex-col gap-4"
                style={{
                  background: "oklch(1 0 0 / 0.06)",
                  border: "1px solid oklch(1 0 0 / 0.12)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.67 0.14 168 / 0.2)" }}
                >
                  <span className="text-teal">{f.icon}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {f.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed flex-1">
                  {f.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- How It Works ---
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Onboard & Verify",
      desc: "Complete our high-standard digital verification. This protects the ecosystem and ensures every property is verified and premium.",
    },
    {
      num: "02",
      title: "Optimize Your Storefront",
      desc: "Use our listing tools to upload high-resolution galleries, set custom house rules, and define your pricing strategy.",
    },
    {
      num: "03",
      title: "Activate & Earn",
      desc: "Start receiving direct bookings immediately. The price you set is exactly the amount that lands in your bank account.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4">
            Your Success Starts with
            <br />
            <span className="text-gradient-teal">a Simple Step.</span>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div
            className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.67 0.14 168), oklch(0.72 0.13 185))",
            }}
          />
          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-display font-bold text-white relative z-10 shadow-teal"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.14 168), oklch(0.72 0.13 185))",
                  }}
                >
                  {s.num}
                </div>
                <h3 className="font-display text-xl font-bold text-navy">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {s.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Promise Section ---
function PromiseSection() {
  return (
    <section className="gradient-promise py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-6">
              The StayNGo Promise
            </h2>
            <p className="text-foreground/80 text-lg italic font-display mb-4 leading-relaxed">
              &ldquo;We believe in honest pricing. No commission per booking. No
              surprise deductions. No barriers — just a direct connection with
              your guests.&rdquo;
            </p>
            <p className="text-muted-foreground">
              Just a transparent platform that lets you grow sustainably.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Card
              className="rounded-2xl overflow-hidden shadow-navy border-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.26 0.11 264), oklch(0.38 0.12 190))",
              }}
            >
              <CardContent className="p-8 text-center">
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Ready to take control of your earnings?
                </h3>
                <p className="text-white/65 text-sm mb-8">
                  Join property owners across India who&apos;ve made the switch.
                </p>
                <Button
                  data-ocid="promise.onboard_now.primary_button"
                  size="lg"
                  className="gradient-teal text-white font-bold px-10 py-4 text-base border-0 shadow-teal hover:opacity-90 transition-opacity h-auto w-full mb-6"
                  asChild
                >
                  <a href="#contact">ONBOARD NOW</a>
                </Button>
                <div className="flex flex-col gap-2 text-white/70 text-sm">
                  <a
                    href="tel:7593887766"
                    className="flex items-center justify-center gap-2 hover:text-white transition-colors"
                  >
                    <Phone size={14} /> 7593 887 766
                  </a>
                  <a
                    href="mailto:admin@stayngo.co.in"
                    className="flex items-center justify-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail size={14} /> admin@stayngo.co.in
                  </a>
                  <a
                    href="https://www.stayngo.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 hover:text-white transition-colors"
                  >
                    <Globe size={14} /> www.stayngo.co.in
                  </a>
                </div>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// --- Lead Form & Contact ---
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    propertyName: "",
    message: "",
  });

  const { mutate: submitLead, isPending, isSuccess } = useSubmitLead();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitLead(form, {
      onSuccess: () => {
        toast.success("Thanks! We'll be in touch soon.");
        setForm({
          name: "",
          email: "",
          phone: "",
          propertyName: "",
          message: "",
        });
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  }

  return (
    <section
      id="contact"
      className="py-24"
      style={{ background: "oklch(0.22 0.11 264)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-8">
              Get in Touch
            </h2>
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: <Phone size={20} />,
                  label: "7593 887 766",
                  href: "tel:7593887766",
                },
                {
                  icon: <Globe size={20} />,
                  label: "www.stayngo.co.in",
                  href: "https://www.stayngo.co.in",
                },
                {
                  icon: <Mail size={20} />,
                  label: "admin@stayngo.co.in",
                  href: "mailto:admin@stayngo.co.in",
                },
                {
                  icon: <MapPin size={20} />,
                  label:
                    "StayNGo, 91 SpringBoard, Bannerghatta Road, Dollars Colony, Phase 4, JP Nagar, Bengaluru",
                  href: "https://maps.google.com/?q=91+SpringBoard+Bannerghatta+Road+JP+Nagar+Bengaluru",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-white/75 hover:text-white transition-colors group"
                >
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:opacity-90 transition-opacity"
                    style={{ background: "oklch(0.67 0.14 168 / 0.2)" }}
                  >
                    <span className="text-teal">{item.icon}</span>
                  </span>
                  <span className="pt-2 text-sm leading-relaxed">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Card
              className="rounded-2xl border-0 overflow-hidden"
              style={{
                background: "oklch(1 0 0 / 0.05)",
                border: "1px solid oklch(1 0 0 / 0.10)",
              }}
            >
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-6">
                  Start Your Journey
                </h3>
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      data-ocid="contact.success_state"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <CheckCircle2
                        className="text-teal mx-auto mb-4"
                        size={56}
                      />
                      <h4 className="font-display text-xl font-bold text-white mb-2">
                        You&apos;re on the list!
                      </h4>
                      <p className="text-white/65 text-sm">
                        Our team will reach out within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="text-white/70 text-xs font-medium mb-1.5 block"
                          >
                            Name *
                          </label>
                          <Input
                            id="contact-name"
                            data-ocid="contact.name.input"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Rahul Sharma"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-teal"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="text-white/70 text-xs font-medium mb-1.5 block"
                          >
                            Email *
                          </label>
                          <Input
                            id="contact-email"
                            data-ocid="contact.email.input"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@email.com"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-teal"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="text-white/70 text-xs font-medium mb-1.5 block"
                          >
                            Phone *
                          </label>
                          <Input
                            id="contact-phone"
                            data-ocid="contact.phone.input"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 9999999999"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-teal"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-property"
                            className="text-white/70 text-xs font-medium mb-1.5 block"
                          >
                            Property Name
                          </label>
                          <Input
                            id="contact-property"
                            data-ocid="contact.property_name.input"
                            name="propertyName"
                            value={form.propertyName}
                            onChange={handleChange}
                            placeholder="The Hillside Villa"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-teal"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="text-white/70 text-xs font-medium mb-1.5 block"
                        >
                          Message
                        </label>
                        <Textarea
                          id="contact-message"
                          data-ocid="contact.message.textarea"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your property..."
                          rows={4}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-teal resize-none"
                        />
                      </div>
                      <Button
                        data-ocid="contact.submit.submit_button"
                        type="submit"
                        size="lg"
                        disabled={isPending}
                        className="gradient-teal text-white font-bold border-0 shadow-teal hover:opacity-90 transition-opacity h-12 text-base"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Get Started →"
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/img-20260226-wa0067-019d1b43-4ff7-727c-98e7-8ddc9955e1a9-1.jpg"
              alt="StayNGo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-muted-foreground text-sm font-medium">
              Your Journey, Simplified
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {year} StayNGo. Built using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal transition-colors"
            >
              onlyhigh caffeine
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- App ---
export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <WhyStayNGo />
        <Features />
        <HowItWorks />
        <PromiseSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
