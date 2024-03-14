import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class CopyFunnelAttachmentModel extends BaseModel {
  funnelGenID:number = 0;
  documentTypeID:number = 0;
  fileName: string = '';
  modul:number = 0;
  funnelAttachmentID: string = '';
  docNumber: string = '';
  createDate: string | Date = '' ;
  createUserID:number = 0;

  
  constructor(data: Partial<CopyFunnelAttachmentModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CopyFunnelAttachmentModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      documentTypeID: ConversionTypeEnum.Number,
      fileName: ConversionTypeEnum.String,
      modul: ConversionTypeEnum.Number,
      funnelAttachmentID: ConversionTypeEnum.String,
      docNumber: ConversionTypeEnum.String,
      createDate: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}