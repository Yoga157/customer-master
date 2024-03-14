import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsDataString from './models/IOptionsDataString';
import LetterTypeModel from 'stores/letter-type/models/LetterTypeModel';

const _selectLetterType = (models: LetterTypeModel[]): IOptionsDataString[] => {
  return models.map(
    (model: LetterTypeModel): IOptionsDataString => ({
      text: model.textData,
      value: model.textData,
    })
  );
};

export const selectLetterTypeOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.letterType.data,
  _selectLetterType
);
