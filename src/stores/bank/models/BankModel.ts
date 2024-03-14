import { BaseModel } from 'sjs-base-model';

export default class BankModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<BankModel>) {
    super();

    this.update(data);
  }
}
