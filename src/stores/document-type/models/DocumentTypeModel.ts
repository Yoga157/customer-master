import { BaseModel } from 'sjs-base-model';

export default class DocumentTypeModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<DocumentTypeModel>) {
    super();

    this.update(data);
  }
}
