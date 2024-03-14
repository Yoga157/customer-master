import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class CheckExpireModel extends BaseModel {
  message: string = '';

  constructor(data: Partial<CheckExpireModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CheckExpireModel>): void {
    const conversionOptions: IConversionOption = {
        message: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
