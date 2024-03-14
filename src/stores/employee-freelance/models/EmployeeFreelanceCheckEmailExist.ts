import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class EmployeeFreelanceCheckEmailExist extends BaseModel {
    public email: string = '';
    public isExist: boolean = false;
    
    constructor(data: Partial<EmployeeFreelanceCheckEmailExist>) {
        super();
        this.update(data);
    }

    public update(data: Partial<EmployeeFreelanceCheckEmailExist>): void {
        const conversionOptions: IConversionOption = {
            email: ConversionTypeEnum.String,
            isExist: ConversionTypeEnum.Boolean
        };

        super.update(data, conversionOptions);
    }
};