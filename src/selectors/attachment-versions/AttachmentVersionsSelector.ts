import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import IAttachmentVersionsTable from 'selectors/attachment-versions/models/IAttachmentVersionsTable';
import IAttachmentVersionsTableRow from 'selectors/attachment-versions/models/IAttachmentVersionsTableRow';
import AttachmentVersionsEnvelope from 'stores/attachment-versions/models/AttachmentVersionsEnvelope';
import AttachmentVersionsModel from 'stores/attachment-versions/models/AttachmentVersionsModel';

const _selectAttachmentVersions = (models: AttachmentVersionsEnvelope): IAttachmentVersionsTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

  const _createTableRows = (models: AttachmentVersionsModel[]): IAttachmentVersionsTableRow[] => {
    return models.map(
      (model: AttachmentVersionsModel): IAttachmentVersionsTableRow => (_mappingObjectTableRow(model))
    );
  };
  

  const _mappingObjectTableRow = (model: AttachmentVersionsModel): IAttachmentVersionsTableRow => {
    return {
          funnelAttachmentID:model.funnelAttachmentID,
          funnelGenID:model.funnelGenID,
          versionNumber:model.versionNumber,
          notes:model.notes,
          uploadTime:model.uploadTime,
          uploadBy:model.uploadBy,
          fileName:model.fileName,
          documentName:model.documentName,
          documentTypeID:model.documentTypeID,
          documentType: model.documentType,
          flagView:  model.flagView,
          docNumber:  model.docNumber ? model.docNumber : '',
          status: model.status
    };
  };

  export const selectAttachmentVersions: ParametricSelector<IStore,string[], IAttachmentVersionsTable> = createSelector(
    (state: IStore) => state.attachmentVersions.listData,
    (state: IStore, actionTypes: string[]) => actionTypes,
    _selectAttachmentVersions);