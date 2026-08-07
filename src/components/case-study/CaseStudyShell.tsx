import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import type {} from "../../theme/theme";
import type { CaseStudy, CaseStudyFlow, InspectionPoint, PrototypeScreen } from "../../types/case-study";

const leftNavigationWidth = 320;
const rightPanelWidth = 380;

type CaseStudyShellProps = {
  caseStudies: CaseStudy[];
  selectedCaseStudyId: string;
  selectedFlowId: string;
  selectedScreenId?: string;
  selectedInspectionPointId?: string;
  onCaseStudySelect: (caseStudyId: string, flowId: string) => void;
  onFlowSelect: (caseStudyId: string, flowId: string) => void;
  onScreenSelect: (screenId: string) => void;
  onInspectionPointSelect: (pointId: string) => void;
  onInspectionPanelClose: () => void;
};

const categoryLabels: Record<InspectionPoint["category"], string> = {
  research: "Research",
  "information-architecture": "Information Architecture",
  "interaction-design": "Interaction Design",
  monitoring: "Monitoring",
  accessibility: "Accessibility",
  "business-impact": "Business Impact",
  "technical-constraint": "Technical Constraint",
};

function getSortedFlows(caseStudy: CaseStudy) {
  return [...caseStudy.flows].sort((first, second) => first.order - second.order);
}

function findScreen(flow: CaseStudyFlow, screenId: string) {
  return flow.screens.find((screen) => screen.id === screenId) ?? flow.screens[0];
}

export function CaseStudyShell({
  caseStudies,
  selectedCaseStudyId,
  selectedFlowId,
  selectedScreenId,
  selectedInspectionPointId,
  onCaseStudySelect,
  onFlowSelect,
  onScreenSelect,
  onInspectionPointSelect,
  onInspectionPanelClose,
}: CaseStudyShellProps) {
  const firstCaseStudy = caseStudies[0];
  const [collapsedCaseStudyIds, setCollapsedCaseStudyIds] = useState<string[]>([]);

  const selectedCaseStudy = useMemo(
    () => caseStudies.find((caseStudy) => caseStudy.id === selectedCaseStudyId) ?? firstCaseStudy,
    [caseStudies, firstCaseStudy, selectedCaseStudyId]
  );
  const selectedFlow = useMemo(() => {
    if (!selectedCaseStudy) {
      return undefined;
    }

    return selectedCaseStudy.flows.find((flow) => flow.id === selectedFlowId) ?? getSortedFlows(selectedCaseStudy)[0];
  }, [selectedCaseStudy, selectedFlowId]);
  const activeScreen = selectedFlow ? findScreen(selectedFlow, selectedScreenId ?? selectedFlow.initialScreenId) : undefined;
  const selectedInspectionPoint = activeScreen?.inspectionPoints.find((point) => point.id === selectedInspectionPointId) ?? null;

  function openCaseStudy(caseStudy: CaseStudy) {
    const firstCaseStudyFlow = getSortedFlows(caseStudy)[0];

    if (selectedCaseStudy?.id === caseStudy.id) {
      setCollapsedCaseStudyIds((current) =>
        current.includes(caseStudy.id) ? current.filter((id) => id !== caseStudy.id) : [...current, caseStudy.id]
      );
      return;
    }

    setCollapsedCaseStudyIds((current) => current.filter((id) => id !== caseStudy.id));
    onCaseStudySelect(caseStudy.id, firstCaseStudyFlow?.id ?? "");
  }

  function selectFlow(flow: CaseStudyFlow) {
    if (!selectedCaseStudy) {
      return;
    }

    onFlowSelect(selectedCaseStudy.id, flow.id);
  }

  function navigateToScreen(screenId: string) {
    onScreenSelect(screenId);
  }

  if (!selectedCaseStudy || !selectedFlow || !activeScreen) {
    return (
      <Box component="main" sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "background.default" }}>
        <Typography variant="body1" color="text.secondary">
          No interactive case studies are available yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <CaseStudyNavigation
        caseStudies={caseStudies}
        collapsedCaseStudyIds={collapsedCaseStudyIds}
        selectedCaseStudyId={selectedCaseStudy.id}
        selectedFlowId={selectedFlow.id}
        onCaseStudyOpen={openCaseStudy}
        onFlowSelect={selectFlow}
      />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          ml: `${leftNavigationWidth}px`,
          mr: selectedInspectionPoint ? `${rightPanelWidth}px` : 0,
          transition: (theme) => theme.transitions.create("margin-right"),
        }}
      >
        <PrototypeCanvas
          caseStudy={selectedCaseStudy}
          flow={selectedFlow}
          screen={activeScreen}
          selectedInspectionPointId={selectedInspectionPoint?.id ?? null}
          onInspectionPointSelect={onInspectionPointSelect}
          onNavigate={navigateToScreen}
        />
      </Box>

      <InspectionPanel inspectionPoint={selectedInspectionPoint} onClose={onInspectionPanelClose} />
    </Box>
  );
}

