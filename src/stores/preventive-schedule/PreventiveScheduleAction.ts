import * as PreventiveScheduleEffects from './PreventiveScheduleEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import PreventiveScheduleModel from './models/PreventiveScheduleModel';

type ActionUnion = undefined | HttpErrorResponseModel | PreventiveScheduleModel[];

export const REQUEST_PREVENTIVE_SCHEDULE: string = 'PreventiveScheduleAction.REQUEST_PREVENTIVE_SCHEDULE';
export const REQUEST_PREVENTIVE_SCHEDULE_FINISHED: string = 'PreventiveScheduleAction.REQUEST_PREVENTIVE_SCHEDULE_FINISHED';

export const requestPreventiveSchedule = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<PreventiveScheduleModel[]>(
      dispatch,
      REQUEST_PREVENTIVE_SCHEDULE,
      PreventiveScheduleEffects.requestPreventiveSchedule
    );
  };
};
