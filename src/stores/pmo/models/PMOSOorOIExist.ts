import { BaseModel } from 'sjs-base-model';

export default class PMOSOorOIExist extends BaseModel {
  textData: string = '';
  valueData: string = '';

  constructor(data: Partial<PMOSOorOIExist>) {
    super();
    this.update(data);
  }
}
