import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class ConfigItemModel extends BaseModel {
    productNumber: string = "";
    soNumber: string = "";
    poNumber: string = "";
    poDate: Date = undefined;
    etaByPurchasing: Date = undefined;
    etaByPMO: Date = undefined;
    doDate: Date = undefined;
    descriptionItem: string = "";
    brand: string = "";
    quantity: number = 0;
    warrantyStartDate: Date = undefined;

    constructor(data: Partial<ConfigItemModel>) {
        super();
        this.update(data);
    }
}