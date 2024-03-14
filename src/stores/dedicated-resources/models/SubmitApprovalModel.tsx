import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class SubmitApprovalModel {
    contractID: number = 0;
    userLoginID: number = 0;
    notes: string = '';
    process: string = '';
}
