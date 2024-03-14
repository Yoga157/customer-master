export default interface IActivityReportGroupingTableRow {
    readonly activityReportGroupGenId: number;
    readonly uid: string;
    readonly activityReportGenIdRelated: string;
    readonly activityReportTotalRelated: number;
    readonly customerSignStatus: boolean;
    readonly so: string;
    readonly customerName: string;
    readonly address: string;
    readonly contactName: string;
    readonly createDate: string;
    readonly createUserID: number;
    readonly createUserName: string;
  }