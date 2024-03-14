import IPOCRequirementTableRow from './IPOCRequirementTableRow';

export default interface IPOCRequirementTable {
  readonly totalRow: number;
  readonly rows: IPOCRequirementTableRow[];
}
