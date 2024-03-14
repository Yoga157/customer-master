import { BaseModel, IConversionOption, ConversionTypeEnum } from "sjs-base-model";

export default class FunctionOptions extends BaseModel {
    public readonly valueData: number = 0;
    public readonly textData: string = "";

    constructor(data: Partial<FunctionOptions>) {
        super();

        this.update(data);
    }

    public update(data: Partial<FunctionOptions>): void {
        const conversionOptions: IConversionOption = {
            valueData: ConversionTypeEnum.Number,
            textData: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
}