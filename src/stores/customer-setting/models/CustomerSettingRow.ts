import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerSettingRow extends BaseModel {
  customerSettingID: number = 0;
  customerID: number = 0;
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

  constructor(data: Partial<CustomerSettingRow>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CustomerSettingRow>): void {
    const conversionOptions: IConversionOption = {
      customerSettingID: ConversionTypeEnum.Number,
      customerID: ConversionTypeEnum.Number,
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
      status: ConversionTypeEnum.String
    };

    super.update(data, conversionOptions);
  }
}
