import { BaseModel } from 'sjs-base-model';
import OtherBenefitLastContract from './OtherBenefitLastContract';

export default class OtherBenefitLastContractEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly rows: OtherBenefitLastContract[];

  constructor(data: Partial<OtherBenefitLastContractEnvelope>) {
    super();
    this.update(data);
  }
}
