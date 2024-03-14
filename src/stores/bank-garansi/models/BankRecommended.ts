import { BaseModel } from 'sjs-base-model';

 export default class BankRecommended extends BaseModel {
    public estimationFinish:string = "";
    public bankInsurance:string = "";


  constructor(data: Partial<BankRecommended>){
    super();
    this.update(data)
  }
 }

