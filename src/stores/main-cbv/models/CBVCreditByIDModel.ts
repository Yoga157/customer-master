import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class CBVCreditByIDModel extends BaseModel {
    creditId: number = 0;
    voucherNo: string = '';
    sourceCustomerId: number = 0;
    sourceCustomerIdStr: string = '';
    voucherAmountH: number = 0;
    usedAmountH: number = 0;
    remainingAmountH: number = 0;
    accountId: string = '';
    creditType: number = 0;
    creditTypeStr: string = '';
    notes: string = '';
    createDate: string = '';
    createUserID: number = 0;
    modifyDate: string = '';
    modifyUserID: number = 0;

  constructor(data: Partial<CBVCreditByIDModel>) {
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
