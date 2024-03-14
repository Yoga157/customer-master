import { BaseModel } from 'sjs-base-model';



export class WorkActivityReportRowModel extends BaseModel {  
  public readonly activityReportGenId: number = 0;
  public readonly ticketId: string = '';
  public readonly engineerList: string = '';
  public readonly activityCategory: string = '';
  public readonly status: string = '';
  public readonly actionTaken: string = '';
  public readonly startDate: string | Date = '';
  public readonly endDate: string | Date = '';


  constructor(data: Partial<WorkActivityReportRowModel>) {
    super();

    this.update(data);
  }
}

export default class WorkActivityReportModel extends BaseModel {  
  public readonly totalRows: number  = 0;
  public readonly rows: WorkActivityReportRowModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: string = '';
  public readonly filter: string = '';

  constructor(data: Partial<WorkActivityReportModel>) {
    super();

    this.update(data);
  }
}
