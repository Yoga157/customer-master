import IAttachmentVersionsTableRow from './IAttachmentVersionsTableRow';

export default interface IAttachmentVersionsTable {
  readonly totalRow: number;
  readonly rows: IAttachmentVersionsTableRow[];
}
