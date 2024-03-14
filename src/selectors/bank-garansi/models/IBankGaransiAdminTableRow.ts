export default interface IBankGaransiAdminTableRow {
  readonly bankGuaranteeGenID: number;
  readonly funnelGenID: number;
  readonly createUserID: number;
  readonly nilai: number;
  readonly customerName: string;
  readonly companyApplicant: string;
  readonly so: string;
  readonly bu: string;
  readonly status: string;
  readonly process: string;
  readonly bondIssuer: string;
  readonly linkTo: string;
  readonly bondType: string;
  readonly bondIssuerType: string;
  readonly createBy: string;
  readonly letterType: string;
  readonly letterNo: string;
  readonly bankGuaranteeNo: string;
  readonly bankGuaranteeID: string;
  readonly createDate?: Date;
  readonly expireDate?: Date;
  readonly stepOwner: string;
  readonly stepName: string;
  readonly statusProject: string;
  readonly adminEffectiveDate: Date | null;
  readonly adminExpireDate: Date | null;
}
