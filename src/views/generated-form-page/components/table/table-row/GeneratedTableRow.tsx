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
import * as GeneratedActions from 'stores/generated-form/GenerateFormActions';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
// import FunnelNotesForm from 'views/funnel-page/components/funnel-activity/form/FunnelNotesForm';
import ReportViewer from '../../letter/ReportViewer';

interface IProps {
  readonly rowData: any;
  readonly history: any;
  readonly key: number;
}

const FunnelTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [colorStatus, setColorStatus] = useState('grey' as any);
  const { rowData } = props;

  //   // if (result.errorNumber === '666') {
  //   //   dispatch(ToastsAction.add(result.message, ToastStatusEnum.Error));
  //   // }

  // }, [result.message])

  const moveToEdit = () => {
    dispatch(GeneratedActions.clearFunnelSAObject());
    props.history.push({
      pathname: RouteEnum.GeneratedFormAdd,
      state: {
        projectName: rowData.projectName,
        type: 'EDIT',
        formID: rowData.formID,
        customerName: rowData.customerName,
        formType: rowData.formType,
        SaNo: rowData.saNo,
        funnelGenID: rowData.funnelGenID,
        customerPICName: rowData.customerPICName,
      },
    });
  };

  const handlePrintReport = () => {
    dispatch(ModalFirstLevelActions.OPEN(<ReportViewer type={rowData.formType} formID={rowData.formID} />, ModalSizeEnum.FullScreen));
    // props.history.push({
    //   pathname: RouteEnum.GeneratedReport,
    //   state: { formID: rowData.formID, type: rowData.formType}
    // })
    // const win = window.open(RouteEnum.GeneratedReport, "_blank")!;
    // win.focus();
  };

  const handleCancel = () => setOpenConfirm(false);
  const showConfirm = () => setOpenConfirm(true);

  const handleDelete = () => {
    dispatch(GeneratedActions.requestDeleteGeneratedForm(rowData.formID)).then(() => {
      handleCancel();
      dispatch(GeneratedActions.clearResult());
      dispatch(GeneratedActions.requestGeneratedForm(1, 10, currentUser.employeeID));
    });
  };

  // useEffect(() => {
  //   console.log(rowData.formID)
  // }, [])

  return (
    <Fragment>
      <Confirm
        open={openConfirm}
        onCancel={handleCancel}
        onConfirm={handleDelete}
        centered
        content={`Are you sure want to delete ${rowData.formID} ?`}
        size="mini"
      />

      <Table.Row key={rowData.formID}>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical" key={rowData.formID}>
            <Dropdown.Menu>
              <Dropdown.Item text="Edit" icon="edit" onClick={moveToEdit} />

              <Dropdown.Item text="Delete" icon="trash" onClick={showConfirm} />

              <Dropdown.Item text="Print Report" icon="print" onClick={handlePrintReport} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.formID}</Table.Cell>
        <Table.Cell>{rowData.formType}</Table.Cell>
        <Table.Cell>{rowData.funnelGenID}</Table.Cell>
        <Table.Cell>{rowData.saNo}</Table.Cell>
        <Table.Cell>{rowData.projectName}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.customerPICName}</Table.Cell>
        <Table.Cell>{rowData.salesName}</Table.Cell>
        <Table.Cell>{rowData.engineerPMName}</Table.Cell>
        <Table.Cell>{rowData.createdBy}</Table.Cell>
        <Table.Cell>{rowData.createdDate}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelTableRow;
