import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class DropDownModel extends BaseModel {
  text: string = '';
  value: number = 0;

  constructor(data: Partial<DropDownModel>) {
    super();
    this.update(data);
  }
}
