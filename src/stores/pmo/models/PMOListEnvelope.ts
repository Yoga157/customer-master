import { BaseModel } from 'sjs-base-model';
import PMOListModel from './PMOListModel';

export default class PMOListEnvelope extends BaseModel {  
  public readonly totalRows: number  = 0;
  public readonly rows: PMOListModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: string = '';
  public readonly filter: string = '';

  constructor(data: Partial<PMOListEnvelope>) {
    super();

    this.update(data);
  }
}
