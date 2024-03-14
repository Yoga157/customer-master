import { createSelector, Selector } from 'reselect';
import IStore from 'models/IStore';
import SupportRoleModel from 'stores/support-role/models/SupportRoleModel';
import IOptionsData from './models/IOptionsData';

const _selectSupportRole = (models: SupportRoleModel[]): IOptionsData[] => {
  return models.map(
    (model: SupportRoleModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectSupportRoleOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.supportRole.data,
  _selectSupportRole
);
