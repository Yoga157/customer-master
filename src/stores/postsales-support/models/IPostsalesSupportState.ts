import PostsalesSuppoortModel from './PostsalesSupportModel';

export default interface IPostsalesSupportState {
  readonly data: PostsalesSuppoortModel[];
  readonly error: boolean;
}
