import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class SalesAssignHistoryModel extends BaseModel {
    salesName: string = "";
    customerName: string = "";
    year: string = "";

    constructor(data: Partial<SalesAssignHistoryModel>) {
        super();
        this.update(data);
    }
}
  