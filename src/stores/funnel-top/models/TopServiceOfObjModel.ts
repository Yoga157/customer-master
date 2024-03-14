import { BaseModel } from 'sjs-base-model';
import TopServiceModel from './TopServiceModel';

export default class TopServiceOfObjModel extends BaseModel {
  resultObj:TopServiceModel

  constructor(data: Partial<TopServiceOfObjModel>) {
    super();
    this.update(data);
  }

}
