import React from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import IKpiDataTableRow from 'selectors/kpi/kpi-data/models/IKpiDataTableRow';
import { Link } from 'react-router-dom';

interface IProps {
  readonly rowData: IKpiDataTableRow;
}

const KpiSummaryPICTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;

  return (
    <Table.Row key={rowData.emplid}>
      {/* <Table.Cell width="1">
        <Dropdown pointing="left" icon="ellipsis vertical">
          <Dropdown.Menu>
            <Dropdown.Item to={`/service-catalog-form/${rowData.emplid}`} as={Link} text="View/Edit" icon="edit outline" />
          </Dropdown.Menu>
        </Dropdown>
      </Table.Cell> */}
      <Table.Cell>{rowData.pic}</Table.Cell>
      <Table.Cell>{rowData.dept}</Table.Cell>
      <Table.Cell>{rowData.q1Point}</Table.Cell>
      <Table.Cell>{rowData.q1Nilai}</Table.Cell>
      <Table.Cell>{rowData.q2Point}</Table.Cell>
      <Table.Cell>{rowData.q2Nilai}</Table.Cell>
      <Table.Cell>{rowData.q3Point}</Table.Cell>
      <Table.Cell>{rowData.q3Nilai}</Table.Cell>
      {/* <Table.Cell>{rowData.measurement === 'Yearly' ? rowData.yearlyNilai : rowData.q4Nilai}</Table.Cell> */}
      <Table.Cell>{rowData.q4Point}</Table.Cell>
      <Table.Cell>{rowData.q4Nilai}</Table.Cell>
      <Table.Cell>{rowData.percentNilai} %</Table.Cell>
    </Table.Row>
  );
};

export default KpiSummaryPICTableRow;
