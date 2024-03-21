import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerMasterPostModel extends BaseModel {
  titleCustomer?: string = "";
  customerName?: string = "";
  picName?: string = "";
  customerAddress?: string = "";
  phoneNumber?: number = 0;
  industryClass?: string = "";
  website?: string = "";
  socialMedia?: string = "";
  picPhoneNumber?: string = "";
  picJobTitle?: string = "";
  picEmail?: string = "";
  createdUserID?: number = 0;
  modifyUserID?: number = 0;

  constructor(data: Partial<CustomerMasterPostModel>) {
    super();
    this.update(data);
  }
  public update(data: Partial<CustomerMasterPostModel>): void {
    const conversionOptions: IConversionOption = {
      titleCustomer: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      picName: ConversionTypeEnum.String,
      customerAddress: ConversionTypeEnum.String,
      phoneNumber: ConversionTypeEnum.String,
      industryClass: ConversionTypeEnum.String,
      website: ConversionTypeEnum.String,
      socialMedia: ConversionTypeEnum.String,
      picPhoneNumber: ConversionTypeEnum.String,
      picJobTitle: ConversionTypeEnum.String,
      picEmail: ConversionTypeEnum.String,
      createdUserID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
    };
    super.update(data, conversionOptions);
  }
}
