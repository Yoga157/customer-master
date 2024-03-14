import { BaseModel } from 'sjs-base-model';
import BrandTypeModel from './BrandTypeModel';

export default class BrandTypeEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: BrandTypeModel[] = [];

  constructor(data: Partial<BrandTypeEnvelope>) {
    super();
    this.update(data);
  }
}
