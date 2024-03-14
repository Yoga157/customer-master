import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class ChangeCreditBilling extends BaseModel {
    public creditId:number = 0;
    public voucherNo:string = '';
    public sourceCustomerId: number = 0;
    public voucherAmountH: number = 0;
    public usedAmountH: number = 0;
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
