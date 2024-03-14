import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import FunnelOpportunityRow from './FunnelOpportunityRow';

export default class CustomerModel extends BaseModel {
  customerGenID: number = 0;
  customerID: number = 0;
  customerName: string = '';
  addr1: string = '';
  addr2: string = '';
  addr3: string = '';
  addr4: string = '';
  // city: "",
  //   "phoneNumber": "+65 6883 6885",
  //   "industryClass": "5100      ",
  //   "website": "www.edwards.com",
  //   "socialMedia": "",
  //   "endUserFlag": "  ",
  //   "memberGroup": "",
  //   "npwpName": "",
  //   "npwpNumber": "",
  //   "npwpAddress": "",
  //   "financeCPName": "",
  //   "financeCPPhone": "",
  //   "financeCPEmail": "",
  //   "financeDirName": "",
  //   "financeDirPhone": "",
  //   "financeDirEmail": "",
  //   "executiveDirName": "",
  //   "executiveDirPhone": "",
  //   "executiveDirEmail": "",
  //   "createDate": "2021-02-03T16:40:35.957",
  //   "createUserID": 48499,
  //   "modifyDate": "2021-02-03T16:40:35.957",
  //   "modifyUserID": 48499

  constructor(data: Partial<CustomerModel>) {
    super();

    this.update(data);
  }
}
