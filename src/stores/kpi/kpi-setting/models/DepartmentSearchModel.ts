import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class DepartmentSearchModel extends BaseModel {
    valueData: number = 0;
    textData: string  = "";

    constructor(data: Partial<DepartmentSearchModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<DepartmentSearchModel>): void {
        const conversionOptions: IConversionOption = {
            valueData: ConversionTypeEnum.Number,
            textData: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};