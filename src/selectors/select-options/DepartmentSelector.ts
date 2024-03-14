import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsDataString from './models/IOptionsDataString';
import ISearchResult from './models/ISearchResult';
import FunnelDepartmentModel from 'stores/funnel/models/FunnelDepartmentModel';

const _selectFunnelDepartment = (models: FunnelDepartmentModel[]): IOptionsDataString[] => {
  return models.map(
    (model: FunnelDepartmentModel): IOptionsDataString => ({
      text: model.deptname,
      value: model.deptname,
    })
  );
};

export const selectFunnelDepartmentOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.funnel.funnelDepartment,
  _selectFunnelDepartment
);
