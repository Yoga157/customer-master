import IMasterInsuranceTableRow from './IMasterInsuranceTableRow';

export default interface IMasterInsuranceTable {
  readonly totalRow:number;
  readonly rows: IMasterInsuranceTableRow[];
}
