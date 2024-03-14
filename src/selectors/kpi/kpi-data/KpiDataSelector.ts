import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IKpiDataTable from './models/IKpiDataTable';
import IKpiDataDashboardDeptTable from './models/IKpiDataDashboardDeptTable';
import IKpiDataDetailPointTable from './models/IKpiDataDetailPointTable';
import IKpiDataCreatorSummaryTable from './models/IKpiDataCreatorSummaryTable';
import IKpiDataRemarkTable from './models/IKpiDataRemarkTable';
import IKpiDataTableRow from './models/IKpiDataTableRow';
import IKpiDataDashboardDeptTableRow from './models/IKpiDataDashboardDeptTableRow';
import IKpiDataDetailPointTableRow from './models/IKpiDataDetailPointTableRow';
import IKpiDataCreatorSummaryTableRow from './models/IKpiDataCreatorSummaryTableRow';
import IKpiDataRemarkTableRow from './models/IKpiDataRemarkTableRow';
import { Selector } from 'react-redux';
import KpiDataDashboardDeptModel from 'stores/kpi/kpi-data/models/KpiDataDashboardDeptModel';
import KpiDataDashboardDeptEnvelope from 'stores/kpi/kpi-data/models/KpiDataDashboardDeptEnvelope';
import KpiDataDashboardModel from 'stores/kpi/kpi-data/models/KpiDataDashboardModel';
import KpiDataDashboardEnvelope from 'stores/kpi/kpi-data/models/KpiDataDashboardEnvelope';
import KpiDataCreatorSummaryModel from 'stores/kpi/kpi-data/models/KpiDataCreatorSummaryModel';
import KpiDataDetailPointModel from 'stores/kpi/kpi-data/models/KpiDataDetailPointModel';
import KpiDataDetailPointEnvelope from 'stores/kpi/kpi-data/models/KpiDataDetailPointEnvelope';
import KpiDataRemarkEnvelope from 'stores/kpi/kpi-data/models/KpiDataRemarkEnvelope';
import KpiDataRemarkModel from 'stores/kpi/kpi-data/models/KpiDataRemarkModel';
import KpiDataDropdownModel from 'stores/kpi/kpi-data/models/KpiDataDropdownModel';
import KpiDataConditionModel from 'stores/kpi/kpi-data/models/KpiDataConditionModel';
import PeriodeQuartal from 'stores/kpi/kpi-data/models/PeriodeQuartalModel';
import KpiDataCreatorSummaryEnvelope from 'stores/kpi/kpi-data/models/KpiDataCreatorSummaryEnvelope';

const _mappingObjectTableRow = (model: KpiDataDashboardModel): IKpiDataTableRow => {
  return {
    udcid: model.udcid,
    emplid: model.emplid,
    year: model.year,
    pic: model.pic,
    dept: model.dept,
    measurementNumber: model.measurementNumber,
    remark: model.remark,
    keyActivity: model.keyActivity,
    kpiDireksi: model.kpiDireksi,
    measurement: model.measurement,
    weight: model.weight,
    point: model.point,
    q1Point: model.q1Point,
    q2Point: model.q2Point,
    q3Point: model.q3Point,
    q4Point: model.q4Point,
    yearlyPoint: model.yearlyPoint,
    q1Nilai: model.q1Nilai,
    q2Nilai: model.q2Nilai,
    q3Nilai: model.q3Nilai,
    q4Nilai: model.q4Nilai,
    yearlyNilai: model.yearlyNilai,
    manual: model.manual,
    detail: model.detail,
    fileNameQ1: model.fileNameQ1,
    fileNameQ2: model.fileNameQ2,
    fileNameQ3: model.fileNameQ3,
    fileNameQ4: model.fileNameQ4,
    fileNameYearly: model.fileNameYearly,
    totalNilai: model.totalNilai,
    totalNilaiYearly: model.totalNilaiYearly,
    logDate: model.logDate,
    percentNilai: model.percentNilai,
  };
};
const _createKpiDataTableRows = (models: KpiDataDashboardModel[]): IKpiDataTableRow[] => {
  return models.map((model: KpiDataDashboardModel): IKpiDataTableRow => _mappingObjectTableRow(model));
};

const _selectKpiDatas = (models: KpiDataDashboardEnvelope): IKpiDataTable => {
  return {
    totalRow: models.totalRows,
    rows: _createKpiDataTableRows(models.rows),
  };
};

export const selectKpiDatas: Selector<IStore, IKpiDataTable> = createSelector((state: IStore) => state.kpiData.data!, _selectKpiDatas);

//---------------------------------------------------------------------------------------------------------------

