import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class CustomerNameModel extends BaseModel {
    customerID: number = 0;
    customerName: string = "";
    customerAddress: string = "";
    blacklist: boolean = false;
    holdshipment: boolean = false;
    avgAR: number = 0;
    
    constructor(data: Partial<CustomerNameModel>) {
        super();
        this.update(data);
    }
}