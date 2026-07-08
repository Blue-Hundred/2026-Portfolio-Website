import familyBankingResearch1 from "@/assets/Project images/Family Banking Research 1.png";
import familyBankingResearch2 from "@/assets/Project images/Family Banking Research 2.png";
import familyBankingResearch3 from "@/assets/Project images/Family Banking Research 3.png";
import familyBankingResearch4 from "@/assets/Project images/Family Banking Research 4.png";
import createSavingsGoalFlow from "@/assets/Project images/Create Savings Goal flow.png";
import databasesPlatformEcosystem from "@/assets/Project images/Databases_Platform Ecosystem.png";
import databasesServiceBlueprintFinal from "@/assets/Project images/Databases_serviceblueprint_Final.png";
import databasesAffinityMap from "@/assets/Project images/Databases_Affinity Map.png";
import databasesJourneyMap from "@/assets/Project images/Databases_Journey Map.png";
import databasesPersonaAppOwner from "@/assets/Project images/Databases_Persona_AppOwner.png";
import databasesPersonasEngineer from "@/assets/Project images/Databases_Personas_Engineer.png";
import databaseExperiencePrinciples from "@/assets/Project images/Database_Experience Principles.png";
import databasesIA from "@/assets/Project images/Databases_IA.png";
import databasesUserFlow from "@/assets/Project images/Databases_User Flow.png";
import databasesWireframe from "@/assets/Project images/Databases_Wireframe.png";
import databases1 from "@/assets/Project images/Databases_1.png";
import databases2 from "@/assets/Project images/Databases_2.png";
import databases3 from "@/assets/Project images/Databases_3.png";
import databases4 from "@/assets/Project images/Databases_4.png";
import databases5 from "@/assets/Project images/Databases_5.png";
import databases6 from "@/assets/Project images/Databases_6.png";
import databases7 from "@/assets/Project images/Databases_7.png";
import databases8 from "@/assets/Project images/Databases_8.png";
import databasesFinalImage from "@/assets/Project images/Databases_Final Image.png";
import fnbResearch1 from "@/assets/Project images/FNB_Research 1.png";
import fnbResearch2 from "@/assets/Project images/FNB_Research 2.png";
import fnbResearch3 from "@/assets/Project images/FNB_Research 3.png";
import fnbDesign1 from "@/assets/Project images/FNB_Design 1.png";
import fnbDesign2 from "@/assets/Project images/FNB_Design 2.png";
import fnbDesign3 from "@/assets/Project images/FNB_Design 3.png";
import fnbDesign4 from "@/assets/Project images/FNB_Design 4.png";
import fnbDesign5 from "@/assets/Project images/FNB_Design 5.png";
import fnbDesign6 from "@/assets/Project images/FNB_Design 6.png";
import keyAffinity from "@/assets/Project images/Key_Affinity.png";
import keyTechStrategyAndPlan from "@/assets/Project images/Key_Tech strategy and plan.png";
import keyDisputesFlow from "@/assets/Project images/Key_Disputes Flow.png";
import keyLowFidelityWires from "@/assets/Project images/Key_Low-fidelity wires.png";
import keyWireFlow from "@/assets/Project images/Key_Wire Flow.png";
import key4 from "@/assets/Project images/Key_4.png";
import key5 from "@/assets/Project images/Key_5.png";
import key6 from "@/assets/Project images/Key_6.png";
import key7 from "@/assets/Project images/Key_7.png";
import key8 from "@/assets/Project images/Key_8.png";
import key9 from "@/assets/Project images/Key_9.png";
import key10 from "@/assets/Project images/Key_10.png";
import key11 from "@/assets/Project images/Key_11.png";
import key12 from "@/assets/Project images/Key_12.png";
import key13 from "@/assets/Project images/Key_13.png";
import key14 from "@/assets/Project images/Key_14.png";
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
  deliverDirectImages?: string[];
  deliverFinalImage?: string;
  outcome: {
    summary: string;
    impact: string;
    reflection: string;
  };
};

