import { BaseModel } from 'sjs-base-model';
import SalaryBenefitModel from './SalaryBenefit/SalaryBenefitModel';
import DeductionsModel from './Deductions/DeductionsModel';
import OtherBenefitModel from './OtherBenefit/OtherBenefitModel';

export default class PostInputDataFromLastContract extends BaseModel {
  public userLoginID: number = 0;
  public contractID: number = 0;
  public listSalaryBenefitDash: SalaryBenefitModel[];
  public listDeductionDash: DeductionsModel[];
  public listOtherBenefitDash: OtherBenefitModel[];

  constructor(data: Partial<PostInputDataFromLastContract>) {
    super();
    this.update(data);
  }
}
