import { NumberPicker } from 'react-widgets';

export default interface IFunnelStatus {
  readonly id: number;
  readonly entryKey: string;
  readonly statusName: string;
  readonly dealClosedDate: number;
}
