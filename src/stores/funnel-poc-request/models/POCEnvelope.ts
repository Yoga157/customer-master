import { BaseModel } from 'sjs-base-model';
import POCRequestModel from './POCRequestModel';

export default class POCEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: POCRequestModel[] = [];

  constructor(data: Partial<POCEnvelope>) {
    super();
    this.update(data);
  }
}
