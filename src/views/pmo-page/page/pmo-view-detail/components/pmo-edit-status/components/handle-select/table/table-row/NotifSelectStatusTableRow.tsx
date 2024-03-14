import React from 'react';
import { Header, Icon, Popup, Table } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

import { IPMORequirements } from 'selectors/pmo/models/IPMORequirementCloseProject';

interface IProps {
  no: number;
  rowData: IPMORequirements;
}

const NotifSelectStatusTableRow: React.FC<IProps> = ({ rowData, no }) => {
  return (
    <Table.Row>
      <Table.Cell textAlign="center">{no}</Table.Cell>
      <Table.Cell>{rowData.title}</Table.Cell>
      <Table.Cell textAlign="center">
        {rowData.statusFullfilled && <Icon name="check" size="large" color="green" />}
        {!rowData.statusFullfilled && <Icon name="warning sign" size="large" color="red" />}
        {!rowData.statusFullfilled && rowData.note && (
          <Popup trigger={<Icon name="info circle" size="large" />} hideOnScroll position="right center">
            <Header as="h4" dividing>
              Please check the data below
            </Header>
            {ReactHtmlParser(`${rowData.note}`)}
          </Popup>
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default NotifSelectStatusTableRow;
