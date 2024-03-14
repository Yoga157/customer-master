import ISalaryBenefitTableRow from './ISalaryBenenfitTableRow';

export default interface ISalaryBenefitTable {
  readonly totalRows: number;
  readonly totalGrossCurrAmount: number;
  readonly totalGrossNewAmount: number;
  readonly rows: ISalaryBenefitTableRow[];
}
