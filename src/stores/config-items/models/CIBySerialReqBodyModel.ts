import { BaseModel } from 'sjs-base-model';

export default class CIBySerialReqBodyModel extends BaseModel {  
  public  serialNumberList: string = '';
  public  projectId: number  = 0;
  public  funnelGenId: number  = 0;
  public  page: number  = 0;
  public  pageSize: number  = 0;

  constructor(data: Partial<CIBySerialReqBodyModel>) {
    super();

    this.update(data);
  }
}
