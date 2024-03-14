import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class CBVAttachmentUploadModel extends BaseModel {
    AttachmentId: number = 0;
    CreditId: number = 0;
    DocumentTypeID: number = 0;
    FileName: string = ''
    DocumentName: string = '';
    Notes: string = '';
    VersionNumber: number = 0;
    ActiveFlag: number = 0;
    FileExtension: string = '';
    FileSize: number = 0;
    FileDownload: string = '';
    CreateDate: string = '';
    CreateUserID: number = 0;
    ModifyDate: string = '';
    ModifyUserID: number = 0;

  constructor(data: Partial<CBVAttachmentUploadModel>) {
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
