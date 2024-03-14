import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import CompetitorModel from 'stores/competitor/models/CompetitorModel';

const _selectCompetitor = (models: CompetitorModel[]): IOptionsData[] => {
  return models.map(
    (model: CompetitorModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectCompetitorOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.competitor.data, _selectCompetitor);
