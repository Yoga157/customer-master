import ModalSizeEnum from 'constants/ModalSizeEnum';

export default interface IModalThirdLevelState {
  readonly bOpen: boolean;
  readonly size: ModalSizeEnum;
  readonly content: any;
  readonly id: string;
}
