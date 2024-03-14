import IOtherBenefitTableRow from './IOtherBenefitTableRow';

export default interface IOtherBenefitTable {
  readonly totalRows: number;
  readonly rows: IOtherBenefitTableRow[];
}
