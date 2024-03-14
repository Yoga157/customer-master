import { BaseModel } from 'sjs-base-model';



export class CIListBySNRowsModel extends BaseModel {  
  public readonly configItemGenID: number  = 0;
  public readonly poNumber: string = '';
  public readonly poDate: string | Date = null;
  public readonly vendorName: string = '';
  public readonly brand: string = '';
  public readonly productDescription: string = '';
  public readonly productNumber: string = '';
  public readonly serialNumber: string = '';
  public readonly warranty: string | Date = null;

  constructor(data: Partial<CIListBySNRowsModel>) {
    super();

    this.update(data);
  }
}

export default class ConfigItemListBySerialNumber extends BaseModel {  
  public readonly totalRows: number  = 0;
  public readonly rows: CIListBySNRowsModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: string = '';
  public readonly filter: string = '';

  constructor(data: Partial<ConfigItemListBySerialNumber>) {
    super();

    this.update(data);
  }
}
