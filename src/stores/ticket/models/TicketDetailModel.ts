import { BaseModel } from 'sjs-base-model';



export default class TicketDetailModel extends BaseModel { 
  public ticketId : number = 0;
  public ticketUID : string = '';
  public ticketName : string = '';
  public description : string = '';
  public status : string = '';
  public primaryResources : string = '';
  public secondaryResources : "65762" ;
  public category : string = '';
  public subcategory : string = '';
  public issueType : string = '';
  public issueSubtype : string = '';
  public priority : string = '';
  public complexity : string = '';
  public slaName : string = '';
  public slaCustomer : string = '';
  public estStartDate : string | Date = null;
  public estEndDate : string | Date = null;
  public resolution : string = '';
  public remark : string = '';
  public serialNumberList : string = '';
  public projectId : number = 0;
  public funnelGenId : number = 0;
  public so : string = '';
  public emailReceiver : string = '';
  public emailCc : string = '';

  constructor(data: Partial<TicketDetailModel>) {
    super();

    this.update(data);
  }
}
