import { BaseModel } from 'sjs-base-model';

export default class DropdownTextValueModel extends BaseModel {
  
  public readonly textData: string = '';
  public readonly valueData: string = '';

  constructor(data: Partial<DropdownTextValueModel>) {
    super();

    this.update(data);
  }
}
