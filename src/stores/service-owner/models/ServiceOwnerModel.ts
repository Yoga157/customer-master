import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ServiceOwnerModel extends BaseModel {
  
  public readonly udcid: number = 0;
  public readonly valueData: string = '';
  public readonly textData: string = '';

  constructor(data: Partial<ServiceOwnerModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<ServiceOwnerModel>): void {
    const conversionOptions: IConversionOption = {
      valueData: ConversionTypeEnum.String,
      textData: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
