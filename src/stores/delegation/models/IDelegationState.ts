import ResultActions from 'models/ResultActions';
import DelegationModel from './DelegationModel';
import ListAplicationModel from './ListAplicationModel';
import ListDelegationModel from './ListDelegationModel';

export default interface IDelegationState {
  readonly listData: ListDelegationModel;
  readonly application: ListAplicationModel[];
  readonly resultActions: ResultActions;
  readonly refreshPage: boolean;
  readonly error: boolean;
  readonly firstData: DelegationModel;
}
