import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';



export class Data extends BaseModel {    
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
  public so: string = '';
  public serialNumberList : string = '';
  public funnelGenId : number = 0;
  public createDate : string | Date = null;
  public createUserID : number = 0;

  public isSendEmailNotification : boolean = false;
  public emailCc : string = '';
  public emailReceiver : string = '';

  constructor(data: Partial<Data>) {
    super();

    this.update(data);
  }

   public update(data: Partial<Data>): void {
    const conversionOptions: IConversionOption = {
      so: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}


export class Attachments extends BaseModel {    
  public funnelGenID : number = 0;
  public documentTypeID : number = 0;
  public fileName : string = '';
  public modul : number = 0;
  public createDate : string | Date = null;
  public createUserID  : number = 0;

  constructor(data: Partial<Attachments>) {
    super();

    this.update(data);
  }
}


export default class TicketCreateModel extends BaseModel {    
  public data : Data;
  public attachments : Attachments[];

  constructor(dataItem: Partial<TicketCreateModel>) {
    super();

    this.update(dataItem);
  }
}