import BankGaransiModel from "./BankGaransiModel";
import FunnelHeaderNameModel from "stores/funnel/models/FunnelHeaderNameModel";
import AttachmentModel from "stores/attachment/models/AttachmentModel";

export default class BankGaransisModel {
  public SalesBankGuarantee:BankGaransiModel = new BankGaransiModel({});
  public SalesBankGuaranteeAttachment:AttachmentModel[] = [];
  public FunnelHeaderName:FunnelHeaderNameModel = new FunnelHeaderNameModel({});
 }
