import { Navigate, useNavigate, useParams, useSearchParams } from "react-router";
import { CaseStudyShell } from "./CaseStudyShell";
import { interactiveCaseStudies } from "../../content/case-studies";
import type { CaseStudy, CaseStudyFlow, PrototypeScreen } from "../../types/case-study";

function getSortedFlows(caseStudy: CaseStudy) {
  return [...caseStudy.flows].sort((first, second) => first.order - second.order);
}

function getDefaultPath() {
  const defaultCaseStudy = interactiveCaseStudies[0];
  const defaultFlow = defaultCaseStudy ? getSortedFlows(defaultCaseStudy)[0] : undefined;

  return defaultCaseStudy && defaultFlow ? `/work/${defaultCaseStudy.id}/${defaultFlow.id}` : "/";
}

function getScreen(flow: CaseStudyFlow, screenId: string | null): PrototypeScreen {
  return flow.screens.find((screen) => screen.id === screenId) ?? flow.screens.find((screen) => screen.id === flow.initialScreenId) ?? flow.screens[0];
}

function buildCaseStudyUrl({
  caseStudyId,
  flowId,
  screenId,
  pointId,
}: {
  caseStudyId: string;
  flowId: string;
  screenId?: string;
  pointId?: string;
}) {
  const params = new URLSearchParams();

  if (screenId) {
    params.set("screen", screenId);
  }

  if (pointId) {
    params.set("point", pointId);
  }

  const queryString = params.toString();

  return `/work/${caseStudyId}/${flowId}${queryString ? `?${queryString}` : ""}`;
}

export function CaseStudyRoutedPage() {
  const { caseStudyId, flowId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestedCaseStudy = interactiveCaseStudies.find((caseStudy) => caseStudy.id === caseStudyId);

  if (!requestedCaseStudy) {
    return <Navigate to={getDefaultPath()} replace />;
  }

  const requestedFlow = requestedCaseStudy.flows.find((flow) => flow.id === flowId);
  const defaultFlow = getSortedFlows(requestedCaseStudy)[0];

  if (!requestedFlow && defaultFlow) {
    return <Navigate to={buildCaseStudyUrl({ caseStudyId: requestedCaseStudy.id, flowId: defaultFlow.id })} replace />;
  }

  if (!requestedFlow) {
    return <Navigate to={getDefaultPath()} replace />;
  }

  const screenParam = searchParams.get("screen");
  const pointParam = searchParams.get("point");
  const activeScreen = getScreen(requestedFlow, screenParam);
  const activePoint = activeScreen.inspectionPoints.find((point) => point.id === pointParam);

  if (screenParam && screenParam !== activeScreen.id) {
    return (
      <Navigate
        to={buildCaseStudyUrl({
          caseStudyId: requestedCaseStudy.id,
          flowId: requestedFlow.id,
          screenId: activeScreen.id,
        })}
        replace
      />
    );
  }

  if (pointParam && !activePoint) {
    return (
      <Navigate
        to={buildCaseStudyUrl({
          caseStudyId: requestedCaseStudy.id,
          flowId: requestedFlow.id,
          screenId: activeScreen.id,
        })}
        replace
      />
    );
  }

  function navigateToUrl(url: string) {
    navigate(url);
  }

  return (
    <CaseStudyShell
      caseStudies={interactiveCaseStudies}
      selectedCaseStudyId={requestedCaseStudy.id}
      selectedFlowId={requestedFlow.id}
      selectedScreenId={activeScreen.id}
      selectedInspectionPointId={activePoint?.id}
      onCaseStudySelect={(nextCaseStudyId, nextFlowId) => {
        navigateToUrl(buildCaseStudyUrl({ caseStudyId: nextCaseStudyId, flowId: nextFlowId }));
      }}
      onFlowSelect={(nextCaseStudyId, nextFlowId) => {
        navigateToUrl(buildCaseStudyUrl({ caseStudyId: nextCaseStudyId, flowId: nextFlowId }));
      }}
      onScreenSelect={(nextScreenId) => {
        navigateToUrl(
          buildCaseStudyUrl({
            caseStudyId: requestedCaseStudy.id,
            flowId: requestedFlow.id,
            screenId: nextScreenId,
          })
        );
      }}
      onInspectionPointSelect={(nextPointId) => {
        navigateToUrl(
          buildCaseStudyUrl({
            caseStudyId: requestedCaseStudy.id,
            flowId: requestedFlow.id,
            screenId: activeScreen.id,
            pointId: nextPointId,
          })
        );
      }}
      onInspectionPanelClose={() => {
        navigateToUrl(
          buildCaseStudyUrl({
            caseStudyId: requestedCaseStudy.id,
            flowId: requestedFlow.id,
            screenId: activeScreen.id,
          })
        );
      }}
    />
  );
}

export { getDefaultPath as getDefaultCaseStudyPresentationPath };