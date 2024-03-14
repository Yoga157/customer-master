import SupportRoleModel from './SupportRoleModel';

export default interface ISupportRoleState {
  readonly data: SupportRoleModel[];
  readonly error: boolean;
}
