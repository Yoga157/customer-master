import { BaseModel } from 'sjs-base-model';
import SearchResultModel from './SearchResultModel';

export default class SearchResultEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: SearchResultModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';

  constructor(data: Partial<SearchResultEnvelope>) {
    super();
    this.update(data);
  }
}
