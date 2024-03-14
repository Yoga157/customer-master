import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import RelatedFileModel from "stores/related-file/models/RelatedFileModel";
import ResultActions from "models/ResultActions";

const formatDate = (date: any): any => {
    const inputDate = new Date(date);

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);
    
    return formattedDate;
}

const _selectRelatedFile = (models: ResultActions): any => {
    if (Array.isArray(models.resultObj)) {
    return models.resultObj.map((model: RelatedFileModel): any => ({
        relatedFileID: model.rFileID,
        documentName: model.documentName,
        documentType: model.documentType,
        docmentPath: model.documentPath,
        uploadDate: formatDate(model.createDate),
        uploadBy: model.createdBy
    }))} else {
        return []
    }
}

export const selectRelatedFile: Selector<IStore, any> = createSelector(
    (state: IStore) => state.relatedFile.data, _selectRelatedFile
)