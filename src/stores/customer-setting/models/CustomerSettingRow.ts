import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerSettingRow extends BaseModel {
  // {
  //   "customerID": 746,
  //   "jdeCustomerID": 0,
  //   "customerGenID": 0,
  //   "industryClass": null,
  //   "customerCategory": null,
  //   "customerName": "PANEN LESTARI INTERNUSA, PT.",
  //   "customerAddress": "SAHID SUDIRMAN CENTER LT.38, Jl.JEND. SUDIRMAN KAV.86 KARET TENGSIN, TANAH ABANG, JAKARTA PUSAT 10220 10220 JAKARTA",
  //   "isNew": false,
  //   "lastProjectName": null,
  //   "salesName": null,
  //   "pmoCustomer": false,
  //   "relatedCustomer": null,
  //   "blacklist": false,
  //   "holdshipment": false,
  //   "named": false,
  //   "shareable": false,
  //   "createdBy": null,
  //   "createdDate": "16 June 2015",
  //   "modifiedBy": null,
  //   "modifiedDate": "08 January 2024",
  //   "requestedBy": null,
  //   "salesShareableID": 0,
  //   "approvalBy": 0,
  //   "status": null,
  //   "approvalStatus": null

  customerSettingID: number = 0;
  customerID: number = 0;
  jdeCustomerID?: number = 0;
  customerGenID?: number = 0;
  industryClass?: string = "";
  salesID: number = 0;
  customerCategory: string = "";
  customerName: string = "";
  customerAddress: string = "";
  lastProjectName: string = "";
  salesName: string = "";
  myAccount: number = 0;
  relatedCustomer: string = "";
  invoiceCondition: string = "";
  requestedBy: string = "";
  shareable: boolean = false;
  pmoCustomer: boolean = false;
  blacklist: boolean = false;
  named: boolean = false;
  salesShareableID: number = 0;
  holdshipment: boolean = false;
  createdBy: string = "";
  createdDate?: Date = undefined;
  modifiedBy: string = "";
  modifiedDate?: Date = undefined;
  approvalBy?: number = 0;
  status?: string = null;
  isNew?: boolean = false;
  approvalStatus?: string = "";

  constructor(data: Partial<CustomerSettingRow>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CustomerSettingRow>): void {
    const conversionOptions: IConversionOption = {
      customerSettingID: ConversionTypeEnum.Number,
      customerID: ConversionTypeEnum.Number,
      jdeCustomerID: ConversionTypeEnum.Number,
      customerGenID: ConversionTypeEnum.Number,
      industryClass: ConversionTypeEnum.String,
      salesID: ConversionTypeEnum.String,
      customerCategory: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      myAccount: ConversionTypeEnum.Number,
      customerAddress: ConversionTypeEnum.String,
      requestedBy: ConversionTypeEnum.String,
      lastProjectName: ConversionTypeEnum.String,
      salesName: ConversionTypeEnum.String,
      salesShareableID: ConversionTypeEnum.Number,
      relatedCustomer: ConversionTypeEnum.String,
      invoiceCondition: ConversionTypeEnum.String,
      shareable: ConversionTypeEnum.Boolean,
      pmoCustomer: ConversionTypeEnum.Boolean,
      blacklist: ConversionTypeEnum.Boolean,
      named: ConversionTypeEnum.Boolean,
      holdshipment: ConversionTypeEnum.Boolean,
      createdBy: ConversionTypeEnum.String,
      modifiedBy: ConversionTypeEnum.String,
      approvalBy: ConversionTypeEnum.Number,
      status: ConversionTypeEnum.String,
      isNew: ConversionTypeEnum.Boolean,
      approvalStatus: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
