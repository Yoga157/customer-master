import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export class AttachmentEditModel extends BaseModel {
    funnelAttachmentID:string = '';
    funnelGenID:number = 0;
    documentTypeID:number = 0;
    documentType:string = '';
    docNumber:string = '';
    documentName:string = '';
    fileName:string = '';
    fileDownload:string = '';
    notes:string = '';
    versionNumber:number = 0;
    activeFlag:number = 0;
    status:string = '';
    createDate:string = '';
    uploadTime:string = '';
    createUserID:number = 0;
    uploadBy:string = '';
    fileExtension:string = '';
    fileSize:number = 0;
    modul:number = 0;
    files: any;
    flagView: string = '';
    topNumber: string = '';

    // edit
    modifyDate: string | Date = null;  
    modifyUserID: number =  0;

  constructor(data: Partial<AttachmentEditModel>) {
    super();
    this.update(data);
  }

    public update(data: Partial<AttachmentEditModel>): void {
        const conversionOptions: IConversionOption = {
            funnelAttachmentID:ConversionTypeEnum.String,
            funnelGenID:ConversionTypeEnum.Number,
            documentTypeID:ConversionTypeEnum.Number,
            documentType:ConversionTypeEnum.String,
            docNumber:ConversionTypeEnum.String,
            documentName:ConversionTypeEnum.String,
            fileName:ConversionTypeEnum.String,
            fileDownload:ConversionTypeEnum.String,
            notes:ConversionTypeEnum.String,
            versionNumber:ConversionTypeEnum.Number,
            activeFlag:ConversionTypeEnum.Number,
            status:ConversionTypeEnum.Number,
            createDate:ConversionTypeEnum.String,
            uploadTime:ConversionTypeEnum.String,
            createUserID:ConversionTypeEnum.Number,
            uploadBy:ConversionTypeEnum.Number,
            fileExtension:ConversionTypeEnum.String,
            fileSize:ConversionTypeEnum.Number,
            modul: ConversionTypeEnum.Number,
            flagView: ConversionTypeEnum.String,
            // just topnumber diffrent type
            topNumber: ConversionTypeEnum.Number
        };
  
        super.update(data, conversionOptions);
    }
}
  
export default class AttachmentModel extends BaseModel {
    funnelAttachmentID:string = '';
    funnelGenID:number = 0;
    documentTypeID:number = 0;
    documentType:string = '';
    docNumber:string = '';
    documentName:string = '';
    fileName:string = '';
    fileDownload:string = '';
    notes:string = '';
    versionNumber:number = 0;
    activeFlag:number = 0;
    status:string = '';
    createDate:string = '';
    uploadTime:string = '';
    createUserID:number = 0;
    uploadBy:string = '';
    fileExtension:string = '';
    fileSize:number = 0;
    modul:number = 0;
    files: any;
    flagView: string = '';
    topNumber: string = '';

    // edit
    modifyDate: string | Date = null;  
    modifyUserID: number =  0;

  constructor(data: Partial<AttachmentModel>) {
    super();
    this.update(data);
  }

    public update(data: Partial<AttachmentModel>): void {
        const conversionOptions: IConversionOption = {
            funnelAttachmentID:ConversionTypeEnum.String,
            funnelGenID:ConversionTypeEnum.Number,
            documentTypeID:ConversionTypeEnum.Number,
            documentType:ConversionTypeEnum.String,
            docNumber:ConversionTypeEnum.String,
            documentName:ConversionTypeEnum.String,
            fileName:ConversionTypeEnum.String,
            fileDownload:ConversionTypeEnum.String,
            notes:ConversionTypeEnum.String,
            versionNumber:ConversionTypeEnum.Number,
            activeFlag:ConversionTypeEnum.Number,
            status:ConversionTypeEnum.Number,
            createDate:ConversionTypeEnum.String,
            uploadTime:ConversionTypeEnum.String,
            createUserID:ConversionTypeEnum.Number,
            uploadBy:ConversionTypeEnum.Number,
            fileExtension:ConversionTypeEnum.String,
            fileSize:ConversionTypeEnum.Number,
            modul: ConversionTypeEnum.Number,
            flagView: ConversionTypeEnum.String,
            topNumber: ConversionTypeEnum.String
        };
  
        super.update(data, conversionOptions);
    }
}
  