import { BaseModel } from 'sjs-base-model';


export default class ConfigItemPutETAByPMOModel extends BaseModel {  
  public readonly expectedArrivalDate: string = '';
  public readonly isUpdateAllExpectedArrivalDate: boolean = false;
  public readonly startWarranty: string = '';
  public readonly endWarranty: string = '';
  public readonly isUpdateAllWarranty: boolean = false;
  public readonly projectId: number  = 0;
  public readonly funnelGenId: number  = 0;
  public readonly poNumber: string = '';
  public readonly productNumber: string = '';
  public readonly modifyDate: string = '';
  public readonly modifyUserID: number  = 0;

  constructor(data: Partial<ConfigItemPutETAByPMOModel>) {
    super();

    this.update(data);
  }
}
