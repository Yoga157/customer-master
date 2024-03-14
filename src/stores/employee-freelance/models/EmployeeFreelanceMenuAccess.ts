import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class EmployeeFreelanceMenuAccess extends BaseModel {
    public email: string = '';
    public isAllowAccess: boolean = false;
    public status: string = '';

    constructor(data: Partial<EmployeeFreelanceMenuAccess>) {
        super();
        this.update(data);
    }

    public update(data: Partial<EmployeeFreelanceMenuAccess>): void {
        const conversionOptions: IConversionOption = {
            email: ConversionTypeEnum.String,
            isAllowAccess: ConversionTypeEnum.Boolean,
            status: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};