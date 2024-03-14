export default interface ISalaryBenefitTableRow {
    readonly salaryID: number;
    readonly contractID: number;
    readonly salaryType: string;
    readonly salaryDesc: string;
    readonly salaryTypeStr: string;
    readonly salaryDescStr: string;
    readonly currentAmount: number;
    readonly newAmount: number;
    readonly remark: string;
    readonly isSave: number;
    readonly userLoginID: number;
    readonly increase: number;
    readonly percentage: number;
    //BulkUpdate
    readonly BulkSalaryID: number;
  }
  