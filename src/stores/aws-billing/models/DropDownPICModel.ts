import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class DropDownPICModel extends BaseModel {
  text: string = '';
  value: number = 0;

  constructor(data: Partial<DropDownPICModel>) {
    super();
    this.update(data);
  }
}
