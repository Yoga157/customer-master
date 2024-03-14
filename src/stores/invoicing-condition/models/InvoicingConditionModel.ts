import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class InvoicingConditionModel extends BaseModel {
    iConditionID: number = 0;
    customerID: number = 0;
    projectType: string = "";
    documentName: string = "";
    createUserID: number = 0;
    createDate?: Date = undefined;
    modifyUserID: number = 0;
    modifyDate?: Date = undefined;

    constructor(data: Partial<InvoicingConditionModel>) {
        super();
        this.update(data);
    }
}