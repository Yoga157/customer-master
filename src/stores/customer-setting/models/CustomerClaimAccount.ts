import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";
  
export default class CustomerClaimAccount extends BaseModel {
    customerID: number = 0;
    salesID: number = 0;
    requestedBy: number = 0;

    constructor(data: Partial<CustomerClaimAccount>) {
        super();
        this.update(data);
    }
}