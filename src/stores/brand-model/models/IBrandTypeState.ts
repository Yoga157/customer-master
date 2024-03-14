import BrandTypeEnvelope from './BrandTypeEnvelope';
import BrandTypeModel from './BrandTypeModel';

export default interface IBrandTypeState {
  readonly data: BrandTypeModel[];
  readonly firstData: BrandTypeModel;
  readonly listData: BrandTypeEnvelope;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
