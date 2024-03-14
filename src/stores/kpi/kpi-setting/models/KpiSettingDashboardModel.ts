import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class KpiSettingDashboardModel extends BaseModel {
    kpiID: string = "";
    keyActivity:string = "";
    divisionList:string = "";
    divisionNameList: string = "";
    departmentList:string = "";
    departmentNameList: string = "";
    functionList:string = ""
    functionNameList: string = "";
    employeeInclude:string = "";
    employeeExclude:string = "";
    kpiDireksi:number = 0;
    kpiDireksiName:string = "";
    measurement:number = 0;
    measurementName:string = "";
    weight:number = 0;
    point:number = 0;
    status:number = 0;
    statusName:string = "";
    
    constructor(data: Partial<KpiSettingDashboardModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<KpiSettingDashboardModel>) {
        const conversionOptions: IConversionOption = {
            kpiID:ConversionTypeEnum.String,
            keyActivity:ConversionTypeEnum.String,
            divisionList:ConversionTypeEnum.String,
            divisionNameList:ConversionTypeEnum.String,
            departmentList:ConversionTypeEnum.String,
            departmentNameList:ConversionTypeEnum.String,
            functionList:ConversionTypeEnum.String,
            functionNameList:ConversionTypeEnum.String,
            employeeInclude:ConversionTypeEnum.String,
            employeeExclude:ConversionTypeEnum.String,
            kpiDireksi:ConversionTypeEnum.Number,
            kpiDireksiName:ConversionTypeEnum.String,
            measurement:ConversionTypeEnum.Number,
            weight:ConversionTypeEnum.Number,
            point:ConversionTypeEnum.Number,
            status:ConversionTypeEnum.Number,
            statusName:ConversionTypeEnum.String,
            // conditionList:ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
};
// Abie - 17/06/2021