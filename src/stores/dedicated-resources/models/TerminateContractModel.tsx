import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class TerminateContractModel {
    contractID: number = 0;
    flagPaklaring: boolean = true;
    reasonPaklaring: string = '';
    remark: string = '';
    userLoginID: number = 0;
}
