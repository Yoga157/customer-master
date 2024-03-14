import { BaseModel, IConversionOption, ConversionTypeEnum } from "sjs-base-model";

export default class DivisionDropdownOptions extends BaseModel {    
    public readonly textData: string = "";
    public readonly valueData: string = "";

    constructor(data: Partial<DivisionDropdownOptions>) {
        super();

        this.update(data);
    }

    public update(data: Partial<DivisionDropdownOptions>): void {
        const conversionOptions: IConversionOption = {            
            textData: ConversionTypeEnum.String,
            valueData: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
};