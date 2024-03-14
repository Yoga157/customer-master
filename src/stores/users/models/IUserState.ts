import UserLoginModel from './UserResultModel';

export default interface IUserState {
  readonly data: UserLoginModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
