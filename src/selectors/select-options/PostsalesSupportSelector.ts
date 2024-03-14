import IStore from 'models/IStore';
import { createSelector, Selector } from 'reselect';
import PostsalesSupportModel from 'stores/postsales-support/models/PostsalesSupportModel';
import IOptionsDataString from './models/IOptionsDataString';

const _selectPostsalesOptions = (models: PostsalesSupportModel[]): IOptionsDataString[] => {
  return models.map(
    (model: PostsalesSupportModel): IOptionsDataString => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectPostsalesOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.postsalesSupport.data,
  _selectPostsalesOptions
);
