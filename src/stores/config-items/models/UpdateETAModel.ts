
import { BaseModel } from 'sjs-base-model';

export default class UpdateETAModel extends BaseModel {
  projectId: number = 0;
  funnelGenId: number = 0;
  poNumber: string = '';
  modifyUserID: number = 0;
  expectedArrivalDate: string|Date = '';
  modifyDate: string | Date | any = '';

  productNumber: string = '';

  constructor(data: Partial<UpdateETAModel>) {
    super();
    this.update(data);
  }
}
