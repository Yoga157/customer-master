import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class CBVEntitlementModel extends BaseModel {
    entId: number = 0;
    billingPeriod: string = '';
    creditEntitlement: number = 0;
    creditUsage: number = 0;
    creditRemaining: number = 0;
    creditRemainingLastPeriod: number = 0;
    syncDate: string = '';

  constructor(data: Partial<CBVEntitlementModel>) {
    super();
    this.update(data);
  }

//   public update(data: Partial<CBVAttachmentModel>): void {
//     const conversionOptions: IConversionOption = {
//         creditDetailId: ConversionTypeEnum.Number,
//         creditId: ConversionTypeEnum.Number,
//         salesId: ConversionTypeEnum.Number,
//         voucherAmountD: ConversionTypeEnum.Number,
//         usedAmountD: ConversionTypeEnum.Number,
//         remainingAmountD: ConversionTypeEnum.Number,
//         notes: ConversionTypeEnum.String,
//         customerName: ConversionTypeEnum.String,
//         projectName: ConversionTypeEnum.String,
//         createUserID: ConversionTypeEnum.Number,
//         modifyUserID: ConversionTypeEnum.Number,
//     };

//     super.update(data, conversionOptions);
//   }
}
