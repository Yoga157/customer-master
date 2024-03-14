import React, { Fragment, useEffect } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as SubBrandActions from 'stores/brand-sub/SubBrandAction';
import { selectBrandOptions, selectSubBrandOptions } from 'selectors/select-options';
import * as BrandActions from 'stores/brand/BrandAction';
import IStore from 'models/IStore';
import FunnelWarrantySLAsModel from 'stores/funnel-warranty/models/FunnelWarrantySLAsModel';
import FunnelWarrantySLAModel from 'stores/funnel-warranty/models/FunnelWarrantySLAModel';
import FunnelWarrantySLADetailModel from 'stores/funnel-warranty/models/FunnelWarrantySLADetailModel';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { selectWarrantySLA } from 'selectors/funnel-warranty-sla/FunnelWarrantySLASelector';
import WarrantySLACustomerFormEdit from '../../../funnel-warranty-sla-customer/form/form-edit/WarrantySLACustomerFormEdit';
import WarrantySLAVendorFormEdit from '../../../funnel-warranty-sla-vendor/form/form-edit/WarrantySLAVendorFormEdit';
import WarrantySLABrandEdit from './WarrantySLABrandEdit';

interface IProps {
  warrantySupportID: number;
  warrantySLAGenID: number;
}

const WarrantySLAFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelWarrantySLA.refreshPage);
  const { warrantySupportID, warrantySLAGenID } = props;

  const warrantyDetail: FunnelWarrantySLADetailModel[] = useSelector((state: IStore) => state.funnelWarrantySLA.listData.rows);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(BrandActions.requestBrand());
    dispatch(FunnelWarrantyActions.requestWarrantySLAById(+warrantySLAGenID));
  }, [dispatch]);

  return (
    <Fragment>
      <Header attached="top" dividing>
        <Header.Content>SLA Detail For Project</Header.Content>
      </Header>
      <Segment color="blue">
        <WarrantySLABrandEdit />
      </Segment>
      <Segment color="green">
        <WarrantySLACustomerFormEdit warrantySLAGenID={+warrantySLAGenID} />
      </Segment>
      <Segment color="green">
        <WarrantySLAVendorFormEdit warrantySLAGenID={+warrantySLAGenID} />
      </Segment>
    </Fragment>
  );
};

export default WarrantySLAFormEdit;
