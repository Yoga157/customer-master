import { BaseModel, ConversionTypeEnum, IConversionOption} from "sjs-base-model";
// import KpiCondition from "stores/kpi/models/KpiCondition";
import KpiCondition from "stores/kpi/kpi-condition/models/KpiConditionModel";

export default class KpiSettingModel extends BaseModel {
    kpiSettingID: number = 0;
    keyActivity: string = "";
    divisionList: string  ="";
    departmentList: string = "";
    functionList: string = "";
    employeeInclude: string = "";
    employeeExclude: string = "";
    kpiDireksi: number = 0;
    measurement: number = 0;
    weight: number = 0;
    point: number = 0;
    status: number = 0;
    conditionList: KpiCondition[] = [];
    createDate: string = "";
    createUserID: number = 0;
    modifyDate: string = "";
    modifyUserID: number = 0;

    constructor(data: Partial<KpiSettingModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<KpiSettingModel>): void {
        const conversionOptions: IConversionOption = {
            kpiSettingID: ConversionTypeEnum.Number,
            keyActivity: ConversionTypeEnum.String,
            divisionList: ConversionTypeEnum.String,
            departmentList: ConversionTypeEnum.String,
            functionList: ConversionTypeEnum.String,
            employeeInclude: ConversionTypeEnum.String,
            employeeExclude: ConversionTypeEnum.String,
            kpiDireksi: ConversionTypeEnum.Number,
            measurement: ConversionTypeEnum.Number,
            weight: ConversionTypeEnum.Number,
            point: ConversionTypeEnum.Number,
            // point: ConversionTypeEnum.Float,
            status: ConversionTypeEnum.Number,
            createDate: ConversionTypeEnum.String,
            createUserID: ConversionTypeEnum.Number,
            modifyDate: ConversionTypeEnum.String,
            modifyUserID: ConversionTypeEnum.Number
        };

        super.update(data, conversionOptions);
    }
};

// export default class KpiSettingModel {
//     public KeyActivity: string = "";
//     public DivisionList: string = "";
//     public DepartmentList: string = "";
//     public FunctionList: string = "";
//     public EmployeeInclude: string = "";
//     public EmployeeExclude: string = "";
//     public KpiDireksi: number = 0;
//     public Measurement: number = 0;
//     public Weight: number = 0;
//     public Point: number = 0;
//     public Status: number = 0;
// }