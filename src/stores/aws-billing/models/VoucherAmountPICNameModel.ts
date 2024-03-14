import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class VoucherAmountPICNameModel extends BaseModel {
    value: number = 0;

  constructor(data: Partial<VoucherAmountPICNameModel>) {
    super();
    this.update(data);
  }
}
