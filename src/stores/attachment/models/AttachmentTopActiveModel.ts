import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class AttachmentTopActiveModel extends BaseModel {
 
    funnelAttachmentID:string = '';
    funnelGenID:number = 0;
    documentName:string = '';
    fileName:string = '';
    fileDownload:string = '';
    documentTypeID:number = 0;
    documentType:string = '';
    versionNumber:number = 0;
    uploadTime:string = '';
    uploadBy:string = '';
    status:string = '';
    flagView:string = '';
    modul:number = 0;
    docNumber:string = '';
    notes:string = '';
    topNumber:number = 0;

  constructor(data: Partial<AttachmentTopActiveModel>) {
    super();
    this.update(data);
  }

    public update(data: Partial<AttachmentTopActiveModel>): void {
        const conversionOptions: IConversionOption = {
            funnelAttachmentID:ConversionTypeEnum.String,
            funnelGenID:ConversionTypeEnum.Number,
            documentName:ConversionTypeEnum.String,
            fileName:ConversionTypeEnum.String,
            fileDownload:ConversionTypeEnum.String,
            documentTypeID:ConversionTypeEnum.Number,
            documentType:ConversionTypeEnum.String,
            versionNumber:ConversionTypeEnum.Number,
            uploadTime:ConversionTypeEnum.String,
            uploadBy:ConversionTypeEnum.String,
            status:ConversionTypeEnum.String,
            flagView:ConversionTypeEnum.String,
            docNumber:ConversionTypeEnum.String,
            notes:ConversionTypeEnum.String,
            topNumber:ConversionTypeEnum.Number,
        };
  
        super.update(data, conversionOptions);
    }
}
  