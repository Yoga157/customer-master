export default interface IOtherBenefitTableRow {
  readonly idState: number;
  readonly benefitID: number;
  readonly contractID: number;
  readonly benefitType: string;
  readonly benefitTypeStr: string;
  readonly benefitDescStr: string;
  readonly benefitDesc: string;
  readonly flagNewContract: boolean;
  readonly flagLastContract: boolean;
  readonly isSave: number
  readonly userLoginID: number;
}
