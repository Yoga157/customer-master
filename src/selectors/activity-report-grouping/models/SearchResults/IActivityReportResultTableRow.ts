export default interface IActivityReportResultTableRow {
    readonly activityReportGenID: number;
    readonly ticketId: string;
    readonly so: number;
    readonly funnelGenId: number;
    readonly customerName: string;
    readonly createDate: string;
    readonly contactName: string;
    readonly actionTaken: string;
    readonly engineerList: string;
    readonly startDate: string;
    readonly endDate: string;
    readonly customerSignStatus: boolean;
    readonly totalCustomerExperience: string;
    readonly isDraft: boolean;
    readonly isDelete: boolean;
  }