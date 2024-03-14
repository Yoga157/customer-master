import IAttachmentTableRow from './IAttachmentTableRow';

export default interface IAttachmentTable {
  readonly totalRow: number;
  readonly rows: IAttachmentTableRow[];
}
