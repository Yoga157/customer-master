import React, { Fragment, useEffect, useState } from 'react';
import { Table, Dropdown, Confirm, Button } from 'semantic-ui-react';
import IFunnelTableRow from 'selectors/funnel/models/IFunnelTableRow';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ReAssignSales from 'views/customer-transfer-page/components/reassign/ReAssignSales';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { format } from 'date-fns';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import FunnelNotesForm from 'views/funnel-page/components/funnel-activity/form/FunnelNotesForm';
import './FunnelTableRowStyle.scss';
import ReactHtmlParser from 'react-html-parser';
import IDashboardSalesTableRow from 'selectors/customer-credit-service/models/IDashboardSalesTableRow';

interface IProps {
  readonly rowData: IDashboardSalesTableRow;
  readonly index: number;
}

const FunnelTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [colorStatus, setColorStatus] = useState('grey' as any);
  const { rowData } = props;

  const reassignClick = (funnelGenID: number, funnelID: string, salesId: number, salesFromText: string) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ReAssignSales funnelGenID={funnelGenID} funnelID={funnelID} salesFrom={salesId} salesFromText={salesFromText} tabItem={''} />,
        ModalSizeEnum.Small
      )
    );
  };

  const showConfirmCancel = () => setOpenConfirm(true);

  const handleConfirm = () => {
    // dispatch(ModalFirstLevelActions.OPEN(<FunnelNotesForm funnelGenID={rowData.funnelGenID.toString()} fromForm="FormCancel" />, ModalSizeEnum.Tiny));
    setOpenConfirm(false);
  };

  const handleCancel = () => setOpenConfirm(false);

  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered size="tiny" />

      <Table.Row key={props.index}>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item to={`/customer-credit-service/${rowData.salesID}`} as={Link} text="View/Edit" icon="edit outline" target={'_blank'} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{+props.index + 1}</Table.Cell>
        <Table.Cell>{rowData.dept}</Table.Cell>
        <Table.Cell>{rowData.sales}</Table.Cell>
        <Table.Cell>{rowData.customerCreditAmount.toLocaleString()}</Table.Cell>
        <Table.Cell>{rowData.actualCreditUsedAmount.toLocaleString()}</Table.Cell>
        <Table.Cell>{rowData.remainingAmount.toLocaleString()}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelTableRow;
