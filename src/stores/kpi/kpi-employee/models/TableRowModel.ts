// import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

// export default class RowData extends BaseModel {
//     public kpiEmployeeIncludeExcludeID: number = 0;
//     public employeeID: number = 0;
//     public employeeName: string = "";
//     public divName: string = "";
//     public type: string = "";
//     public createDate: string = "";
//     public createUserID: number = 0;
//     public modifyUserID: number = 0;
//     public modifyDate: string = "";

//     constructor(data: Partial<RowData>) {
//         super();

//         this.update(data);
//     }

//     public update(data: Partial<RowData>): void {
//         const conversionOptions: IConversionOption = {
//             kpiEmployeeIncludeExcludeID: ConversionTypeEnum.Number,
//             employeeID: ConversionTypeEnum.Number,
//             employeeName: ConversionTypeEnum.String,
//             divName: ConversionTypeEnum.String,
//             type: ConversionTypeEnum.String,
//             createDate: ConversionTypeEnum.String,
//             createUserID: ConversionTypeEnum.Number,
//             modifyUserID: ConversionTypeEnum.Number,
//             modifyDate: ConversionTypeEnum.String,
//         };

//         super.update(data, conversionOptions);
//     }
// };

import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class RowData extends BaseModel {
    public kpiEmployeeIncludeExcludeID: number = 0;
    public employeeID: number = 0;
    public employeeKey: number = 0;
    public effDate:string = '';
    public employeeName: string = "";
    public deptID:string = '';
    public employeeEmail:string = '';
    public divisionName: string = "";
    public type: string = "";
    public createDate: string = "";
    public createUserID: number = 0;
    public modifyUserID: number = 0;
    public modifyDate: string = "";

    constructor(data: Partial<RowData>) {
        super();

        this.update(data);
    }

    public update(data: Partial<RowData>): void {
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
            createDate: ConversionTypeEnum.String,
            createUserID: ConversionTypeEnum.Number,
            modifyUserID: ConversionTypeEnum.Number,
            modifyDate: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};