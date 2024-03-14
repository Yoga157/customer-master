import POCEnvelope from './POCEnvelope';
import POCRequestModel from './POCRequestModel';

export default interface IBoqState {
  readonly listData: POCEnvelope;
  readonly firstData: POCRequestModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
