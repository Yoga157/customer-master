import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class EmployeeFreelanceCheckEmailExistRequest extends BaseModel {
    public email: string = '';
    
    constructor(data: Partial<EmployeeFreelanceCheckEmailExistRequest>) {
        super();
        this.update(data);
    }

    public update(data: Partial<EmployeeFreelanceCheckEmailExistRequest>): void {
        const conversionOptions: IConversionOption = {
            email: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
};