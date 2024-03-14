import IPostsalesSupportState from './models/IPostsalesSupportState';
import * as PostsalesSupportActions from './PostsalesSupportActions';
import IAction from '../../models/IAction';
import PostsalesSupportModel from './models/PostsalesSupportModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IPostsalesSupportState = {
  data: [],
  error: false,
};

const postsalesSupportReducer: Reducer = baseReducer(initialState, {
  [PostsalesSupportActions.REQUEST_POSTSALES_FINISHED](
    state: IPostsalesSupportState,
    action: IAction<PostsalesSupportModel[]>
  ): IPostsalesSupportState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default postsalesSupportReducer;
