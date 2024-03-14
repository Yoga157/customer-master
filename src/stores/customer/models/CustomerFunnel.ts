import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class CustomerFunnel extends BaseModel {
  public readonly customerGenID: number = 0;
  public readonly customerName: string = '';

  constructor(data: Partial<CustomerFunnel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<CustomerFunnel>): void {
    const conversionOptions: IConversionOption = {
      customerGenID: ConversionTypeEnum.Number,
      customerName: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
