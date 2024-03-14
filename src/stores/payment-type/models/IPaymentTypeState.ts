import PaymentTypeModel from './PaymentTypeModel';

export default interface IPaymentTypeState {
  readonly data: PaymentTypeModel[];
  readonly error: boolean;
}
