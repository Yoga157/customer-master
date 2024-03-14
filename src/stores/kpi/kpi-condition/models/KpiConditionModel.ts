// import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

// export default class KpiConditionModel extends BaseModel {
//     description:string = "";
//     point:string = "";

//     constructor(data: Partial<KpiConditionModel>){
//         super();
//         this.update(data);
//     }

//     public update(data: Partial<KpiConditionModel>): void {
//         const conversionOptions: IConversionOption = {
//             description: ConversionTypeEnum.String,
//             point: ConversionTypeEnum.String
//         };

//         super.update(data, conversionOptions);
//     }
// };

import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class KpiCondition extends BaseModel {
    kpiConditionID: number = 0;
    description: string = "";
    point: string = "";
    createDate: string = "";
    createUserID: number = 0;
    modifyUserID: number = 0;
    modifyDate: string = "";

    constructor(data: Partial<KpiCondition>) {
        super();
        this.update(data);
    }

    public update(data: Partial<KpiCondition>): void {
        const conversionOptions: IConversionOption = {
            kpiConditionID: ConversionTypeEnum.Number,
            description: ConversionTypeEnum.String,
            point: ConversionTypeEnum.String,
            createDate: ConversionTypeEnum.String,
            createUserID: ConversionTypeEnum.Number,
            modifyUserID: ConversionTypeEnum.Number,
            modifyDate: ConversionTypeEnum.String
        }

        super.update(data, conversionOptions);
    }
}