import SoftwareModel from 'stores/software/models/SoftwareModel';
import SoftwareToolModel from 'stores/software/models/SoftwareToolModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import ISoftwareTable from './models/ISoftwareTable';
import ISoftwareToolTable from './models/ISoftwareToolTable';
import ISoftwareTableRow from './models/ISoftwareTableRow';
import ISoftwareToolTableRow from './models/ISoftwareToolTableRow';
import SoftwareEnvelope from 'stores/software/models/SoftwareEnvelope';
import SoftwareToolEnvelope from 'stores/software/models/SoftwareToolEnvelope';
import SoftwareHeaderModel from 'stores/software/models/SoftwareHeaderModel';
import SoftwareMainModel from 'stores/software/models/SoftwareMainModel';
import { Selector } from 'react-redux';

const _selectSoftwares = (models: SoftwareEnvelope): ISoftwareTable => {
  return {
    totalRows: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: SoftwareModel[]): ISoftwareTableRow[] => {
  return models.map((model: SoftwareModel): ISoftwareTableRow => _mappingObjectTableRow(model));
};

//detail
const _selectSoftwareTools = (models: SoftwareToolEnvelope): ISoftwareToolTable => {
  return {
    totalRows: models.totalRows,
    rows: _createTableToolRows(models.rows),
  };
};

const _createTableToolRows = (models: SoftwareToolModel[]): ISoftwareToolTableRow[] => {
  return models.map((model: SoftwareToolModel): ISoftwareToolTableRow => _mappingObjectToolTableRow(model));
};

export const selectSoftwares: ParametricSelector<IStore, string[], ISoftwareTable> = createSelector(
  (state: IStore) => state.software.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectSoftwares
);

const _selectSoftware = (model: SoftwareHeaderModel): SoftwareHeaderModel => {
  return _mappingObject(model);
};

const _selectSoftwareMain = (model: SoftwareMainModel): SoftwareMainModel => {
  return _mappingObjectMain(model);
};

const _mappingObjectTableRow = (model: SoftwareModel): ISoftwareTableRow => {
  return {
    softwareID: model.softwareID,
    softwareName: model.softwareName,
    subSoftwareName: model.subSoftwareName,
    leaders: model.leaders,
    challengers: model.challengers,
    visionaires: model.visionaires,
    nichePlayers: model.nichePlayers,
    createdBy: model.createdBy,
    createdDate: model.createdDate,
    modifiedBy: model.modifiedBy,
    modifiedDate: model.modifiedDate,
  };
};

//detail
export const selectSoftwareTools: ParametricSelector<IStore, string[], ISoftwareToolTable> = createSelector(
  (state: IStore) => state.software.listDataDetail!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectSoftwareTools
);

const _mappingObjectToolTableRow = (model: SoftwareToolModel): ISoftwareToolTableRow => {
  return {
    softwareToolID: model.softwareToolID,
    softwareToolType: model.softwareToolType,
    softwareToolName: model.softwareToolName,
    softwareToolTypeName: model.softwareToolTypeName,
    flagFunnelGenID: model.flagFunnelGenID,
  };
};

const _mappingObject = (model: SoftwareHeaderModel): SoftwareHeaderModel => {
  return new SoftwareHeaderModel({
    softwareID: model.softwareID,
    softwareIDName: model.softwareIDName,
    subSoftwareID: model.subSoftwareID,
    subSoftwareIDName: model.subSoftwareIDName,
  });
};

export const selectSoftware: Selector<IStore, SoftwareHeaderModel> = createSelector((state: IStore) => state.software.headerData!, _selectSoftware);

const _mappingObjectMain = (model: SoftwareMainModel): SoftwareMainModel => {
  return new SoftwareMainModel({
    softwareID: model.softwareID,
    softwareToolID: model.softwareToolID,
    softwareToolName: model.softwareToolName,
    softwareToolType: model.softwareToolType === NaN ? undefined : model.softwareToolType,
  });
};

export const selectSoftwareMain: Selector<IStore, SoftwareMainModel> = createSelector(
  (state: IStore) => state.software.firstData!,
  _selectSoftwareMain
);
