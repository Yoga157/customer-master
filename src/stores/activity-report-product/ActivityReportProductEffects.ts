import environment from 'environment';
import * as EffectUtility from 'utilities/EffectUtility';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import ActivityReportProductEnvelope from './models/ActivityReportProductEnvelope';
import ActivityReportProductModel from './models/ActivityReportProductModel';
import ResultActions from 'models/ResultActions';
import ActivityReportProductUpdateModel from './models/ActivityReportProductUpdateModel';
import TableRowModel from './models/TableRowModel';
import ActivityReportViewEditProducts from 'stores/activity-report/models/view-edit/ActivityReportViewEditProducts';

// ---------------------------------------------------------------------------
export const getActivityReportProductLocal = async(): Promise<any> => {
    const listARProduct: TableRowModel[] = [];
    const detailProductARInLocalStorage: string = 'detailProductAR';
    const jsonString = localStorage.getItem(detailProductARInLocalStorage);
    if (jsonString !== null) {
        const objects = JSON.parse(jsonString);

        for (const object of objects.rows) {
            const result = new TableRowModel({
                activityReportGenID: object.activityReportGenID,
                activityReportProductGenID: object.activityReportProductGenID,
                productName: object.productName,
                productNumber: object.productNumber,
                serialNumber: object.serialNumber,
                salesUnit: object.salesUnit,
                licenseNumber: object.licenseNumber,
                quantity: object.quantity,
                createUserID: object.createUserID,
                modifyUserID: object.modifyUserID,
                createDate: object.createDate,
                modifyDate: object.modifyDate,
                isUpdate: object.isUpdate,
                isDelete: object.isDelete,
                isAdd: object.isAdd
            });
            listARProduct.push(result);
        }
    }

    return listARProduct;
};

export const requestViewProductByActivityReportGenID = async (
    activityReportGenID: number,
) : Promise<TableRowModel | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportItem?activityReportGenID=${activityReportGenID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<TableRowModel>(
        TableRowModel, 
        endpoint
    );
};

export const requestViewProductCheckAllowAccessByActivityReportGenID = async (
    activityReportGenID: number,
    userLoginID: number
) : Promise<ActivityReportViewEditProducts | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportItem/GetViewEditItems?activityReportItemGenID=${activityReportGenID}&userLoginID=${userLoginID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportViewEditProducts>(
        ActivityReportViewEditProducts, 
        endpoint
    );
};

export const postActivityProduct = async (
    data: ActivityReportProductModel
): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportItem`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<ResultActions>(
        ResultActions, 
        endpoint, 
        data);
};

export const putActivityProduct = async (
    data: ActivityReportProductUpdateModel
): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportItem`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.putToModel<ResultActions>(
        ResultActions, 
        endpoint, 
        data
    );
};

export const deleteActivityProduct = async (
    activityReportGenID: number,
    activityReportProductGenID: number
): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportItem?activityReportItemGenID=${activityReportProductGenID}&activityReportGenID=${activityReportGenID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.delToModel<ResultActions>(
        ResultActions, 
        endpoint
    );
};