import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import SoftwareSearchModel from 'stores/software/models/SoftwareSearchModel';
import ISearchResult from './models/ISearchResult';
import IOptionsDataString from './models/IOptionsDataString';

const _selectSoftwareSearch = (models: SoftwareSearchModel[]): ISearchResult[] => {
  return models.map(
    (model: SoftwareSearchModel): ISearchResult => ({
      title: model.textData,
      descriptions: model.textData,
      price: model.valueData.toString(),
    })
  );
};

export const selectSoftwareSearchOptions: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.software.search,
  _selectSoftwareSearch
);

const _selectSoftwares = (models: SoftwareSearchModel[]): IOptionsDataString[] => {
  return models.map(
    (model: SoftwareSearchModel): IOptionsDataString => ({
      value: model.valueData.toString(),
      text: model.textData.toString(),
    })
  );
};

export const selectSoftwaresOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.software.listSoftware,
  _selectSoftwares
);

const _selectSoftwareBusiness = (models: SoftwareSearchModel[]): ISearchResult[] => {
  return models.map(
    (model: SoftwareSearchModel): ISearchResult => ({
      title: model.textData,
      descriptions: model.textData,
      price: model.valueData.toString(),
    })
  );
};

export const selectSoftwareBusiness: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.software.businessSoftware,
  _selectSoftwareBusiness
);

const _selectSoftwareDB = (models: SoftwareSearchModel[]): ISearchResult[] => {
  return models.map(
    (model: SoftwareSearchModel): ISearchResult => ({
      title: model.textData,
      descriptions: model.textData,
      price: model.valueData.toString(),
    })
  );
};

export const selectSoftwareDB: Selector<IStore, ISearchResult[]> = createSelector((state: IStore) => state.software.database, _selectSoftwareDB);

const _selectSoftwareOS = (models: SoftwareSearchModel[]): ISearchResult[] => {
  return models.map(
    (model: SoftwareSearchModel): ISearchResult => ({
      title: model.textData,
      descriptions: model.textData,
      price: model.valueData.toString(),
    })
  );
};

export const selectSoftwareOS: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.software.operatingSystem,
  _selectSoftwareOS
);

const _selectSoftwareProgramming = (models: SoftwareSearchModel[]): ISearchResult[] => {
  return models.map(
    (model: SoftwareSearchModel): ISearchResult => ({
      title: model.textData,
      descriptions: model.textData,
      price: model.valueData.toString(),
    })
  );
};

export const selectSoftwareProgramming: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.software.programmingSoftware,
  _selectSoftwareProgramming
);

const _selectSoftwareInfra = (models: SoftwareSearchModel[]): ISearchResult[] => {
  return models.map(
    (model: SoftwareSearchModel): ISearchResult => ({
      title: model.textData,
      descriptions: model.textData,
      price: model.valueData.toString(),
    })
  );
};

export const selectSoftwareInfra: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.software.infrastructureSoftware,
  _selectSoftwareInfra
);

const _selectBusiness = (models: SoftwareSearchModel[]): IOptionsDataString[] => {
  return models.map(
    (model: SoftwareSearchModel): IOptionsDataString => ({
      value: model.valueData.toString(),
      text: model.textData.toString(),
    })
  );
};
// ==============================================================================
// update selector
export const selectSoftwaresBusinessE: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.software.listBusiness,
  _selectBusiness
);

const _selectDB = (models: SoftwareSearchModel[]): IOptionsDataString[] => {
  return models.map(
    (model: SoftwareSearchModel): IOptionsDataString => ({
      value: model.valueData.toString(),
      text: model.textData.toString(),
    })
  );
};

export const selectSoftwaresDBE: Selector<IStore, IOptionsDataString[]> = createSelector((state: IStore) => state.software.listDB, _selectDB);

const _selectInfra = (models: SoftwareSearchModel[]): IOptionsDataString[] => {
  return models.map(
    (model: SoftwareSearchModel): IOptionsDataString => ({
      value: model.valueData.toString(),
      text: model.textData.toString(),
    })
  );
};

export const selectSoftwaresInfraE: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.software.listInfra,
  _selectInfra
);

const _selectOS = (models: SoftwareSearchModel[]): IOptionsDataString[] => {
  return models.map(
    (model: SoftwareSearchModel): IOptionsDataString => ({
      value: model.valueData.toString(),
      text: model.textData.toString(),
    })
  );
};

export const selectSoftwareOsE: Selector<IStore, IOptionsDataString[]> = createSelector((state: IStore) => state.software.listOS, _selectOS);

const _selectProgramming = (models: SoftwareSearchModel[]): IOptionsDataString[] => {
  return models.map(
    (model: SoftwareSearchModel): IOptionsDataString => ({
      value: model.valueData.toString(),
      text: model.textData.toString(),
    })
  );
};

export const selectSoftwareProgE: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.software.listProgramming,
  _selectProgramming
);
