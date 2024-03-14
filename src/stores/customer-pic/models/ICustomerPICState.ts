import ResultActions from 'models/ResultActions';
import CustomerPICModel from './CustomerPICModel';

export default interface ICustomerState {
  readonly customerPic: CustomerPICModel[];
  readonly firstData: CustomerPICModel;
  readonly refreshPage: boolean;
  readonly error: boolean;
  readonly resultActions: ResultActions;
}
