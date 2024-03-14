import POCRequirementDashboard from './POCRequirementDashboard';
import POCRequirementEnvelope from './POCRequirementEnvelope';

export default interface IPOCRequirementState {
  readonly listData: POCRequirementEnvelope;
  readonly firstData: POCRequirementDashboard;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
