import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class CustomerPICSettingModel extends BaseModel {
    picName: string = "";
    picTitle: string = "";
    phone: string = "";
    email: string = "";
    latestProject: string = "";

    constructor(data: Partial<CustomerPICSettingModel>) {
        super();
        this.update(data);
    }
}