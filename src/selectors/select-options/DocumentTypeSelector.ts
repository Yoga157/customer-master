import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import DocumentTypeModel from 'stores/document-type/models/DocumentTypeModel';

const _selectDocumentType = (models: DocumentTypeModel[]): IOptionsData[] => {
  return models.map(
    (model: DocumentTypeModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectDocumentTypeOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.documentType.data,
  _selectDocumentType
);

export const selectDocTypeInvCategory: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.documentType.invoiceCategory,
  _selectDocumentType
);
