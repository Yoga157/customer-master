
import { BaseModel } from 'sjs-base-model';
export default class ResubmitFunnelHeaderNameModel extends BaseModel {
  customerName: string = '';
  endUserCustomerName: string = '';
  currency: string = '';
  status: string = '';
  employeeKey: number = 0;
  employeeEmail: string = '';
  employeeName: string = '';
  username: string = '';
  notes: string = '';
  domain: string = '';
  nilaiProject: number = 0;
  flagCustomerBlacklist: string = '';
  funnelOpportunityID: string = '';
  // customerPICName: string = '';
  // CustomerPICJobTitle: string = '';
  // CustomerPICEmail: string = '';
  // CustomerPICPhone: string = '';

  constructor(data: Partial<ResubmitFunnelHeaderNameModel>) {
    super();
    this.update(data);
  }
}
