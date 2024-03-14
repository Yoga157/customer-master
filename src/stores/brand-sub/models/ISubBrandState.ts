import ResultActions from 'models/ResultActions';
import SubBrandModel from './SubBrandModel';
import SubBrandProdModel from './SubBrandProdModel';

export default interface ISubBrandState {
  readonly data: SubBrandModel[];
  readonly dataSubBrand: SubBrandProdModel[];
  readonly firstdata: SubBrandModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly resultActions: ResultActions;
}
