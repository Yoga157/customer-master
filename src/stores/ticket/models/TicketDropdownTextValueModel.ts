import { BaseModel } from 'sjs-base-model';

export default class TicketDropdownTextValueModel extends BaseModel {
  
  public readonly textData: string = '';
  public readonly valueData: string = '';

  constructor(data: Partial<TicketDropdownTextValueModel>) {
    super();

    this.update(data);
  }
}
