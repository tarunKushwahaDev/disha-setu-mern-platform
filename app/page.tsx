"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useTranslation } from "@/hooks/use-translation";
import { useAppStore } from "@/lib/store/app-store";
import Link from "next/link";
import {
  Compass,
  GraduationCap,
  Users,
  Wifi,
  WifiOff,
  ArrowRight,
  BookOpen,
  Briefcase,
  Heart,
  Target,
  Sparkles,
  Shield,
} from "lucide-react";

export default function HomePage() {
  const { t } = useTranslation();
  const { connectivityStatus } = useAppStore();

  const features = [
    {
      icon: Compass,
      title: t("careerMapping"),
      description: t("careerMappingDesc"),
      href: "/career",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: GraduationCap,
      title: t("scholarships"),
      description: t("scholarshipsDesc"),
      href: "/scholarships",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: Users,
      title: t("community"),
      description: t("communityDesc"),
      href: "/community",
      color: "bg-accent/10 text-accent-foreground",
    },
  ];

  const stats = [
    { value: "50,000+", label: "Students Guided" },
    { value: "1,200+", label: "Scholarships Listed" },
    { value: "500+", label: "Mentors Available" },
    { value: "28", label: "States Covered" },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Personalized Pathways",
      description:
        "Get career recommendations tailored to your interests, skills, and local opportunities",
    },
    {
      icon: BookOpen,
      title: "Local Resources",
      description:
        "Find nearby government colleges, skill centers, and training programs in your district",
    },
    {
      icon: Briefcase,
      title: "Job Visibility",
      description:
        "See real employment outcomes and salary ranges for different career paths",
    },
    {
      icon: Heart,
      title: "Community Support",
      description:
        "Connect with mentors, alumni, and peers who understand your journey",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

        <div className="mx-auto max-w-5xl text-center">
          {/* Connectivity Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
            {connectivityStatus === "online" ? (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Online - All features available</span>
              </>
            ) : connectivityStatus === "mesh" ? (
              <>
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">Mesh Sync Active</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-amber-500" />
                <span className="text-muted-foreground">Offline Mode - Core features available</span>
              </>
            )}
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t("DishaSetu")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            {t("One-Stop Personalized Career & Education Advisor")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/career"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              {t("startJourney")}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/scholarships"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-all hover:bg-muted"
            >
              {t("findScholarships")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              DishaSetu brings together career guidance, financial support, and
              community mentorship in one accessible platform.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div
                  className={`inline-flex rounded-xl p-3 ${feature.color}`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built for First-Generation Learners
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                We understand the unique challenges faced by students from rural
                areas and low-income families. DishaSetu is designed to provide
                clear, accessible guidance in your language.
              </p>

              <div className="mt-8 space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Works Offline Too
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Bluetooth mesh sync for areas with poor connectivity
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                    <span className="text-sm text-foreground">Career Quiz</span>
                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-600">
                      Available Offline
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                    <span className="text-sm text-foreground">
                      Scholarship Database
                    </span>
                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-600">
                      Cached Locally
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                    <span className="text-sm text-foreground">
                      Guidance Materials
                    </span>
                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-600">
                      Mesh Shareable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Find Your Path?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Take the first step towards a brighter future. Our career assessment
            takes just 10 minutes and is completely free.
          </p>
          <div className="mt-8">
            <Link
              href="/career"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Start Your Career Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
