import React, { useState, Fragment } from 'react';
import { Table, Dropdown, Confirm, Icon } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as FunnelSupportTeamActions from 'stores/funnel-support-teams/FunnelSupportTeamActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { format } from 'date-fns';
import PMOEditStatusHook from 'views/pmo-page/page/pmo-view-detail/components/pmo-edit-status/hooks/PMOEditStatusHook';
import IFunnelSupportTeamsTableRow from 'selectors/funnel-support-teams/models/IFunnelSupportTeamsTableRow';
import FunnelTeamSupportForm from '../../form/FunnelTeamSupportForm';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import styles from './FunnelTeamsSupportTableRow.module.scss';
import IStore from 'models/IStore';

interface IProps {
  readonly rowData: IFunnelSupportTeamsTableRow;
  readonly page: string;
}

const FunnelTeamsSupportTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const { statusProject } = PMOEditStatusHook({});

  const showConfirm = () => setOpenConfirm(true);
  const handleConfirm = () => {
    dispatch(FunnelSupportTeamActions.delSupportTeams(rowData.funnelSupportID)).then(() => {
      dispatch(FunnelSupportTeamActions.requestSupportTeamsByFunnelGenID(rowData.funnelGenID, 1, 5));
    });
    setOpenConfirm(false);
  };

  const onShowForm = () => {
    dispatch(
      ModalSecondLevelActions.OPEN(
        <FunnelTeamSupportForm
          supportRoleID={rowData.supportRoleID}
          page={page}
          type="ASSIGN"
          funnelGenID={rowData.funnelGenID}
          employeeID={rowData.employeeID}
          funnelSupportID={rowData.funnelSupportID}
        />,
        ModalSizeEnum.Small
      )
    );
  };

  const onSearchDataBawahan = (value: number) => {
    const found = currentUser.hirarki?.find((c) => c.employeeID === value);
    if (found !== null) return true;

    return false;
  };

  const handleCancel = () => setOpenConfirm(false);

  const { rowData, page } = props;

  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Table.Row key={rowData.funnelGenID}>
        {page === 'funnel-view-edit' && (
          <Table.Cell width="1">
            {(rowData.employeeID === currentUser.employeeID || rowData.supportRole === currentUser.role) && (
              <Dropdown pointing="left" icon="ellipsis vertical">
                <Dropdown.Menu>
                  {(rowData.employeeID === currentUser.employeeID || onSearchDataBawahan(rowData.employeeID)) && (
                    <Dropdown.Item onClick={onShowForm} text="Assign" icon="add user" />
                  )}
                  {rowData.supportRole === currentUser.role && <Dropdown.Item text="Delete" icon="trash alternate" onClick={showConfirm} />}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Table.Cell>
        )}

        {page === 'pmo-view-edit' && (
          <Table.Cell width="1">
            {/* {rowData.supportRole === currentUser.role && ( */}
            <Icon name="trash alternate" size="small" className={`hover-pointer ${styles.icBgRed}`} onClick={showConfirm} circular />
            {/* )} */}
          </Table.Cell>
        )}

        <Table.Cell>{rowData.employeeName}</Table.Cell>
        <Table.Cell>{rowData.supportRole}</Table.Cell>
        <Table.Cell>{rowData.assignedBy === 'undefined' ? '' : rowData.assignedBy}</Table.Cell>
        <Table.Cell>{rowData.assignDate === null ? '' : format(new Date(rowData.assignDate!), 'dd-MM-yyyy')}</Table.Cell>
        <Table.Cell>{rowData.notes}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelTeamsSupportTableRow;
