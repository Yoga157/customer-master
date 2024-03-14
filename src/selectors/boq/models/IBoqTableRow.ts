export default interface IBoqTableRow {
  readonly boqGenID: number;
  readonly funnelGenID: number;
  readonly description: string;
  readonly productNumber: string;
  readonly serialNumber: string;
  readonly qty: number;
  readonly brandID: number;
  readonly brandName: string;
  readonly subBrandID: number;
  readonly subBrandName: string;
  readonly warranty: number;
  readonly warrantyDurationType: string;
  readonly coverageHour: string;
  readonly responseTimeType: string;
  readonly responseTimeValue: number;
  readonly resolutionTimeType: string;
  readonly resolutionTimeValue: number;
  readonly createUserID: number;
  readonly modifyUserID?: number;
}
