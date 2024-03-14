import { BaseModel } from 'sjs-base-model';
export default class FunnelHeaderNameModel extends BaseModel {
  customerName: string = '';
  endUserCustomerName: string = '';
  customerPICName: string = '';
  CustomerPICJobTitle: string = '';
  CustomerPICEmail: string = '';
  CustomerPICPhone: string = '';
  currency: string = '';
  status: string = '';
  employeeKey: number = 0;
  employeeEmail: string = '';
  employeeName: string = '';
  notes: string = '';
  domain: string = '';
  nilaiProject: number = 0;
  viewAccess: string = '';
  haveViewAccessArr: string[] = [];
  funnelOpportunityID: string = '';
  businessSoftware: string = '';
  infrastructureSoftware: string = '';
  programmingSoftware: string = '';
  operatingSystem: string = '';
  database: string = '';
  businessSoftware1: string[] = [];
  infrastructureSoftware1: string[] = [];
  programmingSoftware1: string[] = [];
  operatingSystem1: string[] = [];
  database1: string[] = [];

  constructor(data: Partial<FunnelHeaderNameModel>) {
    super();
    this.update(data);
  }
}
