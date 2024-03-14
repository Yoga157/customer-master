import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class SubBrandModel extends BaseModel {
  public subBrandID: number = 0;
  public subBrandName: string = '';
  public brandID: number = 0;
  public groupID: number = 0;

  constructor(data: Partial<SubBrandModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<SubBrandModel>): void {
    const conversionOptions: IConversionOption = {
      subBrandID: ConversionTypeEnum.Number,
      subBrandName: ConversionTypeEnum.String,
      brandID: ConversionTypeEnum.Number,
      groupID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
