import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class BrandPMModel extends BaseModel {
  brandModelGenID: number = 0;
  assignedTo: string = '';
  userLogin: number = 0;

  constructor(data: Partial<BrandPMModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<BrandPMModel>): void {
    const conversionOptions: IConversionOption = {
      brandModelGenID: ConversionTypeEnum.Number,
      assignedTo: ConversionTypeEnum.Number,
      userLogin: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
