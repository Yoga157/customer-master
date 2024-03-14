import { BaseModel } from 'sjs-base-model';

export default class LoginModel extends BaseModel {
  public readonly userName: string = '';
  public readonly password: string = '';
  public readonly rememberMe: boolean = false;
  constructor(data: Partial<LoginModel>) {
    super();

    this.update(data);
  }
}
