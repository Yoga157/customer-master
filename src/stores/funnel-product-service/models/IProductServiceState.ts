import ProductServiceModel from './ProductServiceModel';
import ProductServiceEnvelope from './ProductServiceEnvelope';
import FunnelBrandModel from './FunnelBrandModel';
import InternalServiceExistingModel from './InternalServiceExistingModel';
import ItemSubModel from './ItemSubModel';
import FunnelItemHistoryEnvelope from './FunnelItemHistoryEnvelope';
import FunnelVoucherAmountPICNameModel from './FunnelVoucherAmountPICNameModel';
import ProcessorTypeModel from './ProcessorTypeModel';

export default interface IProductServiceState {
  readonly listData: ProductServiceEnvelope;
  readonly listDataAll: ProductServiceEnvelope;
  readonly firstData: ProductServiceModel;
  readonly listBrand: FunnelBrandModel[];
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly internalService: InternalServiceExistingModel;
  readonly listSubItem: ItemSubModel[];
  readonly listSupplier: ItemSubModel[];
  readonly resultActions: any;
  readonly funnelItemHistory: FunnelItemHistoryEnvelope[];
  readonly VoucherAmount: FunnelVoucherAmountPICNameModel;
  readonly listProcessorType: ProcessorTypeModel[];
}
