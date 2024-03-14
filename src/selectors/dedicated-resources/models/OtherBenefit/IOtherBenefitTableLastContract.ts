import IOtherBenefitTableRowLastContract from './IOtherBenefitTableRowLastContract';

export default interface IOtherBenefitTableLastContract {
  readonly totalRows: number;
  readonly column: string;
  readonly sorting: string;
  readonly rows: IOtherBenefitTableRowLastContract[];
}
