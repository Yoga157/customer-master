import React from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { format } from 'date-fns';
import IDedicatedResourceTableRow from 'selectors/funnel-dedicated-resource/models/IReqDedicatedResourceTableRow';
import FunnelDedicatedResourceFormEdit from '../../form/form-edit/FunnelDedicatedResourceFormEdit';

interface IProps {
  readonly rowData: IDedicatedResourceTableRow;
}

const FunnelDedicatedResourceTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const onShowForm = () => {
    dispatch(ModalSecondLevelActions.OPEN(<FunnelDedicatedResourceFormEdit reqResourceGenID={rowData.reqResourceGenID} />, ModalSizeEnum.Small));
  };

  const { rowData } = props;

  return (
    <Table.Row key={rowData.funnelGenID}>
      <Table.Cell width="1">
        <Dropdown pointing="left" icon="ellipsis vertical">
          <Dropdown.Menu>
            <Dropdown.Item text="Edit/View" icon="edit outline" onClick={onShowForm} />

            {rowData.status !== 'Approved' && rowData.createUserID !== 831 && <Dropdown.Item text="Approve" icon="check" />}
            {rowData.status !== 'Approved' && rowData.createUserID !== 831 && <Dropdown.Item text="Reject" icon="ban" />}
            <Dropdown.Item text="Cancel" icon="cancel" />
          </Dropdown.Menu>
        </Dropdown>
      </Table.Cell>
      <Table.Cell>{rowData.reqResourceGenID}</Table.Cell>
      <Table.Cell>{rowData.createDate === null ? '' : format(new Date(rowData.createDate!), 'dd-MM-yyyy')}</Table.Cell>
      <Table.Cell>{rowData.engineerDeptName}</Table.Cell>
      <Table.Cell>{rowData.numOfResource}</Table.Cell>
      <Table.Cell>{rowData.status}</Table.Cell>
      <Table.Cell>{rowData.lastModifyBy}</Table.Cell>
      <Table.Cell>{rowData.modifyDate === null ? '' : format(new Date(rowData.modifyDate!), 'dd-MM-yyyy')}</Table.Cell>
    </Table.Row>
  );
};

export default FunnelDedicatedResourceTableRow;
