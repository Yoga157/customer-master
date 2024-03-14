import { BaseModel, IConversionOption, ConversionTypeEnum } from "sjs-base-model";

export default class StatusOptions extends BaseModel {
    public readonly valueData: number = 0;
    public readonly textData: string = "";

    constructor(data: Partial<StatusOptions>) {
        super();

        this.update(data);
    }

    public update(data: Partial<StatusOptions>): void {
        const conversionOptions: IConversionOption = {
            valueData: ConversionTypeEnum.Number,
            textData: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
}