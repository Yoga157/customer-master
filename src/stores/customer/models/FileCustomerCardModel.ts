import { BaseModel } from 'sjs-base-model';

export default class FileCustomerCardModel extends BaseModel {
  public CustomerGenID: number = 0;
  public CustomerCardID: number = 0;
  public ImageFile: any = '';
  public Creator: string = '';

  constructor(data: Partial<FileCustomerCardModel>) {
    super();
    this.update(data);
  }
}
