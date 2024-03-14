import ServiceItemModel from './ServiceItemModel';

export default interface IServiceItemState {
  readonly data: ServiceItemModel[];
  readonly error: boolean;
}
