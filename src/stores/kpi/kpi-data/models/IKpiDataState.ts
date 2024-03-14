import ResultActions from 'models/ResultActions';
import KpiDataModel from './KpiDataModel';
import KpiDataDashboardEnvelope from './KpiDataDashboardEnvelope';
import KpiDataDashboardDeptEnvelope from './KpiDataDashboardDeptEnvelope';
import KpiDataDetailPointEnvelope from './KpiDataDetailPointEnvelope';
import KpiDataCreatorSummaryEnvelope from './KpiDataCreatorSummaryEnvelope';
import KpiDataRemarkEnvelope from './KpiDataRemarkEnvelope';
import KpiDataDropdownModel from './KpiDataDropdownModel';
import KpiDataConditionModel from './KpiDataConditionModel';
import KpiDataDashboardModel from './KpiDataDashboardModel';
import PeriodeQuartalModel from './PeriodeQuartalModel';

export default interface IKpiDataState {
  readonly data: KpiDataDashboardEnvelope;
  readonly dataDashboard: KpiDataDashboardEnvelope;
  readonly dataDashboardDept: KpiDataDashboardDeptEnvelope;
  readonly detailPoint: KpiDataDetailPointEnvelope;
  readonly summaryCreator: KpiDataCreatorSummaryEnvelope;
  readonly dataRemark: KpiDataRemarkEnvelope;
  readonly dropdownPIC: KpiDataDropdownModel[];
  readonly dropdownYear: KpiDataDropdownModel[];
  readonly kpiCondition: KpiDataConditionModel[];
  readonly kpiPdf: KpiDataDashboardModel[];
  readonly periodeQuartal: PeriodeQuartalModel;
  //readonly firstData: KpiDataModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly activePage: number;
  readonly activePageDept: number;
  readonly activeYear: number;
  //readonly kpiDetails: any;
  //readonly resultActions: ResultActions;
}
