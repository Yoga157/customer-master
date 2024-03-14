import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class EmployeeFreelanceCheckNIKKTPExist extends BaseModel {
    public nikktp: string = '';
    public isExist: boolean = false;
    
    constructor(data: Partial<EmployeeFreelanceCheckNIKKTPExist>) {
        super();
        this.update(data);
    }

    public update(data: Partial<EmployeeFreelanceCheckNIKKTPExist>): void {
        const conversionOptions: IConversionOption = {
            nikktp: ConversionTypeEnum.String,
            isExist: ConversionTypeEnum.Boolean
        };

        super.update(data, conversionOptions);
    }
};