import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class CBVAssign extends BaseModel {
    public creditDetailId: number = 0;
    public creditId: number = 0;
    public salesId: number = 0;
    public voucherAmountD: number = 0;
    public usedAmountD: number = 0;
    public remainingAmountD: number = 0;
    public notes: string = '';
    public customerName: string = '';
    public projectName: string = '';
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
