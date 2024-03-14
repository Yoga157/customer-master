import { BaseModel } from 'sjs-base-model';



export class TicketListRowModel extends BaseModel {  
  public readonly ticketId: number = 0;
  public readonly ticketUID: string = '';
  public readonly ticketName: string = '';
  public readonly description: string = '';
  public readonly primaryResources: string = '';
  public readonly secondaryResources: string = '';
  public readonly estStartDate: string = '';
  public readonly estEndDate: string = '';
  public readonly actualStartDate: string = '';
  public readonly actualEndDate: string = '';
  public readonly status: string = '';
  public readonly remark: string = '';
  public readonly primaryResourcesSuperiorId: string = '';
  public readonly createUserName: string = '';
  public readonly createDate: string = '';
  public readonly modifyUserName: string = '';
  public readonly modifyDate: string = '';

  constructor(data: Partial<TicketListRowModel>) {
    super();

    this.update(data);
  }
}

export default class TicketListModel extends BaseModel {  
  public readonly totalRows: number  = 0;
  public readonly rows: TicketListRowModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: string = '';
  public readonly filter: string = '';

  constructor(data: Partial<TicketListModel>) {
    super();

    this.update(data);
  }
}
