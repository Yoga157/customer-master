import CreditBillingEnvelope from './CreditBillingEnvelope';
import ResultActions from 'models/ResultActions';
import SearchProjectNameModel from './SearchProjectNameModel';
import CBVAttachmentModel from './CBVAttachmentModel';
import CBVAssignModel from './CBVAssignModel';
import CBVDetail from './CBVDetail';
import CBVCreditByIDModel from './CBVCreditByIDModel';
import CBVUsageDetailEnvelope from './Detail_Usage_CBV/CBVUsageDetailEnvelope';
import CBVDocTypeModel from './CBVDocTypeModel';
import DropDownBillingPeriodModel from './DropDownBillingPeriodModel';
import CBVTypeVoucherModel from './CBVTypeVoucherModel';
import CBVEntitlementModel from './CBVEntitlementModel';

export default interface ICreditBillingState {
  readonly listData: CreditBillingEnvelope;
  readonly cbvusagedetailData: CBVUsageDetailEnvelope;
  readonly projectName: SearchProjectNameModel[];
  readonly CBVAttachment: CBVAttachmentModel[];
  readonly CBVAssign: CBVAssignModel[];
  readonly CBVDetail: CBVDetail[];
  readonly CBVGetById: CBVCreditByIDModel;
  readonly CBVCreditEntitlement: CBVEntitlementModel;
  readonly CBVDocType: CBVDocTypeModel[];
  readonly dataVoucherType: CBVTypeVoucherModel[];
  readonly DropDownBilling: DropDownBillingPeriodModel[];
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly refreshPageSubmit: boolean;
  readonly resultActions: ResultActions;
  readonly fileDownload:any
}
