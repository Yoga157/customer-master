import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';


export default class ReSubmitModel extends BaseModel  {
    userLoginID: number = 0;
    contractID: number = 0;
    listRenewalContractDash: any = {};

    constructor(data: Partial<ReSubmitModel>) {
        super();
        this.update(data);
      }
}
