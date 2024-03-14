import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import ISoftwareToolTableRow from 'selectors/software/models/ISoftwareToolTableRow';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import SoftwareModel from 'stores/software/models/SoftwareModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import SoftwareForm from 'views/software-page/components/form/form-create/SoftwareForm';
import ModalSizeEnum from 'constants/ModalSizeEnum';

interface IProps {
  readonly id: number;
  readonly rowData: ISoftwareToolTableRow;
}

const SoftwareToolTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const showConfirm = () => setOpenConfirm(true);
  const handleCancel = () => setOpenConfirm(false);

  const { rowData, id } = props;

  const onEdit = useCallback((): void => {
    dispatch(SoftwareActions.requestSoftwareById(rowData.softwareToolID));
    dispatch(ModalFirstLevelActions.OPEN(<SoftwareForm type={'edit'} id={0} />, ModalSizeEnum.Small));
  }, [dispatch]);

  const handleConfirm = () => {
    //dispatch(SoftwareActions.del(rowData.svcCatGenID, currentUser.employeeID));
    const timeout = setTimeout(() => {
      dispatch(SoftwareActions.requestSoftwareTools(1, 15, id));
      setOpenConfirm(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Table.Row key={rowData.softwareToolID}>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item onClick={onEdit} text="View/Edit" icon="edit outline" />
              {rowData.flagFunnelGenID === 0 && <Dropdown.Item text="Delete" icon="trash alternate" onClick={showConfirm} />}
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>

        <Table.Cell>{rowData.softwareToolTypeName}</Table.Cell>
        <Table.Cell>{rowData.softwareToolName}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default SoftwareToolTableRow;
