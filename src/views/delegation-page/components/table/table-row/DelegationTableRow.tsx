import React from 'react';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Table, Dropdown } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import IObjListDelegation from 'selectors/delegation/models/IObjListDelegation';
import * as DelegationActions from 'stores/delegation/DelegationActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

// import classes from './DelegationTable.module.scss';

interface IProps {
  readonly rowData: IObjListDelegation;
  readonly setActivePage: any;
  readonly tableData: any;
}

const DelegationTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData, setActivePage, tableData } = props;
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const handleDelete = (id) => {
    dispatch(DelegationActions.deleteDelegation(id)).then(() => {
      dispatch(DelegationActions.requestDelegation(currentUser.employeeID, 1, 10));
      setActivePage(1);
    });
  };

  return (
    <Table.Row key={rowData.delegasiID}>
      {tableData?.rows?.find((e) => e.fromUser === currentUser.employeeID)?.hasOwnProperty('fromUserStr') && (
        <Table.Cell width="1">
          {rowData.fromUser === currentUser.employeeID && (
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item to={`/delegation-form/${rowData.delegasiID}`} as={Link} text="View/Edit" icon="edit outline" />
                <Dropdown.Item text="Delete" icon="trash alternate" onClick={() => handleDelete(rowData.delegasiID)} />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Table.Cell>
      )}

      <Table.Cell>{rowData.fromUserStr}</Table.Cell>
      <Table.Cell>
        {rowData.toUser}
        {/* {rowData.toUser.split(',').map((i, k) => {
          return (
            <Label className={`mb-1 ${classes.bgPuple} ${classes.labelRounded20}`} key={k}>
              {i}
            </Label>
          );
        })} */}
      </Table.Cell>
      <Table.Cell>{rowData.application}</Table.Cell>
      <Table.Cell>{rowData.effDateStr}</Table.Cell>
      <Table.Cell>{rowData.expDateStr}</Table.Cell>
      <Table.Cell>{ReactHtmlParser(rowData.remarks)}</Table.Cell>
    </Table.Row>
  );
};

export default DelegationTableRow;
