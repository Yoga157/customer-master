import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerMasterRow extends BaseModel {
  customerID: number = 0;
  titleCustomer: string = "";
  customerName: string = "";
  picName: string = "";

  constructor(data: Partial<CustomerMasterRow>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CustomerMasterRow>): void {
    const conversionOptions: IConversionOption = {
      customerID: ConversionTypeEnum.Number,
      titleCustomer: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      picName: ConversionTypeEnum.String,
    };
  }
}
