import { BaseModel } from 'sjs-base-model';

export default class PMOViewEditCustommerPO extends BaseModel {
  projectId: number = 0;
  funnelGenID: number = 0;
  salesName: string = "";
  department: string = "";
  salesAdminName: string = "";
  startWarrantyDate: string = "";
  endWarrantyDate: string = "";

  constructor(data: Partial<PMOViewEditCustommerPO>) {
    super();
    this.update(data);
  }
}