function CaseStudyNavigation({
  caseStudies,
  collapsedCaseStudyIds,
  selectedCaseStudyId,
  selectedFlowId,
  onCaseStudyOpen,
  onFlowSelect,
}: {
  caseStudies: CaseStudy[];
  collapsedCaseStudyIds: string[];
  selectedCaseStudyId: string;
  selectedFlowId: string;
  onCaseStudyOpen: (caseStudy: CaseStudy) => void;
  onFlowSelect: (flow: CaseStudyFlow) => void;
}) {
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: leftNavigationWidth,
          boxSizing: "border-box",
          bgcolor: (theme) => theme.caseStudy.navigationBackground,
          borderRightColor: "divider",
          p: 2,
        },
      }}
    >
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Interview Mode
          </Typography>
          <Typography variant="h5">Case Studies</Typography>
        </Box>

        <Divider />

        <List disablePadding aria-label="Interactive case studies">
          {caseStudies.map((caseStudy) => {
            const isSelected = selectedCaseStudyId === caseStudy.id;
            const isExpanded = isSelected && !collapsedCaseStudyIds.includes(caseStudy.id);
            const sortedFlows = getSortedFlows(caseStudy);

            return (
              <Box key={caseStudy.id} sx={{ mb: 1 }}>
                <ListItemButton
                  selected={isSelected}
                  aria-expanded={isExpanded}
                  aria-controls={`${caseStudy.id}-flows`}
                  onClick={() => onCaseStudyOpen(caseStudy)}
                  sx={{ px: 1.5, py: 1.25 }}
                >
                  <Stack spacing={0.25} sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" noWrap>
                      {caseStudy.title}
                    </Typography>
                    {caseStudy.company ? (
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {caseStudy.company}
                      </Typography>
                    ) : null}
                  </Stack>
                  <Typography variant="caption" color="text.secondary" aria-hidden="true">
                    {isExpanded ? "−" : "+"}
                  </Typography>
                </ListItemButton>

                <Collapse id={`${caseStudy.id}-flows`} in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding aria-label={`${caseStudy.title} flows`} sx={{ mt: 0.75, ml: 1 }}>
                    {sortedFlows.map((flow) => (
                      <ListItemButton
                        key={flow.id}
                        selected={selectedFlowId === flow.id}
                        onClick={() => onFlowSelect(flow)}
                        sx={{ px: 1.5, py: 1, mb: 0.5 }}
                      >
                        <Stack spacing={0.25}>
                          <Typography variant="body2">{flow.title}</Typography>
                          {flow.description ? (
                            <Typography variant="caption" color="text.secondary">
                              {flow.description}
                            </Typography>
                          ) : null}
                        </Stack>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            );
          })}
        </List>
      </Stack>
    </Drawer>
  );
}

function PrototypeCanvas({
  caseStudy,
  flow,
  screen,
  selectedInspectionPointId,
  onInspectionPointSelect,
  onNavigate,
}: {
  caseStudy: CaseStudy;
  flow: CaseStudyFlow;
  screen: PrototypeScreen;
  selectedInspectionPointId: string | null;
  onInspectionPointSelect: (pointId: string) => void;
  onNavigate: (screenId: string) => void;
}) {
  return (
    <Stack spacing={3} sx={{ minHeight: "100vh", p: 4 }}>
      <Stack spacing={1}>
        <Typography variant="overline" color="text.secondary">
          {caseStudy.title} / {flow.title}
        </Typography>
        <Typography variant="h3">{screen.title}</Typography>
        {flow.description ? (
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
            {flow.description}
          </Typography>
        ) : null}
      </Stack>

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          maxWidth: 1120,
          minHeight: 680,
          mx: "auto",
          border: (theme) => `1px solid ${theme.caseStudy.prototypeBorder}`,
          borderRadius: 4,
          bgcolor: (theme) => theme.caseStudy.prototypeCanvas,
        }}
      >
        <MockPrototypeScreen screen={screen} onNavigate={onNavigate} />

        {screen.inspectionPoints.map((point, index) => {
          const isActive = selectedInspectionPointId === point.id;

          return (
            <IconButton
              key={point.id}
              aria-label={`Inspect ${point.title}`}
              aria-pressed={isActive}
              onClick={() => onInspectionPointSelect(point.id)}
              sx={{
                position: "absolute",
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: "translate(-50%, -50%)",
                width: 34,
                height: 34,
                border: 2,
                borderColor: "background.paper",
                bgcolor: (theme) => (isActive ? theme.caseStudy.activeInspectionPoint : theme.caseStudy.inspectionPoint),
                color: "primary.contrastText",
                boxShadow: 3,
                "&:hover": {
                  bgcolor: (theme) => theme.caseStudy.activeInspectionPoint,
                },
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {index + 1}
              </Typography>
            </IconButton>
          );
        })}
      </Paper>
    </Stack>
  );
}

function MockPrototypeScreen({ screen, onNavigate }: { screen: PrototypeScreen; onNavigate: (screenId: string) => void }) {
  const isDetailScreen = screen.componentKey.includes("Detail");
  const isIncidentScreen = screen.componentKey.includes("incident");

  return (
    <Stack spacing={3} sx={{ p: 4, minHeight: 680 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="overline" color="text.secondary">
            Prototype Screen
          </Typography>
          <Typography variant="h5">{screen.title}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          {screen.actions.map((action) => (
            <Button key={action.id} variant="contained" onClick={() => onNavigate(action.targetScreenId)}>
              {action.label}
            </Button>
          ))}
        </Stack>
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: isDetailScreen ? "1.2fr 0.8fr" : "repeat(3, 1fr)", gap: 2 }}>
        <PrototypeCard title={isIncidentScreen ? "Active Incidents" : "Service Health"} value={isIncidentScreen ? "3" : "96%"} tone="success" />
        <PrototypeCard title={isIncidentScreen ? "Highest Severity" : "At Risk Services"} value={isIncidentScreen ? "Warning" : "7"} tone="warning" />
        {!isDetailScreen ? <PrototypeCard title="Owner Coverage" value="84%" tone="info" /> : null}
      </Box>

      <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 3, bgcolor: "background.paper" }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{isIncidentScreen ? "Incident Queue" : "Database Services"}</Typography>
            <Chip label={isIncidentScreen ? "Live" : "Updated 2 min ago"} color={isIncidentScreen ? "warning" : "success"} variant="outlined" />
          </Stack>

          {["Customer Profile DB", "Payments Ledger", "Notifications Store"].map((service, index) => (
            <Box
              key={service}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                alignItems: "center",
                gap: 2,
                py: 1.5,
                borderTop: index === 0 ? 0 : 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="body2">{isIncidentScreen ? `${service} latency incident` : service}</Typography>
              <Typography variant="caption" color="text.secondary">
                {isDetailScreen ? "Owned by Platform Ops" : "Chase Cloud"}
              </Typography>
              <Chip label={index === 1 ? "Warning" : "Normal"} color={index === 1 ? "warning" : "success"} size="small" />
            </Box>
          ))}
        </Stack>
      </Paper>

      {isDetailScreen ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 3, bgcolor: "background.paper" }}>
            <Typography variant="h6" gutterBottom>
              Timeline
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Signal detected, owner notified, runbook attached, and stakeholder update drafted.
            </Typography>
          </Paper>
          <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 3, bgcolor: "background.paper" }}>
            <Typography variant="h6" gutterBottom>
              Next Best Action
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Confirm ownership, review dependency impact, and publish the prepared status update.
            </Typography>
          </Paper>
        </Box>
      ) : null}
    </Stack>
  );
}

