import { BaseModel } from 'sjs-base-model';

export class HistoryList {
    public funnelAttachmentID:string = '';
    public funnelGenID:number = 0;
    public documentName:string = '';
    public fileName:string = '';
    public documentTypeID:number = 0;
    public documentType:string = '';
    public versionNumber:number = 0;
    public uploadTime:string = '';
    public uploadBy:string = '';
    public status:string = '';
    public flagView:string = '';
    public docNumber:string = '';
    public notes:string = '';
    public topNumber:string = '';
 }

export default class AttachmentHistory extends BaseModel {
    public historyDate:string = '';
    public historyList: HistoryList[];

    constructor(data: Partial<AttachmentHistory>) {
    super();
    this.update(data);
  }
 }
