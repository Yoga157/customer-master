import { createSelector, ParametricSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IAttachmentTable from './models/IAttachmentTable';
import IAttachmentTableRow from './models/IAttachmentTableRow';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';
import AttachmentEnvelope from 'stores/attachment/models/AttachmentEnvelope';
import IAttachmentAndAcceptenceTable from './models/IAttachmentAndAcceptenceTable';
import IAttachmentAndAcceptenceTableRow from './models/IAttachmentAndAcceptenceTableRow';
import AttachmentTopActiveEnvelope from 'stores/attachment/models/AttachmentTopActiveEnvelope';
import AttachmentTopActiveModel from 'stores/attachment/models/AttachmentTopActiveModel';
import AttachmentHistory from 'stores/attachment/models/AttachmentHistory';

const _selectAttachment = (models: AttachmentEnvelope): IAttachmentTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: AttachmentModel[]): IAttachmentTableRow[] => {
  return models.map((model: AttachmentModel): IAttachmentTableRow => _mappingObjectTableRow(model));
};

  const _mappingObjectTableRow = (model: AttachmentModel): IAttachmentTableRow => {
    return {
          funnelAttachmentID:model.funnelAttachmentID,
          funnelGenID:model.funnelGenID,
          documentTypeID:model.documentTypeID,
          documentType:model.documentType,
          documentName:model.documentName,
          versionNumber:model.versionNumber,
          status:model.status,
          uploadTime:model.uploadTime,
          uploadBy:model.uploadBy,
          fileName:model.fileName,
          fileDownload:model.fileDownload,
          flagView: model.flagView,
          modul: model.modul,
          docNumber: model.docNumber ? model.docNumber : '',
          notes: model.notes ? model.notes : '',
          topNumber: model.topNumber ? model.topNumber : '',
    };
  };

  export const selectAttachment: ParametricSelector<IStore,string[], IAttachmentTable> = createSelector(
    (state: IStore) => state.attachment.listData,
    (state: IStore, actionTypes: string[]) => actionTypes,
    _selectAttachment);  
    
    const _selectAttachmentAndAcceptence = (model: AttachmentTopActiveEnvelope): any => {
      return {
        totalRow: model.totalRows,
        rows: _createTableAttachmentTopActiveRows(model.rows?.length > 0 ? model.rows : []),
      };
    };
    
    const _createTableAttachmentTopActiveRows = (models: AttachmentTopActiveModel[]): IAttachmentAndAcceptenceTableRow[] => {
      return models.map((model: AttachmentTopActiveModel): IAttachmentAndAcceptenceTableRow => {
        return {
          funnelAttachmentID:model.funnelAttachmentID,
          funnelGenID:model.funnelGenID,
          documentName:model.documentName,
          fileName:model.fileName,
          fileDownload:model.fileDownload,
          documentTypeID:model.documentTypeID,
          documentType:model.documentType,
          versionNumber:model.versionNumber,
          uploadTime:model.uploadTime,
          uploadBy:model.uploadBy,
          status:model.status,
          flagView: model.flagView,
          modul: model.modul,
          docNumber:model.docNumber,
          notes:model.notes,
          topNumber:model.topNumber
        };
      });
    };

    export const selectAttachmentAndAcceptence: Selector<IStore, IAttachmentAndAcceptenceTable > = createSelector((state: IStore) => state.attachment.attachmentTopActive!, _selectAttachmentAndAcceptence);

    export const selectAttachmentAndAcceptenceTrue: Selector<IStore, IAttachmentAndAcceptenceTable > = createSelector((state: IStore) => state.attachment.attachmentNullTrue!, _selectAttachmentAndAcceptence);

    export const selectGeneralList: Selector<IStore, IAttachmentAndAcceptenceTable > = createSelector((state: IStore) => state.attachment.generalList!, _selectAttachmentAndAcceptence);

    const _createTotalDocument = (models: AttachmentModel[], type:string): number => {
      let result:number = 0;
      models.forEach(element => {
        if(element.documentType === type)
          result = result + 1
      });
      return result;
    };

    const _selectTotalDocument = (models: AttachmentEnvelope,type:string): number => {
      return _createTotalDocument(models.rows,type);
    };

    export const selectTotalDocument:ParametricSelector<IStore, string ,number> = createSelector(
      (state:IStore) => state.attachment.listData,
      (state:IStore, type:string) => type,
      _selectTotalDocument);


const _selectFunnelHistory = (models: AttachmentHistory[]): AttachmentHistory[] => {
  return models.map((model: AttachmentHistory): AttachmentHistory => _mappingFunnelHistory(model));
};

const _mappingFunnelHistory = (model: AttachmentHistory): AttachmentHistory => {
  return new AttachmentHistory({
    historyDate: model.historyDate,
    historyList: model.historyList,
  });
};

export const selectFileAttachmentTop: ParametricSelector<IStore, string[], any[]> = createSelector(
  (state: IStore) => state.attachment.attachmentTopHistory!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelHistory
);


      