import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class CreditBillingModel extends BaseModel {
  public creditId: number = 0;
  public voucherNo: string = '';
  public accountID: string = '';
  public voucherAmountH: number = 0;
  public usedAmountH: number = 0;
  public remainingAmountH: number = 0;
  public sourceCustomerID: number = 0;
  public sourceCustomerIDStr: string = '';
  public picName: string = '';
  public notes: string = '';
  public createdBy: string = '';
  public createdDate: string = '';
  public modifiedBy: string = '';
  public modifiedDate: string = '';
  public createDate: string = '';
  public createUserID: number = 0;
  public modifyDate: string = '';
  public modifyUserID: number = 0;

  constructor(data: Partial<CreditBillingModel>) {
    super();
    this.update(data);
  }
  public update(data: Partial<CreditBillingModel>): void {
    const conversionOptions: IConversionOption = {
      creditId: ConversionTypeEnum.Number,
      voucherNo: ConversionTypeEnum.String,
      voucherAmountH: ConversionTypeEnum.Number,
      usedAmountH: ConversionTypeEnum.Number,
      remainingAmountH: ConversionTypeEnum.Number,
      sourceCustomerID: ConversionTypeEnum.Number,
      sourceCustomerIDStr: ConversionTypeEnum.String,
      notes: ConversionTypeEnum.String,
      createdBy: ConversionTypeEnum.String,
      createdDate: ConversionTypeEnum.String,
      modifiedBy: ConversionTypeEnum.String,
      modifiedDate: ConversionTypeEnum.String,
      createDate: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      modifyDate: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