export const visibleCaseStudySlugs = [
  "chase-first-banking",
  "shared-control-planes",
  "keybank-counterfeit-disputes",
] as const;

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
    title: "Creating a Unified Database Management Platform",
    subtitle: "Designing a scalable enterprise platform that standardized database onboarding, provisioning, and service management across multiple database products.",
    year: "2025–2026",
    tags: ["Experience Strategy", "Service Design", "Information Architecture", "Enterprise Platform"],
    image: databasesCoverFull,
    color: "#F135C6",
    lightColor: "#9C0068",
    client: "JPMorgan Chase & Co.",
    role: "Lead Product Designer (Vice President)",
    duration: "2025–2026",
    overview:
      "Enterprise engineers relied on more than ten independent database control planes to provision and manage database services. Each product had evolved independently, resulting in inconsistent workflows, terminology, navigation patterns, and operational experiences. Engineers frequently switched between systems, searched multiple documentation sources, and relied on tribal knowledge to complete routine tasks.\n\nThe long-term vision was to create a shared experience that could scale across database products while providing a consistent foundation for the Integrated Engineers Portal (IEP).\n\nThis case study focuses on one representative workflow—database onboarding and provisioning—to illustrate the broader experience strategy developed for the platform. Although the platform supports many database management capabilities, this workflow best demonstrates the research, systems thinking, and product design decisions that established reusable patterns across the ecosystem.",
    metrics: [
      { value: "92%", label: "Task completion" },
      { value: "95", label: "CSAT" },
      { value: "95", label: "UMUX-Lite" },
      { value: "85%", label: "Preferred the redesigned homepage" },
    ],
    discover: {
      title: "The Challenge",
      body: "Although every database product supported similar customer goals, each control plane exposed those capabilities differently.\n\nCustomers encountered:\n\nDifferent navigation structures\nDifferent provisioning workflows\nDifferent terminology\nDifferent approval processes\nDifferent operational experiences\n\nThe inconsistency increased onboarding time, slowed provisioning, and made the platform difficult to scale.\n\nRather than redesigning a single interface, our challenge was to define a reusable experience strategy that every database product could adopt.\n\nUnderstanding the Ecosystem\n\nBefore designing solutions, I needed to understand how customers, internal teams, enterprise systems, and infrastructure interacted throughout the service lifecycle.\n\nWorking closely with stakeholders, I mapped the complete ecosystem—from initial learning and onboarding through provisioning, operations, and ongoing service management.\n\nThis systems-level perspective revealed organizational, technical, and process challenges that individual interface designs alone could not solve.\n\nKey Insight\n\nThe service blueprint documented multiple customer journeys across the platform.\n\nFrom this analysis, onboarding and provisioning emerged as the highest-impact workflow to redesign first because it represented the greatest concentration of customer friction while establishing reusable patterns for future experiences.",
      artifacts: [
        {
          src: databasesPlatformEcosystem,
          caption: "Platform Ecosystem",
        },
        {
          src: databasesServiceBlueprintFinal,
          caption: "Service Blueprint",
        },
      ],
    },
    define: {
      title: "Research",
      body: "Research combined existing platform audits with qualitative discovery to understand customer goals, organizational constraints, and technical dependencies.\n\nResearch Activities\nUX Audit\nStakeholder Interviews\nJourney Mapping\nService Blueprinting\nPersona Development\nCompetitive Analysis\nWorkflow Analysis\nUsability Testing\n\nResearch Insights\n\nFragmented Experiences\nDatabase products solved similar problems through entirely different experiences.\n\nUnclear Ownership\nApplication Owners and Engineers shared responsibilities but lacked visibility into progress and ownership.\n\nHidden System Status\nCustomers often didn't understand what was happening during provisioning or why requests failed.\n\nDocumentation Outside the Workflow\nCritical guidance required leaving the platform to search documentation and internal resources.\n\nPrimary Personas\n\nAlthough several internal stakeholders influenced the broader platform, research identified two primary customer groups responsible for database onboarding and provisioning.\n\nThese personas became the focus of the initial design effort while informing reusable patterns that could scale across additional workflows.\n\nApplication Owner\nResponsible for preparing applications, coordinating prerequisites, managing approvals, and enabling engineering teams.\n\nGoals\nComplete onboarding efficiently\nMaintain compliance\nReduce engineering blockers\n\nPain Points\nFragmented onboarding\nMultiple disconnected systems\nPoor visibility into approvals\nConfusing ownership\n\nEngineer\nResponsible for provisioning, configuring, monitoring, and maintaining database services.\n\nGoals\nProvision services quickly\nConfigure correctly\nResolve issues independently\n\nPain Points\nInconsistent provisioning\nTechnical complexity\nLimited operational visibility\nDifficult troubleshooting",
      artifacts: [
        {
          src: databasesAffinityMap,
          caption: "Research Synthesis",
        },
        {
          src: databasesJourneyMap,
          caption: "Journey Map",
        },
        {
          src: databasesPersonaAppOwner,
          caption: "Persona — Application Owner",
        },
        {
          src: databasesPersonasEngineer,
          caption: "Persona — Engineer",
        },
      ],
    },
    design: {
      title: "Defining the Experience Strategy",
      body: "Rather than redesigning isolated interfaces, I focused on creating principles that could scale across every database product.\n\nThese principles became the foundation for future platform experiences.\n\nDesign Principles\n\nDesign Once, Scale Everywhere\nCreate reusable interaction patterns across products.\n\nProgressive Disclosure\nReduce complexity by revealing information when needed.\n\nContext First\nProvide documentation and guidance within the workflow.\n\nOperational Transparency\nExpose system status, health, and progress throughout provisioning.\n\nConsistency Builds Confidence\nStandardize terminology, navigation, and workflows regardless of database technology.\n\nInformation Architecture\n\nResearch revealed customers thought about their work as a lifecycle rather than individual database technologies.\n\nI reorganized the platform around four primary activities:\n\nLearn\nOnboard\nProvision\nManage\n\nThis simplified navigation while establishing a scalable information architecture for future products.",
      artifacts: [
        {
          src: databaseExperiencePrinciples,
          caption: "Experience Principles — (Insert design principles graphic.)",
        },
        {
          src: databasesIA,
          caption: "Information Architecture",
        },
      ],
    },
    deliver: {
      title: "Designing the Representative Workflow",
      body: "Onboarding and provisioning became the first workflow used to apply the platform strategy.\n\nAlthough focused on one use case, the interaction patterns, navigation model, and information architecture were intentionally designed for reuse across the broader platform.\n\nWorkflow\n\nLearn\n\n↓\n\nComplete Prerequisites\n\n↓\n\nProvision Database\n\n↓\n\nConfigure Service\n\n↓\n\nMonitor Health\n\n↓\n\nManage Lifecycle\n\nProduct Decisions\n\nResearch continuously informed product decisions throughout the project.\n\nStandardize Provisioning\nEvery database product followed one consistent provisioning model.\n\nSeparate Governance from Provisioning\nCustomers confused onboarding requirements with provisioning tasks.\n\nSeparating these workflows reduced cognitive load.\n\nSurface Operational Health\nProvisioning isn't complete when infrastructure is created.\n\nCustomers need confidence that services remain healthy.\n\nEmbed Documentation\nDocumentation became part of the workflow rather than a separate destination.\n\nBuild for Scale\nEvery interaction pattern was evaluated for reuse across additional database products.\n\nDesign Exploration\n\nSolutions evolved through multiple rounds of iteration with engineers, architects, product managers, and researchers.\n\nValidation\n\nConcepts were validated with enterprise engineers throughout the design process.\n\nTesting focused on discoverability, navigation, onboarding, provisioning, and service management.\n\nResults\n92% task completion\n95 CSAT\n95 UMUX-Lite\n85% preferred the redesigned homepage\n\nTesting confirmed improvements in usability while increasing confidence throughout onboarding and provisioning.",
      artifacts: [
        {
          src: databasesUserFlow,
          caption: "User Flow — (Insert user flow.)",
        },
        {
          src: databasesWireframe,
          caption: "Wireframes",
        },
      ],
    },
    deliverDirectImages: [
      databases1,
      databases2,
      databases3,
      databases4,
      databases5,
      databases6,
      databases7,
      databases8,
    ],
    deliverFinalImage: databasesFinalImage,
    outcome: {
      summary:
        "Unified experience strategy across multiple database products\nStandardized onboarding and provisioning workflows\nShared navigation and interaction patterns\nReusable design patterns for future database products\nFoundation for Integrated Engineers Portal\nImproved usability through iterative validation",
      impact:
        "Results\n92% task completion\n95 CSAT\n95 UMUX-Lite\n85% preferred the redesigned homepage",
      reflection:
        "Testing confirmed improvements in usability while increasing confidence throughout onboarding and provisioning.",
    },
  },
  {
    id: 3,
    slug: "arrt-modernization",
    category: "Service Design",
    title: "Enterprise Branch Resolution Platform",
    subtitle: "Modernizing branch operations through workflow automation, service design, and enterprise platform strategy.",
    year: "2022-2025",
    tags: ["UX Strategy", "Service Design", "Workflow Automation", "Enterprise Platform"],
    image: arrCoverFull,
    color: "#35C6F1",
    lightColor: "#0071A4",
    client: "JPMorgan Chase & Co.",
    role: "Lead UX Designer (Vice President)",
    team: "Product Management • Engineering • Enterprise Architecture • Operations • UX Research • UX Design • Compliance",
    duration: "3 years",
    overview:
      "Branch Operations relied on multiple legacy applications, spreadsheets, SharePoint sites, SAS reports, email notifications, and MS Access tools to manage branch operational issues, compliance violations, and regulatory reporting.\n\nAnalysts manually reviewed more than fifty operational reports spanning account opening, cash audits, teller transactions, safe deposit operations, wires, physical security, and additional operational controls. Resolving a single issue often required switching between several disconnected systems while coordinating communication between analysts, branch managers, and operational leaders.\n\nAs part of a broader modernization initiative, our team defined the future experience strategy for a unified Branch Resolution Platform that consolidated fragmented workflows into a scalable case management ecosystem. The initiative focused on simplifying operations, automating manual work, improving collaboration, and establishing a cloud-ready architecture capable of supporting future operational growth.",
    metrics: [
      { value: "50+", label: "Operational reports manually reviewed" },
      { value: "7", label: "Legacy channels consolidated into strategy" },
      { value: "4", label: "Strategic experience principles defined" },
      { value: "3", label: "Primary user groups aligned" },
    ],
    discover: {
      title: "Discovery",
      body: "Discovery focused on understanding how analysts, branch managers, and operational teams managed branch violations across multiple disconnected systems.\n\nResearch activities included stakeholder interviews, workflow analysis, operational process mapping, current-state ecosystem mapping, persona development, requirements workshops, and service blueprinting.\n\nCurrent-state architecture revealed an ecosystem spanning SAS Reporting, MS Access, SharePoint, MFT, email notifications, Excel reports, and internal databases. The resulting experience created excessive context switching, duplicated effort, and inconsistent operational processes.\n\nResearch insights consistently surfaced five recurring challenges: fragmented operational workflows, manual case management, inconsistent user experiences, limited workflow visibility, and collaboration gaps driven by email-heavy coordination.\n\nThree primary user groups emerged during discovery: Branch Administrators, Analysts, and Branch Managers.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=600&fit=crop&auto=format",
          caption: "[ Insert ] Current-State Architecture Diagram",
        },
        {
          src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=600&fit=crop&auto=format",
          caption: "[ Insert ] Current Service Blueprint",
        },
        {
          src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop&auto=format",
          caption: "[ Insert ] Persona Summary and Use Cases",
        },
      ],
    },
    define: {
      title: "Executive Alignment",
      body: "Rather than modernizing individual applications independently, we aligned Product, Engineering, Operations, and Enterprise Architecture around a shared platform strategy.\n\nTogether, we defined a modernization roadmap that balanced immediate business needs with long-term scalability by establishing reusable workflow patterns, standardized case management, and common interaction models capable of supporting future operational controls.\n\nBusiness goals centered on replacing legacy MS Access applications, consolidating fragmented workflows, reducing manual analyst effort, improving collaboration, standardizing case management, enabling workflow automation and integrations, strengthening reporting and auditability, and establishing a scalable architecture for future modernization initiatives.\n\nAs Lead UX Designer, I partnered with Product, Engineering, Enterprise Architecture, Operations, and UX Research to define the experience strategy and future-state platform direction.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&h=600&fit=crop&auto=format",
          caption: "[ Insert ] Executive Alignment Workshops",
        },
        {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop&auto=format",
          caption: "[ Insert ] Experience Strategy Principles",
        },
      ],
    },
    design: {
      title: "Defining the Future State",
      body: "Using research insights and stakeholder collaboration, I designed a future-state platform centered around standardized case management.\n\nThe experience strategy was grounded in four principles: Unified Platform, Workflow Automation, Collaborative Case Management, and Scalable Architecture.\n\nThe future-state experience focused on unified dashboards, consistent navigation, shared workflow patterns, automated routing, search and filtering, collaboration tools, operational reporting, and enterprise scalability.\n\nEach workflow was redesigned around a standardized case lifecycle: case creation, case assignment, analyst investigation, branch outreach, resolution management, and workflow completion. These standardized flows reduced variability while improving operational consistency across business processes.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=600&fit=crop&auto=format",
          caption: "[ Insert ] User Flow Diagrams",
        },
        {
          src: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=900&h=600&fit=crop&auto=format",
          caption: "[ Insert ] Workflow Modernization Diagram",
        },
        {
          src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=600&fit=crop&auto=format",
          caption: "[ Insert ] Future-State Platform Navigation",
        },
      ],
    },
    deliver: {
      title: "Future-State Platform",
      body: "Working alongside Enterprise Architecture and Engineering, we defined a scalable platform capable of supporting future operational modernization efforts.\n\nThe proposed architecture introduced centralized workflow management, cloud-ready services, case orchestration, shared operational data, integrated reporting, and enterprise workflow automation.\n\nOne of the largest opportunities involved replacing fragmented operational processes with standardized workflow orchestration. The redesigned platform introduced automated assignments, standardized workflow states, integrated communication, resolution tracking, case ownership, audit history, and configurable engagement models.\n\nThis foundation positioned the organization to retire legacy applications while supporting future operational capabilities.",
      artifacts: [
        {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format",
          caption: "[ Insert ] Future-State Architecture",
        },
        {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
          caption: "[ Insert ] Hero Vision and Platform Outcomes",
        },
      ],
    },
    outcome: {
      summary:
        "The initiative established a strategic foundation for modernizing branch operations by transforming fragmented operational workflows into a unified enterprise platform.",
      impact:
        "The experience strategy simplified analyst workflows, reduced manual operational effort, improved collaboration across business teams, standardized case management, increased operational transparency, established reusable workflow patterns, and enabled future cloud modernization efforts. Rather than solving a single operational problem, the project created a scalable experience framework capable of supporting future branch operations initiatives across the enterprise.",
      reflection:
        "This project reinforced that successful enterprise modernization begins long before interface design. By collaborating closely with research, operations, product, engineering, and enterprise architecture teams, we aligned business objectives, operational workflows, and technical capabilities into a unified experience strategy. Service blueprints, workflow mapping, and future-state architecture became primary design artifacts that guided decision-making, reduced organizational complexity, and established a scalable foundation for future platform modernization.",
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
    title: "Simplifying the Counterfeit Item Dispute Experience",
    subtitle: "Enhancing the ease-of-use of the Counterfeit Item Dispute Experience.",
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
    ],
    discover: {
      title: "Discover",
      body: "Research revealed that customers often misunderstood counterfeit eligibility requirements, documentation expectations, and dispute outcomes. Internal teams spent significant time requesting additional evidence and educating customers after submission.\n\nCustomers frequently confused counterfeit merchandise claims with other dispute types — defective merchandise, items not received, quality concerns, or seller misrepresentation. Many claims were submitted without the evidence required to support investigations, creating rework for both customers and operations teams.",
      artifacts: [
        {
          src: keyAffinity,
          caption: "[ Add image ] — Affinity mapping and current-state dispute workflow",
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
          src: keyTechStrategyAndPlan,
          caption: "Key Tech strategy and plan",
        },
        {
          src: keyDisputesFlow,
          caption: "Key Disputes Flow",
        },
        {
          src: keyLowFidelityWires,
          caption: "Key Low-fidelity wires",
        },
        {
          src: keyWireFlow,
          caption: "Key Wire Flow",
        },
      ],
    },
    deliver: {
      title: "Deliver",
      body: "The redesigned experience delivered measurable improvements for both customers and the business. Customer benefits included improved understanding of eligibility requirements, reduced frustration from incomplete or rejected submissions, and increased confidence throughout the dispute process.\n\nBusiness benefits included lower support volume, reduced operational costs from unnecessary reviews and manual interventions, improved claim quality, and more efficient investigations. The guided eligibility model meant that claims reaching the operations team were better prepared and required less back-and-forth.",
      artifacts: [
        {
          src: key4,
          caption: "Key 4",
        },
        {
          src: key5,
          caption: "Key 5",
        },
        {
          src: key6,
          caption: "Key 6",
        },
        {
          src: key7,
          caption: "Key 7",
        },
        {
          src: key8,
          caption: "Key 8",
        },
        {
          src: key9,
          caption: "Key 9",
        },
        {
          src: key10,
          caption: "Key 10",
        },
        {
          src: key11,
          caption: "Key 11",
        },
        {
          src: key12,
          caption: "Key 12",
        },
        {
          src: key13,
          caption: "Key 13",
        },
        {
          src: key14,
          caption: "Key 14",
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
          src: fnbResearch1,
          caption: "[ Add image ] — Moderated customer interviews and field research",
        },
        {
          src: fnbResearch2,
          caption: "[ Add image ] — Affinity mapping and synthesis workshops",
        },
        {
          src: fnbResearch3,
          caption: "[ Add image ] — Customer decision-making and product selection behavior patterns",
        },
      ],
    },
    define: {
      title: "Define",
      body: "Financial institutions frequently organize products around internal business structures rather than customer goals. Customers struggled to identify the right products, compare options, understand features, and confidently complete applications. The challenge was not simply redesigning pages — it was rethinking how banking products are discovered and purchased through digital channels.\n\nResearch identified five distinct shopper archetypes: Browsers, Researchers, Product-Focused Shoppers, Bargain Hunters, and Emerging Customers. Each demonstrated unique behaviors, motivations, and information needs. These insights informed navigation, content strategy, product organization, and conversion pathways.\n\nFour business objectives shaped the strategy: increase product discoverability; improve conversion by reducing friction; support omnichannel banking through seamless digital-to-branch connections; and modernize the perception of banking through a retail-inspired experience.",
      artifacts: [
        {
          src: fnbDesign1,
          caption: "[ Add image ] — Five shopper archetypes: Browsers, Researchers, Product-Focused, Bargain Hunters, Emerging Customers",
        },
        {
          src: fnbDesign2,
          caption: "[ Add image ] — Journey maps and persona-driven navigation framework",
        },
        {
          src: fnbDesign3,
          caption: "[ Add image ] — Shopper archetype comparison matrix",
        },
        {
          src: fnbDesign4,
          caption: "[ Add image ] — Problem framing workshop outputs",
        },
        {
          src: fnbDesign5,
          caption: "[ Add image ] — Content strategy and information hierarchy",
        },
        {
          src: fnbDesign6,
          caption: "[ Add image ] — Conversion pathway and channel handoff model",
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
