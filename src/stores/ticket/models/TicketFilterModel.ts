import { BaseModel } from 'sjs-base-model';



export class TicketFilterModel extends BaseModel {  
  public ticketStatusList: string = '';
  public primaryResourceList: string = '';
  public secondaryResourceList: string = '';
  public customerList: string = '';
  public actualStartDate: string = null;
  public actualEndDate: string = null;
  public userLogin: string = '';
  public column: string = '';
  public sorting: string = '';
  
  public userLoginId: number = 0;
  public page: number = 0;
  public pageSize: number = 0;

  constructor(data: Partial<TicketFilterModel>) {
    super();

    this.update(data);
  }
}

export class TicketFilterModelByProjId extends BaseModel { 
  public ticketStatusList: string = '';
  public primaryResourceList: string = '';
  public secondaryResourceList: string = '';
  public actualStartDate: string = null;
  public actualEndDate: string = null;
  public column: string = '';
  public sorting: string = '';
  public projectId: number = 0;

  public page: number = 0;
  public pageSize: number = 0;
  
    constructor(data: Partial<TicketFilterModelByProjId>) {
      super();
    
      this.update(data);
    }
   }