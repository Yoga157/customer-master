 import { BaseModel } from 'sjs-base-model';

export default class GetEscalationModel extends BaseModel {
  
  public  taskId: number = 0;
  public  userLoginId: number = 0;
  public  userLoginKey: number = 0;
  public  userLogin: string = '';

  constructor(data: Partial<GetEscalationModel>) {
    super();

    this.update(data);
  }
}
