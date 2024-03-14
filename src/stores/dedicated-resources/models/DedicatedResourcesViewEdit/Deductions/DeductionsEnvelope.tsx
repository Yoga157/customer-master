import { BaseModel } from 'sjs-base-model';
import DeductionsModel from './DeductionsModel';

export default class DeductionsEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly totalDeductions: number = 0;
  public readonly rows: DeductionsModel[];

  constructor(data: Partial<DeductionsEnvelope>) {
    super();
    this.update(data);
  }
}
