import * as PostsalesSupportEffects from './PostsalesSupportEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import PostsalesSupportModel from './models/PostsalesSupportModel';

type ActionUnion = undefined | HttpErrorResponseModel | PostsalesSupportModel[];

export const REQUEST_POSTSALES: string = 'PostsalesSupportActions.REQUEST_POSTSALES';
export const REQUEST_POSTSALES_FINISHED: string = 'PostsalesSupportActions.REQUEST_POSTSALES_FINISHED';

export const requestPostsalesSupport = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<PostsalesSupportModel[]>(dispatch, REQUEST_POSTSALES, PostsalesSupportEffects.requestPostsalesSupport);
  };
};
