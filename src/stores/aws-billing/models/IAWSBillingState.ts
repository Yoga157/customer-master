import AWSBillingEnvelope from './AWSBillingEnvelope';
import ResultActions from 'models/ResultActions';
import AWSBillingByIdModel from './AWSBillingByIdModel';
import DropDownSearchCBVModel from './DropDownSearchCBVModel';
import DropDownSearchLPRModel from './DropDownSearchLPRModel';
import VoucherAmountPICNameModel from './VoucherAmountPICNameModel';
import DropDownPICModel from './DropDownPICModel';
import UsageDetailDashboardEnvelope from './UsageDetailDashhboard/UsageDetailDashboardEnvelope';
import BillingDetailPerProductEnvelope from './Aws_Billing_Detail_Perproduct/BillingDetailPerProductEnvelope';
import NeccessityModel from './NeccesityModel';
import AWSBillingHPermission from './AWSBillingPermission';
import DropDownSearchSOModel from './DropDownSearchSOModel';
import AWSAmountUnsettleModel from './AWSAmountUnsettleModel';
import AWSBillingPeriodModel from './AWSBillingPeriodModel';
import DropDownModel from './DropDownModel';

export default interface IAWSBillingState {
  readonly listData: AWSBillingEnvelope;
  readonly getDataById: AWSBillingByIdModel;
  readonly dropdownCbv: DropDownSearchCBVModel[];
  readonly dropdownLpr: DropDownSearchLPRModel[];
  readonly dropdownPIC: DropDownPICModel[];
  readonly dropdownSo: DropDownSearchSOModel[];
  readonly dropdownCustomerNameAWS: DropDownModel[];
  readonly dropdownDeptAWS: DropDownModel[];
  readonly dropdownPicAWS: DropDownModel[];
  readonly usageDetailDashboard: UsageDetailDashboardEnvelope;
  readonly VoucherAmount: VoucherAmountPICNameModel;
  readonly BillingDetailPerProduct: BillingDetailPerProductEnvelope;
  readonly dataNeccesity: NeccessityModel[];
  readonly dataAwsBillingPermission: AWSBillingHPermission[];
  readonly AmountUnsettleOrdering: AWSAmountUnsettleModel;
  readonly AmountUnsettleSelling: AWSAmountUnsettleModel;
  readonly BillingPeriod: AWSBillingPeriodModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly resultActions: ResultActions;
}
