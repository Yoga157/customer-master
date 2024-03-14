import { BaseModel } from 'sjs-base-model';

export default class CompetitorModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<CompetitorModel>) {
    super();

    this.update(data);
  }
}
