import { BaseModel } from 'sjs-base-model';

export default class PMOGetActualDateModel extends BaseModel {  
  public readonly actualStartDate: string | Date = null;
  public readonly actualEndDate: string | Date = null;

  constructor(data: Partial<PMOGetActualDateModel>) {
    super();

    this.update(data);
  }
}