import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class ChangeAccountId extends BaseModel {
    public accountId:string = '';
    public picName:number = 0;
    public userLoginID: number = 0;
    public customerId: number = 0;

  // public update(data: Partial<CBVAttachment>): void {
  //   const conversionOptions: IConversionOption = {
  //     domainName: ConversionTypeEnum.String,
  //     file: ConversionTypeEnum.String,
  //   };

  //   super.update(data, conversionOptions);
  // }
}
