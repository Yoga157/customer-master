// "salesID": 45671,
// "dept": "CME BDG",
// "sales": "Puspa Anggraeni",
// "customerCreditAmount": 10000000,
// "actualCreditUsedAmount": 6000000,
//   "remainingAmount": 4000000

  export default interface IDashboardSalesTableRow {
    readonly salesID: number;
    readonly dept: string;
    readonly sales: string;
    readonly customerCreditAmount: number;
    readonly actualCreditUsedAmount: number;
    readonly remainingAmount: number;
  }
  