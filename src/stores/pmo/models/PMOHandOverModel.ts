import { BaseModel } from 'sjs-base-model';

export default class PMOHandOverModel extends BaseModel {
  projectId: number = 0;
  funnelGenId: number = 0;
  projectStatus: string = "";
  startContract: string = "";
  endContract: string = "";
  startWarranty: string = null;
  endWarranty: string = null;
  modifyDate: string = "";
  modifyUserID: number = 0;

  constructor(data: Partial<PMOHandOverModel>) {
    super();
    this.update(data);
  }
}
