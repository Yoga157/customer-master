import { BaseModel } from 'sjs-base-model';

export default class PostsalesSupportModel extends BaseModel {
  public readonly valueData: string = '';
  public readonly textData: string = '';

  constructor(data: Partial<PostsalesSupportModel>) {
    super();

    this.update(data);
  }
}
