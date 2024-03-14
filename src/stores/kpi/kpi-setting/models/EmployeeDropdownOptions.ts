import { BaseModel, IConversionOption, ConversionTypeEnum } from "sjs-base-model";

export default class EmployeeDropdownOptions extends BaseModel {    
    public readonly textData: string = "";
    public readonly valueData: string = "";

    constructor(data: Partial<EmployeeDropdownOptions>) {
        super();

        this.update(data);
    }

    public update(data: Partial<EmployeeDropdownOptions>): void {
        const conversionOptions: IConversionOption = {            
            textData: ConversionTypeEnum.String,
            valueData: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
}