import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class EmployeeFreelanceMenuAccessRequest extends BaseModel {
    public email: string = '';
    
    constructor(data: Partial<EmployeeFreelanceMenuAccessRequest>) {
        super();
        this.update(data);
    }

    public update(data: Partial<EmployeeFreelanceMenuAccessRequest>): void {
        const conversionOptions: IConversionOption = {
            email: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};