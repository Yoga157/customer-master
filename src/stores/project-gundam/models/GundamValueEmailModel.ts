import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class GundamValueEmailModel extends BaseModel {
  subject: string = '';
  body: string = '';
  
  constructor(data: Partial<GundamValueEmailModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<GundamValueEmailModel>): void {
    const conversionOptions: IConversionOption = {
      subject: ConversionTypeEnum.String,
      body: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}