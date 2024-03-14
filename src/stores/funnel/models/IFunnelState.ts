import FunnelDashboardEnvelope from './FunnelDashboardEnvelope';
import FunnelHistoryEnvelope from './FunnelHistoryEnvelope';
import FunnelModel from './FunnelModel';
import FunnelHeaderNameModel from './FunnelHeaderNameModel';
import {
  FunnelViewEditAdditional,
  FunnelViewEditCommisionIndex,
  FunnelViewEditConfirmation,
  FunnelViewEditCustomer,
  FunnelViewEditCustomerPO,
  FunnelViewEditSelling,
  FunnelViewEditStatus,
  ServiceAreaBufferResource,
} from './view-edit';
import ResultActions from 'models/ResultActions';
import FunnelViewEditCustomerByProjectId from './view-edit/FunnelViewEditCustomerByProjectId';
import FunnelViewEditCustomerDetails from './view-edit/FunnelViewEditCustomerDetails';
import FunnelVerificationModelEnvelope from './FunnelVerificationModelEnvelope';
import FunnelVerificationModel from './FunnelVerificationModel';
import FunnelDepartmentModel from './FunnelDepartmentModel';
import FunnelAuthorization from './FunnelAuthorization';
import FunnelCurrencyUdcModel from './FunnelCurrencyUdcModel';
import FunnelStatusModel from '../../funnel-status/models/FunnelStatusModel';
import FunnelRateModel from './FunnelRateModel';
import FunnelHistoryGpm from './FunnelHistoryGpm';
import FunnelEntryKeyByModel from './FunnelEntryKeyByModel';
import EmployeeHierarcyModel from 'stores/employee/models/EmployeeHierarcyModel';
import FunnelDropdownConfirmation from './FunnelDropdownConfirmation';
import FunnelConfigColumnModel from './FunnelConfigColumnModel';

export default interface IFunnelState {
  readonly data: FunnelDashboardEnvelope;
  readonly firstData: FunnelModel;
  readonly funnelViewEditStatus: FunnelViewEditStatus;
  readonly funnelViewEditCustomer: FunnelViewEditCustomer;
  readonly funnelViewEditSelling: FunnelViewEditSelling;
  readonly funnelViewEditCustomerPO: FunnelViewEditCustomerPO;
  readonly funnelViewEditAdditional: FunnelViewEditAdditional;
  readonly funnelServiceAreaBufferResource: ServiceAreaBufferResource;
  readonly funnelViewEditCustomerDetails: FunnelViewEditCustomerDetails;
  readonly funnelViewEditCommissionIndex: FunnelViewEditCommisionIndex;
  readonly funnelViewEditStatusProjectId: FunnelViewEditCustomerByProjectId;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly funnelHeader: FunnelHeaderNameModel;
  readonly resultActions: ResultActions;
  readonly funnelVerification: FunnelVerificationModelEnvelope;
  readonly funnelVerificationStatus: FunnelVerificationModel;
  readonly funnelDepartment: FunnelDepartmentModel[];
  readonly funnelAuthorization: FunnelAuthorization;
  readonly dataCurrency: FunnelCurrencyUdcModel[];
  readonly dataPMOProjectStatus: FunnelEntryKeyByModel[];
  readonly dataPMOWarrantyStatus: FunnelEntryKeyByModel[];
  readonly dataProjectCategorySA: FunnelCurrencyUdcModel[];
  readonly complexity: FunnelStatusModel[];
  readonly employee: EmployeeHierarcyModel[];
  readonly rate: FunnelRateModel;
  readonly isFunnelStatusActive: boolean;
  readonly isResetOneLevel: boolean;
  readonly isExportExl: boolean;
  readonly isShowIcNoEditGpm: boolean;
  readonly funnelHistory: FunnelHistoryEnvelope[];
  readonly funnelHistoryGpm: FunnelHistoryGpm;
  readonly funnelConfirmation: FunnelViewEditConfirmation;
  readonly funnelCommissionHistory: FunnelHistoryEnvelope[];
  readonly funnelDropdownCustomerConfirmation: FunnelDropdownConfirmation[];
  readonly funnelDropdownUserConfirmation: FunnelDropdownConfirmation[];
  readonly isMyApproval: boolean;
  readonly activePage: number;
  readonly columns: FunnelConfigColumnModel;
}
