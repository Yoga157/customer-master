import { BaseModel } from "sjs-base-model";

export default class KpiSettingFilter extends BaseModel {
    pageSize: number = 0;
    sorting: string = "";

    constructor(data: Partial<KpiSettingFilter>) {
        super();
        this.update(data);
    }
};