import { BaseModel } from 'sjs-base-model';

export default class DropdownSalesAdminModel extends BaseModel {
  public readonly valueData: string = '';
  public readonly textData: string = '';

  constructor(data: Partial<DropdownSalesAdminModel>) {
    super();

    this.update(data);
  }
}
