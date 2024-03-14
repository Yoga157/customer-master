
export interface IConfigItemsProductTableDetailRow {
  readonly configItemGenID: number
  readonly serialNumber: string
  readonly poNumber: string
  readonly productNumber: string
  readonly productDescription: string
}

export interface IConfigItemsProductTableRow {
  readonly poNumber: string 
  readonly eta: string 
  readonly expectedArrivalDate: string 
  readonly expectedDeliveryDate: string 
  readonly productNumber: string 
  readonly soNumber: string 
  readonly doNumber: string 
  readonly lpbNumber: string 
  readonly lpbDate: string 
  readonly doDate: string 
  readonly productDescription: string 
  readonly brand: string 
  readonly quantityPO: number
  readonly serialNumberStatus: string 
  
  readonly startWarranty: string 
  readonly endWarranty: string 
  readonly preventiveDate: string 
  readonly warrantyDuration: string 
  readonly preventiveSchedule: string 
}

export interface IConfigItemsTableRow {
   readonly customerName: string 
   readonly bunUmber: string 
   readonly dept: string 
   readonly note: string 
   readonly createDate: string 

   readonly poNumber: string 
   readonly poDate: string 
   readonly poCloseDate: string 
   readonly poAdmin: string 
   readonly vendorName: string 
   readonly vendorType: string 
   readonly poStatus: string 
   readonly eta: string 
   readonly expectedArrivalDate: string 
   readonly expectedDeliveryDate: string 
   readonly pmoRemark: string 
   readonly poRemark: string 
}

export default interface IConfigItemsTable {
  readonly totalRows: number;
  readonly rows: IConfigItemsTableRow[] | IConfigItemsProductTableRow[] | IConfigItemsProductTableDetailRow[];
  readonly column: string ;
  readonly sorting: string ;
  readonly search: string ;
  readonly filter: string ;
}
