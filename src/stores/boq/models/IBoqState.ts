import ResultActions from 'models/ResultActions';
import BoqEnvelope from './BoqEnvelope';
import BoqModel from './BoqModel';

export default interface IBoqState {
  readonly listData: BoqEnvelope;
  readonly firstData: BoqModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly resultActions: ResultActions;
}
