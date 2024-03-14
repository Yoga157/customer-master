import { BaseModel } from 'sjs-base-model';

export default class BondIssuerModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<BondIssuerModel>) {
    super();

    this.update(data);
  }
}
