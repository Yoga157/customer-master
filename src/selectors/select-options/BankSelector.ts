import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsDataString';
import BankModel from 'stores/bank/models/BankModel';

const _selectBank = (models: BankModel[]): IOptionsData[] => {
  return models.map(
    (model: BankModel): IOptionsData => ({
      text: model.textData,
      value: model.textData,
    })
  );
};

export const selectBankOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.bank.data, _selectBank);
