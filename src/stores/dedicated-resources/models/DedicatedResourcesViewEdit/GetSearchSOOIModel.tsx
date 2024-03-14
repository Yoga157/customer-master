import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class GetSearchSOOIModel  extends BaseModel {
    contractID: number = 0;
    so: string = '';
    oi: string = '';
    referToSO: string = '';
    customerName: string = '';
    projectName: string = '';
    projectAlias: string = '';
    projectCategory: string = '';
    projectComplexity: string = '';
    estProjectDuration: string = '';
    buCost: string = '';
    buCostID: string = '';
   
  constructor(data: Partial<GetSearchSOOIModel>) {
    super();
    this.update(data);
  }
}