function PrototypeCard({ title, value, tone }: { title: string; value: string; tone: "success" | "warning" | "info" }) {
  return (
    <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 3, bgcolor: "background.paper" }}>
      <Typography variant="caption" color="text.secondary">
        {title}
      </Typography>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 1 }}>
        <Typography variant="h4">{value}</Typography>
        <Chip label={tone} color={tone} size="small" />
      </Stack>
    </Paper>
  );
}

function InspectionPanel({ inspectionPoint, onClose }: { inspectionPoint: InspectionPoint | null; onClose: () => void }) {
  const sections = inspectionPoint
    ? [
        ["Problem", inspectionPoint.problem],
        ["Decision", inspectionPoint.decision],
        ["Evidence", inspectionPoint.evidence],
        ["Tradeoff", inspectionPoint.tradeoff],
        ["Outcome", inspectionPoint.outcome],
      ].filter((section): section is [string, string] => Boolean(section[1]))
    : [];

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={Boolean(inspectionPoint)}
      PaperProps={{
        sx: {
          width: rightPanelWidth,
          boxSizing: "border-box",
          p: 3,
          bgcolor: (theme) => theme.caseStudy.inspectionPanel,
          borderLeftColor: "divider",
        },
      }}
    >
      {inspectionPoint ? (
        <Stack spacing={2.5} sx={{ height: "100%" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Design Rationale
              </Typography>
              <Typography variant="h5">{inspectionPoint.title}</Typography>
            </Box>
            <IconButton aria-label="Close inspection panel" onClick={onClose}>
              <Typography variant="body2" aria-hidden="true">
                ×
              </Typography>
            </IconButton>
          </Stack>

          <Chip label={categoryLabels[inspectionPoint.category]} sx={{ alignSelf: "flex-start" }} />

          <Typography variant="body1" color="text.secondary">
            {inspectionPoint.summary}
          </Typography>

          <Divider />

          <Stack spacing={2}>
            {sections.map(([title, content]) => (
              <Box key={title}>
                <Typography variant="subtitle2" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {content}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      ) : null}
    </Drawer>
  );
}