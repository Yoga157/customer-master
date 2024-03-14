import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';


export default class CancelProjectModel extends BaseModel {
  userLoginID: number = 0;
  funnelGenID: number = 0;
  notes: string = "";
  process: string = "";

  constructor(data: Partial<CancelProjectModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CancelProjectModel>): void {
    const conversionOptions: IConversionOption = {
      userLoginID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      notes: ConversionTypeEnum.String,
      process: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
