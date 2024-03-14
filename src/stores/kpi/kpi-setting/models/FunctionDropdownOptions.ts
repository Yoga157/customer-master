import { BaseModel, IConversionOption, ConversionTypeEnum } from "sjs-base-model";

export default class FunctionDropdownOptions extends BaseModel {    
    public readonly textData: string = "";
    public readonly valueData: string = "";

    constructor(data: Partial<FunctionDropdownOptions>) {
        super();

        this.update(data);
    }

    public update(data: Partial<FunctionDropdownOptions>): void {
        const conversionOptions: IConversionOption = {            
            textData: ConversionTypeEnum.String,
            valueData: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
};