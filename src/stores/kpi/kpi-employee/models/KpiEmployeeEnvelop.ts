import { BaseModel } from "sjs-base-model";
import KpiEmployeeModel from "./KpiEmployeeModel";

export default class KpiEmployeeEnvelope extends BaseModel {
    public readonly totalRows: number = 0;
    public readonly rows: KpiEmployeeModel[] = [];

    constructor(data: Partial<KpiEmployeeEnvelope>) {
        super();
        this.update(data);
    }
}