import { createSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';
import FunnelVerificationModelEnvelope from 'stores/funnel/models/FunnelVerificationModelEnvelope';
import IVerificationFunnelTable from './models/IVerificationFunnelTable';
import FunnelVerificationModel from 'stores/funnel/models/FunnelVerificationModel';
import IVerificationFunnelTableRow from './models/IVerificationFunnelTableRow';

const _selectVerificationFunnels = (models: FunnelVerificationModelEnvelope): IVerificationFunnelTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
    status: models.status,
  };
};

const _createTableRows = (models: FunnelVerificationModel[]): IVerificationFunnelTableRow[] => {
  return models.map((model: FunnelVerificationModel): IVerificationFunnelTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: FunnelVerificationModel): IVerificationFunnelTableRow => {
  return {
    no: model.no,
    verificationItem: model.verificationItem,
    verificationStatus: model.verificationStatus,
  };
};

export const selectVerificationFunnels: Selector<IStore, IVerificationFunnelTable> = createSelector(
  (state: IStore) => state.funnel.funnelVerification!,
  _selectVerificationFunnels
);
