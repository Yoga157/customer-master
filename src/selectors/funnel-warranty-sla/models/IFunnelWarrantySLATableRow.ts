export default interface IFunnelWarrantySLATableRow {
  readonly warrantySLAGenID: number;
  readonly warrantySupportID: number;
  readonly problemClassID: number;
  readonly brandID: number;
  readonly subBrandID: number;
  readonly startWarrantyCust?: Date;
  readonly customerWarranty: string;
  readonly startWarrantyVendor?: Date;
  readonly vendorWarranty: string;
  readonly createUserID: number;
}
