import { BaseModel } from "sjs-base-model"

export default class TicketProjSummaryModel extends BaseModel {    
  public projectId : number = 0;
  public funnelGenId : number = 0;
  public projectAlias : string = '';
  public startProject : string = '';
  public endProject : string = '';
  public startWarranty : string = '';
  public endWarranty : string = '';
  public so : string = '';
  public projectName : string = '';
  public customerName : string = '';
  public customerAddress : string = '';
  public customerPicName : string = '';
  public pmoName : string = '';
  public soidc : string = '';
  public customerPhone : number = 0;




  constructor(data: Partial<TicketProjSummaryModel>) {
    super();

    this.update(data);
  }
}