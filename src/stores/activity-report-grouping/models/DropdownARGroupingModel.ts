import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class DropdownARGroupingModel extends BaseModel {
  textData: string = '';
  valueData: string = '';

  constructor(data: Partial<DropdownARGroupingModel>) {
    super();
    this.update(data);
  }
}
