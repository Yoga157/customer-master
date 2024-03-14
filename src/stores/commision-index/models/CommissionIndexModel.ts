import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class CommissionIndexModel extends BaseModel {
  public text1: string = '';
  public mnum1: number = 0;

  constructor(data: Partial<CommissionIndexModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<CommissionIndexModel>): void {
    const conversionOptions: IConversionOption = {
      text1: ConversionTypeEnum.String,
      mnum1: ConversionTypeEnum.Float,
    };

    super.update(data, conversionOptions);
  }
}
