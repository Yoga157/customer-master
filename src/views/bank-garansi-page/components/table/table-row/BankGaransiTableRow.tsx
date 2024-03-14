import React from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IBankGaransiTableRow from 'selectors/bank-garansi/models/IBankGaransiTableRow';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import BankGaransiFormEdit from '../../form/form-edit/BankGaransiFormEdit';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  readonly rowData: IBankGaransiTableRow;
}

const BankGaransiTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onViewEdit = () => {
    dispatch(ModalSecondLevelActions.OPEN(<BankGaransiFormEdit bankGuaranteeGenID={rowData.bankGuaranteeGenID} />, ModalSizeEnum.Small));
  };

  return (
    <Table.Row key={rowData.bankGuaranteeGenID}>
      <Table.Cell width="1">
        <Dropdown pointing="left" icon="ellipsis vertical">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} text="View/Edit" icon="edit outline" onClick={onViewEdit} />
            <Dropdown.Item text="Cancel" icon="minus circle" />
            <Dropdown.Item
              text="BG Return"
              icon="history"
              //onClick={onInactive}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Table.Cell>
      <Table.Cell>{rowData.bankGuaranteeGenID}</Table.Cell>
      <Table.Cell>{rowData.status}</Table.Cell>
      <Table.Cell>{rowData.bondIssuer}</Table.Cell>
      <Table.Cell>{rowData.bondType}</Table.Cell>
      <Table.Cell>{rowData.letterType}</Table.Cell>
      <Table.Cell>{rowData.bankGuaranteeNo}</Table.Cell>
      <Table.Cell>{rowData.nilai.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.projectAmount.toLocaleString()}</Table.Cell>
      <Table.Cell>{moment(rowData.submitDate).format('DD-MM-yyyy')}</Table.Cell>
      <Table.Cell>{moment(rowData.expireDate).format('DD-MM-yyyy')}</Table.Cell>
    </Table.Row>
  );
};

export default BankGaransiTableRow;
