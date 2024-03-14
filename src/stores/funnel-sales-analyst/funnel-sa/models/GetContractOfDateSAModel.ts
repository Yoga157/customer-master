import { BaseModel } from 'sjs-base-model';

export default class GetContractOfDateSAModel extends BaseModel {
  public readonly contract: number = 0;
  public readonly invoice: number = 0;

  constructor(data: Partial<GetContractOfDateSAModel>) {
    super();
    this.update(data);
  }
}
