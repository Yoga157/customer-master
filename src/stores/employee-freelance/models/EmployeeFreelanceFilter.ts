import { BaseModel } from 'sjs-base-model';

export default class EmployeeFreelanceFilter extends BaseModel {
    effectiveDate?: string = '';
    expiredDate?: string = '';
    employeeStatusList?: string = '';
    isHaveActivityList?: string = '';
    page: number = 0;
    pageSize: number = 0;
    column: string = '';
    sorting: string = '';
    userLogin: string = '';
    
    constructor(data: Partial<EmployeeFreelanceFilter>) {
        super();
        this.update(data);
    }
};