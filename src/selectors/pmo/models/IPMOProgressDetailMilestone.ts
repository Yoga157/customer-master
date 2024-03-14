export interface Data {
  readonly   taskId: number;
  readonly   title: string;
  readonly   description: string;
  readonly   remark: string;
  readonly   actualStartDate: string;
  readonly   actualEndDate: string;
  readonly   precentageTask: number;
  readonly   taskStatus: string;
  readonly   isMilestone: boolean;
}
export default interface IPMOProgressDetailMilestone {
  readonly   progresses: Data
}