export type InspectionPointCategory =
  | "research"
  | "information-architecture"
  | "interaction-design"
  | "monitoring"
  | "accessibility"
  | "business-impact"
  | "technical-constraint";

export type InspectionPoint = {
  id: string;
  title: string;
  category: InspectionPointCategory;
  x: number;
  y: number;
  summary: string;
  problem?: string;
  decision?: string;
  evidence?: string;
  tradeoff?: string;
  outcome?: string;
};

export type PrototypeAction = {
  id: string;
  label: string;
  targetScreenId: string;
};

export type PrototypeScreen = {
  id: string;
  title: string;
  componentKey: string;
  actions: PrototypeAction[];
  inspectionPoints: InspectionPoint[];
};

export type CaseStudyFlow = {
  id: string;
  title: string;
  description?: string;
  order: number;
  initialScreenId: string;
  screens: PrototypeScreen[];
};

export type CaseStudy = {
  id: string;
  title: string;
  company?: string;
  summary?: string;
  role?: string;
  timeline?: string;
  flows: CaseStudyFlow[];
};