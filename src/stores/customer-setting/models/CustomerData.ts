import {
    BaseModel,
    ConversionTypeEnum,
    IConversionOption,
  } from "sjs-base-model";
  
  export default class CustomerData extends BaseModel {
    accountStatus: string = '';
    customerID: number = 0;
    customerCategory: string = '';
    customerName: string = '';
    customerAddress: string = '';
    pmoCustomer: boolean = false;
    blacklist: boolean = false;
    holdshipment: boolean = false;
    avgAR: number = 0;
    salesName: string = '';
    shareableApprovalStatus: any = null;
  
    constructor(data: Partial<CustomerData>) {
      super();
      this.update(data);
    }
  
    public update(data: Partial<CustomerData>): void {
      const conversionOptions: IConversionOption = {
        accountStatus: ConversionTypeEnum.String,
        customerID: ConversionTypeEnum.Number,
        customerCategory: ConversionTypeEnum.String,
        pmoCustomer: ConversionTypeEnum.Boolean,
        blacklist: ConversionTypeEnum.Boolean,
        holdshipment: ConversionTypeEnum.Boolean,
        avgAR: ConversionTypeEnum.Number,
        salesName: ConversionTypeEnum.String
      };
  
      super.update(data, conversionOptions);
    }
  }