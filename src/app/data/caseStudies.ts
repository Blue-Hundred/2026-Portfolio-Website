import familyBankingResearch1 from "@/assets/Project images/Family Banking Research 1.png";
import familyBankingResearch2 from "@/assets/Project images/Family Banking Research 2.png";
import familyBankingResearch3 from "@/assets/Project images/Family Banking Research 3.png";
import familyBankingResearch4 from "@/assets/Project images/Family Banking Research 4.png";
import createSavingsGoalFlow from "@/assets/Project images/Create Savings Goal flow.png";
import databasesUiAudit from "@/assets/Project images/Databases_UI Audit.png";
import databasesSynthesis from "@/assets/Project images/Databases_Synthesis.png";
import databasesFrictionPoints from "@/assets/Project images/Databases_Friction Points.png";
import databasesSolutions from "@/assets/Project images/Databases_Solutions.png";
import sparkCoverFull from "@/assets/covers/Spark_Cover_Full.jpg";
import databasesCoverFull from "@/assets/covers/Databases_Cover_Full.jpg";
import arrCoverFull from "@/assets/covers/ARR_Cover_Full.jpg";
import kycCoverFull from "@/assets/covers/KYC_Cover_Full.jpg";

export type Artifact = {
  src: string;
  caption: string;
};

export type Phase = {
  title: string;
  body: string;
  artifacts: Artifact[];
};

