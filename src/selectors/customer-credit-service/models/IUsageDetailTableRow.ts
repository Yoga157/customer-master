export default interface IUsageDetailTableRow {
  readonly customerCreditServiceID: number;
  readonly presalesID: number;
  readonly ticketNumber: string;
  readonly presalesName: string;
  readonly customer: string;
  readonly dept: string;
  readonly category: string;
  readonly description: string;
  readonly ticketDate: string;
  readonly complexity: string;
  readonly resource: string;
  readonly status: string;
  readonly notes: string;
  readonly price: number;
  readonly createdDate: string;
  readonly createdBy: string;
  readonly modifiedDate: string;
  readonly modifiedBy: string;
  readonly ticketTitle: string;
}
