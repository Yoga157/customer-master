import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class AttachmentVersionModel extends BaseModel {
    funnelAttachmentID:string = '';
    funnelGenID:number = 0;
    notes:string = '';
    versionNumber:number = 0;
    uploadTime:string = '';
    uploadBy: string = '';
    documentType: string = '';
    documentTypeID:number = 0;
    fileName:string = '';
    documentName:string = '';
    flagView: string = '';
    docNumber: string = '';
    status: string = '';
    
    constructor(data: Partial<AttachmentVersionModel>){
      super();
      this.update(data)
    } 

    public update(data: Partial<AttachmentVersionModel>): void {
        const conversionOptions: IConversionOption = {
            funnelAttachmentID:ConversionTypeEnum.Number,
            funnelGenID:ConversionTypeEnum.Number,
            notes:ConversionTypeEnum.String,
            versionNumber:ConversionTypeEnum.Number,
            uploadTime:ConversionTypeEnum.String,
            uploadBy:ConversionTypeEnum.Number,
            documentTypeID:ConversionTypeEnum.Number,
            fileName:ConversionTypeEnum.String,
            documentName:ConversionTypeEnum.String,
        };
  
        super.update(data, conversionOptions);
    }
}
