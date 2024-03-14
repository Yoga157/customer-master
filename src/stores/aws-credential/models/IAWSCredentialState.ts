import AWSCredentialEnvelope from './AWSCredentialEnvelope';
import ResultActions from 'models/ResultActions';

export default interface IAWSCredentialState {
  readonly listData: AWSCredentialEnvelope;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly resultActions: ResultActions;
}
