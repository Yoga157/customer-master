import { BaseModel } from 'sjs-base-model';



export default class TicketHeaderModel extends BaseModel {   
  public projectName : string = '';
  public customerName : string = '';
  public pmoName : string = '';
  public projectId : number = 0;
  public funnelGenId : number = 0;

  constructor(data: Partial<TicketHeaderModel>) {
    super();

    this.update(data);
  }
}
