import { BaseModel } from 'sjs-base-model';

export class PSSRowModel extends BaseModel {  
  public readonly projectId: number  = 0;
  public readonly pssDocumentId: number  = 0;
  public readonly projectName: string = '';
  public readonly customerName: string = '';
  
  constructor(data: Partial<PSSRowModel>) {
    super();
    this.update(data);
  }
}

export default class PSSListModel extends BaseModel {  
  public readonly totalRows: number  = 0;
  public readonly rows: PSSRowModel[] = [];

  constructor(data: Partial<PSSListModel>) {
    super();
    this.update(data);
  }
}
