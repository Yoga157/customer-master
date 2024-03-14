import React from 'react';
import { Dropdown, Icon, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { PSSRowModel } from 'stores/pss/models/PSSListModel';
import RouteEnum from 'constants/RouteEnum';

interface IProps {
  readonly tableData: PSSRowModel[];
  readonly funnelGenID: any;
}
const PSSTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData, funnelGenID } = props;

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Project Id</Table.HeaderCell>
          <Table.HeaderCell>Project Name</Table.HeaderCell>
          <Table.HeaderCell>Customer Name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData.map((tableCell: PSSRowModel, key) => (
          <Table.Row key={key}>
            <Table.Cell width="1">
              <Dropdown pointing="left" icon="ellipsis vertical">
                <Dropdown.Menu>
                  <Dropdown.Item
                    to={{
                      pathname: RouteEnum.ProjectScopeStatement,
                      state: { page: 'pss-list', funnelGenID: +funnelGenID, projectId: +tableCell.projectId },
                    }}
                    as={Link}
                    text="View/Edit"
                    icon="edit outline"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Table.Cell>

            <Table.Cell>{tableCell.projectId}</Table.Cell>
            <Table.Cell>{tableCell.projectName}</Table.Cell>
            <Table.Cell>{tableCell.customerName}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default PSSTable;
