import { BaseModel } from 'sjs-base-model';
import GeneralListModel from './GeneralListModel';

export default class GeneralListEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: GeneralListModel[] = [];

  constructor(data: Partial<GeneralListEnvelope>) {
    super();
    this.update(data);
  }
}
