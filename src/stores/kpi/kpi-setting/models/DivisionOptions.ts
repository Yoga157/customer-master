import { BaseModel, IConversionOption, ConversionTypeEnum } from "sjs-base-model";

export default class DivisionOptions extends BaseModel {
    public readonly valueData: number = 0;
    public readonly textData: string = "";

    constructor(data: Partial<DivisionOptions>) {
        super();

        this.update(data);
    }

    public update(data: Partial<DivisionOptions>): void {
        const conversionOptions: IConversionOption = {
            valueData: ConversionTypeEnum.Number,
            textData: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
}