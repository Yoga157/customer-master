import { BaseModel } from 'sjs-base-model';

export default class PMOSTypeSelect extends BaseModel {
  textData: string = '';
  valueData: string = '';

  constructor(data: Partial<PMOSTypeSelect>) {
    super();
    this.update(data);
  }
}
