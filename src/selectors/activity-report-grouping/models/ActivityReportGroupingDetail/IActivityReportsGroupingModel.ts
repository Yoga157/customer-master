export default interface IActivityReportsGroupingModel {
    readonly activityReportGenID: number; 
    readonly ticketId: string;
    readonly so: number; 
    readonly funnelGenId: string;
    readonly customerName: string;
    readonly engineerList: string;
    readonly contactName: string;
    readonly actionTaken: string;
    readonly customerSignStatus: boolean;
    readonly createDate: string;
    readonly activityCategory: string;
    readonly totalCustomerExperience: string;
  }