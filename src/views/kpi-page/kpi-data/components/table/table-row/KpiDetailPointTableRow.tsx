import React, { useCallback } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Table, Dropdown, StrictSegmentGroupProps } from 'semantic-ui-react';
import IKpiDataDetailPointTableRow from 'selectors/kpi/kpi-data/models/IKpiDataDetailPointTableRow';
import ReactHtmlParser from 'react-html-parser';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import HistoryRemarkPoint from 'views/kpi-page/kpi-data/components/modal/HistoryRemarkPoint';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { format } from 'date-fns';

import { Button } from '../../../../../components/UI';

interface IProps {
  readonly rowData: IKpiDataDetailPointTableRow;
  tahun: number;
  quarter: string;
}

const KpiDetailPointTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;
  const dispatch: Dispatch = useDispatch();

  const onRemark = useCallback(
    (docno: string, udcid: number, emplid: number, doctype: string, tahun: number, quarter: string, creator: string): void => {
      dispatch(
        ModalThirdLevelActions.OPEN(
          <HistoryRemarkPoint docno={docno} udcid={udcid} emplid={emplid} doctype={doctype} tahun={tahun} quarter={quarter} creator={creator} />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch]
  );

  const onAddRemark = (docno: string, udcid: number, emplid: number, doctype: string, tahun: number, quarter: string, creator: string) => {
    onRemark(docno, udcid, emplid, doctype, tahun, quarter, creator);
  };

  return (
    <Table.Row key={rowData.docno}>
      <Table.Cell>{rowData.docno}</Table.Cell>
      <Table.Cell>{rowData.doctype}</Table.Cell>
      <Table.Cell>{rowData.creator}</Table.Cell>
      <Table.Cell>{rowData.point}</Table.Cell>
      <Table.Cell>{format(new Date(rowData.startDate), 'dd-MM-yyyy')}</Table.Cell>
      <Table.Cell>{format(new Date(rowData.endDate), 'dd-MM-yyyy')}</Table.Cell>
      <Table.Cell>{rowData.customer}</Table.Cell>
      <Table.Cell>{rowData.bu}</Table.Cell>
      <Table.Cell>
        {' '}
        <a
          href="#"
          onClick={() => onRemark(rowData.docno, rowData.udcid, rowData.emplid, rowData.doctype, props.tahun, props.quarter, rowData.creator)}
        >
          {rowData.remark != '' ? (
            ReactHtmlParser(rowData.remark)
          ) : (
            <Button type="button" color="blue" size="small" content="Add" onClick={onAddRemark} />
          )}
        </a>
      </Table.Cell>
    </Table.Row>
  );
};

export default KpiDetailPointTableRow;
