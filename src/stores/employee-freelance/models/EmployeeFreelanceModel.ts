import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class EmployeeFreelanceModel extends BaseModel {
    employeeFreelanceGenID: number = 0;
    email: string = '';
    fullname: string = '';
    dateOfBirth: string = '';
    effectiveDate: string = '';
    expiredDate: string = '';
    nikktp: string = '';
    dDateOfBirth?: Date = undefined;
    dEffectiveDate?: Date = undefined;
    dExpiredDate?: Date = undefined;
    superiorEmail: string = '';
    phone: string = '';
    status: boolean = false;
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;
    profilePicImage: string = '';
    
    constructor(data: Partial<EmployeeFreelanceModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<EmployeeFreelanceModel>): void {
        const conversionOptions: IConversionOption = {
            employeeFreelanceGenID: ConversionTypeEnum.Number,
            email: ConversionTypeEnum.String,
            fullname: ConversionTypeEnum.String,
            dateOfBirth: ConversionTypeEnum.String,
            effectiveDate: ConversionTypeEnum.String,
            nikktp: ConversionTypeEnum.String,
            expiredDate: ConversionTypeEnum.String,
            superiorEmail: ConversionTypeEnum.String,
            phone: ConversionTypeEnum.String,
            status: ConversionTypeEnum.Boolean,
            profilePicImage: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};