import IStore from 'models/IStore';
import { createSelector, Selector } from 'reselect';
import PaymentTypeModel from 'stores/payment-type/models/PaymentTypeModel';
import IOptionsDataString from './models/IOptionsDataString';

const _selectPaymentTypeOptions = (models: PaymentTypeModel[]): IOptionsDataString[] => {
  return models.map(
    (model: PaymentTypeModel): IOptionsDataString => ({
      text: model.textData,
      value: model.textData,
    })
  );
};

export const selectPaymentTypeOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.paymentType.data,
  _selectPaymentTypeOptions
);
