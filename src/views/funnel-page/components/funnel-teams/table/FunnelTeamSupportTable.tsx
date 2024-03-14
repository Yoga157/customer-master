import React, { useState } from 'react';
import { Table, Accordion, Icon } from 'semantic-ui-react';
import styles from './FunnelTeamSupportTable.module.scss';
import IFunnelTeamsSupportTable from 'selectors/funnel-support-teams/models/IFunnelSupportTeamsTable';
import FunnelTeamsSupportTableRow from './table-row/FunnelTeamsSupportTableRow';
import IFunnelTeamsSupportTableRow from 'selectors/funnel-support-teams/models/IFunnelSupportTeamsTableRow';

interface IProps {
  readonly tableData: IFunnelTeamsSupportTable;
  readonly page: string;
}

const FunnelTeamSupportTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [activeIndex, setActiveIndex] = useState(true);
  const handleClick = () => {
    setActiveIndex(!activeIndex);
  };

  const { tableData, page } = props;

  const table = (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Team Name</Table.HeaderCell>
          <Table.HeaderCell>Role Type</Table.HeaderCell>
          <Table.HeaderCell>Assigned By</Table.HeaderCell>
          <Table.HeaderCell>Assigned Time</Table.HeaderCell>
          <Table.HeaderCell>Note</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.totalRow === 0 && (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: IFunnelTeamsSupportTableRow, key) => (
          <FunnelTeamsSupportTableRow key={key} rowData={model} page={page} />
        ))}
      </Table.Body>
    </Table>
  );

  return (
    <>
      {page === 'funnel-view-edit' ? (
        <Accordion fluid styled>
          <Accordion.Title active={activeIndex} onClick={handleClick}>
            <Icon name="dropdown" />
            Team Member
          </Accordion.Title>
          <Accordion.Content active={activeIndex}>{table}</Accordion.Content>
        </Accordion>
      ) : (
        table
      )}
    </>
  );
};

export default FunnelTeamSupportTable;
