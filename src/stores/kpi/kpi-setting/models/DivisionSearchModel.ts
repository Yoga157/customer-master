import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class DivisionSearchModel extends BaseModel {
    valueData: number = 0;
    textData: string = "";

    constructor(data: Partial<DivisionSearchModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<DivisionSearchModel>): void {
        const conversionOptions: IConversionOption = {
            valueData: ConversionTypeEnum.Number,
            textData: ConversionTypeEnum.String,
        };
        
        super.update(data, conversionOptions);
    }

};