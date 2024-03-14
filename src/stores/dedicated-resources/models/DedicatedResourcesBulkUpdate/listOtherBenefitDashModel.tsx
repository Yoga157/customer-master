import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class listOtherBenefitDashModel {
    benefitID: number = 0;
    contractID: number = 0;
    benefitType: string = '';
    benefitDesc: string = '';
    userLoginID: number = 0;
    isSave: number = 0;
}

