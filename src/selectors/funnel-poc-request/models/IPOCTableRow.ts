export default interface IPOCTableRow {
  readonly pocGenHID: number;
  readonly funnelGenID: number;
  readonly pocExpectedDate: Date | null;
  readonly pocActualDate: Date | null;
  readonly pocNotes: string;
  readonly pocPresalesDeptID: string;
  readonly picName: string;
  readonly pocStatusID: number;
  readonly pocStatus: string;
  readonly createDate?: Date | null;
  readonly createUserID: number;
  readonly requestor: string;
  readonly modifyDate?: Date | null;
  readonly modifyUserID: number;
  readonly lastUpdateBy: string;
}
