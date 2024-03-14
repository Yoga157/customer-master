import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import { History } from 'history';
import { Button } from 'views/components/UI';
import IStore from 'models/IStore';
import BankGaransiForm from 'views/bank-garansi-page/admin/components/form/form-create/BankGaransiForm';
import BankGaransiTable from './components/table/BankGaransiTable';
import { selectViewFunnelCustomer, selectViewFunnelStatus } from 'selectors/funnel/FunnelSelector';
import IBankGaransiTable from 'selectors/bank-garansi/models/IBankGaransiTable';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { selectBankGaransis } from 'selectors/bank-garansi/BankGaransiSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
  funnelGenID: string;
  popupLevel: number;
  history: History;
}

const BankGaransi: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const { popupLevel, funnelGenID, history } = props;

  useEffect(() => {
    dispatch(BankGaransiActions.requestBankGaransis(+funnelGenID, activePage, pageSize));
  }, [dispatch, funnelGenID, activePage, pageSize]);

  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const bankGaransiTables: IBankGaransiTable = useSelector((state: IStore) => selectBankGaransis(state, [BankGaransiActions.REQUEST_BANK_GARANSIS]));
  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onAddBankGaransi = useCallback((): void => {
    if (popupLevel === 1) {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <BankGaransiForm
            popupFrom={'funnel'}
            history={history}
            dealCloseDate={viewFunnelStatus.dealCloseDate!}
            funnelGenID={+funnelGenID}
            popupLevel={popupLevel}
          />,
          ModalSizeEnum.Small
        )
      );
    } else if (popupLevel === 2) {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <BankGaransiForm
            popupFrom={'funnel'}
            history={history}
            dealCloseDate={viewFunnelStatus.dealCloseDate!}
            funnelGenID={+funnelGenID}
            popupLevel={popupLevel}
          />,
          ModalSizeEnum.Small
        )
      );
    } else if (popupLevel === 3) {
      dispatch(
        ModalThirdLevelActions.OPEN(
          <BankGaransiForm
            popupFrom={'funnel'}
            history={history}
            dealCloseDate={viewFunnelStatus.dealCloseDate!}
            funnelGenID={+funnelGenID}
            popupLevel={popupLevel}
          />,
          ModalSizeEnum.Small
        )
      );
    }
  }, [dispatch, funnelGenID, popupLevel]);

  return (
    <Grid padded>
      <Grid.Row columns="equal">
        <Grid.Column>
          <p style={{ fontWeight: 'bold' }}>
            Bank Reference / Guarantee For {props.funnelGenID !== '0' && viewFunnelCustomer && 'for #' && viewFunnelCustomer.projectName}
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Button type="button" icon="plus" color="green" floated="right" size="small" content="Add" onClick={onAddBankGaransi} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <BankGaransiTable tableData={bankGaransiTables} />
      </Grid.Row>
    </Grid>
  );
};

export default BankGaransi;
