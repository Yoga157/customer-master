export default interface ISalaryBenefitTableRowById {
    readonly salaryID: number;
    readonly contractID: number;
    readonly salaryType: string;
    readonly salaryTypeStr: string;
    readonly salaryDesc: string;
    readonly salaryDescStr: string;
    readonly currentAmount: number;
    readonly salaryTypeID: string;
    readonly salaryDescID: string;
    readonly newAmount: number;
    readonly increase: number;
    readonly remark: string;
    readonly createdDate: string;
    readonly createdByID: number;
    readonly modifiedDate: string;
    readonly modifiedByID: number;
  }
  