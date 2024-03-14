import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class listSalaryBenefitDashModel {
    salaryID: number = 0;
    contractID: number = 0;
    salaryType: string = '';
    salaryDesc: string = '';
    currentAmount:  number = 0;
    newAmount: number = 0;
    notes: string = '';
    userLoginID: number = 0;
    isSave: number = 0;
}

