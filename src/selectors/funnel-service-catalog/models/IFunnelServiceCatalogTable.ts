import IFunnelServiceCatalogTableRow from './IFunnelServiceCatalogTableRow';

export default interface IFunnelServiceCatalogTable {
  readonly totalRow: number;
  readonly totalPrice: number;
  readonly rows: IFunnelServiceCatalogTableRow[];
}
