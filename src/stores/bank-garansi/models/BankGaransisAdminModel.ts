import BankGaransiAdminModel from './BankGaransiAdminModel';
import FunnelHeaderNameModel from 'stores/funnel/models/FunnelHeaderNameModel';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';

export default class BankGaransisModel {
  public SalesBankGuarantee: BankGaransiAdminModel = new BankGaransiAdminModel({});
  public SalesBankGuaranteeAttachment: AttachmentModel[] = [];
  public FunnelHeaderName: FunnelHeaderNameModel = new FunnelHeaderNameModel({});
}
