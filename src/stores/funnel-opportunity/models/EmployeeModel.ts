import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class CustomerModel extends BaseModel {
  textData: string = '';
  valueData: number = 0;

  constructor(data: Partial<CustomerModel>) {
    super();

    this.update(data);
  }
}
