import { BaseModel } from 'sjs-base-model';
import CustomerModel from './CustomerModel';
import CustomerPICModel from './CustomerPICModel';

export default class CustomersModel {
  public customerPIC: CustomerPICModel = new CustomerPICModel({});
  public customer: CustomerModel = new CustomerModel({});
  public NPWP: any = '';
}
