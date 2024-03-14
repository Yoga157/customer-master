import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class RelatedFileModel extends BaseModel {
    rFileID: number = 0;
    customerID: number = 0;
    documentName: string = "";
    documentType: string = "";
    documentPath: string = "";
    createUserID: number = 0;
    createDate?: Date = undefined;
    modifyUserID: number = 0;
    modifyDate?: Date = undefined;
    createdBy?: string = "";
    modifiedBy: string = "";

    constructor(data: Partial<RelatedFileModel>) {
        super();
        this.update(data);
    }
}