import { BaseModel } from 'sjs-base-model';

export default class DropdownGunadamModel extends BaseModel {
  
  public readonly textData: string = '';
  public readonly valueData: string = '';

  constructor(data: Partial<DropdownGunadamModel>) {
    super();

    this.update(data);
  }
}
