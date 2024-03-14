import { BaseModel } from 'sjs-base-model';

export default class TicketEntrykeyModel extends BaseModel {
  
  public readonly udcid: number = 0;
  public readonly entryKey: string = '';
  public readonly text1: string = '';
  public readonly text2: string = '';

  constructor(data: Partial<TicketEntrykeyModel>) {
    super();

    this.update(data);
  }
}
