import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerMoreDetailsModel extends BaseModel {
  customerID: number = 0;
  titleCustomer: string = "";
  customerName: string = "";
  industryClass: string = "";
  requestor: string = "";
  cpAddressOfficeNumbers: any[] = [];
  cpWebsiteSocialMedias: any[] = [];
  customerPICs: any[] = [];
  cpRelatedCustomers: any[] = [];
  createDate: string = "";
  createUserID: number = 0;
  modifyDate: string = "";
  modifyUserID: number = 0;

  constructor(data: Partial<CustomerMoreDetailsModel>) {
    super();
    this.update(data);
  }
  public update(data: Partial<CustomerMoreDetailsModel>): void {
    const conversionOptions: IConversionOption = {
      customerID: ConversionTypeEnum.Number,
      titleCustomer: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      industryClass: ConversionTypeEnum.String,
      requestor: ConversionTypeEnum.String,
      createDate: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      modifyDate: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
    };
    super.update(data, conversionOptions);
  }
}
