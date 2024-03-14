import { BaseModel } from 'sjs-base-model';

export default class ResourceModel extends BaseModel {
  public readonly valueData: string = '';
  public readonly textData: string = '';

  constructor(data: Partial<ResourceModel>) {
    super();

    this.update(data);
  }
}
