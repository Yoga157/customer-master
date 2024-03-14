import ConfigItemListBySerialNumber from "./ConfigItemListBySerialNumber";
import ConfigItemHeaderModel from "./ConfigItemHeaderModel";
import ResultActions from "models/ResultActions";
import ConfigItemList from "./ConfigItemList";
import ConfigTypeModel from "./ConfigTypeModel";

export default interface IConfigItemsState {
  readonly error: boolean;
  readonly selectProjPO: any;
  readonly selectProduct: any;
  readonly activePage: number;
  readonly refreshPage: boolean;
  readonly serialNumber: string;
  readonly activePageProduct: number;
  readonly activePageProductDetail: number;
  readonly isExportExcelConfigList: boolean;
  readonly resSearchSN: ConfigTypeModel[];
  readonly selectVendor: ConfigTypeModel[];
  readonly selectVendorType: ConfigTypeModel[];
  readonly selectCustomer: ConfigTypeModel[];
  readonly selectDepartment: ConfigTypeModel[];
  readonly configListBySN: ConfigItemListBySerialNumber;
  readonly listDataProductDetail: ConfigItemList;
  readonly configHeader: ConfigItemHeaderModel;
  readonly listDataProjectPO: ConfigItemList;
  readonly listDataProduct: ConfigItemList;
  readonly resultAction: ResultActions;
  readonly listDataAll: ConfigItemList;
  readonly listData: ConfigItemList;
}
