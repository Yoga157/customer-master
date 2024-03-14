import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class BankGaransiEditViewAdminModel extends BaseModel {
  public bankGuaranteeGenID: number = 0;
  public suratPerjanjianNo: string = '';
  public increamentNo: number = 0;
  public claimPeriod: number = 0;
  public bankGuaranteeNo: string = '';
  public bankGuaranteeID: string = '';
  public companyApplicant: string = '';
  public bankCG: string = '';
  public modifiedDate: string = '';
  public modifyByUser: string = '';
  public submitDate?: Date = undefined;
  public publishDate?: Date = undefined;
  public adminEffectiveDate?: Date = undefined;
  public adminExpireDate?: Date = undefined;
  public createDate?: Date = undefined;
  public createUserID: number = 0;
  public modifyDate?: Date = undefined;
  public modifyUserID: number = 0;

  constructor(data: Partial<BankGaransiEditViewAdminModel>) {
    super();
    this.update(data);
  }
}
