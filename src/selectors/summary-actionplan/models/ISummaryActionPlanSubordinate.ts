export default interface ISummaryActionPlanSubordinate {
  readonly empName: string;
  readonly quotaGPM: number;
  readonly performanceGPM: number;
  readonly gapGPM: number;
  readonly lastActionPlan: string;
}
