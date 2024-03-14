import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class CustomerOptions extends BaseModel {
    public readonly valueData: number = 0;
    public readonly textData: string = '';
    public readonly flag: string = '';
    constructor(data: Partial<CustomerOptions>) {
      super();
      
      this.update(data);
    }

    public update(data: Partial<CustomerOptions>): void {
      const conversionOptions: IConversionOption = {
        valueData:ConversionTypeEnum.Number,
        textData: ConversionTypeEnum.String,
        flag:ConversionTypeEnum.String
      };

    super.update(data, conversionOptions);
  }
}
