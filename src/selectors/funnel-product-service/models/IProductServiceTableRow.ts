export default interface IFunnelTableRow {
  funnelItemsID: number;
  funnelGenID: number;
  itemType: number;
  itemID?: number | undefined;
  itemName: string;
  itemSubID?: number | undefined;
  itemSubName: string;
  processorType?: number | undefined;
  processorTypeName: string;
  itemDescription: string;
  orderingPrice: number | undefined;
  sellingPrice: number | undefined;
  dealRegNo: string;
  dealRegExpiryDate?: Date;
  supplierName: string;
  supplierID: any;
  serviceCatalogFlag: string;
  flagEdit: string;
  isRental: number | undefined;
  isUpdate: number | undefined;
  isDelete: number | undefined;
  isAdd: number | undefined;
  cbvNo: string;
  flagSalesSpesialis: number ;
  salesSpesialis: string;
}
