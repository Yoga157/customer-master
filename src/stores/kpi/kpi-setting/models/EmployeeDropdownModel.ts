import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class EmployeeDropdownModel extends BaseModel {
    textData: string = "";
    valueData: string = "";

    constructor(data: Partial<EmployeeDropdownModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<EmployeeDropdownModel>): void {
        const conversionOptions: IConversionOption = {
            textData: ConversionTypeEnum.String,
            valueData: ConversionTypeEnum.String
        };
        
        super.update(data, conversionOptions);
    }

};

// import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

// export default class EmployeeDropdownModel extends BaseModel {
//     employeeID: number = 0;
//     employeeKey: string = "";
//     effDate:string = '';
//     employeeName: string = "";
//     deptID:string = '';
//     employeeEmail:string = '';
//     divisionName: string = "";    

//     constructor(data: Partial<EmployeeDropdownModel>) {
//         super();
//         this.update(data);
//     }

//     public update(data: Partial<EmployeeDropdownModel>): void {
//         const conversionOptions: IConversionOption = {
//             employeeID: ConversionTypeEnum.Number,
//             employeeKey: ConversionTypeEnum.String,
//             effDate: ConversionTypeEnum.String,
//             employeeName: ConversionTypeEnum.String,
//             deptID: ConversionTypeEnum.String,
//             employeeEmail: ConversionTypeEnum.String,
//             divisionName: ConversionTypeEnum.String,
//         };
        
//         super.update(data, conversionOptions);
//     }

// };