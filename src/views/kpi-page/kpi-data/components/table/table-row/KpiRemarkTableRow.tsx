import React, { useCallback } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Table, Dropdown } from 'semantic-ui-react';
import IKpiDataRemarkTableRow from 'selectors/kpi/kpi-data/models/IKpiDataRemarkTableRow';
import ReactHtmlParser from 'react-html-parser';

interface IProps {
  readonly rowData: IKpiDataRemarkTableRow;
}

const KpiRemarkTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;
  const dispatch: Dispatch = useDispatch();

  return (
    <Table.Row key={rowData.id}>
      <Table.Cell>{ReactHtmlParser(rowData.remark)}</Table.Cell>
      <Table.Cell>{rowData.employeeName}</Table.Cell>
      <Table.Cell>{rowData.modifyDate}</Table.Cell>
    </Table.Row>
  );
};

export default KpiRemarkTableRow;
