import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class CollectionHistoryModel extends BaseModel {
    invoiceNumber: string = "";
    invoiceDate: string = "";
    soid: number = 0;
    collectionAmount: number = 0;
    collectionDate: string = "";

    constructor(data: Partial<CollectionHistoryModel>) {
        super();
        this.update(data);
    }
}