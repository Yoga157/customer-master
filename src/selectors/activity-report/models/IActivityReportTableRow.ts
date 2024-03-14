export default interface IActivityReportTableRow {
  readonly funnelGenId: number;
  readonly activityReportGenID: number;
  readonly ticketId: string;
  readonly so: number;
  readonly customerName: string;
  readonly contactName: string;
  readonly address: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly engineerList: string;
  readonly status: string;
  readonly reviewStatus: boolean;
  readonly customerSignStatus: boolean;
  readonly department: string;
  readonly createDate?: Date | null | undefined;
  readonly createUserID: number;  
  readonly modifyDate?: Date | null | undefined;
  readonly modifyUserID: number;
  readonly isDraft: boolean;
}