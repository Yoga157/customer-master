import { BaseModel } from 'sjs-base-model';

export default class ConfigItemFilter extends BaseModel {  
  poDateStartDate: string
  poDateEndDate: string
  poCloseDateStartDate: string
  poCloseDateEndDate: string
  vendorNameList: string
  vendorTypeList: string
  customerIDList: string
  departmentList: string
  column: string
  sorting: string
  page: number  = 0
  pageSize: number  = 0
  // userLoginID: number  = 0

  constructor(data: Partial<ConfigItemFilter>) {
    super();

    this.update(data);
  }
}
