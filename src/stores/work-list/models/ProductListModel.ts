// Product Name	Product Number	Serial Number	Sales Unit

import { BaseModel } from 'sjs-base-model';
  
  export default class ProductListModel extends BaseModel {
  public activityReportProductGenID:number = 0;
  public activityReportGenID:number = 0;
  public productName:string = '';
  public productNumber:string = '';
  public serialNumber:string = '';
  public quantity:number = 0;
  public salesUnit:string = '';
  public createDate:string = '';
  public createUserID:number = 0;
  public modifyDate:string = '';
  public modifyUserID:number = 0;

    constructor(data: Partial<ProductListModel>) {
    super();
    this.update(data);
  }
 }
