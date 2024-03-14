import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class EmployeeFreelanceDashboardModel extends BaseModel {
    employeeFreelanceGenID: number = 0;
    email: string = '';
    fullname: string = '';
    nikktp: string = '';
    dateOfBirth: string = '';
    effectiveDate: string = '';
    expiredDate: string = '';
    superiorEmail: string = '';
    phone: string = '';
    status: boolean = false;
    isHaveActivity: boolean = false;
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;

    constructor(data: Partial<EmployeeFreelanceDashboardModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<EmployeeFreelanceDashboardModel>): void {
        const conversionOptions: IConversionOption = {
            employeeFreelanceGenID: ConversionTypeEnum.Number,
            email: ConversionTypeEnum.String,
            fullname: ConversionTypeEnum.String,
            nikktp: ConversionTypeEnum.String,
            dateOfBirth: ConversionTypeEnum.String,
            effectiveDate: ConversionTypeEnum.String,
            expiredDate: ConversionTypeEnum.String,
            superiorEmail: ConversionTypeEnum.String,
            phone: ConversionTypeEnum.String,
            status: ConversionTypeEnum.Boolean,
            isHaveActivity: ConversionTypeEnum.Boolean,
            createUserID: ConversionTypeEnum.Number,
            modifyUserID: ConversionTypeEnum.Number,
        };

        super.update(data, conversionOptions);
    }
}
