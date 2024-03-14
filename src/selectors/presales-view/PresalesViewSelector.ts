import { createSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';
import IPresalesView from './models/IPresalesView';
import PresalesViewResult from 'stores/presales-view/models/PresalesViewResult';

const _selectPresalesViewResult = (model: PresalesViewResult[]): IPresalesView[] => {

  return model.map(
    (model: PresalesViewResult): IPresalesView => ({
      udcid: model.udcid,
      entryKey: model.entryKey,
      text1: model.text1,
      text2: model.text2,
      text3: model.text3,
      inum1: model.inum1,
      creator: model.creator,
      lastModifyUser: model.lastModifyUser,
      lastModifyDate: model.lastModifyDate,
      dateTime1: model.dateTime1,
      dateTime2: model.dateTime2
    })
  )
};



export const selectPresalesViewResult: Selector<IStore, IPresalesView[]> = createSelector((state: IStore) => state.presalesView.data, _selectPresalesViewResult);