const _mappingObjectDashboardTableRow = (model: KpiDataDashboardModel): IKpiDataTableRow => {
  return {
    udcid: model.udcid,
    emplid: model.emplid,
    year: model.year,
    pic: model.pic,
    dept: model.dept,
    measurementNumber: model.measurementNumber,
    remark: model.remark,
    keyActivity: model.keyActivity,
    kpiDireksi: model.kpiDireksi,
    measurement: model.measurement,
    weight: model.weight,
    point: model.point,
    q1Point: model.q1Point,
    q2Point: model.q2Point,
    q3Point: model.q3Point,
    q4Point: model.q4Point,
    yearlyPoint: model.yearlyPoint,
    q1Nilai: model.q1Nilai,
    q2Nilai: model.q2Nilai,
    q3Nilai: model.q3Nilai,
    q4Nilai: model.q4Nilai,
    yearlyNilai: model.yearlyNilai,
    manual: model.manual,
    detail: model.detail,
    fileNameQ1: model.fileNameQ1,
    fileNameQ2: model.fileNameQ2,
    fileNameQ3: model.fileNameQ3,
    fileNameQ4: model.fileNameQ4,
    fileNameYearly: model.fileNameYearly,
    totalNilai: model.totalNilai,
    totalNilaiYearly: model.totalNilaiYearly,
    logDate: model.logDate,
    percentNilai: model.percentNilai,
  };
};
const _createKpiDashboardDataTableRows = (models: KpiDataDashboardModel[]): IKpiDataTableRow[] => {
  return models.map((model: KpiDataDashboardModel): IKpiDataTableRow => _mappingObjectDashboardTableRow(model));
};

const _selectKpiDashboardDatas = (models: KpiDataDashboardEnvelope): IKpiDataTable => {
  return {
    totalRow: models.totalRows,
    rows: _createKpiDashboardDataTableRows(models.rows),
  };
};

export const selectKpiDashboardDatas: Selector<IStore, IKpiDataTable> = createSelector(
  (state: IStore) => state.kpiData.dataDashboard!,
  _selectKpiDashboardDatas
);

//---------------------------------------------------------------------------------------------------------------

const _mappingObjectDashboardDeptTableRow = (model: KpiDataDashboardDeptModel): IKpiDataDashboardDeptTableRow => {
  return {
    totalPoint: model.totalPoint,
    totalPic: model.totalPic,
    deptId: model.deptId,
    dept: model.dept,
  };
};
const _createKpiDashboardDeptDataTableRows = (models: KpiDataDashboardDeptModel[]): IKpiDataDashboardDeptTableRow[] => {
  return models.map((model: KpiDataDashboardDeptModel): IKpiDataDashboardDeptTableRow => _mappingObjectDashboardDeptTableRow(model));
};

const _selectKpiDashboardDeptDatas = (models: KpiDataDashboardDeptEnvelope): IKpiDataDashboardDeptTable => {
  return {
    totalRow: models.totalRows,
    rows: _createKpiDashboardDeptDataTableRows(models.rows),
  };
};

export const selectKpiDashboardDeptDatas: Selector<IStore, IKpiDataDashboardDeptTable> = createSelector(
  (state: IStore) => state.kpiData.dataDashboardDept!,
  _selectKpiDashboardDeptDatas
);

//---------------------------------------------------------------------------------------------------------------

const _mappingObjectPointTableRow = (model: KpiDataDetailPointModel): IKpiDataDetailPointTableRow => {
  return {
    docno: model.docno,
    doctype: model.doctype,
    emplid: model.emplid,
    udcid: model.udcid,
    creator: model.creator,
    remark: model.remark,
    point: model.point,
    rnum2: model.rnum2,
    bu: model.bu,
    customer: model.customer,
    startDate: model.startDate,
    endDate: model.endDate,
  };
};
const _createKpiDataDetailPointTableRows = (models: KpiDataDetailPointModel[]): IKpiDataDetailPointTableRow[] => {
  return models.map((model: KpiDataDetailPointModel): IKpiDataDetailPointTableRow => _mappingObjectPointTableRow(model));
};

const _selectKpiDataDetailPoints = (models: KpiDataDetailPointEnvelope): IKpiDataDetailPointTable => {
  return {
    totalRow: models.totalRows,
    totalPoint: models.totalPoint,
    sorting: models.sorting,
    column: models.column,
    rows: _createKpiDataDetailPointTableRows(models.rows),
  };
};

export const selectKpiDataDetailPoints: Selector<IStore, IKpiDataDetailPointTable> = createSelector(
  (state: IStore) => state.kpiData.detailPoint!,
  _selectKpiDataDetailPoints
);

//---------------------------------------------------------------------------------------------------------------

