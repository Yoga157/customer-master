import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerSettingById extends BaseModel {
  customerSettingID: number = 0;
  customerID: number = 0;
  salesID: number = 0;
  customerCategoryID: string = "";
  shareable: boolean = false;
  pmoCustomer: boolean = false;
  createUserID: number = 0;
  createDate?: string = null;
  modifyUserID: number = 0;
  modifyDate?: Date = undefined;

  constructor(data: Partial<CustomerSettingById>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CustomerSettingById>): void {
    const conversionOptions: IConversionOption = {
      // customerSettingID: ConversionTypeEnum.Number,
      customerID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      // customerCategoryID: ConversionTypeEnum.String,
      // shareable: ConversionTypeEnum.Boolean,
      // pmoCustomer: ConversionTypeEnum.Boolean,
      // createUserID: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
