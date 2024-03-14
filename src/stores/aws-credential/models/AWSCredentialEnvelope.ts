import AWSCredentialModel from './AWSCredentialModel';
import { BaseModel } from 'sjs-base-model';
import AWSCredentialSearch from './AWSCredentialSearch';

export default class AWSCredentialEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: AWSCredentialModel[];
  public readonly search: AWSCredentialSearch;
  public readonly column: string = '';
  public readonly sorting: string = '';

  constructor(data: Partial<AWSCredentialEnvelope>) {
    super();
    this.update(data);
  }
}
