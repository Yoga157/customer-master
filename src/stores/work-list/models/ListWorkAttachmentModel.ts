import { BaseModel } from 'sjs-base-model';



export class ListWorkAttachmentRowModel extends BaseModel {  
  public readonly funnelAttachmentID: string = '';
  public readonly funnelGenID: number = 0;
  public readonly documentTypeID: number = 0;
  public readonly fileName: string = '';
  public readonly fileDownload: string = '';
  public readonly modul: number = 0;
  public readonly docNumber: string = '';
  public readonly uploadDate: string = '';
  public readonly uploadById: number = 0;
  public readonly uploadByName: string = '';


  constructor(data: Partial<ListWorkAttachmentRowModel>) {
    super();

    this.update(data);
  }
}

export default class ListWorkAttachmentModel extends BaseModel {  
  public readonly totalRows: number  = 0;
  public readonly rows: ListWorkAttachmentRowModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: string = '';
  public readonly filter: string = '';

  constructor(data: Partial<ListWorkAttachmentModel>) {
    super();

    this.update(data);
  }
}
