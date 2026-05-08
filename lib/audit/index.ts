/**
 * Public API for the SpendScope audit module.
 * Import from here — not from internal files directly.
 */

export { runAudit } from "./engine";
export type { AuditResult, AuditRecommendation, ToolBreakdown, ConfidenceLevel, RecommendationType, RuleContext } from "./types";
export { calculateOptimizationScore, generateSummary } from "./scoring";

// Individual rules exported for unit testing
export {
  checkTierRightSize,
  checkDuplicateCodingAssistants,
  checkDuplicateChatAssistants,
  checkApiVsSubscriptionOverlap,
  checkSeatOverprovisioning,
  checkClaudeMaxNecessity,
  checkHighApiSpend,
  checkCopilotEnterpriseFit,
  ALL_RULES,
} from "./rules";
