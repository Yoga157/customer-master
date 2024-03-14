import { BaseModel, IConversionOption, ConversionTypeEnum } from "sjs-base-model";

export default class DepartmentDropdownOptions extends BaseModel {    
    public readonly textData: string = "";
    public readonly valueData: string = "";

    constructor(data: Partial<DepartmentDropdownOptions>) {
        super();

        this.update(data);
    }

    public update(data: Partial<DepartmentDropdownOptions>): void {
        const conversionOptions: IConversionOption = {            
            textData: ConversionTypeEnum.String,
            valueData: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
}