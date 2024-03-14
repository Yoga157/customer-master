import { BaseModel } from 'sjs-base-model';

export default class IndustryClassModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<IndustryClassModel>) {
    super();

    this.update(data);
  }
}
