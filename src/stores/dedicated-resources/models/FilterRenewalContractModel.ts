import { BaseModel } from 'sjs-base-model';

export default class FilterRenewalContractModel extends BaseModel {
    public contractStatus: string = '';
    public department: string = '';
    public supervisor: string = '';
    public beginDate: string = '';
    public endDate: string = '';
    public beginDateConvert: string = '';
    public endDateConvert: string = '';
    public returnDoc: string = '';
    public page: number = 0;
    public pageSize: number = 0;
    public column: string = '';
    public sorting: string = '';
    public userLoginID: number = 0;
  
    constructor(data: Partial<FilterRenewalContractModel>) {
      super();
      this.update(data);
    }
}
