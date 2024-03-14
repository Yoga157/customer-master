import { BaseModel } from 'sjs-base-model';

export default class CategoryOptionsModel extends BaseModel {
    textData: string = '';
    valueData: string = '';

  constructor(data: Partial<CategoryOptionsModel>) {
    super();
    this.update(data);
  }

}
