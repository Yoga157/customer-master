
import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class AttachmentVersionModel extends BaseModel {
    funnelAttachmentID:string = '';
    funnelGenID:number = 0;
    documentName:string = '';
    fileName:string = '';
    documentTypeID:number = 0;
    documentType: string = '';
    versionNumber:number = 0;
    uploadTime:string = '';
    uploadBy: string = '';
    status: string = '';
    docNumber:string = '';
    flagView: number = 0;
    
    
    constructor(data: Partial<AttachmentVersionModel>){
      super();
      this.update(data)
    } 

    public update(data: Partial<AttachmentVersionModel>): void {
        const conversionOptions: IConversionOption = {
            funnelAttachmentID:ConversionTypeEnum.Number,
            funnelGenID:ConversionTypeEnum.Number,
            docNumber:ConversionTypeEnum.String,
            versionNumber:ConversionTypeEnum.Number,
            uploadTime:ConversionTypeEnum.String,
            uploadBy:ConversionTypeEnum.Number,
            documentTypeID:ConversionTypeEnum.Number,
            fileName:ConversionTypeEnum.String,
            flagView:ConversionTypeEnum.Number,
            documentName:ConversionTypeEnum.String,
        };
  
        super.update(data, conversionOptions);
    }
}
