import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import IKpiDetailsTable from '../../../../../selectors/kpi/models/IKpiDetailsTable';
import IKpiDataCreatorSummaryTable from 'selectors/kpi/kpi-data/models/IKpiDataCreatorSummaryTable';
import IKpiDetailsTableRow from '../../../../../selectors/kpi/models/IKpiDetailsTableRow';
import IKpiDataCreatorSummaryTableRow from 'selectors/kpi/kpi-data/models/IKpiDataCreatorSummaryTableRow';
import KpiDataSummaryCreatorTableRow from './table-row/KpiDataSummaryCreatorTableRow';

interface IProps {
  readonly tableData: IKpiDataCreatorSummaryTable;
  readonly tahun: number;
  readonly emplid: number;
  readonly udcid: number;
  readonly quarter: string;
  readonly measurement: string;
  readonly manual: number;
  readonly kpiSetting: string;
  readonly fileName: string;
}

const KpiDataSummaryCreatorTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData, tahun, emplid, udcid, quarter, manual, kpiSetting, fileName, measurement } = props;
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);
  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    //dispatch(KpiDirections.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, columns, direction));
  };
  return (
    <Table className="StickyHeader" striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Creator</Table.HeaderCell>
          <Table.HeaderCell>Point</Table.HeaderCell>
          <Table.HeaderCell>Remark</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.rows.map((model: IKpiDataCreatorSummaryTableRow) => (
          <KpiDataSummaryCreatorTableRow
            key={model.id}
            rowData={model}
            tahun={tahun}
            udcid={udcid}
            emplid={emplid}
            quarter={quarter}
            manual={manual}
            kpiSetting={kpiSetting}
            fileName={fileName}
            measurement={measurement}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default KpiDataSummaryCreatorTable;
