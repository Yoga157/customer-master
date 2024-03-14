import { BaseModel, IConversionOption, ConversionTypeEnum } from "sjs-base-model";

export default class DireksiOptions extends BaseModel {
    public readonly valueData: number = 0;
    public readonly textData: string = "";

    constructor(data: Partial<DireksiOptions>) {
        super();

        this.update(data);
    }

    public update(data: Partial<DireksiOptions>): void {
        const conversionOptions: IConversionOption = {
            valueData: ConversionTypeEnum.Number,
            textData: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
}