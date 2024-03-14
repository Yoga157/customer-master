export default interface IFunnelSupportTeamsTableRow {
  readonly funnelGenID: number;
  readonly funnelSupportID: number;
  readonly employeeID: number;
  readonly employeeName: string;
  readonly supportRoleID: number;
  readonly supportRole: string;
  readonly assignedByID: number;
  readonly assignedBy: string;
  readonly assignDate?: Date | undefined | null;
  readonly notes: string;
  readonly flagDelete: number;
}
