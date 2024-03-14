import { BaseModel } from 'sjs-base-model';

export default class FunnelViewEditCustomerDetails extends BaseModel {
  public funnelGenID: number = 0;
  public customerGenID: number = 0;
  public customerID: number = 0;
  public addr1: string = '';
  public customerName: string = '';
  public addr2: string = '';
  public addr3: string = '';
  public addr4: string = '';
  public city: string = '';
  public phoneNumber: string = '';
  public industryClass: string = '';
  public website: string = '';
  public socialMedia: string = '';
  public endUserFlag: string = '';
  public memberGroup: string = '';
  public npwpNumber: string = '';
  public npwpAddress: string = '';
  public npwpName: string = '';
  public financeCPName: string = '';
  public financeCPPhone: string = '';
  public financeCPEmail: string = '';
  public financeDirName: string = '';
  public financeDirPhone: string = '';
  public financeDirEmail: string = '';
  public executiveDirName: string = '';
  public executiveDirPhone: string = '';
  public executiveDirEmail: string = '';
  public salesID: number = 0;
  public customerPICID: number = 0;
  public picName: string = '';
  public picMobilePhone: string = '';
  public picEmailAddr: string = '';
  public picJobTitle: string = '';
  public modifyUserID: number = 0;
  public customerCardID: string = '';
  fileDownload: string = '';
  public flagCustomerBlacklist: string = '';

  constructor(data: Partial<FunnelViewEditCustomerDetails>) {
    super();
    this.update(data);
  }
}
