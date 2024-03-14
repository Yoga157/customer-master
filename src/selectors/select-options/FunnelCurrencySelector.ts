import { createSelector, Selector } from 'reselect';
import IStore from 'models/IStore';
import FunnelCurrencyUdcModel from 'stores/funnel/models/FunnelCurrencyUdcModel';
import IOptionsDataString from './models/IOptionsDataString';


const _selectCurrency = (models: FunnelCurrencyUdcModel[]): IOptionsDataString[] => {  
  return models.map(
    (model: FunnelCurrencyUdcModel): IOptionsDataString => ({
      text: model.text1,
      value: model.text1,
    })
  );
};

export const selectFunnelCurrencyOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.funnel.dataCurrency,
  _selectCurrency
);
