import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class CBVAttachmentModel extends BaseModel {
    attachmentId: number = 0;
    creditId: number = 0;
    documentTypeID: number = 0;
    documentType: string = ''
    fileName: string = '';
    documentName: string = '';
    notes: string = '';
    versionNumber: number = 0;
    ActiveFlag: string = '';
    fileExtension: string = '';
    fileSize: number = 0;
    fileDownload: string = '';
    createdBy: string = '';
    createdDate: string = '';
    modifiedBy: string = '';
    modifiedDate: number = 0;

  constructor(data: Partial<CBVAttachmentModel>) {
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
