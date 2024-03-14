import { BaseModel, IConversionOption, ConversionTypeEnum } from "sjs-base-model";

export default class DepartmentOptions extends BaseModel {
    public readonly valueData: number = 0;
    public readonly textData: string = "";

    constructor(data: Partial<DepartmentOptions>) {
        super();

        this.update(data);
    }

    public update(data: Partial<DepartmentOptions>): void {
        const conversionOptions: IConversionOption = {
            valueData: ConversionTypeEnum.Number,
            textData: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
}