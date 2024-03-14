import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Button } from 'views/components/UI';
import FunnelDedicatedResourceTable from './table/FunnelDedicatedResourceTable';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as ReqDedicatedResourceActions from 'stores/funnel-dedicated-resource/ReqDedicatedResourceActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import FunnelDedicatedResourceCreate from './form/form-create/FunnelDedicatedResourceCreate';
import IStore from 'models/IStore';
import { selectServiceAreaBufferResource, selectViewFunnelCustomer, selectViewFunnelCustomerPO } from 'selectors/funnel/FunnelSelector';
import ToolTips from 'views/components/UI/Tooltip/ToolTip';
import { selectReqDedicatedResources } from 'selectors/funnel-dedicated-resource/ReqDedicatedResourceSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
  //funnelGenID:string
}

const FunnelDedicatedResource: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [allowDedicatedResource, setAllowDedicatedResource] = useState(true);
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const viewFunnelCustomerPO = useSelector((state: IStore) => selectViewFunnelCustomerPO(state));
  const serviceAreaBufferResource = useSelector((state: IStore) => selectServiceAreaBufferResource(state));
  const funnelDedicatedResource = useSelector((state: IStore) =>
    selectReqDedicatedResources(state, [ReqDedicatedResourceActions.REQUEST_DEDICATED_RESOURCE])
  );

  useEffect(() => {
    dispatch(ReqDedicatedResourceActions.requestDedicatedResourceByFunnelGenID(viewFunnelCustomer.funnelGenID, activePage, pageSize));
    dispatch(FunnelActions.requestServiceAreaBufferResourceById(viewFunnelCustomer.funnelGenID));

    const projectName = viewFunnelCustomer.projectName;
    const dedicatedResource = viewFunnelCustomer.reqDedicatedResource;
    const startContractDate = viewFunnelCustomerPO.contractStartDate;
    const endContractDate = viewFunnelCustomerPO.contractEndDate;
    const maxResource = serviceAreaBufferResource.numOfMaxResource;
    const bufferResource = serviceAreaBufferResource.numOfBufferResource;

    if (
      projectName !== '' &&
      dedicatedResource !== 140 &&
      startContractDate !== undefined &&
      endContractDate !== undefined &&
      maxResource > 0 &&
      bufferResource > 0
    ) {
      setAllowDedicatedResource(false);
    } else {
      setAllowDedicatedResource(true);
    }
  }, [
    activePage,
    dispatch,
    pageSize,
    serviceAreaBufferResource.numOfBufferResource,
    serviceAreaBufferResource.numOfMaxResource,
    viewFunnelCustomer.funnelGenID,
    viewFunnelCustomer.projectName,
    viewFunnelCustomer.reqDedicatedResource,
    viewFunnelCustomerPO.contractEndDate,
    viewFunnelCustomerPO.contractStartDate,
  ]);

  const onOpenPopupChild = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalSecondLevelActions.OPEN(content, size));
    },
    [dispatch]
  );

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          {!allowDedicatedResource && (
            <Button
              type="button"
              icon="plus"
              color="green"
              floated="right"
              size="small"
              content="Request Dedicated Resource"
              onClick={() => onOpenPopupChild(<FunnelDedicatedResourceCreate />, ModalSizeEnum.Small)}
            />
          )}
          {allowDedicatedResource && (
            <ToolTips
              trigger={
                <Button
                  type="button"
                  icon="plus"
                  color="yellow"
                  floated="right"
                  size="small"
                  content="Request Dedicated Resource"
                  //disabled={true}
                />
              }
              content={
                <div>
                  <ol>
                    <li>Project Name</li>
                    <li>Request Dedicated Resource</li>
                    <li>Contract Date</li>
                    <li>Max Resource and Buffer Resource</li>
                  </ol>
                </div>
              }
              header="Please check some information below:"
              wide
            />
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FunnelDedicatedResourceTable tableData={funnelDedicatedResource} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FunnelDedicatedResource;
