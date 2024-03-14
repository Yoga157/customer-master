import { BaseModel } from 'sjs-base-model';
import CreditSourceModel from './CreditSourceModel';

export default class CreditSourceEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: CreditSourceModel[] = [];

  constructor(data: Partial<CreditSourceEnvelope>) {
    super();
    this.update(data);
  }
}
