import IMeetingMomItemTableRow from './IMeetingMomItemTableRow';

export default interface IMeetingMomItemTable {
  readonly totalRow: number;
  readonly rows: IMeetingMomItemTableRow[];
}
