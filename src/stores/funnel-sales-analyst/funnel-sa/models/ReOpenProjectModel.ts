import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';


export default class ReOpenProjectModel extends BaseModel {
  userLoginID: number = 0;
  funnelGenID: number = 0;
  flagGPM: number = 0;
  notes: string = "";
  process: string = "";

  constructor(data: Partial<ReOpenProjectModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ReOpenProjectModel>): void {
    const conversionOptions: IConversionOption = {
      userLoginID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      flagGPM: ConversionTypeEnum.Number,
      notes: ConversionTypeEnum.String,
      process: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
