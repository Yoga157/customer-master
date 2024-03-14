import IPOCTableRow from './IPOCTableRow';

export default interface IPOCTable {
  readonly totalRow: number;
  readonly rows: IPOCTableRow[];
}
