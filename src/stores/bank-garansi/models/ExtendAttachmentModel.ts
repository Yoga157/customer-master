import { BaseModel } from 'sjs-base-model';

 export default class ExtendAttachmentModel extends BaseModel {
    public bankGuaranteeNo:string = "";
    public notes:string = "";
    public createdDate:string = "";
    public extendDate:string = "";
    public fileName:string = "";
    public funnelAttachmentID:string = "";

  constructor(data: Partial<ExtendAttachmentModel>){
    super();
    this.update(data)
  }
 }

