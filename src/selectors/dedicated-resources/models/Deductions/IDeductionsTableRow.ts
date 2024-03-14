export default interface IDeductionsTableRow {
    readonly deductID: number;
    readonly contractID: number;
    readonly percentage: number;
    readonly deductType: string;
    readonly deductTypeStr: string;
    readonly deductDesc: string;
    readonly deductDescStr: string;
    readonly amount: number;
    readonly remark: string;
    readonly isSave: number;
    readonly userLoginID: number;
    //BulkUpdate
    readonly BulkDeductionID: number;
  }
  