import AttachmentVersionsModel from './AttachmentVersionsModel';
import AttachmentVersionsEnvelope from './AttachmentVersionsEnvelope';

export default interface IAttachmentState {
  readonly listData: AttachmentVersionsEnvelope;
  readonly listDataPMO: AttachmentVersionsEnvelope;
  readonly firstData: AttachmentVersionsModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
