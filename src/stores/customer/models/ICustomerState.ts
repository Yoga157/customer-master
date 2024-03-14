import CustomerModel from './CustomerModel';
import CustomerExistingModel from './CustomerExistingModel';
import CustomerOptions from './CustomerOptions';
import CustomerFunnel from './CustomerFunnel';
import ResultActions from 'models/ResultActions';

export default interface ICustomerState {
  readonly customer: CustomerModel[];
  readonly customerOption: CustomerOptions[];
  readonly customerFunnel: CustomerFunnel[];
  readonly customerTypeC: CustomerModel[];
  readonly customerIDCNotNull: CustomerModel[];
  readonly customerWithFlag: any[];
  readonly customerSingle: CustomerModel;
  readonly refreshPage: boolean;
  readonly error: boolean;
  readonly resultActions: ResultActions;
  readonly customerExisting: CustomerExistingModel;
  readonly customerExistingFunnel: CustomerExistingModel;
}
