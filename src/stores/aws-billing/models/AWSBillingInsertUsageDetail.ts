import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class AWSBillingInsertUsageDetail extends BaseModel {
    public usageId: number = 0;
    public billingIdH:number = 0;
    public creditId: number = 0;
    public picName: number = 0;
    public lprNumber: string = '';
    public cbvNumber: string = '';
    public so: number = 0;
    public funnelId: number = 0;
    public usageAmount: number = 0;
    public necessity: string = '';
    public resources: string = '';
    public notes: string = '';
    public createDate: string = '';
    public createUserID: number = 0;
    public modifyDate: string = '';
    public modifyUserID: number = 0;

  // public update(data: Partial<CBVAttachment>): void {
  //   const conversionOptions: IConversionOption = {
  //     domainName: ConversionTypeEnum.String,
  //     file: ConversionTypeEnum.String,
  //   };

  //   super.update(data, conversionOptions);
  // }
}
