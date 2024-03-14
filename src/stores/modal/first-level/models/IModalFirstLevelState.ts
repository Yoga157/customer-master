import ModalSizeEnum from 'constants/ModalSizeEnum';

export default interface IModalFirstLevelState {
  readonly bOpen: boolean;
  readonly closeOnEscape?: boolean;
  readonly size: ModalSizeEnum;
  readonly content: any;
  readonly id: string;
  readonly url: string;
  readonly closeIcon?: boolean;
  readonly closeOnDimmerClick?: boolean;
}
