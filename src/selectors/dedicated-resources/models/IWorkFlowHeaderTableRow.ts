export default interface IWorkFlowHeaderTableRow {
  readonly workflowHeaderGenID: number;
  readonly workflowDetailGenID: number;
  readonly stepName: string;
  readonly status: string;
  readonly employeeID: number;
  readonly employeeName: string;
  readonly employeeEmail: string;
  readonly notes: string;
  readonly tanggal: string;
  readonly stepTelerik: string;
  readonly flagApprove: number;
}
