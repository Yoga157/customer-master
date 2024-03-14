import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsDataString';
import InsuranceModel from 'stores/insurance/models/InsuranceModel';

const _selectInsurance = (models: InsuranceModel[]): IOptionsData[] => {
  return models.map(
    (model: InsuranceModel): IOptionsData => ({
      text: model.textData,
      value: model.textData,
    })
  );
};

export const selectInsuranceOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.insurance.data, _selectInsurance);
