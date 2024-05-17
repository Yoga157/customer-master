import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerMoreDetailsModel extends BaseModel {
  customerGenID: number = 0;
  customerID: number = 0;
  customerName: string = "";
  industryClass: string = "";
  customerBusinessName: string = "";
  holdingCompName: string = "";
  addr1: string = "";
  country: string = "";
  city: string = "";
  zipCode: string = "";
  nib: string = "";
  phoneNumber: string = "";
  website: string = "";
  coorporateEmail: string = "";
  npwpNumber: string = "";
  requestor: string = "";
  req_CustomerCardFileGetByCustomerGenID_ViewModels: any[] = [];
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
      // titleCustomer: ConversionTypeEnum.String,
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
