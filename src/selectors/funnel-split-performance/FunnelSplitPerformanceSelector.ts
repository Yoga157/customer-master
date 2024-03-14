import IStore from 'models/IStore'
import { createSelector, ParametricSelector } from 'reselect';
import { Selector } from 'react-redux';

interface IOptionsData {
  readonly value: number;
  readonly text: string;
}


const _selectSplitType = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectSplitType: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelSplit.splitType,
  _selectSplitType
);
