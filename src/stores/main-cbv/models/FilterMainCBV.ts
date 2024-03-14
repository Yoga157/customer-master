import { BaseModel } from 'sjs-base-model';

export default class FilterMainCBV extends BaseModel {
    public userLoginID: number = 0;
    public customer: string = '';
    public remainingAmount: number = 0;
    public usedAmount: number = 0;
    public page: number = 0;
    public pageSize: number = 0;
    public column: string = '';
    public sorting: string = '';
  
    constructor(data: Partial<FilterMainCBV>) {
      super();
      this.update(data);
    }
}
