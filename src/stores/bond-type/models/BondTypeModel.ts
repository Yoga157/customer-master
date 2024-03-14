import { BaseModel } from 'sjs-base-model';

export default class BondTypeModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<BondTypeModel>) {
    super();

    this.update(data);
  }
}
