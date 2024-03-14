import { BaseModel } from 'sjs-base-model';



export class ConfigItemRowsModel extends BaseModel {  
  public readonly customerName: string = '';
  public readonly buNumber: string = '';
  public readonly dept: string = '';
  public readonly note: string = '';
  public readonly createDate: string = '';

  public readonly poNumber: string = '';
  public readonly poDate: string = '';
  public readonly poCloseDate: string = '';
  public readonly poAdmin: string = '';
  public readonly vendorName: string = '';
  public readonly vendorType: string = '';
  public readonly poStatus: string = '';
  public readonly eta: string = '';
  public readonly expectedArrivalDate: string = '';
  public readonly expectedDeliveryDate: string = '';
  public readonly pmoRemark: string = '';
  public readonly poRemark: string = '';


  public readonly productNumber: string = '';
  public readonly soNumber: string = '';
  public readonly doNumber: string = '';
  public readonly lpbNumber: string = '';
  public readonly lpbDate: string = '';
  public readonly doDate: string = '';
  public readonly productDescription: string = '';
  public readonly brand: string = '';
  public readonly quantityPO: number = 0;
  public readonly serialNumberStatus: string = '';
  
  public readonly startWarranty: string = '';
  public readonly endWarranty: string = '';
  public readonly preventiveDate: string = '';
  public readonly warrantyDuration: string = '';
  public readonly preventiveSchedule: string = '';
  
  public readonly configItemGenID: number = 0;
  public readonly serialNumber: string = '';

  constructor(data: Partial<ConfigItemRowsModel>) {
    super();

    this.update(data);
  }
}

export default class ConfigItemList extends BaseModel {  
  public readonly totalRows: number  = 0;
  public readonly rows: ConfigItemRowsModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: string = '';
  public readonly filter: string = '';

  public readonly bSuccess :boolean = false; 
  public readonly errorNumber: string = '';
  public readonly message: string = '';
  public readonly resultObj: any = null;

  constructor(data: Partial<ConfigItemList>) {
    super();

    this.update(data);
  }
}
