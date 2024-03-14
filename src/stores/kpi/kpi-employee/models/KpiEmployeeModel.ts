// import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

// export default class KpiEmployeeModel extends BaseModel {
//     kpiEmployeeIncludeExcludeID: number = 0;
//     employeeID: number = 0;
//     employeeName: string = "";
//     divName: string = "";
//     type: string = "";
//     createUserID: number = 0;

//     constructor(data: Partial<KpiEmployeeModel>){
//         super();
//         this.update(data);
//     }

//     public update(data: Partial<KpiEmployeeModel>): void {
//         const conversionOptions: IConversionOption = {
//             kpiEmployeeIncludeExcludeID: ConversionTypeEnum.Number,
//             employeeID: ConversionTypeEnum.Number,
//             employeeName: ConversionTypeEnum.String,
//             divName: ConversionTypeEnum.String,
//             type: ConversionTypeEnum.String,
//             createUserID: ConversionTypeEnum.Number,
//         };

//         super.update(data, conversionOptions);
//     }
// };

import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class KpiEmployeeModel extends BaseModel {
    kpiEmployeeIncludeExcludeID: number = 0;
    employeeID: number = 0;
    employeeKey: number = 0;
    effDate:string = '';
    employeeName: string = "";
    deptID:string = '';
    employeeEmail:string = '';
    divisionName: string = "";
    type: string = "";
    createUserID: number = 0;

    constructor(data: Partial<KpiEmployeeModel>){
        super();
        this.update(data);
    }

    public update(data: Partial<KpiEmployeeModel>): void {
        const conversionOptions: IConversionOption = {
            kpiEmployeeIncludeExcludeID: ConversionTypeEnum.Number,
            employeeID: ConversionTypeEnum.Number,
            employeeKey: ConversionTypeEnum.Number,
            effDate: ConversionTypeEnum.String,
            employeeName: ConversionTypeEnum.String,
            deptID: ConversionTypeEnum.String,
            employeeEmail: ConversionTypeEnum.String,
            divisionName: ConversionTypeEnum.String,
            type: ConversionTypeEnum.String,
            createUserID: ConversionTypeEnum.Number,
        };

        super.update(data, conversionOptions);
    }
};