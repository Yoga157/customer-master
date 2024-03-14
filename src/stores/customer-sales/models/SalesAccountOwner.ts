import { BaseModel } from "sjs-base-model";

export default class SalesAccountOwner extends BaseModel {
    status: string = '';
    salesName: string = '';
    requestedBy: string = '';
    requestedDate: string = '';
    
    constructor(data: Partial<SalesAccountOwner>) {
        super();

        this.update(data);
    }
}
  