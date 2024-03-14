import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import { Selector } from 'react-redux';
import AWSCredentialEnvelope from 'stores/aws-credential/models/AWSCredentialEnvelope';
import IAWSCredentialState from 'stores/aws-credential/models/IAWSCredentialState';
import AWSCredentialModel from 'stores/aws-credential/models/AWSCredentialModel';
import IAWSCredentialTableRow from './models/IAWSCredentialTableRow';
import IAWSCredentialTable from './models/IAWSCredentialTable';

const _selectAWSCredentials = (models: AWSCredentialEnvelope): IAWSCredentialTable => {
  return {
    totalRows: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: AWSCredentialModel[]): IAWSCredentialTableRow[] => {
  return models && models.map((model: AWSCredentialModel): IAWSCredentialTableRow => _mappingObjectTableRow(model));
};

export const selectAWSCredentials: Selector<IStore, IAWSCredentialTable> = createSelector(
  (state: IStore) => state.awsCredentital.listData!,
  _selectAWSCredentials
);

const _mappingObjectTableRow = (model: AWSCredentialModel): IAWSCredentialTableRow => {
  // console.log('model',model)
  return {
    awsid: model.awsid,
    accessKey: model.accessKey,
    secretKey: model.secretKey,
    notes: model.notes,
    createdBy: model.createdBy,
    createdDate: model.createdDate,
    createDate: model.createDate,
    createUserID: model.createUserID,
    modifiedBy: model.modifiedBy,
    modifiedDate: model.modifiedDate
  };
};
