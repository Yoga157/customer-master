import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class CBVAssignDetailMapping extends BaseModel {
    creditDetailId: number = 0;
    creditId: number = 0;
    salesId: number = 0;
    salesName: string = '';
    voucherAmountD: number = 0;
    usedAmountD: number = 0;
    remainingAmountD: number = 0;
    notes: string = '';
    customerName: string = '';
    projectName: string = '';
    createdBy: string = '';
    createdDate: string = '';
    modifiedBy: string = '';
    modifiedDate: string = '';
    isDelete: number = 0;

  constructor(data: Partial<CBVAssignDetailMapping>) {
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
