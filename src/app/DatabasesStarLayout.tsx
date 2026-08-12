import { motion } from "motion/react";
import { Typography } from "@mui/material";
import { DSStaticImageView } from "./design-system";
import type { CaseStudy } from "./data/caseStudies";

import heroImage from "../assets/databases-redesign/dashboard.png";
import researchIncludedImage from "../assets/databases-redesign/research-included.png";
import personasImage from "../assets/databases-redesign/personas.png";
import serviceBlueprintImage from "../assets/databases-redesign/service-blueprint.png";
import iaDiagramImage from "../assets/databases-redesign/ia-diagram.png";
import designSystemImage from "../assets/databases-redesign/design-system.png";
import createServiceImage from "../assets/databases-redesign/create-service.png";

const revealProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const BUSINESS_PROBLEMS = [
  {
    title: "Customer Friction",
    body: "Engineers had to relearn workflows across database products and frequently relied on support.",
  },
  {
    title: "Duplicated investment",
    body: "Teams independently designed and engineered similar capabilities, increasing development and maintenance costs.",
  },
  {
    title: "Limited scalability",
    body: "Fragmented experiences made it difficult to bring database products into the broader Integrated Engineers Portal (IEP).",
  },
];

const CUSTOMER_IMPACT = [
  { value: "92%", label: "Task completion Rate" },
  { value: "95", label: "CSAT" },
  { value: "95", label: "UMUX Lite" },
];

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <Typography variant="h2" component="h2" className="text-foreground">
        {title}
      </Typography>
    </div>
  );
}

