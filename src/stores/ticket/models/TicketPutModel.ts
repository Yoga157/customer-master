import { BaseModel } from 'sjs-base-model';



export default class TicketPutModel extends BaseModel {    
  public ticketName : string = '';
  public description : string = '';
  public status : string = '';
  public primaryResources : string = '';
  public secondaryResources : string = '';
  public category : string = '';
  public subcategory : string = '';
  public issueType : string = '';
  public issueSubtype : string = '';
  public priority : string = '';
  public complexity : string = '';
  public slaName : string = '';
  public slaCustomer : string = '';
  public remark : string = '';
  public estStartDate : string | Date = null;
  public estEndDate : string | Date = null;
  public projectId : number = 0;
  public so : string = '';
  public serialNumberList : string = '';
  public funnelGenId : number = 0; 
  
  public ticketId : number = 0;
  public ticketUID : string = '';
  public resolution : string = '';
  public modifyDate : string | Date = null;
  public modifyUserID : number = 0;
  
  public isSendEmailNotification : boolean = false;
  public emailCc : string = '';
  public emailReceiver : string = '';



  constructor(data: Partial<TicketPutModel>) {
    super();

    this.update(data);
  }
}
