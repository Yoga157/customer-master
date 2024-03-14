import ICBVAttachmentTableRow from './ICBVAttachmentTableRow';

export default interface ICBVAttachmentTable {
  readonly totalRows: number;
  readonly rows: ICBVAttachmentTableRow[];
}
