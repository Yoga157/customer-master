import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SoftwareToolModel extends BaseModel {
  softwareToolID: number = 0;
  softwareToolType: number = 0;
  softwareToolTypeName: string = '';
  softwareToolName: string = '';
  flagFunnelGenID: number = 0;

  constructor(data: Partial<SoftwareToolModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SoftwareToolModel>): void {
    const conversionOptions: IConversionOption = {
      softwareToolID: ConversionTypeEnum.Number,
      softwareToolType: ConversionTypeEnum.Number,
      softwareToolName: ConversionTypeEnum.String,
      softwareToolTypeName: ConversionTypeEnum.String,
      flagFunnelGenID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
