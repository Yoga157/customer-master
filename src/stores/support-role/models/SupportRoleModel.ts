import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SupportRoleModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<SupportRoleModel>) {
    super();

    this.update(data);
  }
  public update(data: Partial<SupportRoleModel>): void {
    const conversionOptions: IConversionOption = {
      valueData: ConversionTypeEnum.Number,
      textData: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
