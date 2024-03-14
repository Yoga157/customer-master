import IAttachmentAndAcceptenceTableRow from './IAttachmentAndAcceptenceTableRow';

export default interface IAttachmentAndAcceptenceTable {
  readonly totalRow: number;
  readonly rows: IAttachmentAndAcceptenceTableRow[];
}
