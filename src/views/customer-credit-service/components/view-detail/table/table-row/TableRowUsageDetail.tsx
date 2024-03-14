import React, { Fragment, useCallback, useEffect, useState } from 'react';
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
import FormTicket from 'views/customer-credit-service/components/form/form-ticket';
import UsageDetailModel from 'stores/customer-credit-service/models/UsageDetailModel';

interface IProps {
  readonly rowData: UsageDetailModel;
  readonly index: number;
}

const CustomerCreditTableRowDetail: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [colorStatus, setColorStatus] = useState('grey' as any);
  const { rowData } = props;

  const showConfirmCancel = () => setOpenConfirm(true);

  const handleConfirm = () => {
    // dispatch(ModalFirstLevelActions.OPEN(<FunnelNotesForm funnelGenID={rowData.funnelGenID.toString()} fromForm="FormCancel" />, ModalSizeEnum.Tiny));
    setOpenConfirm(false);
  };

  const handleCancel = () => setOpenConfirm(false);

  const onViewEditTicket = useCallback((): void => {
    dispatch(ModalFirstLevelActions.OPEN(<FormTicket typeForm="EDIT" rowData={rowData} salesID={rowData.salesID} />, ModalSizeEnum.Small));
  }, [dispatch]);

  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered size="tiny" />

      <Table.Row key={props.index}>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item text="View/Edit" icon="edit outline" onClick={onViewEditTicket} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.ticketNumber}</Table.Cell>
        <Table.Cell>{rowData.ticketTitle}</Table.Cell>
        <Table.Cell>{rowData.presalesName}</Table.Cell>
        <Table.Cell>{rowData.customer}</Table.Cell>
        <Table.Cell>{rowData.dept}</Table.Cell>
        <Table.Cell>{rowData.category}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.description.substring(0, 50) + '...')}</Table.Cell>
        <Table.Cell>{rowData.ticketDate}</Table.Cell>
        <Table.Cell>{rowData.resource}</Table.Cell>
        <Table.Cell>{rowData.complexity}</Table.Cell>
        <Table.Cell>{rowData.status}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.notes)}</Table.Cell>
        <Table.Cell>{rowData.price.toLocaleString()}</Table.Cell>
        <Table.Cell>{rowData.createdBy}</Table.Cell>
        <Table.Cell>{rowData.modifiedBy}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default CustomerCreditTableRowDetail;
