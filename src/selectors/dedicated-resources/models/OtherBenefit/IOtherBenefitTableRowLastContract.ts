export default interface IOtherBenefitTableRowLastContract {
    readonly idState: number;
    readonly benefitID: number;
    readonly contractID: number;
    readonly benefitType: string;
    readonly benefitTypeStr: string;
    readonly benefitDescStr: string;
    readonly benefitDesc: string;
    readonly flagLastContract: boolean;
    readonly flagNewContract: boolean;
    readonly userLoginID: number;
    readonly isSave: number
  }
  