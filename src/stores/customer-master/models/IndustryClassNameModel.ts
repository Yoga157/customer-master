import {
  BaseModel,
  IConversionOption,
  ConversionTypeEnum,
} from "sjs-base-model";

export default class IndustryClassModel extends BaseModel {
  public industryClassName: string = "";
  public industryClassID: number = 0;

  constructor(data: Partial<IndustryClassModel>) {
    super();

    this.update(data);
  }
  public update(data: Partial<IndustryClassModel>): void {
    const conversionOptions: IConversionOption = {
      industryClassID: ConversionTypeEnum.Number,
      industryClassName: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
