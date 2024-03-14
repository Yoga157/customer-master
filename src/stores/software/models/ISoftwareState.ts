import SoftwareEnvelope from './SoftwareEnvelope';
import SoftwareToolEnvelope from './SoftwareToolEnvelope';
import SoftwareModel from './SoftwareModel';
import SoftwareTypeModel from './SoftwareTypeModel';
import SoftwareSearchModel from './SoftwareSearchModel';
import SoftwareMainModel from './SoftwareMainModel';
import SoftwareHeaderModel from './SoftwareHeaderModel';

export default interface ISoftwareState {
  readonly data: SoftwareModel[];
  readonly search: SoftwareSearchModel[];
  readonly listSoftware: SoftwareSearchModel[];
  readonly listBusiness: SoftwareSearchModel[];
  readonly listOS: SoftwareSearchModel[];
  readonly listProgramming: SoftwareSearchModel[];
  readonly listInfra: SoftwareSearchModel[];
  readonly listDB: SoftwareSearchModel[];
  readonly softwareType: SoftwareTypeModel[];
  readonly businessSoftware: SoftwareTypeModel[];
  readonly infrastructureSoftware: SoftwareTypeModel[];
  readonly programmingSoftware: SoftwareTypeModel[];
  readonly operatingSystem: SoftwareTypeModel[];
  readonly database: SoftwareTypeModel[];
  readonly subSoftwareType: SoftwareTypeModel[];
  readonly softwareToolType: SoftwareTypeModel[];
  readonly firstData: SoftwareMainModel;
  readonly headerData: SoftwareHeaderModel;
  readonly listData: SoftwareEnvelope;
  readonly listDataDetail: SoftwareToolEnvelope;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
