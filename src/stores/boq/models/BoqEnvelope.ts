import { BaseModel } from 'sjs-base-model';
import BoqModel from './BoqModel';

export default class BoqEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: BoqModel[] = [];

  constructor(data: Partial<BoqEnvelope>) {
    super();
    this.update(data);
  }
}
