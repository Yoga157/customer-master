import AWSBillingModel from './AWSBillingModel';
import { BaseModel } from 'sjs-base-model';

export default class AWSBillingEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: AWSBillingModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly filter: any = null;
  public readonly search: any = null;

  constructor(data: Partial<AWSBillingEnvelope>) {
    super();
    this.update(data);
  }
}
