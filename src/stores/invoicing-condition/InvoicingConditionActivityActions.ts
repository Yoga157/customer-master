import * as InvoicingConditionEffect from "./InvoicingConditionActivityEffect"
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import ResultActions from "models/ResultActions";
import IStore from "../../models/IStore";
import InvoicingConditionModel from "./models/InvoicingConditionModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | InvoicingConditionModel
  | ResultActions;

  export const REQUEST_GET_INVOICING_CONDITION: string = "InvoicingConditionActions.REQUEST_GET_INVOICING_CONDITION";
  export const REQUEST_GET_INVOICING_CONDITION_FINISHED: string = "InvoicingConditionActions.REQUEST_GET_INVOICING_CONDITION_FINISHED";
    
  export const requestInvoicingCondition = (customerId: number): any => {
      return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
          await ActionUtility.createThunkEffect<ResultActions>(
              dispatch,
              REQUEST_GET_INVOICING_CONDITION,
              InvoicingConditionEffect.requestInvoicingCondition,
              customerId
          )
      }
  }

export const POST_INVOICING_CONDITION: string = "InvoicingConditionActions.POST_INVOICING_CONDITION";
export const POST_INVOICING_CONDITION_FINISHED: string = "InvoicingConditionActions.POST_INVOICING_CONDITION_FINISHED";
  
export const postInvoicingCondition = (data: InvoicingConditionModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            POST_INVOICING_CONDITION,
            InvoicingConditionEffect.postInvoicingCondition,
            data
        )
    }
}

export const DEL_INVOICING_CONDITION: string = "InvoicingConditionActions.DEL_INVOICING_CONDITION";
export const DEL_INVOICING_CONDITION_FINISHED: string = "InvoicingConditionActions.DEL_INVOICING_CONDITION_FINISHED";

export const deleteInvoicingCondition = (id: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<InvoicingConditionModel>(
        dispatch,
        DEL_INVOICING_CONDITION,
        InvoicingConditionEffect.deleteInvoicingCondition,
        id
      );
    };
  };