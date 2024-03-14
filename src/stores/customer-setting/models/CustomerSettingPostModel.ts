import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerSettingPostModel extends BaseModel {
  customerSettingID?: number = 0;
  customerID: number = 0;
  salesID: number = 0;
  shareable?: boolean = false;
  named?: boolean = false;
  pmoCustomer?: boolean = false;
  requestedBy?: number = 0;
  requestedDate?: Date = new Date();
  createDate?: Date = new Date();
  createUserID: number = 0;
  modifyDate?: Date | undefined = undefined;
  modifyUserID?: number = 0;

  constructor(data: Partial<CustomerSettingPostModel>) {
    super();
    this.update(data);
  }
  public update(data: Partial<CustomerSettingPostModel>): void {
    const conversionOptions: IConversionOption = {
      customerSettingID: ConversionTypeEnum.Number,
      customerID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      shareable: ConversionTypeEnum.Boolean,
      named: ConversionTypeEnum.Boolean,
      pmoCustomer: ConversionTypeEnum.Boolean,
      requestedBy: ConversionTypeEnum.Number,
      requestedDate: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      createDate: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
    };
    super.update(data, conversionOptions);
  }
}
