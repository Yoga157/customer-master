import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class CBVCreditBillingModel extends BaseModel {
    creditId: number = 0;
    voucherNo: string = '';
    accountId: string = '';
    creditType: number = 0;
    sourceCustomerId: number = 0;
    voucherAmountH: number = 0;
    usedAmountH: number = 0;
    notes: string = '';
    createDate?: string = '';
    createUserID: number = 0;
    modifyDate?: string = '';
    modifyUserID: number = 0;

  constructor(data: Partial<CBVCreditBillingModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CBVCreditBillingModel>): void {
    const conversionOptions: IConversionOption = {
        creditId: ConversionTypeEnum.Number,
        voucherNo: ConversionTypeEnum.String,
        sourceCustomerId: ConversionTypeEnum.Number,
        voucherAmountH: ConversionTypeEnum.Number,
        usedAmountH: ConversionTypeEnum.Number,
        notes: ConversionTypeEnum.String,
        createUserID: ConversionTypeEnum.Number,
        modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
