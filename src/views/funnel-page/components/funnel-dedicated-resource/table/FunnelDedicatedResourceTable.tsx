import React, { useState } from 'react';
import { Table, Accordion, Icon } from 'semantic-ui-react';
import styles from './FunnelDedicatedResourceTable.module.scss';
import IReqDedicatedResourceTable from 'selectors/funnel-dedicated-resource/models/IReqDedicatedResourceTable';
import IReqDedicatedResourceTableRow from 'selectors/funnel-dedicated-resource/models/IReqDedicatedResourceTableRow';
import FunnelDedicatedResourceTableRow from './table-row/FunnelDedicatedResourceTableRow';
interface IProps {
  readonly tableData: IReqDedicatedResourceTable;
}

const FunnelDedicatedResourceTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [activeIndex, setActiveIndex] = useState(true);
  const handleClick = () => {
    setActiveIndex(!activeIndex);
  };

  const { tableData } = props;
  return (
    <Accordion fluid styled>
      <Accordion.Title active={activeIndex} onClick={handleClick}>
        <Icon name="dropdown" />
        Dedicated Resource Member
      </Accordion.Title>
      <Accordion.Content active={activeIndex}>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Request No</Table.HeaderCell>
              <Table.HeaderCell>Request Date</Table.HeaderCell>
              <Table.HeaderCell>Engineer Dept</Table.HeaderCell>
              <Table.HeaderCell>Num of Resource</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Last Update By</Table.HeaderCell>
              <Table.HeaderCell>Last Update Time</Table.HeaderCell>
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
            {tableData.rows.map((model: IReqDedicatedResourceTableRow) => (
              <FunnelDedicatedResourceTableRow rowData={model} />
            ))}
          </Table.Body>
        </Table>
      </Accordion.Content>
    </Accordion>
  );
};

export default FunnelDedicatedResourceTable;
