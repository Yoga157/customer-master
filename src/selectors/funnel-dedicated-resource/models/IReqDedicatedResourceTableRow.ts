export default interface IReqDedicatedResourceTableRow {
  readonly reqResourceGenID: number;
  readonly funnelGenID: number;
  readonly engineerDeptID: string;
  readonly numOfResource: number;
  readonly engineerDeptName: string;
  readonly requirementDescription: string;
  readonly projectBudget: number;
  readonly paymentType: string;
  readonly createUserID: number;
  readonly createName: string;
  readonly lastModifyBy: string;
  readonly status: string;
  readonly createDate?: Date | undefined | null;
  readonly modifyDate?: Date | undefined | null;
  readonly modifyUserID: number;
}
