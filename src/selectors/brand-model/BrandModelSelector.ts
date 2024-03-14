import BrandTypeModel from 'stores/brand-model/models/BrandTypeModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IBrandModelTable from './models/IBrandModelTable';
import IBrandModelTableRow from './models/IBrandModelTableRow';
import BrandTypeEnvelope from 'stores/brand-model/models/BrandTypeEnvelope';
import { Selector } from 'react-redux';

const _selectBrandModels = (models: BrandTypeEnvelope): IBrandModelTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: BrandTypeModel[]): IBrandModelTableRow[] => {
  return models.map((model: BrandTypeModel): IBrandModelTableRow => _mappingObjectTableRow(model));
};

export const selectBrandModels: ParametricSelector<IStore, string[], IBrandModelTable> = createSelector(
  (state: IStore) => state.brandModel.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectBrandModels
);

const _selectBrandModel = (model: BrandTypeModel): BrandTypeModel => {
  return _mappingObject(model);
};

const _mappingObjectTableRow = (model: BrandTypeModel): IBrandModelTableRow => {
  return {
    brandModelGenID: model.brandModelGenID,
    brandName: model.brandName,
    brandID: model.brandID,
    subBrandName: model.subBrandName,
    subBrandID: model.subBrandID,
    modelName: model.modelName,
    productManagerID: model.productManagerID,
    productManager: model.productManager,
    maintenanceService: model.maintenanceService,
    presales: model.presales,
    postsales: model.postsales,
    createDate: new Date(model.createDate!),
    expireDate: new Date(model.expireDate!),
    effectiveDate: new Date(model.effectiveDate!),
    createUserID: model.createUserID,
    modifyDate: model.modifyDate === null ? null : model.modifyDate,
    modifyUserID: model.modifyUserID,
    modifyName: model.modifyName,
    creatorName: model.creatorName,
    status: model.status,
  };
};

const _mappingObject = (model: BrandTypeModel): BrandTypeModel => {
  return new BrandTypeModel({
    brandModelGenID: model.brandModelGenID.toString() === 'undefined' ? 0 : model.brandModelGenID,
    subBrandID: model.subBrandID,
    brandID: model.brandID,
    subBrandName: model.subBrandName,
    brandName: model.brandName,
    modelName: model.modelName,
    productManagerID: model.productManagerID,
    productManager: model.productManager,
    presales: model.presales,
    postsales: model.postsales,
    maintenanceService: model.maintenanceService,
    modelLongName: model.modelLongName,
    createDate: new Date(model.createDate!),
    createUserID: model.createUserID,
    modifyDate: model.modifyDate !== null ? new Date(model.modifyDate!) : undefined,
    modifyUserID: model.modifyUserID,
    modifyName: model.modifyName,
    creatorName: model.creatorName,
    status: model.status,
    effectiveDate: model.effectiveDate === undefined ? undefined : new Date(model.effectiveDate),
    expireDate: model.expireDate  === undefined ? undefined : new Date(model.expireDate)
  });
};

export const selectBrandModel: Selector<IStore, BrandTypeModel> = createSelector((state: IStore) => state.brandModel.firstData!, _selectBrandModel);
