import PMOListModel from './../../../stores/pmo/models/PMOListModel';

export default interface IPMOList {
  readonly totalRows: number;
  readonly rows: PMOListModel[];
  readonly column: string;
  readonly sorting: string;
  readonly search: string;
  readonly filter: string;
}
