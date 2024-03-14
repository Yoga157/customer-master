import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class AWSCredentialPutModel extends BaseModel {
    awsid: string = '';
    accessKey: string = '';
    secretKey: string = '';
    notes: string = '';
    userLoginID: number = 0;
    createdBy: string = '';
    modifiedBy: string = '';
    createdDate?: string = '';
    createDate?: string = '';
    createUserID?: number = 0;
    modifiedDate?: string = '';
    modifyDate?: string = '';
    modifyUserID?: Number = 0;

  constructor(data: Partial<AWSCredentialPutModel>) {
    super();
    this.update(data);
  }

//   public update(data: Partial<AWSCredentialPostModel>): void {
//     const conversionOptions: IConversionOption = {
//         awsid: ConversionTypeEnum.String,
//         accessKey: ConversionTypeEnum.String,
//         secretKey: ConversionTypeEnum.String,
//         notes: ConversionTypeEnum.String,
//         userLoginID: ConversionTypeEnum.Number,
//         createdBy: ConversionTypeEnum.String,
//         modifiedBy: ConversionTypeEnum.String,
//         createUserID: ConversionTypeEnum.Number,
//         modifyUserID: ConversionTypeEnum.Number
//     };

//     super.update(data, conversionOptions);
//   }
}
