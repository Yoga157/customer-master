import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class FunctionDropdownModel extends BaseModel {
    textData: string = "";
    valueData: string = "";

    constructor(data: Partial<FunctionDropdownModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<FunctionDropdownModel>): void {
        const conversionOptions: IConversionOption = {
            textData: ConversionTypeEnum.String,
            valueData: ConversionTypeEnum.String
        };
        
        super.update(data, conversionOptions);
    }

};