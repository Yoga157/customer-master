export default interface IBankGaransiAdminEditRow {
  readonly bankGuaranteeGenID: number;
  readonly bankGuaranteeNo: string;
  readonly bankGuaranteeID: string;
  readonly submitDate?: Date;
  readonly increamentNo: number;
  readonly suratPerjanjianNo: string;
  readonly bankCG: string;
  readonly companyApplicant: string;
  readonly modifiedDate: string;
  readonly modifyByUser: string;
  readonly claimPeriod: number;
  readonly createUserID: number;
  readonly modifyUserID: number;
  //readonly adminEffectiveDate: Date | undefined;
  readonly adminEffectiveDate?: Date;
  readonly adminExpireDate?: Date;
  readonly modifyDate?: Date;
  readonly createDate?: Date;
  readonly publishDate?: Date;
}
