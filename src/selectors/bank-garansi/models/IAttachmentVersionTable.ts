import IAttachmentVersionTableRow from './IAttachmentVersionTableRow';

export default interface IAttachmentVersionTable {
  readonly totalRow:number;
  readonly rows: IAttachmentVersionTableRow[];
}
