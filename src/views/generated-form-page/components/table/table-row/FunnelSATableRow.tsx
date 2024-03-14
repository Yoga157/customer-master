import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Table, Dropdown, Confirm, Button } from 'semantic-ui-react';
import IFunnelTableRow from 'selectors/funnel/models/IFunnelTableRow';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { format } from 'date-fns';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import './FunnelTableRowStyle.scss';
import ReactHtmlParser from 'react-html-parser';
import RouteEnum from 'constants/RouteEnum';
import { useLocation } from 'react-router-dom';
import * as FunnelOppActions from 'stores/funnel-opportunity/FunnelActivityActions';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as GeneratedActions from 'stores/generated-form/GenerateFormActions';
import RowData from 'stores/funnel-cost/models/TableRowModel';
import FunnelSARowModel from 'stores/generated-form/models/FunnelSARowModel';
// import FunnelNotesForm from 'views/funnel-page/components/funnel-activity/form/FunnelNotesForm';

interface IProps {
  readonly rowData: FunnelSARowModel;
  readonly history: any;
}

const FunnelTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [colorStatus, setColorStatus] = useState('grey' as any);
  const { rowData } = props;

  // const moveToAddNewFunnel = () => {
  //   props.history.push({
  //     pathname: RouteEnum.FunnelForm,
  //     state: { eventName: rowData.eventName,  customerName: rowData.customerName, funnelOpportunityID: rowData.funnelOpportunityID, eventDate:rowData.eventDate }
  //   })
  // }
  const showConfirmCancel = () => setOpenConfirm(true);

  // const handleConfirm = () => {
  //     dispatch(ModalFirstLevelActions.OPEN(<FunnelNotesForm funnelGenID={rowData.funnelGenID.toString()} fromForm="FormCancel" />,ModalSizeEnum.Tiny));
  //     setOpenConfirm(false);
  // }

  const handleCancel = () => setOpenConfirm(false);
  const showConfirm = () => setOpenConfirm(true);

  useEffect(() => {
    console.log('Effect nothing');
  }, []);

  const onSelectFunnelSA = () => {
    dispatch(GeneratedActions.insertFunnelSAObject(rowData));
    dispatch(ModalFirstLevelActions.CLOSE());
  };

  return (
    <Fragment>
      <Table.Row key={rowData.saNo}>
        <Table.Cell>
          <Button content="Select" primary onClick={onSelectFunnelSA} />
        </Table.Cell>
        <Table.Cell>{rowData.funnelGenID}</Table.Cell>
        <Table.Cell>{rowData.saNo}</Table.Cell>
        <Table.Cell>{rowData.so}</Table.Cell>
        <Table.Cell>{rowData.projectName}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.salesName}</Table.Cell>
        <Table.Cell>
          {rowData.funnelDate === undefined || format(new Date(rowData.funnelDate), 'dd-MM-yyyy') === '01-01-1900'
            ? ''
            : format(new Date(rowData.funnelDate), 'dd-MM-yyyy')}
        </Table.Cell>
        <Table.Cell>{format(new Date(rowData.saDate), 'dd-MM-yyyy')}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelTableRow;
