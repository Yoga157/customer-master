import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class SubmitApprovalDocumentModel {
    contractID: number = 0;
    userID: number = 0;
    remarks: string = '';
    process: string = '';
    userLoginID: number = 0;
    tanggal: Date = undefined;
}
