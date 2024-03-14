export default interface IGetActivityReportTableRow {
    readonly SO : number;
    readonly CustomerName : string;
    readonly ProjectName: string;
    readonly ActivityWithInProgressStatus : number;
    readonly ActivityWithPendingStatus : number;
    readonly ActivityWithCloseStatus  : number;
    readonly TotalActivities  : number;
  }
  