import { BaseModel } from 'sjs-base-model';
import EmployeeDqAllModel from './EmployeeDqAllModel';

export default class SearchALLModel extends EmployeeDqAllModel {  
  constructor(data: Partial<SearchALLModel>) {
    super(data);
    this.update(data);
  }
}