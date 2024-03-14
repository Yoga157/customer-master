import { BaseModel } from 'sjs-base-model';

export default class AWSCredentialSearch extends BaseModel {
  text: string = '';
  page: number = 0;
  pageSize: number = 0;

  constructor(data: Partial<AWSCredentialSearch>) {
    super();
    this.update(data);
  }
}
