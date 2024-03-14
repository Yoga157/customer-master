import { BaseModel } from 'sjs-base-model';
import BankGaransiAdminModel from './BankGaransiAdminModel';

export default class BankGaransiDashboardEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: BankGaransiAdminModel[] = [];
  public readonly filter: any = null;
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: any = null;

  constructor(data: Partial<BankGaransiDashboardEnvelope>) {
    super();
    this.update(data);
  }
}
