import IStore from 'models/IStore';
import { createSelector, Selector } from 'reselect';
import ResponseResolutionModel from 'stores/response-resolution/models/ResponseResolutionModel';
import IOptionsDataString from './models/IOptionsDataString';

const _selectResponseResolutionOptions = (models: ResponseResolutionModel[]): IOptionsDataString[] => {
  return models.map(
    (model: ResponseResolutionModel): IOptionsDataString => ({
      text: model.text1,
      value: model.text1,
    })
  );
};

export const selectResponseResolutionOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.responseResolution.data,
  _selectResponseResolutionOptions
);
