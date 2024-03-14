import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class DivisionDropdownModel extends BaseModel {
    textData: string = "";
    valueData: string = "";

    constructor(data: Partial<DivisionDropdownModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<DivisionDropdownModel>): void {
        const conversionOptions: IConversionOption = {
            textData: ConversionTypeEnum.String,
            valueData: ConversionTypeEnum.String
        };
        
        super.update(data, conversionOptions);
    }

};