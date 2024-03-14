import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class KpiDataDropdownModel extends BaseModel {
  textData: string = '';
  valueData: string = '';

  constructor(data: Partial<KpiDataDropdownModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<KpiDataDropdownModel>): void {
    const conversionOptions: IConversionOption = {
      textData: ConversionTypeEnum.String,
      valueData: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
