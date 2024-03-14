import { BaseModel } from 'sjs-base-model';

export default class LanguageModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<LanguageModel>) {
    super();

    this.update(data);
  }
}
