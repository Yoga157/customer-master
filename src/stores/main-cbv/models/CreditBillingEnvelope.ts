import CreditBillingModel from './CreditBillingModel';
import { BaseModel } from 'sjs-base-model';

export default class CreditBillingEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: CreditBillingModel[] = [];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly filter: any = null;
  public readonly search: any = null;

  constructor(data: Partial<CreditBillingEnvelope>) {
    super();
    this.update(data);
  }
}
