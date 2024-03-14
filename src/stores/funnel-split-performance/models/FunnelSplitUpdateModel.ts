import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSplitModelUpdate extends BaseModel {
  funnelGenID: number = 0;
  salesID: number = 0;
  splitType: number = 0;
  splitPercentage: number = 0;
  createUserID: number = 0;
  funnelISplitID: number = 0;
  createDate: string = "";
  modifyDate: string = "";
  modifyUserID: number = 0;

  constructor(data: Partial<FunnelSplitModelUpdate>) {
    super();

    this.update(data);
  }

  public update(data: Partial<FunnelSplitModelUpdate>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      splitType: ConversionTypeEnum.Number,
      splitPercentage: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
      funnelISplitID: ConversionTypeEnum.String,
      createDate: ConversionTypeEnum.String,
      modifyDate: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number

    };

    super.update(data, conversionOptions);
  }
}
