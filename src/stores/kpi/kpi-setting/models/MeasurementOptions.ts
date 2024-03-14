import { BaseModel, IConversionOption, ConversionTypeEnum } from "sjs-base-model";

export default class MeasurementOptions extends BaseModel {
    public readonly valueData: number = 0;
    public readonly textData: string = "";

    constructor(data: Partial<MeasurementOptions>) {
        super();

        this.update(data);
    }

    public update(data: Partial<MeasurementOptions>): void {
        const conversionOptions: IConversionOption = {
            valueData: ConversionTypeEnum.Number,
            textData: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
}