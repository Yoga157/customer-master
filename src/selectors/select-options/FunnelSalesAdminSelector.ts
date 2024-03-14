import { createSelector, Selector } from 'reselect';
import DropdownSalesAdminModel from 'stores/funnel-sales-analyst/funnel-sa/models/DropdownSalesAdminModel';
import IStore from '../../models/IStore';
import IOptionsDataString from './models/IOptionsDataString';

const _selectSalesAdmin = (models: DropdownSalesAdminModel[]): IOptionsDataString[] => {
  return models.map(
    (model: DropdownSalesAdminModel): IOptionsDataString => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectSalesAdminOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.funnelSalesAnalyst.dataDropdownSA,
  _selectSalesAdmin
);
