

import { BaseModel } from 'sjs-base-model';

export default class DetailDelegationModel extends BaseModel {
 delegasiGenID: number = 0;
 toUser: number = 0;
 toUserStr: string = '';
 application: number = 0;
 applicationStr: string
 

  // constructor(data: Partial<DetailDelegationModel>) {
  //   super();
  //   this.update(data);
  // }

}
