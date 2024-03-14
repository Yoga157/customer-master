import { ReduxDispatch } from 'models/ReduxProps';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import * as ActivityReportActivityInformationEffects from './ActivityReportCustomerSignatureEffects';
import ActivityReportViewCustomerSignature from 'stores/activity-report/models/view-edit/ActivityReportViewCustomerSignature';

type ActionUnion = undefined | 
    HttpErrorResponseModel | 
    ActivityReportViewCustomerSignature;

export const REQUEST_VIEW_CUSTOMER_SIGNATURE: string = 'ActivityReportCustomerSignatureActions.REQUEST_VIEW_CUSTOMER_SIGNATURE';
export const REQUEST_VIEW_CUSTOMER_SIGNATURE_FINISHED: string = 'ActivityReportCustomerSignatureActions.REQUEST_VIEW_CUSTOMER_SIGNATURE_FINISHED';
export const requestViewCustomerSignatureById = (
    activityReportGenID: number,
    userLoginID: number
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportViewCustomerSignature>(
            dispatch,
            REQUEST_VIEW_CUSTOMER_SIGNATURE,
            ActivityReportActivityInformationEffects.requestViewCustomerSignatureById,
            activityReportGenID,
            userLoginID
        );
    };
};