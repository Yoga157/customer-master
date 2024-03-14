import { BaseModel } from 'sjs-base-model';
import OtherBenefitModel from './OtherBenefitModel';

export default class OtherBenefitEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: OtherBenefitModel[];

  constructor(data: Partial<OtherBenefitEnvelope>) {
    super();
    this.update(data);
  }
}
