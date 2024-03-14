import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsDataString from './models/IOptionsDataString';
import LanguageModel from 'stores/language/models/LanguageModel';

const _selectLanguage = (models: LanguageModel[]): IOptionsDataString[] => {
  return models.map(
    (model: LanguageModel): IOptionsDataString => ({
      text: model.textData,
      value: model.textData,
    })
  );
};

export const selectLanguageOptions: Selector<IStore, IOptionsDataString[]> = createSelector((state: IStore) => state.language.data, _selectLanguage);
