import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class AttachmentModel extends BaseModel {
  funnelAttachmentID: string = '';
  funnelGenID: number = 0;
  documentTypeID: number = 0;
  documentType: string = '';
  documentName: string = '';
  fileName: string = '';
  versionNumber: number = 0;
  status: string = '';
  uploadTime: string = '';
  uploadBy: string = '';
  flagView: number = 0;

  constructor(data: Partial<AttachmentModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<AttachmentModel>): void {
    const conversionOptions: IConversionOption = {
      funnelAttachmentID: ConversionTypeEnum.String,
      funnelGenID: ConversionTypeEnum.Number,
      documentTypeID: ConversionTypeEnum.Number,
      documentType: ConversionTypeEnum.String,
      documentName: ConversionTypeEnum.String,
      fileName: ConversionTypeEnum.String,
      notes: ConversionTypeEnum.String,
      versionNumber: ConversionTypeEnum.Number,
      status: ConversionTypeEnum.Number,
      uploadTime: ConversionTypeEnum.String,
      uploadBy: ConversionTypeEnum.Number,
      flagView: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
