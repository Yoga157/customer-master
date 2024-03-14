import { BaseModel } from 'sjs-base-model';

export default class UploadModel extends BaseModel {
  public Files: any = '';

  constructor(data: Partial<UploadModel>) {
    super();
    this.update(data);
  }
}
