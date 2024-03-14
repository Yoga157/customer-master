import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class EmployeeFreelanceCheckNIKKTPExistRequest extends BaseModel {
    public nikktp: string = '';
    
    constructor(data: Partial<EmployeeFreelanceCheckNIKKTPExistRequest>) {
        super();
        this.update(data);
    }

    public update(data: Partial<EmployeeFreelanceCheckNIKKTPExistRequest>): void {
        const conversionOptions: IConversionOption = {
            nikktp: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
};