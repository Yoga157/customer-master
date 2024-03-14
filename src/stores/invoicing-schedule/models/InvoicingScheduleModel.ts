import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class InvoicingScheduleModel extends BaseModel {
    iScheduleID: number = 0;
    customerID: number = 0;
    scheduleDays: string = "";
    minDate: number = 0;
    maxDate: number = 0;
    remark: string = "";
    createUserID: number = 0;
    createDate?: Date = null;
    modifyUserID: number = 0;
    modifyDate?: Date = null;

    constructor(data: Partial<InvoicingScheduleModel>) {
        super();
        this.update(data);
    }
}