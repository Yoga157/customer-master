import ModalSizeEnum from 'constants/ModalSizeEnum';

export default interface IModalNoPaddingState {
  readonly bOpen: boolean;
  readonly size: ModalSizeEnum;
  readonly closeOnDimmerClick: boolean;
  readonly content: any;
  readonly id: string;
  readonly url: string;
}
