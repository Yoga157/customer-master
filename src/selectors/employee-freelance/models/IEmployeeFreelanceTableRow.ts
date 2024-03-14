export default interface IEmployeeFreelanceTableRow {
    readonly employeeFreelanceGenID: number;
    readonly superiorEmail: string;
    readonly email: string;
    readonly fullname: string;
    readonly nikktp: string;
    readonly dateOfBirth: string;
    readonly phone: string;
    readonly effectiveDate: string;
    readonly expiredDate: string;
    readonly createDate?: Date | null | undefined;
    readonly createUserID: number;  
    readonly modifyDate?: Date | null | undefined;
    readonly modifyUserID: number;
    readonly status: boolean;
    readonly isHaveActivity: boolean;
}