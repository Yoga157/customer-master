import { BaseModel } from 'sjs-base-model';

export default class ConfigTypeModel extends BaseModel {
  textData: string = '';
  valueData: string = '';

  constructor(data: Partial<ConfigTypeModel>) {
    super();
    this.update(data);
  }
}
