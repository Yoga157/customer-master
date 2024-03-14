import ReqDedicatedResourceEnvelope from './ReqDedicatedResourceEnvelope';
import ReqDedicatedResourceModel from './ReqDedicatedResourceModel';

export default interface IReqDedicatedResourceState {
  readonly listData: ReqDedicatedResourceEnvelope;
  readonly data: ReqDedicatedResourceModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
