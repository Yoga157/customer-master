import { createSelector, Selector } from 'reselect';
import IStore from 'models/IStore';
import PresalesSupportModel from 'stores/presales-support/models/PresalesSupportModel';
import IOptionsDataString from './models/IOptionsDataString';

const _selectPresalesSupport = (models: PresalesSupportModel[]): IOptionsDataString[] => {
  return models.map(
    (model: PresalesSupportModel): IOptionsDataString => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectPresalesOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.presalesSupport.data,
  _selectPresalesSupport
);
