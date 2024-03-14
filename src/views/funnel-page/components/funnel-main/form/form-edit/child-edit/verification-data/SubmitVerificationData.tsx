import { Button, Grid, Icon, Message } from 'semantic-ui-react';
import React, { Fragment, useCallback, useEffect } from 'react';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import VerificationTable from './table/VerificationTable';
import IStore from 'models/IStore';
import { selectVerificationFunnels } from 'selectors/verification-funnel/VerificationFunnelSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { FunnelViewEditStatus } from 'stores/funnel/models/view-edit';
import { Redirect } from 'react-router-dom';
import { History } from 'history';
import RouteEnum from 'constants/RouteEnum';

interface IProps {
  funnelgenid: string;
  funnelStatus: FunnelViewEditStatus;
  history: History;
  onClose: any;
}

const SubmitVerificationData: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    // if(+props.funnelgenid > 0)
    // {
    // dispatch(FunnelActions.requestVerificationFunnel(+props.funnelgenid))
    // }
  }, [dispatch, props.funnelgenid]);

  const onSubmitConfirmation = () => {
    dispatch(FunnelActions.putViewFunnelStatus(props.funnelStatus));
  };

  const onClose = () => {
    dispatch(ModalFirstLevelActions.CLOSE());
  };

  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnel.refreshPage);

  if (bRefreshPage) {
    //props.history.push(`/funnel-form/${+props.funnelgenid}`)
    props.onClose();
    dispatch(FunnelActions.requestViewFunnelStatusById(+props.funnelgenid));
    dispatch(ModalFirstLevelActions.CLOSE());
  }

  const VerificationTableData = useSelector((state: IStore) => selectVerificationFunnels(state));
  const notPass = VerificationTableData.rows.filter((c) => c.verificationStatus.length > 0);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <VerificationTable tableData={VerificationTableData} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Fragment>
            <Message color={notPass.length > 0 ? 'red' : 'green'}>
              <Message.Header>{notPass.length > 0 ? 'Warning!!' : 'Well Done!'}</Message.Header>
              <Message.Content>
                {notPass.length > 0 && <p>Please return to the funnel menu and complete the data</p>}
                {notPass.length === 0 && <p>All Data verification are passed </p>}
              </Message.Content>
            </Message>
            {notPass.length > 0 && <Button type="button" color="red" content="Close" floated="right" onClick={onClose} />}
            {notPass.length === 0 && <Button type="button" color="green" floated="right" content="Submit" onClick={onSubmitConfirmation} />}
          </Fragment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SubmitVerificationData;
