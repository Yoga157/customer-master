export default interface IBoqFailedTableRow {
  readonly description: string;
  readonly productNumber: string;
  readonly qty: number;
  readonly brandName: string;
  readonly subBrandName: string;
  readonly warranty: number;
  readonly warrantyDurationType: string;
  readonly messageError: string;
  readonly errorMessage: string[];
}
