import { BaseModel } from 'sjs-base-model';
import SalaryBenefitModel from './SalaryBenefitModel';

export default class SalaryBenefitEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly totalGrossCurrAmount: number = 0;
  public readonly totalGrossNewAmount: number = 0;
  public readonly rows: SalaryBenefitModel[];

  constructor(data: Partial<SalaryBenefitEnvelope>) {
    super();
    this.update(data);
  }
}
