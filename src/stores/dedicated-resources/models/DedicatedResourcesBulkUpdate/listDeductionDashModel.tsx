import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class listDeductionDashModel {
    deductID: number = 0;
    contractID: number = 0;
    deductType: string = '';
    deductDesc: string = '';
    amount:  number = 0;
    percentage: number = 0;
    remark: string = '';
    userLoginID: number = 0;
    isSave: number = 0;
}

