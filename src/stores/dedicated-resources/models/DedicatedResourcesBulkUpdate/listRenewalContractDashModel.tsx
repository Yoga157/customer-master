import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';
import listSalaryBenefitDashModel from './listSalaryBenefitDashModel';
import listDeductionDashModel from './listDeductionDashModel';
import listOtherBenefitDashModel from './listOtherBenefitDashModel';
import renewalContractDash from './renewalContractDashModel';

export default class listRenewalContractDashModel extends BaseModel {
    renewalContractDash: renewalContractDash;
    listSalaryBenefitDash: listSalaryBenefitDashModel[] = null;
    listDeductionDash: listDeductionDashModel[] = null;
    listOtherBenefitDash: listOtherBenefitDashModel[] = null;

    constructor(data: Partial<listRenewalContractDashModel>) {
        super();
        this.update(data);
      }
}

