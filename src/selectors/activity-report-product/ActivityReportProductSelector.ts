import { Selector } from 'react-redux';
import IStore from "models/IStore";
import { createSelector } from "reselect";
import TableRowModel from 'stores/activity-report-product/models/TableRowModel';
import ActivityReportViewEditProducts from 'stores/activity-report/models/view-edit/ActivityReportViewEditProducts';

interface TableModel {
    readonly activityReportGenID: number;
    readonly activityReportProductGenID: number;
    readonly productName: string;
    readonly productNumber: string;
    readonly serialNumber: string;
    readonly licenseNumber: string;
    readonly quantity: number;
    readonly salesUnit: string;
    readonly createUserID: number;
    readonly createDate: Date;
    readonly modifyUserID: number;
    readonly modifyDate: Date;
    readonly isUpdate: number;
    readonly isDelete: number;
    readonly isAdd: number;
}

const _selectRows = (models: any) => {
    return models.map((model: TableRowModel): any => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: any) => {
    return {
        activityReportGenID: model.activityReportGenID,
        activityReportProductGenID: model.activityReportProductGenID,
        productName: model.productName,
        productNumber: model.productNumber,
        serialNumber: model.serialNumber,
        licenseNumber: model.licenseNumber,
        quantity: model.quantity,
        salesUnit: model.salesUnit,
        createUserID: model.createUserID,
        createDate: new Date(model.createDate!),
        modifyUserID: model.modifyUserID,
        modifyDate: model.modifyDate === null ? null : new Date(model.modifyDate!),
        isUpdate: model.isUpdate?.toString() === 'NaN' ? 0 : model.isUpdate,
        isDelete: model.isDelete?.toString() === 'NaN' ? 0 : model.isDelete,
        isAdd: model.isAdd?.toString() === 'NaN' ? 0 : model.isAdd,

    }
}

export const selectRows: Selector<IStore, TableModel[]> = createSelector((state: IStore) => state.activityReportProduct.rowTable, _selectRows);
// ============================================================================
const _selectActivityReportProducts = (models: TableRowModel[]) => {
    return models.map((model: TableRowModel): any => _mappingViewActivityReportProductObject(model));
};

const _mappingViewActivityReportProductObject = (model: TableRowModel) => {
    return new TableRowModel ({
        activityReportProductGenID: model.activityReportProductGenID.toString() === 'NaN' ? 0 : model.activityReportProductGenID,
        activityReportGenID: model.activityReportGenID.toString() === 'NaN' ? 0 : model.activityReportGenID,
        productName: model.productName === 'undefined' ? '' : model.productName,
        productNumber: model.productNumber === 'undefined' ? '' : model.productNumber,
        serialNumber: model.serialNumber === 'undefined' ? '' : model.serialNumber,
        licenseNumber: model.licenseNumber === 'undefined' ? '' : model.licenseNumber,
        quantity: model.quantity,
        salesUnit: model.salesUnit === 'undefined' ? '' : model.salesUnit,
        createDate: model.createDate,
        createUserID: model.createUserID,
        modifyDate: model.modifyDate === null ? null : model.modifyDate,
        modifyUserID: model.modifyUserID === null ? 0 : model.modifyUserID,
        isUpdate: model.isUpdate?.toString() === 'NaN' ? 0 : model.isUpdate,
        isDelete: model.isDelete?.toString() === "NaN" ? 0 : model.isDelete,
        isAdd: model.isAdd?.toString() === 'NaN' ? 0 : model.isAdd,
    });
};

export const selectViewActivityReportProducts: Selector<IStore, TableModel[]> = createSelector(
    (state: IStore) => state.activityReportProduct.rowTable,
    _selectActivityReportProducts
);
// ============================================================================
const _mappingViewActivityReportProductCheckAllowAccessObject = (model: ActivityReportViewEditProducts): ActivityReportViewEditProducts => {
    return new ActivityReportViewEditProducts({
        isAllowAccess: model.isAllowAccess,
    });
};

const _selectViewActivityReportProductCheckAllowAccess = (model: ActivityReportViewEditProducts): ActivityReportViewEditProducts => {
    return _mappingViewActivityReportProductCheckAllowAccessObject(model);
};

export const selectViewActivityReportProductCheckAllowAccess: Selector<IStore, ActivityReportViewEditProducts> = createSelector(
    (state: IStore) => state.activityReportProduct.selectedData!,
    _selectViewActivityReportProductCheckAllowAccess
);
// ============================================================================