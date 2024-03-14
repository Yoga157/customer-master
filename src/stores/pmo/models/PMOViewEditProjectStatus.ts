import { BaseModel } from 'sjs-base-model';

export default class PMOViewEditProjectStatus extends BaseModel {
  projectId: number = 0;
  projectStatus: string = "";
  projectStatusId: number = 0;
  warrantyStatus: string = "";
  funnelGenId: number = 0;
  soDate: string | Date ;
  oiDate: string | Date ;
  pmoName: string = "";
  pmoId: number = 0;
  isApprove: boolean = null;

  constructor(data: Partial<PMOViewEditProjectStatus>) {
    super();
    this.update(data);
  }
}
