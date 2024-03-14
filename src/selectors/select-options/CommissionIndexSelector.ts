import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import CommissionIndexModel from 'stores/commision-index/models/CommissionIndexModel';

const _selectCommissionIndexOptions = (models: CommissionIndexModel[]): IOptionsData[] => {
  return models.map(
    (model: CommissionIndexModel): IOptionsData => ({
      text: model.text1,
      value: model.mnum1,
    })
  );
};

export const selectCommissionIndexOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.commissionIndex.commissionIndex,
  _selectCommissionIndexOptions
);
