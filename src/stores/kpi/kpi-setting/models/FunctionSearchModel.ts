import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class FunctionSearchModel extends BaseModel {
    valueData: number = 0;
    textData: string = "";

    constructor(data: Partial<FunctionSearchModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<FunctionSearchModel>): void {
        const conversionOptions: IConversionOption = {
            valueData: ConversionTypeEnum.Number,
            textData: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};