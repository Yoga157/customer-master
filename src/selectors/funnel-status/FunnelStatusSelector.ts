import { createSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';
import FunnelStatusUdcModel from 'stores/funnel-status/models/FunnelStatusUdcModel';
import IFunnelStatus from './models/IFunnelStatus';

const _selectFunnelStatus = (model: FunnelStatusUdcModel): IFunnelStatus => {
  return _mappingObject(model);
};

const _mappingObject = (model: FunnelStatusUdcModel): IFunnelStatus => {
  return {
    id: model.udcid.toString() === 'NaN' ? 0 : model.udcid,
    entryKey: model.entryKey === 'undefined' ? '' : model.entryKey,
    statusName: model.text1 === 'undefined' ? '' : model.text1,
    dealClosedDate: model.inum1.toString() === 'NaN' ? 0 : model.inum1,
  };
};

export const selectFunnelStatus: Selector<IStore, IFunnelStatus> = createSelector(
  (state: IStore) => state.funnelStatus.dataStatus!,
  _selectFunnelStatus
);
