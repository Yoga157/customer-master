import {
  BaseModel,
  IConversionOption,
  ConversionTypeEnum,
} from "sjs-base-model";

export default class SalesNameModel extends BaseModel {
  public salesName: string = "";
  public salesID: number = 0;

  constructor(data: Partial<SalesNameModel>) {
    super();

    this.update(data);
  }
  public update(data: Partial<SalesNameModel>): void {
    const conversionOptions: IConversionOption = {
      salesID: ConversionTypeEnum.Number,
      salesName: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
