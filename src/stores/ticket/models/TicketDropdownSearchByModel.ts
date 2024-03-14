import { BaseModel } from 'sjs-base-model';

export default class TicketDropdownSearchByModel extends BaseModel {
  
  public readonly funnelGenId: number = 0;
  public readonly so: string = '';
  public readonly textData: string = '';
  public readonly valueData: string = '';

  constructor(data: Partial<TicketDropdownSearchByModel>) {
    super();

    this.update(data);
  }
}