const _mappingObjecCreatorTableRow = (model: KpiDataCreatorSummaryModel): IKpiDataCreatorSummaryTableRow => {
  return {
    id: model.id,
    point: model.point,
    creator: model.creator,
    remaks: model.remaks,
  };
};
const _createKpiDataCreatorTableRows = (models: KpiDataCreatorSummaryModel[]): IKpiDataCreatorSummaryTableRow[] => {
  return models.map((model: KpiDataCreatorSummaryModel): IKpiDataCreatorSummaryTableRow => _mappingObjecCreatorTableRow(model));
};

const _selectKpiDataCreators = (models: KpiDataCreatorSummaryEnvelope): IKpiDataCreatorSummaryTable => {
  return {
    totalRow: models.totalRows,
    rows: _createKpiDataCreatorTableRows(models.rows),
  };
};

export const selectKpiDataCreators: Selector<IStore, IKpiDataCreatorSummaryTable> = createSelector(
  (state: IStore) => state.kpiData.summaryCreator!,
  _selectKpiDataCreators
);

//---------------------------------------------------------------------------------------------------------------

const _mappingObjectRemarkTableRow = (model: KpiDataRemarkModel): IKpiDataRemarkTableRow => {
  return {
    id: model.id,
    remark: model.remark,
    modifyUserID: model.modifyUserID,
    modifyDate: model.modifyDate,
    employeeName: model.employeeName,
  };
};
const _createKpiDataRemarkTableRows = (models: KpiDataRemarkModel[]): IKpiDataRemarkTableRow[] => {
  return models.map((model: KpiDataRemarkModel): IKpiDataRemarkTableRow => _mappingObjectRemarkTableRow(model));
};

const _selectKpiDataRemarks = (models: KpiDataRemarkEnvelope): IKpiDataRemarkTable => {
  return {
    totalRow: models.totalRows,
    rows: _createKpiDataRemarkTableRows(models.rows),
  };
};

export const selectKpiDataRemarks: Selector<IStore, IKpiDataRemarkTable> = createSelector(
  (state: IStore) => state.kpiData.dataRemark!,
  _selectKpiDataRemarks
);

//---------------------------------------------------------------------------------------------------------------

const _selectDropdownPIC = (models: KpiDataDropdownModel[]): any[] => {
  return models.map((model: KpiDataDropdownModel): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectDropdownPIC: Selector<IStore, any[]> = createSelector((state: IStore) => state.kpiData.dropdownPIC, _selectDropdownPIC);

const _selectDropdownYear = (models: KpiDataDropdownModel[]): any[] => {
  return models.map((model: KpiDataDropdownModel): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectDropdownYear: Selector<IStore, any[]> = createSelector((state: IStore) => state.kpiData.dropdownYear, _selectDropdownYear);

//------------------------------------------------------------------------------------------------------------------

const _selectKpiCondition = (models: KpiDataConditionModel[]): any[] => {
  return models.map((model: KpiDataConditionModel): any => ({
    description: model.description,
    point: model.point,
    kpiSettingId: model.kpiSettingId,
    kpiConditionID: model.kpiConditionID,
  }));
};

export const selectKpiCondition: Selector<IStore, any[]> = createSelector((state: IStore) => state.kpiData.kpiCondition, _selectKpiCondition);
//-------------------------------------------------------------------------------------------------------------------

const _selectKpiPdf = (models: KpiDataDashboardModel[]): any[] => {
  return models.map((model: KpiDataDashboardModel): any => ({
    udcid: model.udcid,
    emplid: model.emplid,
    year: model.year,
    pic: model.pic,
    remark: model.remark,
    keyActivity: model.keyActivity,
    kpiDireksi: model.kpiDireksi,
    measurement: model.measurement,
    weight: model.weight,
    point: model.point,
    q1Point: model.q1Point,
    q2Point: model.q2Point,
    q3Point: model.q3Point,
    q4Point: model.q4Point,
    q1Nilai: model.q1Nilai,
    q2Nilai: model.q2Nilai,
    q3Nilai: model.q3Nilai,
    q4Nilai: model.q4Nilai,
  }));
};

export const selectKpiPdf: Selector<IStore, any[]> = createSelector((state: IStore) => state.kpiData.kpiPdf, _selectKpiPdf);

//--------------------------------------------------------------------------------------------------------------------------
const _selectPeriodeQuartal = (model: PeriodeQuartal): any => {
  return _mappingObjectPeriodeQuartal(model);
};

const _mappingObjectPeriodeQuartal = (model: PeriodeQuartal): any => {
  return {
    startDate: model.startDate,
    endDate: model.endDate,
    nextMonth: model.nextMonth,
  };
};

export const selectPeriodeQuartal: Selector<IStore, any> = createSelector((state: IStore) => state.kpiData.periodeQuartal!, _selectPeriodeQuartal);
