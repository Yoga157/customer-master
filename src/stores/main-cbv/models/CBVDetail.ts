import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';
import CBVAssignModel from './CBVAssignModel';

export default class CBVDetail extends BaseModel {
    picName: string = '';
    isShow: number = 0;
    totalReceivedAmount: number = 0;
    totalUsedAmount: number = 0;
    totalRemainingAmount: number = 0;
    creditDetail: CBVAssignModel[];

    constructor(data: Partial<CBVDetail[]>) {
        super();
        this.update(data);
      }
}