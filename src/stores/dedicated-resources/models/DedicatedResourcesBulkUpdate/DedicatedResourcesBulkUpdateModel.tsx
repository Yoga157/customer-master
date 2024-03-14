import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';
import listRenewalContractDashModel from './listRenewalContractDashModel';

// export class Data extends BaseModel  {
//     listRenewalContractDash: listRenewalContractDashModel[];

//     constructor(data: Partial<Data>) {
//         super();
//         this.update(data);
//       }
// }

export default class DedicatedResourcesBulkUpdateModel extends BaseModel  {
    userLoginID: number = 0;
    so: string;
    oi: string;
    referToSO: string = '';
    customerName: string = '';
    projectName: string = '';
    projectAlias: string = '';
    projectCategory: string = '';
    projectComplexity: string = '';
    estProjectDuration: string = '';
    estProjectDurationType: string = '';
    buCost: string = '';
    listRenewalContractDash: any = {};

    constructor(data: Partial<DedicatedResourcesBulkUpdateModel>) {
        super();
        this.update(data);
      }
}
