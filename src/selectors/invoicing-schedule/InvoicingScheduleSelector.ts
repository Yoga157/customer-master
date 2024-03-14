import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import InvoicingScheduleModel from "stores/invoicing-schedule/models/InvoicingScheduleModel";
import ResultActions from "models/ResultActions";

const _selectInvoicingSchedule = (model: ResultActions): any => {
    if (Array.isArray(model.resultObj) && model.resultObj.length != 0) {
        return ({
            scheduleID: model.resultObj[0].iScheduleID,
            customerID: model.resultObj[0].customerID,
            scheduleDays: model.resultObj[0].scheduleDays,
            minDate: model.resultObj[0].minDate,
            maxDate: model.resultObj[0].maxDate,
            remark: model.resultObj[0].remark
          })
    } else {
        return {}
    }
};

export const selectInvoicingSchedule: Selector<IStore, any> = createSelector(
    (state: IStore) => state.invoicingSchedule.resultActions,
    _selectInvoicingSchedule
);