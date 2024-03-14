import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class DepartmentDropdownModel extends BaseModel {
    textData: string = "";
    valueData: string = "";

    constructor(data: Partial<DepartmentDropdownModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<DepartmentDropdownModel>): void {
        const conversionOptions: IConversionOption = {
            textData: ConversionTypeEnum.String,
            valueData: ConversionTypeEnum.String
        };
        
        super.update(data, conversionOptions);
    }

};