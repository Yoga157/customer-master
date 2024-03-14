import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class CBVAttachment extends BaseModel {
    public domainName:string = '';
    public file:any = '';

  // public update(data: Partial<CBVAttachment>): void {
  //   const conversionOptions: IConversionOption = {
  //     domainName: ConversionTypeEnum.String,
  //     file: ConversionTypeEnum.String,
  //   };

  //   super.update(data, conversionOptions);
  // }
}
