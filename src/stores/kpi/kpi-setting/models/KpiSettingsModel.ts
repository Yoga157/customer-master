import KpiConditionModel from "stores/kpi/kpi-condition/models/KpiConditionModel";
import KpiSettingModel from "./KpiSettingModel";

export default class KpiSettingsModel {
    public KpiSetting:KpiSettingModel = new KpiSettingModel({});
    public KpiConditions:KpiConditionModel[] = [];
}