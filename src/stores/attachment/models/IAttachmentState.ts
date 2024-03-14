import AttachmentTopActiveEnvelope from "./AttachmentTopActiveEnvelope";
import GeneralListEnvelope from "./GeneralListEnvelope";
import AttachmentEnvelope from "./AttachmentEnvelope";
import AttachmentHistory from "./AttachmentHistory";
import ResultActions from "models/ResultActions";
import AttachmentModel from "./AttachmentModel";

export default interface IAttachmentState {
    readonly listData:AttachmentEnvelope
    readonly firstData:AttachmentModel
    readonly ResultActions: ResultActions
    readonly attachmentNullTrue: AttachmentTopActiveEnvelope
    readonly attachmentTopActive: AttachmentTopActiveEnvelope
    readonly generalList: GeneralListEnvelope
    readonly attachmentTopHistory: AttachmentHistory[]
    readonly fileDownload:any
    readonly error:boolean
    readonly refreshPage:boolean
  }
  