import { BaseModel } from 'sjs-base-model';
import CustomerModel from './CustomerModel';
import CustomerPICModel from './CustomerPICModel';

export default class CustomerFileModel {
  public ImageFile: any = '';
  public npwpFile: any = '';
  public customerPIC: CustomerPICModel = new CustomerPICModel({});
  public customer: CustomerModel = new CustomerModel({});
}
