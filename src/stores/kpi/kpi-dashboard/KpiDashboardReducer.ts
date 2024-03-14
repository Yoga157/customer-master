import ResultActions from "models/ResultActions";
import IKpiDashboardState from "./models/IKpiDashboardState";
import KpiDashboardModel from "./models/KpiDashboardModel";
import { Reducer } from 'redux';
import baseReducer from '../../../utilities/BaseReducer';

export const initialState: IKpiDashboardState = {
    data: [],
    firstData: new KpiDashboardModel({}),
    error: false,
    refreshPage: false,
    summaryByPic: [],
    picListByDept: [],
    resultActions: new ResultActions({}),
};

const kpiDashboardReducer: Reducer = baseReducer(initialState, {});

export default kpiDashboardReducer;