import { BaseModel } from 'sjs-base-model';

export default class LetterTypeModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<LetterTypeModel>) {
    super();

    this.update(data);
  }
}
