import CustomerPICModel from 'stores/customer-pic/models/CustomerPICModel';
import GeneratedFormModel from './GeneratedFormModel';

import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class GeneratedFormEnvelope extends BaseModel {
  public generateForm: GeneratedFormModel = new GeneratedFormModel({});
  public customerPIC: CustomerPICModel = new CustomerPICModel({});

  constructor(data: Partial<GeneratedFormEnvelope>) {
    super();

    this.update(data);
  }
}
