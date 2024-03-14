import FunnelOpportunityModel from './FunnelOpportunityModel';

export default interface IFunnelState {
  readonly data: FunnelOpportunityModel;
  listCustomer: any[];
  employee: any[];
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
  dataById: any;
  listDirektorat: any[];
  checkData: string;
}
