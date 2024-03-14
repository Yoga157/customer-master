import { BaseModel } from 'sjs-base-model';

export default class InsuranceModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<InsuranceModel>) {
    super();

    this.update(data);
  }
}
