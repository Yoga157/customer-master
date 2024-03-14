import React from 'react';
import { Table } from 'semantic-ui-react';
import IKpiSettingTable from '../../../../../selectors/kpi/models/IKpiSettingTable';
import IKpiSettingTableRow from '../../../../../selectors/kpi/models/IKpiSettingTableRow';
import KpiSettingTableRow from './table-row/KpiSettingTableRow';

interface IProps {
    readonly tableData: IKpiSettingTable;
};

const KpiSettingTable: React.FC<IProps> = ({tableData}) => {
    return (
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Key Activity</Table.HeaderCell>
                    <Table.HeaderCell>Division</Table.HeaderCell>
                    <Table.HeaderCell>Department</Table.HeaderCell>
                    <Table.HeaderCell>Function</Table.HeaderCell>
                    <Table.HeaderCell>KPI Direksi</Table.HeaderCell>
                    <Table.HeaderCell>Measurement</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Point</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {tableData.rows.length === 0 && 
                    <Table.Row>
                        <Table.Cell colSpan={10}>No Data</Table.Cell>
                    </Table.Row>
                }
                {tableData.rows.map((model: IKpiSettingTableRow) => (
                    <KpiSettingTableRow key={model.kpiID} rowData={model} />
                ))}
            </Table.Body>
        </Table>
    )
};

export default KpiSettingTable;



