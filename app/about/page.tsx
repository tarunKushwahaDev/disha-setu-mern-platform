"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import tarunPic from "@/components/images/tarun pic.png";
import { useTranslation } from "@/hooks/use-translation";
import {
  Target,
  Users,
  Heart,
  Lightbulb,
  Shield,
  Globe,
  Award,
  Handshake,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function AboutPage() {
  const { t } = useTranslation();


  const teamMembers = [
  {
    name: "Tarun Kushwaha",
    role: "Team Leader",
    description:
      "Full-stack developer leading the technical architecture and system design of DishaSetu.",
    image: tarunPic,
  },
  {
    name: "Astha Verma",
    role: "Team Member",
    description:
      "Frontend specialist focusing on user experience and accessibility features.",
    avatar: "AV",
  },
  {
    name: "Vandana Arya",
    role: "Team Member",
    description:
      "Backend developer handling database design and API integrations.",
    avatar: "VA",
  },
];

  const values = [
    {
      icon: Target,
      title: "Accessibility First",
      description:
        "Every feature is designed to work on low-end devices with poor connectivity, ensuring no student is left behind.",
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description:
        "Built by understanding the real challenges faced by first-generation learners and rural students.",
    },
    {
      icon: Shield,
      title: "Privacy & Trust",
      description:
        "Your data stays secure. We follow strict privacy guidelines and never share personal information.",
    },
    {
      icon: Globe,
      title: "Local Relevance",
      description:
        "Content in regional languages with information about local colleges, schemes, and opportunities.",
    },
  ];

  const milestones = [
    {
      year: "May 2026",
      title: "SahAl for Shiksha HACKATHON 2026",
      description:
        "DishaSetu conceptualized and developed by Team Vinayak.",
    },
    {
      year: "May 2026",
      title: "Offline-First Architecture",
      description:
        "Implement Bluetooth mesh sync for areas with no internet connectivity.",
    },
    {
      year: "June 2026",
      title: "Multi-Language Support",
      description:
        "Add support for Hindi, Tamil, Bengali, Marathi, Gujarati, and Telugu.",
    },
    {
      year: "Dec 2026",
      title: "Pan-India Expansion",
      description:
        "Goal to reach students across all 28 states and 8 union territories.",
    },
  ];


  
  const partners = [
    "Ministry of Education",
    "PMKVY",
    "National Scholarship Portal",
    "Skill India",
    "DigiLocker",
    "AICTE",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              SahAl for Shiksha HACKATHON 2026
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About DishaSetu
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Bridging the gap between aspiration and opportunity for millions of
            rural, low-income, and first-generation learners across India.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Lightbulb className="h-4 w-4" />
                Our Mission
              </div>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground">
                Empowering Every Student to Find Their Path
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                In India, millions of talented students from rural areas and
                low-income families lack access to proper career guidance. They
                often make uninformed decisions about their education and
                careers, leading to underemployment and unfulfilled potential.
              </p>
              <p className="mt-4 text-pretty text-muted-foreground">
                DishaSetu was born from the belief that every student deserves
                access to quality career guidance, regardless of their
                background, location, or connectivity. We combine technology
                with empathy to create a platform that truly understands and
                serves the needs of first-generation learners.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="inline-flex rounded-lg bg-primary/10 p-2">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The Problem We Are Solving
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              Understanding the challenges that inspired DishaSetu
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="text-4xl font-bold text-destructive">63%</div>
              <p className="mt-2 font-semibold text-foreground">
                Students Lack Career Guidance
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Over 63% of students in rural India have never received
                professional career counseling or guidance.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="text-4xl font-bold text-amber-500">40%</div>
              <p className="mt-2 font-semibold text-foreground">
                Scholarship Awareness Gap
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Nearly 40% of eligible students miss out on scholarships simply
                because they do not know about them.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="text-4xl font-bold text-primary">25%</div>
              <p className="mt-2 font-semibold text-foreground">
                Limited Internet Access
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                25% of rural areas have poor or no internet connectivity,
                limiting access to online resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Users className="h-4 w-4" />
              Team Vinayak
            </div>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet the Team Behind DishaSetu
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              A passionate team of developers committed to making education
              accessible for all.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-border bg-card p-8 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary text-2xl font-bold text-primary-foreground">
  {member.image ? (
    <Image
      src={member.image}
      alt={member.name}
      width={80}
      height={80}
      className="h-full w-full object-cover"
    />
  ) : (
    member.avatar
  )}
</div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {member.description}
                </p>
                
                {/* TEMPORARILY COMMENTED OUT SOCIAL ICONS TO FIX BUILD
                  Uncomment this section and replace the lucide icons with react-icons (e.g. <FaLinkedin />) later.
                */}
                {/* <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter className="h-4 w-4" />
                  </button>
                </div>
                */}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Timeline Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Roadmap
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              From concept to reality - the story of DishaSetu
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.title} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="mt-2 h-full w-0.5 bg-border" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="text-sm font-medium text-primary">
                    {milestone.year}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Handshake className="h-4 w-4" />
              Integration Partners
            </div>
            <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground">
              Integrated with Government Initiatives
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-muted-foreground"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
            <div className="text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Get in Touch
              </h2>
              <p className="mt-2 text-muted-foreground">
                Have questions or want to collaborate? We would love to hear from
                you.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center rounded-xl bg-muted/50 p-6 text-center">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 font-medium text-foreground">Email</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  contact@dishasetu.in
                </p>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-muted/50 p-6 text-center">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 font-medium text-foreground">Phone</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  +91 1800-XXX-XXXX
                </p>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-muted/50 p-6 text-center">
                <div className="rounded-lg bg-primary/10 p-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 font-medium text-foreground">Location</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  New Delhi, India
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                For technical support, visit our{" "}
                <a href="#" className="font-medium text-primary hover:underline">
                  Help Center
                </a>{" "}
                or reach out on social media.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