export type CaseStudy = {
  id: number;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  image: string;
  /** Accent used in dark mode — bright, high contrast on dark bg */
  color: string;
  /** Accent used in light mode when color fails 4.5:1 on #F5F3EE */
  lightColor?: string;
  client: string;
  role: string;
  team?: string;
  duration: string;
  overview: string;
  metrics: { value: string; label: string }[];
  discover: Phase;
  define: Phase;
  design: Phase;
  deliver: Phase;
  outcome: {
    summary: string;
    impact: string;
    reflection: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "chase-first-banking",
    category: "Product Design",
    title: "Modernizing Family Banking",
    subtitle: "Delivering customer-focused outcomes through transformation and replatforming.",
    year: "2025",
    tags: ["UX Design", "Mobile Banking", "Implementation", "Systems Thinking"],
    image: sparkCoverFull,
    color: "#C6F135",
    lightColor: "#2D6A00",
    client: "JPMorgan Chase",
    role: "Lead UX Designer",
    duration: "1 year",
    overview:
      "Chase initiated a strategic modernization effort to migrate Chase First Banking from a third-party platform to an in-house solution. The initiative reduced long-term vendor costs, gave Chase ownership of the customer experience, and laid the foundation for faster product innovation. The migration impacted approximately 1.5 million Chase First Banking accounts and required maintaining customer trust while introducing a redesigned experience.",
    metrics: [
      { value: "4.77/5", label: "Overall dashboard satisfaction score" },
      { value: "4.58/5", label: "Savings Goals ease-of-use score" },
      { value: "100%", label: "Task completion rate for Savings Goals" },
      { value: "1.5M", label: "Chase First Banking accounts migrated" },
    ],
    discover: {
      title: "Discover",
      body: "Research across 62 participants showed that the redesigned dashboard was intuitive and well received, with an overall satisfaction score of 4.77/5. A consistent pattern emerged: users rarely struggled with completing tasks once they located the correct feature. Instead, discoverability and mental models created friction.\n\nFor Savings Goals specifically: 100% task completion and a 4.58/5 ease-of-use score. Many participants initially looked under 'More' before navigating to Savings. Researchers recommended strengthening dashboard signifiers rather than redesigning the workflow.",
      artifacts: [
        {
          src: familyBankingResearch1,
          caption: "Project brief — overview, business challenge, and research insights",
        },
        {
          src: familyBankingResearch2,
          caption: "Research findings — Task 5 usability slides",
        },
      ],
    },
    define: {
      title: "Define",
      body: "The existing Chase First Banking experience relied on an external vendor to power core money management capabilities, including spending controls, savings goals, allowances, chores, and transaction history. Moving these capabilities in-house represented a multi-million-dollar strategic investment, but success depended on more than rebuilding features — it required helping over a million customers transition without confusion or increased support calls.\n\nThe redesign also needed to improve engagement with key financial management features while preserving familiar mental models for existing customers.",
      artifacts: [
        {
          src: familyBankingResearch3,
          caption: "Business problem framing — vendor dependency and migration scope",
        },
      ],
    },
    design: {
      title: "Design",
      body: "I joined the project during implementation as a UX Designer responsible for translating validated concepts into production-ready experiences. My primary ownership was the Savings Goals workflow, but I first immersed myself in the usability findings to understand the broader product strategy, customer behaviors, and interaction patterns.\n\nRather than simply recreating screens, I reviewed usability findings beyond my assigned feature to understand how Savings Goals fit into the overall information architecture. This systems-level understanding allowed me to preserve research-validated interaction patterns, produce implementation-ready designs with clear specifications, anticipate engineering questions before development, and align the delivered experience with the team's long-term migration strategy.",
      artifacts: [
        {
          src: createSavingsGoalFlow,
          caption: "Create Savings Goal flow",
        },
      ],
    },
    deliver: {
      title: "Deliver",
      body: "The final implementation integrated Savings Goals into the redesigned parent dashboard, supporting Chase's broader goal of centralizing money management while maintaining a simple, approachable experience. The design balanced familiarity for existing customers with clearer organization for new users, supporting the transition from the legacy platform.\n\nThe work supported a strategic migration affecting approximately 1.5 million Chase First Banking accounts and contributed to a platform modernization expected to save Chase millions by eliminating third-party vendor dependence.",
      artifacts: [
        {
          src: familyBankingResearch4,
          caption: "[ Add image ] — Project overview and migration timeline",
        },
      ],
    },
    outcome: {
      summary:
        "The Savings Goals workflow shipped as part of a platform-wide migration affecting 1.5 million Chase First Banking accounts. The delivered experience preserved the research-validated usability outcomes: 100% task completion and a 4.58/5 ease-of-use score. The broader dashboard achieved a 4.77/5 satisfaction rating and was consistently described by participants as intuitive, straightforward, and user-friendly.",
      impact:
        "The migration contributed to a platform modernization expected to save Chase millions annually by eliminating third-party vendor dependence. Delivering production-ready designs informed by research — rather than assumptions — helped reduce engineering ambiguity and kept implementation aligned with the validated user experience. The work directly supported one of Chase's highest-priority product infrastructure investments.",
      reflection:
        "This project reinforced the importance of understanding the business strategy behind a feature, not just the interface. By grounding implementation in research and systems thinking, I was able to bridge design and engineering while helping deliver a high-priority modernization initiative with significant customer and business impact. Immersing in the full usability findings — beyond my assigned feature — was the decision that made the work meaningfully better.",
    },
  },
  {
    id: 2,
    slug: "shared-control-planes",
    category: "Enterprise UX",
    title: "Centralizing Database Service Creation",
    subtitle: "Creating a unified experience strategy for enterprise database management",
    year: "2025",
    tags: ["UX Strategy", "Experience Architecture", "Usability Testing", "Executive Alignment"],
    image: databasesCoverFull,
    color: "#F135C6",
    lightColor: "#9C0068",
    client: "JPMorgan Chase & Co.",
    role: "Lead Experience Designer (VP)",
    team: "Cross-functional (Product, Engineering, Architecture, Operations)",
    duration: "1 Year",
    overview:
      "JPMorgan Chase's database ecosystem consisted of independently developed control planes across relational, graph, and non-relational database technologies. Although the underlying infrastructure differed, engineers performed many of the same operational tasks through inconsistent workflows, navigation, terminology, and support models, creating fragmented experiences that slowed service delivery and increased operational complexity.\n\nAs Lead Experience Designer and UX Researcher, I led the end-to-end experience strategy to define a shared operating model across database products. Rather than beginning with interface design, I partnered with Product, Engineering, Enterprise Architecture, Operations, and senior technology leaders to understand customer needs, align stakeholders around a common vision, validate opportunities through research, and translate strategy into scalable product experiences. The result established a shared experience framework that reduced fragmentation, expanded self-service capabilities, and created reusable patterns that continue to support future database products.",
    metrics: [
      { value: "92%", label: "Task Success Rate" },
      { value: "95", label: "CSAT" },
      { value: "95", label: "UMUX-Lite" },
      { value: "85%", label: "Preferred the proposed experience" },
    ],
    discover: {
      title: "Framing the Problem",
      body: "The Shared Control Planes initiative was part of a broader multi-year engineering transformation to simplify how developers managed infrastructure across the enterprise. The long-term vision was to evolve from independently managed database control planes into shared operational platforms that would ultimately integrate into the Integrated Engineer's Portal (IEP)—a centralized destination where engineers could onboard to infrastructure platforms, provision database services, manage resources, access documentation, and monitor operational health through a unified experience.\n\nBefore I joined the initiative, the team had completed a UX audit of nine database control planes that revealed significant fragmentation across onboarding, service provisioning, service management, documentation, and operational workflows. Although each database technology served a different infrastructure need, engineers were trying to accomplish the same operational goals through completely different experiences.\n\nEngineers couldn't independently onboard to the platform, provision database services, or troubleshoot common operational issues. Instead, they relied on a centralized Site Reliability Engineering (SRE) support team that held office hours only one day each week. Routine tasks were delayed, documentation was inconsistent, operational visibility was limited, and Product teams lacked customer experience data needed to understand friction and prioritize improvements.\n\nAs Lead Experience Designer and UX Researcher, I built upon this foundational research to move the strategy forward. Working closely with Product Management, Engineering, Enterprise Architecture, Operations, and senior technology leaders, I translated existing insights into a customer-centered experience strategy aligned with the organization's long-term platform vision.",
      artifacts: [
        {
          src: databasesUiAudit,
          caption: "Stakeholder interview notes",
        },
        {
          src: databasesSynthesis,
          caption: "Journey map",
        },
        {
          src: databasesFrictionPoints,
          caption: "Research synthesis board",
        },
        {
          src: databasesSolutions,
          caption: "Existing ecosystem audit",
        },
      ],
    },
    define: {
      title: "Building Alignment Before Design",
      body: "Rather than redesigning every workflow simultaneously, we intentionally prioritized the experiences that would eliminate the greatest customer pain points while establishing reusable patterns for future database products.\n\nUsing research findings and stakeholder interviews, I facilitated 5–6 design consistency, service blueprint, and stakeholder alignment workshops with Product Managers, Enterprise Architects, Engineering Leads, Technology leaders, and Operations partners. Together we evaluated operational workflows, technical dependencies, and customer pain points to identify the highest-value opportunities for the MVP.\n\nThese collaborative sessions established organizational alignment before design began and resulted in four strategic workstreams.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&h=600&fit=crop&auto=format",
          caption: "Workshop facilitation",
        },
        {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop&auto=format",
          caption: "Affinity mapping",
        },
        {
          src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=600&fit=crop&auto=format",
          caption: "Experience principles",
        },
        {
          src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=600&fit=crop&auto=format",
          caption: "Architecture alignment artifacts",
        },
      ],
    },
    design: {
      title: "Translating Strategy into Experience",
      body: "With organizational alignment established, I translated the experience strategy into wireframes and interactive prototypes that demonstrated how a shared operational experience could support multiple database technologies while preserving technology-specific capabilities where they mattered most.\n\nEvery workflow was intentionally designed to address validated customer pain points by simplifying navigation, reducing context switching, improving discoverability, introducing operational dashboards, expanding self-service capabilities, and enabling engineers to complete common infrastructure tasks with greater confidence.\n\nDesign reviews became collaborative working sessions where Product, Engineering, and Enterprise Architecture validated technical feasibility, refined workflows, and ensured proposed solutions balanced customer needs with implementation constraints.\n\nBecause the Shared Control Planes would ultimately integrate into the Integrated Engineer's Portal (IEP), the experience adopted the IEP Design System—a customized implementation built on Material UI. Engineering teams were initially hesitant to adopt a new component library while modernizing the platform. To build confidence, I partnered with the Design Systems team, participated in governance reviews, validated implementation patterns, and educated engineers on how component versioning and design system updates would simplify long-term maintenance while ensuring consistency across the broader engineering ecosystem.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=600&fit=crop&auto=format",
          caption: "Wireframes",
        },
        {
          src: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=900&h=600&fit=crop&auto=format",
          caption: "Prototype",
        },
        {
          src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=600&fit=crop&auto=format",
          caption: "Information architecture",
        },
        {
          src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&h=600&fit=crop&auto=format",
          caption: "Before & After comparisons",
        },
      ],
    },
    deliver: {
      title: "Validate & Drive Execution",
      body: "I conducted moderated usability testing with enterprise engineers to validate whether the proposed experience successfully resolved the customer pain points identified during discovery. Testing evaluated discoverability, efficiency, learnability, confidence, workflow consistency, and engineers' ability to complete critical tasks independently.\n\nResearch findings were synthesized into executive-ready presentations that helped leadership confidently prioritize the MVP, secure organizational alignment, and move into implementation based on customer evidence rather than assumptions.\n\nFollowing the successful launch of the Graph Shared Control Plane, I conducted 14 post-launch customer interviews to understand how engineers used the platform in production, identify remaining friction points, and determine which enhancements would deliver the greatest customer value. Those insights directly informed roadmap prioritization and influenced the design of the Relational Shared Control Plane.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format",
          caption: "Usability testing",
        },
        {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop&auto=format",
          caption: "Executive readout",
        },
        {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
          caption: "Metrics dashboard",
        },
        {
          src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=600&fit=crop&auto=format",
          caption: "Research synthesis",
        },
      ],
    },
    outcome: {
      summary:
        "The initiative established a scalable experience strategy supporting both Relational and Non-Relational database products while significantly improving the day-to-day experience of engineers responsible for provisioning and managing infrastructure.",
      impact:
        "This initiative required significantly more than interface design. My role was to connect Product, Engineering, Enterprise Architecture, Operations, and customers around a shared vision while ensuring every strategic decision addressed a validated customer need.",
      reflection:
        "Every recommendation was grounded in customer evidence and validated throughout the engagement.",
    },
  },
  {
    id: 3,
    slug: "arrt-modernization",
    category: "Service Design",
    title: "Automating Analyst Resolution Reporting",
    subtitle: "Transforming a fragmented and manual compliance ecosystem into a unified analyst experience supporting 22,000 branch control violations annually.",
    year: "2022-2025",
    tags: ["UX Strategy", "Service Design", "Workflow Mapping", "Information Architecture"],
    image: arrCoverFull,
    color: "#35C6F1",
    lightColor: "#0071A4",
    client: "JPMorgan Chase",
    role: "UX Manager",
    duration: "3 years",
    overview:
      "The Analyst Resolution Reporting ecosystem supported approximately 22,000 branch control violations annually. Analysts were required to work across three disconnected applications — ARR-T, MCT, and Branch Dashboard — to investigate violations, communicate with field teams, document remediation efforts, and track resolution progress. Compounding the challenge, ARR-T was a Microsoft Access application identified as a high-risk platform scheduled for decommissioning. The organization needed a modernized solution that reduced operational risk while simplifying analyst workflows.",
    metrics: [
      { value: "3 → 1", label: "Applications consolidated into a single platform" },
      { value: "22K", label: "Branch control violations supported annually" },
      { value: "[ # ]", label: "[ Add metric 1 ]" },
      { value: "[ # ]", label: "[ Add metric 2 ]" },
    ],
    discover: {
      title: "Discover",
      body: "To understand the ecosystem, I conducted stakeholder interviews, user interviews, workflow analysis, UI audits, service blueprinting exercises, and collaborative workshops. The goal was to understand how work moved through the organization, identify inefficiencies, uncover dependencies between systems, and establish a shared understanding of the future-state experience.\n\nWorking closely with analysts and business stakeholders, I facilitated workflow mapping sessions that documented end-to-end remediation processes, escalation paths, decision points, and exception handling scenarios. These exercises revealed numerous manual handoffs, duplicated activities, fragmented workflows, and excessive application switching.\n\nTo fully understand the operational model, I created service blueprints for ARR-T, MCT, and Branch Dashboard. These blueprints exposed user actions, supporting processes, system interactions, manual activities, and opportunities for automation — providing visibility into both front-stage user experiences and the back-stage operational processes supporting them.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Workflow mapping sessions and service blueprints",
        },
        {
          src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — UI audits across ARR-T, MCT, and Branch Dashboard",
        },
        {
          src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Stakeholder interviews and collaborative workshops",
        },
      ],
    },
    define: {
      title: "Define",
      body: "The ecosystem involved multiple stakeholder groups with different responsibilities, goals, and reporting structures. I facilitated collaborative workshops to define user roles, identify core capabilities, prioritize enhancements, establish success measures, and create alignment around a shared modernization strategy.\n\nResearch findings informed a future-state vision focused on four strategic objectives: retire high-risk Microsoft Access applications; consolidate ARR-T, MCT, and Branch Dashboard into one experience; introduce data visibility, reporting, and operational awareness; and simplify research, communication, and remediation workflows. The vision emphasized reducing workflow fragmentation while improving operational efficiency and compliance outcomes.\n\nResearch also revealed that analysts and administrators had very different needs. Analysts needed faster access to records, improved prioritization, and simpler communication tools. Administrators needed self-service configuration capabilities and greater control over content management.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Future-state vision and strategic objectives",
        },
        {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Analyst vs. administrator needs mapping",
        },
      ],
    },
    design: {
      title: "Design",
      body: "After establishing the vision, I partnered with stakeholders to redesign key workflows and identify opportunities to automate manual processes. Enhancements included automated communications, integrated activity tracking, dynamic filtering, SLA monitoring, personalized work queues, and streamlined escalation workflows.\n\nThe resulting solution introduced dedicated administrative experiences that reduced reliance on engineering teams for routine updates. The final concept unified capabilities from ARR-T, MCT, and Branch Dashboard into a single role-based experience with personalized work queues, dynamic filtering and search, integrated communications, automated outreach logging, SLA monitoring and prioritization, administrative content management, and improved visibility into case status and ownership.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Unified platform concept and role-based experience design",
        },
        {
          src: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Workflow redesigns and automation opportunities",
        },
        {
          src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Administrative self-service experience designs",
        },
      ],
    },
    deliver: {
      title: "Deliver",
      body: "The design reduced context switching and enabled analysts to complete critical tasks within a single application. The modernization strategy established a clear path for retiring high-risk legacy technology while delivering meaningful improvements to analyst productivity and operational visibility.\n\nKey outcomes: consolidated three disconnected applications into a unified analyst platform; reduced workflow fragmentation and manual coordination; increased analyst productivity through automation and prioritization; enabled business self-service administration; established a modernization strategy supporting retirement of high-risk legacy technology; and improved visibility into operational performance and case management workflows.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Final unified analyst platform",
        },
        {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Operational dashboards and case management views",
        },
      ],
    },
    outcome: {
      summary:
        "Three disconnected applications — ARR-T, MCT, and Branch Dashboard — were consolidated into a single role-based analyst platform. The design reduced context switching, eliminated manual handoffs between systems, and enabled analysts to complete critical compliance tasks within one application. The modernization strategy also established a clear path for retiring a high-risk Microsoft Access platform.",
      impact:
        "The initiative reduced workflow fragmentation and manual coordination across the ecosystem supporting 22,000 branch control violations annually. Analysts gained faster access to records, improved prioritization tools, and integrated communications. Administrators gained self-service configuration capabilities, reducing reliance on engineering teams for routine updates. The work improved visibility into operational performance and case management workflows across the organization.",
      reflection:
        "This project demonstrated that modernization is rarely just a technology challenge. Success required understanding a complex ecosystem of users, systems, processes, and controls while aligning stakeholders around a shared future-state vision. Through service design, workflow engineering, product strategy, and user-centered design, I helped create a foundation for transforming a fragmented compliance ecosystem into a unified operational experience.",
    },
  },
  {
    id: 4,
    slug: "kyc-work-returns",
    category: "Enterprise UX",
    title: "Enhancing Know-Your-Customer Transaction Reporting",
    subtitle: "Modernizing a high-risk branch compliance workflow into a clearer, action-oriented experience for managers and bankers.",
    year: "2022-2025",
    tags: ["UX Strategy", "Service Design", "Compliance", "Usability Testing"],
    image: kycCoverFull,
    color: "#F1C635",
    lightColor: "#7A5B00",
    client: "JPMorgan Chase",
    role: "UX Manager",
    duration: "3 years",
    overview:
      "Branch Dashboard is a branch controls and compliance experience used to monitor operational risk, control tasks, and action items across branch locations. Within that ecosystem, KYC account opening and maintenance work returns were a high-friction workflow. When required customer or account information was missing or invalid, branch teams had to resolve the issue quickly to avoid customer account restrictions or closures. I led the modernization of the KYC Work Returns experience over a 12-month effort — from discovery through delivery — shifting branch teams from a reactive, unclear workflow to a proactive, action-oriented dashboard.",
    metrics: [
      { value: "9.5/10", label: "UMUX-Lite score" },
      { value: "100%", label: "CSAT score" },
      { value: "7", label: "CX gaps closed for metric and action items" },
      { value: "3", label: "High-severity CX gaps closed" },
    ],
    discover: {
      title: "Discover",
      body: "The research strategy was iterative and mixed-methods. Qualitative research helped uncover pain points and design opportunities. Quantitative methods helped evaluate the experience, compare design directions, and measure confidence in proposed changes.\n\nMost research activities involved co-creation with design and content toolkits — allowing stakeholders and users to react to tangible concepts instead of abstract requirements. This revealed workflow gaps that would not have surfaced through standard feedback sessions alone.\n\nResearch activities included stakeholder interviews, user interviews, journey mapping, UI audits, co-creation workshops, prioritization exercises, high-fidelity prototype testing, and accessibility reviews.\n\nThe workflow involved several groups with different responsibilities: Branch Managers who monitor action items and coach employees; Licensed Bankers who need to understand and resolve work returns; and Operations and compliance partners who need reliable resolution and reduced risk. The existing journey created friction because employees did not just need data — they needed clear next steps, status, urgency, and confidence that the issue was moving toward resolution.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Co-creation toolkits and mixed-methods research assets",
        },
        {
          src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Journey mapping and current-state workflow review",
        },
        {
          src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Work return lifecycle flow and banker journey",
        },
      ],
    },
    define: {
      title: "Define",
      body: "Research and journey mapping revealed three core employee problems.\n\nLack of clarity: The level of urgency was unclear throughout the experience, making it difficult for branch employees to know which issues to action first. Resolution instructions were also unclear, driving support calls and slowing remediation.\n\nCustomer frustration: When information was disorganized or instructions incomplete, employees sometimes had to contact customers multiple times for the same missing information. Unresolved work returns could result in account restriction or closure.\n\nDisorganized information: Accounts with multiple work returns were not always shown together in a way that supported resolution. Users needed to piece together context manually, increasing cognitive load and delaying action.\n\nKey synthesis insight: Users did not need more data alone. They needed a clearer hierarchy of action — the experience had to show what mattered now, what could wait, and what would happen if the issue was not resolved. Findings were translated into prioritization exercises evaluated across user value, business value, impact, urgency, and feasibility.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Employee problem journey map: lack of clarity, customer frustration, disorganized information",
        },
        {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Feature and user prioritization matrices from quad workshop",
        },
      ],
    },
    design: {
      title: "Design",
      body: "Four design principles guided the solution.\n\nIncrease urgency awareness: Users needed to immediately recognize which issues could lead to customer account restriction or closure. The redesigned experience elevated due dates, aging, unresolved status, and branch snapshot indicators.\n\nSimplify navigation: The Action Items & Metrics page became the directory and starting point. Breadcrumbs created hierarchy recognition and a path back to previously visited pages — critical in a workflow moving between branch-level views, metric views, account work returns, and issue resolution pages.\n\nSurface operational insights: The experience added trend visibility over a rolling 12-month period. Instead of only seeing a static list of issues, managers could see patterns, coach teams, monitor issue types, and prevent account restrictions and closures.\n\nImprove resolution confidence: Clearer content, knowledge support, and resolution guidance helped reduce the need to contact support teams. The experience helped users answer: What happened? What do I need to do? How urgent is this? What is the current status?",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Action-oriented branch dashboard with upcoming items and branch snapshot",
        },
        {
          src: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Simplified navigation, breadcrumbs, and KYC trend chart",
        },
        {
          src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Real-time data visualization with rolling 12-month trends",
        },
      ],
    },
    deliver: {
      title: "Deliver",
      body: "The work was validated through usability testing and experience measurement. The outcomes demonstrated strong user satisfaction, perceived usability, and measurable closure of customer experience gaps: 9.5/10 UMUX-Lite, 100% CSAT, 7 CX gaps closed for metric and action items, and 3 high-severity CX gaps closed.\n\nThe most important design outcome was that users could more easily understand what required attention and why. The experience improved the signal-to-noise ratio of the workflow by emphasizing urgency, status, ownership, and customer impact.\n\nThe business impact extended beyond the KYC work return workflow. The broader Branch Dashboard work supported stronger compliance visibility, including a reported 90% reduction in missed audits and 98% attestation adoption.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Usability testing results: 9.5/10 UMUX-Lite, 100% CSAT",
        },
        {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — CX gap closure summary and outcome metrics",
        },
      ],
    },
    outcome: {
      summary:
        "The redesigned KYC Work Returns experience achieved a 9.5/10 UMUX-Lite score and 100% CSAT. Seven CX gaps were closed for metric and action items, including 3 high-severity gaps. Branch teams shifted from a reactive, unclear workflow to a proactive, action-oriented dashboard with clearer urgency signals, simplified navigation, and guided resolution support.",
      impact:
        "The business impact extended beyond the KYC workflow itself. The broader Branch Dashboard work supported a reported 90% reduction in missed audits and 98% attestation adoption — outcomes that strengthened the case that better UX can directly reduce operational risk when the experience is aligned to how branch employees actually work. The experience reduced dependency on support calls by surfacing resolution guidance closer to the point of need.",
      reflection:
        "This project reinforced that compliance experiences cannot be solved by visual redesign alone. The core design challenge was not simply making a dashboard cleaner — it was helping branch employees understand risk, prioritize action, resolve issues faster, and prevent customer harm. The strongest outcome was the connection between research and measurable results: a full design leadership arc from discovering the operational problem to validating the solution against business impact.",
    },
  },
  {
    id: 5,
    slug: "keybank-counterfeit-disputes",
    category: "Product Design",
    title: "Counterfeit Item Dispute Experience",
    subtitle: "Designed a guided dispute experience that helped customers determine eligibility, provide supporting documentation, and submit counterfeit claims with greater confidence.",
    year: "2018",
    tags: ["UX Strategy", "Journey Mapping", "Information Architecture", "Prototyping"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1400&h=800&fit=crop&auto=format",
    color: "#F13560",
    lightColor: "#C0002E",
    client: "KeyBank",
    role: "UX Designer",
    duration: "6 months",
    overview:
      "Customers increasingly purchase products through online marketplaces and third-party sellers. As counterfeit goods became more common, KeyBank's dispute process struggled to help customers determine whether they had a legitimate claim and what evidence was required. The result was confusion, incomplete submissions, avoidable support calls, and higher operational costs. This initiative focused on creating a guided counterfeit dispute experience that helped customers determine eligibility, gather documentation, and submit stronger claims.",
    metrics: [
      { value: "↓", label: "Reduced incomplete dispute submissions" },
      { value: "12%", label: "Reduction in dispute-related call center volume after redesign" },
      { value: "↑", label: "Improved dispute quality and resolution accuracy" },
      { value: "[ # ]", label: "[ Add metric ]" },
    ],
    discover: {
      title: "Discover",
      body: "Research revealed that customers often misunderstood counterfeit eligibility requirements, documentation expectations, and dispute outcomes. Internal teams spent significant time requesting additional evidence and educating customers after submission.\n\nCustomers frequently confused counterfeit merchandise claims with other dispute types — defective merchandise, items not received, quality concerns, or seller misrepresentation. Many claims were submitted without the evidence required to support investigations, creating rework for both customers and operations teams.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Journey mapping and current-state dispute workflow",
        },
        {
          src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Research findings: eligibility confusion and evidence gaps",
        },
      ],
    },
    define: {
      title: "Define",
      body: "The business objectives were clear: reduce dispute processing costs by eliminating unnecessary reviews and manual interventions; lower contact-center volume through improved guidance and self-service; improve dispute quality and resolution accuracy; and create a consistent customer experience aligned with operational and regulatory requirements.\n\nThe core problem was that the existing experience treated dispute submission as a form-filling exercise. Customers arrived without the context to self-triage, and the system provided no guidance to help them determine eligibility before investing time in a submission that would be rejected or returned for more information.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Problem framing: eligibility confusion and claim quality gaps",
        },
        {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Business objectives and success criteria",
        },
      ],
    },
    design: {
      title: "Design",
      body: "The experience was redesigned around three core questions: Is this a counterfeit claim? Do I have the required evidence? Am I prepared to proceed? Rather than immediately presenting a form, the workflow guided customers through an eligibility assessment before allowing them to submit a dispute.\n\nThe solution introduced guided eligibility validation, contextual education, progressive disclosure, and dynamic evidence collection. Customers received information at the moment it was needed, reducing confusion and improving completion quality.\n\nKey design decisions: stop invalid claims earlier in the process; educate customers before submission; collect stronger evidence upfront; increase confidence through clear expectations and guidance.\n\nLow-fidelity concepts explored decision logic, information architecture, and workflow sequencing. High-fidelity prototypes simulated real-world dispute scenarios and enabled stakeholder review before implementation.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Eligibility assessment flow and decision logic",
        },
        {
          src: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — High-fidelity prototype: guided evidence collection",
        },
        {
          src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Progressive disclosure and contextual education design",
        },
      ],
    },
    deliver: {
      title: "Deliver",
      body: "The redesigned experience delivered measurable improvements for both customers and the business. Customer benefits included improved understanding of eligibility requirements, reduced frustration from incomplete or rejected submissions, and increased confidence throughout the dispute process.\n\nBusiness benefits included lower support volume, reduced operational costs from unnecessary reviews and manual interventions, improved claim quality, and more efficient investigations. The guided eligibility model meant that claims reaching the operations team were better prepared and required less back-and-forth.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Final dispute experience: guided eligibility and evidence collection",
        },
        {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Outcome metrics and validation results",
        },
      ],
    },
    outcome: {
      summary:
        "The guided counterfeit dispute experience reduced friction, improved dispute quality, lowered operational effort, and created a more consistent experience for customers. By validating eligibility and dynamically collecting supporting evidence before submission, the design improved outcomes for both customers and operations teams.",
      impact:
        "The business impact was felt across multiple dimensions: fewer incomplete submissions reaching the operations queue, a 12% reduction in dispute-related call center volume after redesign, and improved claim quality that enabled faster, more accurate investigations. The self-service eligibility model also aligned the customer experience with operational and regulatory requirements — reducing risk while improving satisfaction.",
      reflection:
        "This project demonstrated the value of designing around customer decision-making rather than simply digitizing an existing process. By helping customers determine eligibility and gather appropriate evidence before submission, the experience improved outcomes for both customers and operational teams. The key insight was that the problem was not the form — it was everything that needed to happen before the form.",
    },
  },
  {
    id: 6,
    slug: "fnb-clicks-to-bricks",
    category: "UX Strategy",
    title: "Transforming Banking Product Discovery",
    subtitle: "Reimagining how customers discover, compare, and purchase financial products online through a retail-inspired digital banking platform.",
    year: "2018",
    tags: ["UX Strategy", "Customer Research", "Journey Mapping", "Information Architecture"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=800&fit=crop&auto=format",
    color: "#8B35F1",
    lightColor: "#5B21B6",
    client: "First National Bank (FNB)",
    role: "UX Designer",
    duration: "6 months",
    overview:
      "Traditional banking websites often force customers to navigate complex product structures, disconnected application experiences, and confusing terminology. As part of First National Bank's Clicks-to-Bricks strategy, the organization sought to reimagine how customers discover, compare, evaluate, and purchase financial products online. The initiative evolved into the foundation of FNB's eStore experience — a retail-inspired digital banking platform designed to improve product discovery, customer education, and conversion.",
    metrics: [
      { value: "5", label: "Shopper archetypes identified through research" },
      { value: "41%", label: "Increase in loan applications" },
      { value: "30%", label: "Increase in deposit applications" },
      { value: "10% YoY", label: "Increase in digital eStore interactions" },
    ],
    discover: {
      title: "Discover",
      body: "A comprehensive discovery effort was conducted using moderated customer interviews, field research, usability testing, and collaborative synthesis workshops. Research participants represented a variety of financial backgrounds, product needs, and banking behaviors. Findings were synthesized through affinity mapping exercises to uncover patterns in customer decision-making and product selection behaviors.\n\nThe core finding: customers consistently behaved more like retail shoppers than traditional banking customers. They wanted to compare options, understand differences between products, and build confidence before committing. Research also revealed significant variation in financial literacy levels, highlighting the need for both educational content and simplified decision support throughout the experience.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Moderated customer interviews and field research",
        },
        {
          src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Affinity mapping and synthesis workshops",
        },
        {
          src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Customer decision-making and product selection behavior patterns",
        },
      ],
    },
    define: {
      title: "Define",
      body: "Financial institutions frequently organize products around internal business structures rather than customer goals. Customers struggled to identify the right products, compare options, understand features, and confidently complete applications. The challenge was not simply redesigning pages — it was rethinking how banking products are discovered and purchased through digital channels.\n\nResearch identified five distinct shopper archetypes: Browsers, Researchers, Product-Focused Shoppers, Bargain Hunters, and Emerging Customers. Each demonstrated unique behaviors, motivations, and information needs. These insights informed navigation, content strategy, product organization, and conversion pathways.\n\nFour business objectives shaped the strategy: increase product discoverability; improve conversion by reducing friction; support omnichannel banking through seamless digital-to-branch connections; and modernize the perception of banking through a retail-inspired experience.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Five shopper archetypes: Browsers, Researchers, Product-Focused, Bargain Hunters, Emerging Customers",
        },
        {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Journey maps and persona-driven navigation framework",
        },
      ],
    },
    design: {
      title: "Design",
      body: "The strategy centered on treating financial products like retail merchandise. Rather than forcing customers through traditional banking hierarchies, the experience emphasized product comparison, education, guided discovery, and multiple paths to conversion. The objective was to reduce cognitive load while supporting different customer shopping styles.\n\nThe solution introduced a new product discovery framework that organized financial products around customer goals and needs. Homepage concepts were explored through A/B testing, product detail pages were redesigned to improve scannability and comparison, and navigation structures were optimized to support product exploration. Educational content was integrated directly into decision-making moments rather than isolated in separate sections of the site.\n\nLow-fidelity concepts focused on information architecture and product organization. Medium-fidelity wireframes explored homepage layouts, product catalogs, account overview experiences, and comparison tools. Designs were refined iteratively through stakeholder feedback and usability validation.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Product discovery framework and retail-inspired navigation",
        },
        {
          src: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — A/B tested homepage concepts and product comparison designs",
        },
        {
          src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Wireframes: product catalogs, account overview, comparison tools",
        },
      ],
    },
    deliver: {
      title: "Deliver",
      body: "The work helped establish foundational experience patterns that became central to FNB's eStore platform and broader Clicks-to-Bricks strategy. The resulting experience supported improved product discovery, stronger customer education, simplified account selection, and more seamless digital-to-branch transitions.\n\nThe initiative demonstrated how UX strategy could influence enterprise-wide customer engagement and digital transformation efforts — and the eStore platform went on to receive industry recognition as an award-winning digital banking experience.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Final eStore experience: product discovery and comparison",
        },
        {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
          caption: "[ Add image ] — Digital-to-branch omnichannel experience",
        },
      ],
    },
    outcome: {
      summary:
        "The Clicks-to-Bricks initiative established foundational experience patterns that became central to FNB's award-winning eStore platform. The retail-inspired product discovery framework improved discoverability, reduced friction in the evaluation and application process, and created a more seamless connection between digital and branch banking experiences.",
      impact:
        "The work helped establish FNB's eStore as a leading example of digital banking transformation. Results included a 41% increase in loan applications, a 30% increase in deposit applications, and a 10% year-over-year increase in digital eStore interactions. The platform also earned industry recognition when FNB eStore was awarded Best Digital Initiative (2021) at the Banking Tech Awards.",
      reflection:
        "This project reinforced the importance of understanding customer behavior before designing solutions. By approaching banking through the lens of retail shopping behaviors, the team created an experience that better aligned customer expectations with business goals. The initiative remains one of the strongest examples of strategic UX leadership, customer-centered innovation, and experience transformation in my portfolio.",
    },
  },
];
