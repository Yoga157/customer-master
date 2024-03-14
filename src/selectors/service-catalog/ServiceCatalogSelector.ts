import ServiceCatalogModel from 'stores/service-catalog/models/ServiceCatalogModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import IServiceCatalogTable from './models/IServiceCatalogTable';
import IServiceCatalogTableRow from './models/IServiceCatalogTableRow';
import ServiceCatalogEnvelope from 'stores/service-catalog/models/ServiceCatalogEnvelope';
import { Selector } from 'react-redux';
import moment from 'moment';

const _selectServiceCatalogs = (models: ServiceCatalogEnvelope): IServiceCatalogTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.data),
  };
};

const _createTableRows = (models: ServiceCatalogModel[]): IServiceCatalogTableRow[] => {
  return models.map((model: ServiceCatalogModel): IServiceCatalogTableRow => _mappingObjectTableRow(model));
};

export const selectServiceCatalogs: ParametricSelector<IStore, string[], IServiceCatalogTable> = createSelector(
  (state: IStore) => state.serviceCatalog.data!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectServiceCatalogs
);

const _selectServiceCatalog = (model: ServiceCatalogModel): ServiceCatalogModel => {
  return _mappingObject(model);
};

const _mappingObjectTableRow = (model: ServiceCatalogModel): IServiceCatalogTableRow => {
  return {
    svcCatGenID: model.svcCatGenID,
    svcCatReffID: model.svcCatReffID,
    svcCatID: model.svcCatID,
    employeeID: model.employeeID,
    employeeIDLead: `${model.employeeIDLead}`,
    brandModelID: model.brandModelID,
    brandModelName: model.brandModelName,
    manHour: model.manHour,
    afterHour: model.afterHour,
    difficultyLevel: model.difficultyLevel,
    svcName: model.svcName,
    svcDescription: model.svcDescription,
    svcPrerequisite: model.svcPrerequisite,
    notes: model.notes,
    priceType: model.priceType,
    sourcePrice: model.sourcePrice,
    svcPrice: model.svcPrice,
    flagFunnelGenID: model.flagFunnelGenID,
    owner: model.owner,
    effectiveDate: model.effectiveDate,
    expireDate: model.expireDate
  };
};

const _mappingObject = (model: ServiceCatalogModel): ServiceCatalogModel => {
  return new ServiceCatalogModel({
    svcCatGenID: model.svcCatGenID.toString() === 'undefined' ? 0 : model.svcCatGenID,
    svcCatReffID: model.svcCatReffID === 'undefined' ? 'DRAFT' : model.svcCatReffID,
    svcCatID: model.svcCatID,
    employeeID: model.employeeID,
    employeeIDLead: `${model.employeeIDLead}.${model.serviceCatalogUDCID}`,
    brandModelID: model.brandModelID,
    brandModelName: model.brandModelName,
    manHour: model.manHour.toString() === 'NaN' ? 0 : model.manHour,
    isActive: model.isActive.toString() === 'NaN' || model.isActive === 0 ? 1 : 2,
    afterHour: model.afterHour,
    difficultyLevel: model.difficultyLevel,
    svcName: model.svcName === 'undefined' ? '' : model.svcName,
    svcDescription: model.svcDescription === 'undefined' ? '' : model.svcDescription,
    svcPrerequisite: model.svcPrerequisite === 'undefined' ? '' : model.svcPrerequisite,
    notes: model.notes === 'undefined' ? '' : model.notes,
    priceType: model.priceType,
    sourcePrice: model.sourcePrice,
    svcPrice: model.svcPrice.toString() === 'NaN' ? 0 : model.svcPrice,
    brandModelIDArr: model.brandModelID === 'undefined' ? [] : model.brandModelID.split(',').map((i) => +i),
    subBrandGroupID: model.subBrandGroupID.toString() === 'NaN' ? 0 : model.subBrandGroupID,
    effectiveDate: model.effectiveDate ? moment(model.effectiveDate).format('yyyy-MM-DD') : '',
    expireDate: model.expireDate ? moment(model.expireDate).format('yyyy-MM-DD') : ''
  });
};

export const selectServiceCatalog: Selector<IStore, ServiceCatalogModel> = createSelector(
  (state: IStore) => state.serviceCatalog.firstData!,
  _selectServiceCatalog
);