export function DatabasesStarLayout({
  study,
  onImageClick,
}: {
  study: CaseStudy;
  onImageClick: (src: string, caption: string) => void;
}) {
  return (
    <>
      {/* Hero image */}
      <motion.section className="bg-background py-8 sm:py-10" {...revealProps}>
        <DSStaticImageView
          src={heroImage}
          caption="Cloud Relational Databases — My Databases dashboard"
          onImageClick={onImageClick}
          className="rounded-2xl"
          imageClassName="rounded-2xl"
        />
      </motion.section>

      {/* Executive summary */}
      <motion.section
        className="bg-background border-t border-border pt-10 sm:pt-14 pb-12 sm:pb-16 grid grid-cols-4 lg:grid-cols-12 gap-6 sm:gap-12"
        {...revealProps}
      >
        <div className="col-span-4 lg:col-span-4">
          <Typography variant="h3" component="h2" className="text-foreground">
            Executive summary
          </Typography>
        </div>
        <div className="col-span-4 lg:col-span-8">
          {study.overview.split("\n\n").map((paragraph, i) => (
            <Typography
              key={i}
              variant="body1"
              component="p"
              className={`text-foreground/90 ${i > 0 ? "mt-4" : ""}`}
            >
              {paragraph}
            </Typography>
          ))}
        </div>
      </motion.section>

      {/* Situation */}
      <motion.section className="bg-background border-t border-border pt-12 sm:pt-16 pb-12 sm:pb-16" {...revealProps}>
        <SectionTitle title="Situation" />
        <div className="max-w-4xl mb-10 sm:mb-12">
          <Typography
            variant="body1"
            component="p"
            className="text-foreground/90"
            sx={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "26px", lineHeight: "42px", letterSpacing: "-0.02em" }}
          >
            Enterprise engineers relied on more than 10 independent database control planes across relational,
            non-relational, and graph technologies. Although engineers performed many of the same tasks across products,
            each control plane had different navigation, terminology, provisioning workflows, documentation, and
            operational experiences.
          </Typography>
        </div>

        <Typography
          variant="h3"
          component="h3"
          className="text-foreground"
          sx={{ mb: { xs: 4, sm: 5 } }}
        >
          Business Problems
        </Typography>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
          {BUSINESS_PROBLEMS.map((item) => (
            <div
              key={item.title}
              className="col-span-4 lg:col-span-2 rounded-xl border border-border bg-secondary/25 p-5 sm:p-6"
            >
              <Typography variant="h4" component="h4" className="text-foreground mb-2">
                {item.title}
              </Typography>
              <Typography variant="bodySmall" component="p" className="text-foreground/80">
                {item.body}
              </Typography>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Task */}
      <motion.section className="bg-background border-t border-border pt-12 sm:pt-16 pb-12 sm:pb-16" {...revealProps}>
        <SectionTitle title="Task" />
        <div className="max-w-4xl mb-8 sm:mb-10">
          <Typography
            variant="body1"
            component="p"
            className="text-foreground/90"
            sx={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "26px", lineHeight: "42px", letterSpacing: "-0.02em" }}
          >
            The initiative began with an audit of existing control planes and expanded through multiple rounds of
            research to understand the customer and operational challenges behind the fragmented experience.
          </Typography>
        </div>

        <DSStaticImageView
          src={researchIncludedImage}
          caption="Research included — three rounds of research and Round 3 self-service gaps"
          onImageClick={onImageClick}
          className="rounded-2xl mb-10 sm:mb-12"
          imageClassName="rounded-2xl"
        />

        <div className="max-w-4xl mb-8 sm:mb-10">
          <Typography variant="body1" component="p" className="text-foreground/90">
            Research identified two primary personas. Service blueprints connected the dots between technology, data,
            product, and user experience to better understand how customer friction and pain points correlated to the
            backend technologies orchestrating the experience.
          </Typography>
        </div>

        <DSStaticImageView
          src={personasImage}
          caption="Primary personas — Amari, the Application Owner and Ramesh, the Engineer"
          onImageClick={onImageClick}
          className="rounded-2xl mb-6 sm:mb-8"
          imageClassName="rounded-2xl"
        />
        <DSStaticImageView
          src={serviceBlueprintImage}
          caption="Service blueprint — onboarding and provisioning across front-stage and back-stage systems"
          onImageClick={onImageClick}
          className="rounded-2xl"
          imageClassName="rounded-2xl"
        />
      </motion.section>

      {/* Action */}
      <motion.section className="bg-background border-t border-border pt-12 sm:pt-16 pb-12 sm:pb-16" {...revealProps}>
        <SectionTitle title="Action" />
        <div className="max-w-4xl mb-10 sm:mb-12">
          <Typography
            variant="body1"
            component="p"
            className="text-foreground/90"
            sx={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "26px", lineHeight: "42px", letterSpacing: "-0.02em" }}
          >
            One of the clearest manifestations of fragmentation was navigation. Database products organized similar
            capabilities differently, forcing engineers to develop a new mental model for each technology. I established
            a common information architecture organized around customer tasks.
          </Typography>
        </div>

        <DSStaticImageView
          src={iaDiagramImage}
          caption="Information architecture — task-based structure across the database platform"
          onImageClick={onImageClick}
          className="rounded-2xl mb-12 sm:mb-16"
          imageClassName="rounded-2xl"
        />

        <div className="max-w-4xl mb-10 sm:mb-12">
          <Typography variant="body1" component="p" className="text-foreground/90">
            It was paramount to adopt the design system used by the corporate technology organization to increase
            consistency, familiarity of patterns, and recognition of critical decisions and tasks.
          </Typography>
        </div>

        <DSStaticImageView
          src={designSystemImage}
          caption="IEP Design System — a unified set of components used across the database flows"
          onImageClick={onImageClick}
          className="rounded-2xl"
          imageClassName="rounded-2xl"
        />
      </motion.section>

      {/* Results */}
      <motion.section className="bg-background border-t border-border pt-12 sm:pt-16 pb-12 sm:pb-16" {...revealProps}>
        <SectionTitle title="Results" />
        <div className="max-w-4xl mb-10 sm:mb-12">
          <Typography
            variant="body1"
            component="p"
            className="text-foreground/90"
            sx={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "26px", lineHeight: "42px", letterSpacing: "-0.02em" }}
          >
            We launched Cloud Relational Databases and established the foundation for future control planes,
            consolidating previously fragmented experience into a consistent and scaleable product.
          </Typography>
        </div>

        <Typography variant="h3" component="h3" className="text-foreground mb-5 sm:mb-6">
          Customer Impact
        </Typography>
        <div className="grid grid-cols-3 gap-4 mb-12 sm:mb-16">
          {CUSTOMER_IMPACT.map((item) => (
            <div
              key={item.label}
              className="col-span-3 sm:col-span-1 rounded-xl border border-border bg-secondary/25 p-6 sm:p-8"
            >
              <Typography variant="kpiValue" component="div" className="text-foreground mb-2">
                {item.value}
              </Typography>
              <Typography variant="bodySmall" component="div" className="text-muted-foreground">
                {item.label}
              </Typography>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <DSStaticImageView
            src={heroImage}
            caption="My Databases — consolidated dashboard for the Cloud Relational Databases control plane"
            onImageClick={onImageClick}
            className="rounded-2xl"
            imageClassName="rounded-2xl"
          />
          <DSStaticImageView
            src={createServiceImage}
            caption="Create Database Service — guided provisioning flow with estimated cost"
            onImageClick={onImageClick}
            className="rounded-2xl"
            imageClassName="rounded-2xl"
          />
        </div>
      </motion.section>
    </>
  );
}
