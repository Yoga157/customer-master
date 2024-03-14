import { BaseModel } from 'sjs-base-model';



export class WorklistRowsModel extends BaseModel {  
  public readonly workId: number = 0;
  public readonly uid: string = '';
  public readonly workType: string = '';
  public readonly projectName: string = '';
  public readonly customerName: string = '';
  public readonly primaryResourcesSuperiorId: string = '';
  public readonly engineerName: string = '';
  public readonly description: string = '';
  public readonly estStartDate: string = '';
  public readonly estEndDate: string = '';
  public readonly actualStartDate: string = '';
  public readonly actualEndDate: string = '';
  public readonly workStatus: string = '';
  public readonly workName: string = '';
  public readonly creatorId: number = 0;
  public readonly creatorName: string = '';

  constructor(data: Partial<WorklistRowsModel>) {
    super();

    this.update(data);
  }
}

export default class WorkListModel extends BaseModel {  
  public readonly totalRows: number  = 0;
  public readonly rows: WorklistRowsModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: string = '';
  public readonly filter: string = '';

  constructor(data: Partial<WorkListModel>) {
    super();

    this.update(data);
  }
}
