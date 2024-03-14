import { BaseModel } from 'sjs-base-model';

interface Dropdown {
  textData: string;
  valueData: string;
}

export default class ListDetailsCreditService extends BaseModel {
  public salesName: string = '';
  public creditAmount: number = 0;
  public creditUsed: number = 0;
  public creditRemaining: number = 0;
  public services: Dropdown[] = [];

  constructor(data: Partial<ListDetailsCreditService>) {
    super();
    this.update(data);
  }
}
