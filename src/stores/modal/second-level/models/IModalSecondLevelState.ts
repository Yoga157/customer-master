import ModalSizeEnum from 'constants/ModalSizeEnum';

export default interface IModalSecondLevelState {
  readonly bOpen: boolean;
  readonly size: ModalSizeEnum;
  readonly content: any;
  readonly id: string;
}
