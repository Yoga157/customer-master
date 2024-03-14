
import { BaseModel } from 'sjs-base-model';

 export class DataWorkAttachment extends BaseModel {
  public FunnelGenID: number = 0;
  public DocumentTypeID: number = 0;
  public FileName: string = '';
  public DocumentName: string = '';
  public Notes: string = '';
  public Modul: number = 0;
  public DocNumber: string = '';
  public CreateDate: Date | string = '';
  public CreateUserID: number = 0;

  constructor(data: Partial<DataWorkAttachment>) {
    super();
    this.update(data);
  }
}

export default class WorkAttachmentModel extends BaseModel {
  public Data: DataWorkAttachment;
  public Attachment: any;

  constructor(data: Partial<WorkAttachmentModel>) {
    super();

    this.update(data);
  }
}