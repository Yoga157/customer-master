import React from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import ISoftwareTableRow from 'selectors/software/models/ISoftwareTableRow';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

import ReactHtmlParser from 'react-html-parser';

interface IProps {
  readonly rowData: ISoftwareTableRow;
}

const SoftwareTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.software.refreshPage);
  const { rowData } = props;

  return (
    <Table.Row key={rowData.softwareID}>
      {currentUser.role == 'Sales' ? null : (
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item to={`/software-form/${rowData.softwareID}`} as={Link} text="View/Edit" icon="edit outline" />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      )}

      <Table.Cell>{rowData.softwareName}</Table.Cell>
      <Table.Cell>{rowData.subSoftwareName}</Table.Cell>
      <Table.Cell>{ReactHtmlParser(rowData.leaders)}</Table.Cell>
      <Table.Cell>{ReactHtmlParser(rowData.challengers)}</Table.Cell>
      <Table.Cell>{ReactHtmlParser(rowData.visionaires)}</Table.Cell>
      <Table.Cell>{ReactHtmlParser(rowData.nichePlayers)}</Table.Cell>
      <Table.Cell>{rowData.createdBy}</Table.Cell>
      <Table.Cell>{rowData.createdDate}</Table.Cell>
      <Table.Cell>{rowData.modifiedBy}</Table.Cell>
      <Table.Cell>{rowData.modifiedDate}</Table.Cell>
    </Table.Row>
  );
};

export default SoftwareTableRow;
