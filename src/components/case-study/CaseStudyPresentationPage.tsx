import { Navigate } from "react-router";
import { getDefaultCaseStudyPresentationPath } from "./CaseStudyRoutedPage";

export function CaseStudyPresentationPage() {
  return <Navigate to={getDefaultCaseStudyPresentationPath()} replace />;
}