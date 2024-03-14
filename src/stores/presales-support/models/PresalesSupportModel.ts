import { BaseModel } from 'sjs-base-model';

export default class PresalesSupportModel extends BaseModel {
  public readonly valueData: string = '';
  public readonly textData: string = '';

  constructor(data: Partial<PresalesSupportModel>) {
    super();

    this.update(data);
  }
}
