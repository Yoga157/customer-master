import { BaseModel } from 'sjs-base-model';

export default class CompetitorProductModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<CompetitorProductModel>) {
    super();

    this.update(data);
  }
}
