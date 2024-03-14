import IServiceCatalogTableRow from './IServiceCatalogTableRow';

export default interface IServiceCatalogTable {
  readonly totalRow: number;
  readonly rows: IServiceCatalogTableRow[];
}
