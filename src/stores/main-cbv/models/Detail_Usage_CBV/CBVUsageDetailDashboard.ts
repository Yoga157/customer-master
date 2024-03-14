import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class CBVUsageDetailDashboard extends BaseModel {
  public usageId : number = 0;
  public billingIdH : number = 0;
  public creditDetailId : number = 0;
  public funnelId : number = 0;
  public period : string = '';
  public accountId : number = 0;
  public amount : number = 0;
  public necessity : string = '';
  public resources : string = '';
  public customerName : string = '';
  public projectName : string = '';
  public notes : string = '';
  public status : string = '';
  public createdBy : string = '';
  public createdDate : string = '';
  public modifiedBy : string = '';
  public modifiedDate  : string = '';

  constructor(data: Partial<CBVUsageDetailDashboard>) {
    super();
    this.update(data);
  }
//   public update(data: Partial<CreditBillingModel>): void {
//     const conversionOptions: IConversionOption = {
//       creditId: ConversionTypeEnum.Number,
//       voucherNo: ConversionTypeEnum.String,
//       voucherAmountH: ConversionTypeEnum.Number,
//       usedAmountH: ConversionTypeEnum.Number,
//       remainingAmountH: ConversionTypeEnum.Number,
//       sourceCustomerID: ConversionTypeEnum.Number,
//       sourceCustomerIDStr: ConversionTypeEnum.String,
//       notes: ConversionTypeEnum.String,
//       createdBy: ConversionTypeEnum.String,
//       createdDate: ConversionTypeEnum.String,
//       modifiedBy: ConversionTypeEnum.String,
//       modifiedDate: ConversionTypeEnum.String,
//       createDate: ConversionTypeEnum.String,
//       createUserID: ConversionTypeEnum.Number,
//       modifyDate: ConversionTypeEnum.String,
//       modifyUserID: ConversionTypeEnum.Number,
//     };

//     super.update(data, conversionOptions);
//   }
}
