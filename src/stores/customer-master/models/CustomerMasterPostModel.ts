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
  picMobilePhone?: string = "";
  picJobTitle?: string = "";
  picEmailAddr?: string = "";
  createdUserID?: number = 0;
  requestor?: string = "";
  modifyUserID?: number = 0;
  approvalStatus?: string = "";

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
      picMobilePhone: ConversionTypeEnum.String,
      picJobTitle: ConversionTypeEnum.String,
      picEmailAddr: ConversionTypeEnum.String,
      createdUserID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
      approvalStatus: ConversionTypeEnum.String,
    };
    super.update(data, conversionOptions);
  }
}
