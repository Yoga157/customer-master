import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class KpiEmployeeRequestModel extends BaseModel {
    public kpiEmployeeID: number = 0;
    public employeeName: string = "";
    public employeeKey: number = 0;
    public divisionName: string = ""
    public deptID: number = 0;
    public type: string = "";

    constructor(data: Partial<KpiEmployeeRequestModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<KpiEmployeeRequestModel>): void {
        const conversionOptions: IConversionOption = {
            kpiEmployeeID: ConversionTypeEnum.Number,
            employeeName: ConversionTypeEnum.String,
            employeeKey: ConversionTypeEnum.Number,
            divisionName: ConversionTypeEnum.String,
            deptID: ConversionTypeEnum.Number,
            type: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};