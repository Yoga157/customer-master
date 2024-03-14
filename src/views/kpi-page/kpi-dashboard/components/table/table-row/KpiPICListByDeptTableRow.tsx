import React from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import IKpiDataDashboardDeptTableRow from 'selectors/kpi/kpi-data/models/IKpiDataDashboardDeptTableRow';

interface IProps {
  readonly rowData: IKpiDataDashboardDeptTableRow;
}

const KpiPICListByDeptTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;

  return (
    <Table.Row key={rowData.deptId}>
      {/* <Table.Cell width='1'>
                <Dropdown pointing='left' icon='ellipsis vertical'>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            to={`/service-catalog-form/${rowData.id}`} 
                            as={Link} 
                            text='View/Edit' 
                            icon='edit outline'
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Table.Cell> */}
      <Table.Cell>{rowData.dept}</Table.Cell>
      <Table.Cell>{rowData.totalPic}</Table.Cell>
      <Table.Cell>{rowData.totalPoint}</Table.Cell>
    </Table.Row>
  );
};

export default KpiPICListByDeptTableRow;
