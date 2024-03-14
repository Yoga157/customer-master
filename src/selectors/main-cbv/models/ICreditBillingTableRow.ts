export default interface ICreditBillingTableRow {
  readonly creditId: number;
  readonly voucherNo: string;
  readonly accountID: string;
  readonly voucherAmountH: number;
  readonly usedAmountH: number;
  readonly remainingAmountH: number;
  readonly sourceCustomerID: number;
  readonly sourceCustomerIDStr: string;
  readonly picName: string;
  readonly notes: string;
  readonly createdBy: string;
  readonly createdDate: string;
  readonly modifiedBy: string;
  readonly modifiedDate: string;
  readonly createDate: string;
  readonly createUserID: number;
  readonly modifyDate: string;
  readonly modifyUserID: number;
}
