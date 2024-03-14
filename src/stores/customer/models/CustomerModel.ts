import { BaseModel } from 'sjs-base-model';

export default class CustomerModel extends BaseModel {
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
  public npwpName: string = '';
  public npwpAddress: string = '';
  public financeCPName: string = '';
  public financeCPPhone: string = '';
  public financeCPEmail: string = '';
  public financeDirName: string = '';
  public financeDirPhone: string = '';
  public financeDirEmail: string = '';
  public executiveDirName: string = '';
  public executiveDirPhone: string = '';
  public executiveDirEmail: string = '';
  public createUserID: number = 0;
  public modifyUserID: number = 0;
  public flag: string = '';
  public soType: string = "";
  public customerIDC: string = "";

  constructor(data: Partial<CustomerModel>) {
    super();
    this.update(data);
  }
}
