import ResultActions from "models/ResultActions";
import InvoicingScheduleModel from "./InvoicingScheduleModel";

export default interface IInvoicingScheduleState {
    readonly data: InvoicingScheduleModel;
    resultActions: ResultActions;
}