export default interface IFunnelWarrantySLACustomerTableRow {
  readonly warrantySLADetailID: number;
  readonly warrantySLAGenID: number;
  readonly productNumber: string;
  readonly serviceLocation: string;
  readonly coverageHour: string;
  readonly responseTime: string;
  readonly resolutionTime: string;
  readonly slaType: string;
}
