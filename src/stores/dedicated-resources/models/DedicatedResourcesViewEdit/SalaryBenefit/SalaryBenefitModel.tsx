import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class SalaryBenefitModel extends BaseModel {
  salaryID?: number = 0;
  contractID: number = 0;
  salaryType: string = '';
  salaryTypeStr: string = '';
  salaryDesc: string = '';
  salaryDescStr: string = '';
  currentAmount: number = 0;
  newAmount: number = 0;
  increase: number = 0;
  remark:  string = '';
  userLoginID: number = 0;
  isSave: number = 0;
  percentage: number = 0;
  //BulkUpdate
  BulkSalaryID: number = 0;

  constructor(data: Partial<SalaryBenefitModel>) {
    super();
    this.update(data);
  }
}
