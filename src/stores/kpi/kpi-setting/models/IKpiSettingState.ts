import ResultActions from 'models/ResultActions';
import KpiEmployeeEnvelope from 'stores/kpi/kpi-employee/models/KpiEmployeeEnvelop';
import KpiEmployeeModel from 'stores/kpi/kpi-employee/models/KpiEmployeeModel';
import DepartmentDropdownModel from 'stores/kpi/kpi-setting/models/DepartmentDropdownModel';
import DepartmentSearchModel from 'stores/kpi/kpi-setting/models/DepartmentSearchModel';
import DivisionDropdownModel from 'stores/kpi/kpi-setting/models/DivisionDropdownModel';
import DivisionSearchModel from 'stores/kpi/kpi-setting/models/DivisionSearchModel';
import EmployeeDropdownModel from 'stores/kpi/kpi-setting/models/EmployeeDropdownModel';
import FunctionDropdownModel from 'stores/kpi/kpi-setting/models/FunctionDropdownModel';
import FunctionSearchModel from 'stores/kpi/kpi-setting/models/FunctionSearchModel';
import DireksiOptions from 'stores/kpi/kpi-setting/models/DireksiOptions';
import MeasurementOptions from 'stores/kpi/kpi-setting/models/MeasurementOptions';
import StatusOptions from 'stores/kpi/kpi-setting/models/StatusOptions';
import DepartmentModel from './DepartmentModel';
import KpiSettingDashboardEnvelope from './KpiSettingDashboardEnvelope';
import KpiSettingDashboardModel from './KpiSettingDashboardModel';
import KpiSettingModel from './KpiSettingModel';

export default interface IKpiSettingState {
  readonly data: KpiSettingDashboardModel[];
  readonly listData: KpiSettingDashboardEnvelope;
  readonly firstData: KpiSettingModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly settingList: any;
  readonly resultActions: ResultActions;
  readonly kpiDepartments: DepartmentModel[];
  readonly kpiStatusOption: StatusOptions[];
  readonly kpiMeasurementOption: MeasurementOptions[];
  readonly kpiDireksiOption: DireksiOptions[];
  readonly divisionSearchOption: DivisionSearchModel[];
  readonly departmentSearchOption: DepartmentSearchModel[];
  readonly functionSearchOption: FunctionSearchModel[];
  readonly divisionDropdownOption: DivisionDropdownModel[];
  readonly departmentDropdownOption: DepartmentDropdownModel[];
  readonly functionDropdownOption: FunctionDropdownModel[];
  readonly employeeDropdownOption: EmployeeDropdownModel[];
  readonly employeeSearchOption: KpiEmployeeModel[];
  readonly employeeLocal: KpiEmployeeEnvelope;
  // readonly conditionRowTable: any[],
  readonly conditionLocal: any[];
}
