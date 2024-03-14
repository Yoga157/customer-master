import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import IKpiDataDetailPointTable from 'selectors/kpi/kpi-data/models/IKpiDataDetailPointTable';
import IKpiDataDetailPointTableRow from 'selectors/kpi/kpi-data/models/IKpiDataDetailPointTableRow';
import KpiDetailPointTableRow from './table-row/KpiDetailPointTableRow';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

interface IProps {
  readonly tableData: IKpiDataDetailPointTable;
  readonly tahun: number;
  readonly quarter: string;
  readonly udcid: number;
  readonly emplid: number;
  readonly creator: string;
}

const KpiDetailPointTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData, tahun, quarter, udcid, emplid, creator } = props;
  const dispatch: Dispatch = useDispatch();
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    dispatch(
      KpiDataActions.requestKpiDetailPoints(
        props.udcid,
        props.emplid,
        props.quarter,
        props.tahun,
        props.creator,
        activePage,
        pageSize,
        direction,
        columns
      )
    );
  };
  return (
    <Table sortable className="StickyHeader" striped id="detailPoint">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell sorted={columns === 'DOCNO' ? direction : null} onClick={() => reloads('DOCNO')}>
            Doc No
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'DOCTYPE' ? direction : null} onClick={() => reloads('DOCTYPE')}>
            Doc Type
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'CREATOR' ? direction : null} onClick={() => reloads('CREATOR')}>
            Creator
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'POINT' ? direction : null} onClick={() => reloads('POINT')}>
            Point
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'StartDate' ? direction : null} onClick={() => reloads('StartDate')}>
            Start Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'EndDate' ? direction : null} onClick={() => reloads('EndDate')}>
            End Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'Customer' ? direction : null} onClick={() => reloads('Customer')}>
            Customer
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'BU' ? direction : null} onClick={() => reloads('BU')}>
            BU
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'REMARK' ? direction : null} onClick={() => reloads('REMARK')}>
            Remark
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.rows.map((model: IKpiDataDetailPointTableRow) => (
          <KpiDetailPointTableRow key={model.docno} rowData={model} tahun={tahun} quarter={quarter} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default KpiDetailPointTable;
