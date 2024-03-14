import React, { useCallback } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Table, Dropdown } from 'semantic-ui-react';
import IKpiDataCreatorSummaryTableRow from 'selectors/kpi/kpi-data/models/IKpiDataCreatorSummaryTableRow';
import ReactHtmlParser from 'react-html-parser';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import DetailPoint from 'views/kpi-page/kpi-data/components/modal/DetailPoint';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Button } from '../../../../../components/UI';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import HistoryRemarkCreator from 'views/kpi-page/kpi-data/components/modal/HistoryRemarkCreator';

interface IProps {
  readonly rowData: IKpiDataCreatorSummaryTableRow;
  readonly tahun: number;
  readonly emplid: number;
  readonly udcid: number;
  readonly quarter: string;
  readonly measurement: string;
  readonly manual: number;
  readonly kpiSetting: string;
  readonly fileName: string;
}

const KpiDataSummaryCreatorTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;
  const dispatch: Dispatch = useDispatch();

  const onClicks = useCallback(
    (
      quarter: string,
      tahun: number,
      udcid: number,
      emplid: number,
      creator: string,
      manual: number,
      kpiSetting: string,
      fileName: string,
      measurement: string
    ): void => {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <DetailPoint
            quarter={quarter}
            measurement={measurement}
            tahun={tahun}
            udcid={udcid}
            emplid={emplid}
            creator={creator}
            points={0}
            nilais={0}
            manual={manual}
            kpiSetting={kpiSetting}
            fileName={fileName}
          />,
          ModalSizeEnum.Large
        )
      );
    },
    [dispatch]
  );

  const onRemark = useCallback(
    (quarter: string, tahun: number, udcid: number, emplid: number, creator: string, id: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <HistoryRemarkCreator udcid={udcid} emplid={emplid} quarter={quarter} tahun={tahun} creator={creator} id={id} />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch]
  );

  const onAddRemark = (quarter: string, tahun: number, udcid: number, emplid: number, creator: string, id: number) => {
    onRemark(quarter, tahun, udcid, emplid, creator, id);
  };

  return (
    <Table.Row key={rowData.id}>
      <Table.Cell>{rowData.creator}</Table.Cell>
      <Table.Cell>
        <a
          href="#"
          onClick={() =>
            onClicks(
              props.quarter,
              props.tahun,
              props.udcid,
              props.emplid,
              rowData.creator,
              props.manual,
              props.kpiSetting,
              props.fileName,
              props.measurement
            )
          }
        >
          {rowData.point}
        </a>
      </Table.Cell>
      <Table.Cell>
        <a href="#" onClick={() => onRemark(props.quarter, props.tahun, props.udcid, props.emplid, rowData.creator, rowData.id)}>
          {rowData.remaks != '' ? (
            ReactHtmlParser(rowData.remaks)
          ) : (
            <Button type="button" color="blue" size="small" content="Add" onClick={onAddRemark} />
          )}
        </a>
      </Table.Cell>
    </Table.Row>
  );
};

export default KpiDataSummaryCreatorTableRow;
