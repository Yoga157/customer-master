import React, { useCallback, Fragment, useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Table } from 'semantic-ui-react';
import IKpiDataTableRow from '../../../../../../selectors/kpi/kpi-data/models/IKpiDataTableRow';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Button } from '../../../../../components/UI';
import DetailPoint from 'views/kpi-page/kpi-data/components/modal/DetailPoint';
import SummaryCreator from 'views/kpi-page/kpi-data/components/modal/SummaryCreator';
import HistoryRemark from 'views/kpi-page/kpi-data/components/modal/HistoryRemark';
import InputPoint from 'views/kpi-page/kpi-data/components/modal/InputPoint';
import ReactHtmlParser from 'react-html-parser';
import IKpiDataTable from '../../../../../../selectors/kpi/kpi-data/models/IKpiDataTable';
import { format } from 'date-fns';

interface IProps {
  readonly tableData: IKpiDataTable;
  readonly kpiDireksi: any;
}

const KpiDetailsTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  //const { rowData } = props;
  const { tableData, kpiDireksi } = props;
  const [totalArr, setTotalArr] = useState(0);
  const dispatch: Dispatch = useDispatch();

  const filterTable = tableData.rows.filter((item) => item.kpiDireksi === kpiDireksi);
  useEffect(() => {
    setTotalArr(filterTable.length);
  }, [tableData, kpiDireksi]);

  const onClicks = useCallback(
    (
      quarter: string,
      tahun: number,
      udcid: number,
      emplid: number,
      manual: number,
      detail: number,
      fileName: string,
      kpiSetting: string,
      points: number,
      nilais: number,
      measurement: string
    ): void => {
      //dispatch(ModalFirstLevelActions.OPEN(<DetailPoint quarter={quarter} tahun={tahun} udcid={udcid} emplid={emplid} />, ModalSizeEnum.Small));
      if (detail === 0) {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <DetailPoint
              quarter={quarter}
              tahun={tahun}
              udcid={udcid}
              emplid={emplid}
              creator={'blank'}
              points={points}
              nilais={nilais}
              manual={manual}
              fileName={fileName}
              kpiSetting={kpiSetting}
              measurement={measurement}
            />, //tidak ada detail
            ModalSizeEnum.Small
          )
        );
      } else if (udcid === 4332 || udcid === 4331 || udcid === 4329 || udcid === 4330) {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <DetailPoint
              quarter={quarter}
              tahun={tahun}
              udcid={udcid}
              emplid={emplid}
              creator={udcid === 4332 || udcid === 4331 ? 'Rina.Suherjan' : 'daniel.adikusuma'}
              points={points}
              nilais={nilais}
              manual={manual}
              fileName={fileName}
              kpiSetting={kpiSetting}
              measurement={measurement}
            />, //tidak ada detail
            ModalSizeEnum.Small
          )
        );
      } else {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <SummaryCreator
              quarter={quarter}
              tahun={tahun}
              udcid={udcid}
              emplid={emplid}
              manual={manual}
              fileName={fileName}
              kpiSetting={kpiSetting}
              measurement={measurement}
            />,
            ModalSizeEnum.Small
          )
        );
      }
    },
    [dispatch]
  );

  const onRemark = useCallback(
    (quarter: string, tahun: number, udcid: number, emplid: number): void => {
      dispatch(ModalFirstLevelActions.OPEN(<HistoryRemark quarter={quarter} tahun={tahun} udcid={udcid} emplid={emplid} />, ModalSizeEnum.Small));
    },
    [dispatch]
  );

  const onAddRemark = (quarter: string, tahun: number, udcid: number, emplid: number) => {
    onRemark(quarter, tahun, udcid, emplid);
  };

  return (
    <Fragment>
      {tableData.rows
        .filter((item) => item.kpiDireksi === kpiDireksi)
        .map((rowData: IKpiDataTableRow, i) => (
          <Table.Row key={i}>
            {totalArr > 1 && i === 0 && <Table.Cell rowSpan={totalArr}>{i === 0 ? rowData.kpiDireksi : ''}</Table.Cell>}
            {totalArr === 1 && <Table.Cell>{rowData.kpiDireksi}</Table.Cell>}
            <Table.Cell>{format(new Date(rowData.logDate), 'dd-MM-yyyy HH:mm')}</Table.Cell>
            <Table.Cell>{rowData.keyActivity}</Table.Cell>
            <Table.Cell>{rowData.pic}</Table.Cell>
            <Table.Cell>{rowData.measurement}</Table.Cell>
            <Table.Cell>{rowData.weight}</Table.Cell>
            <Table.Cell>{rowData.point}</Table.Cell>
            <Table.Cell>
              {rowData.measurement === 'Yearly' && rowData.q1Point}
              {rowData.measurement === 'Quarterly' && (
                <a
                  href="#"
                  onClick={() =>
                    onClicks(
                      'Q1',
                      rowData.year,
                      rowData.udcid,
                      rowData.emplid,
                      rowData.manual,
                      rowData.detail,
                      rowData.fileNameQ1,
                      rowData.keyActivity,
                      0,
                      0,
                      rowData.measurement
                    )
                  }
                >
                  {rowData.q1Point}
                </a>
              )}
            </Table.Cell>
            <Table.Cell>{rowData.q1Nilai}</Table.Cell>
            <Table.Cell>
              {rowData.measurement === 'Yearly' && rowData.q2Point}
              {rowData.measurement === 'Quarterly' && (
                <a
                  href="#"
                  onClick={() =>
                    onClicks(
                      'Q2',
                      rowData.year,
                      rowData.udcid,
                      rowData.emplid,
                      rowData.manual,
                      rowData.detail,
                      rowData.fileNameQ2,
                      rowData.keyActivity,
                      0,
                      0,
                      rowData.measurement
                    )
                  }
                >
                  {rowData.q2Point}
                </a>
              )}
            </Table.Cell>
            <Table.Cell>{rowData.q2Nilai}</Table.Cell>
            <Table.Cell>
              {rowData.measurement === 'Yearly' && rowData.q3Point}
              {rowData.measurement === 'Quarterly' && (
                <a
                  href="#"
                  onClick={() =>
                    onClicks(
                      'Q3',
                      rowData.year,
                      rowData.udcid,
                      rowData.emplid,
                      rowData.manual,
                      rowData.detail,
                      rowData.fileNameQ3,
                      rowData.keyActivity,
                      0,
                      0,
                      rowData.measurement
                    )
                  }
                >
                  {rowData.q3Point}
                </a>
              )}
            </Table.Cell>
            <Table.Cell>{rowData.q3Nilai}</Table.Cell>
            <Table.Cell>
              <a
                href="#"
                onClick={() =>
                  onClicks(
                    'Q4',
                    rowData.year,
                    rowData.udcid,
                    rowData.emplid,
                    rowData.manual,
                    rowData.detail,
                    rowData.measurement === 'Yearly' ? rowData.fileNameYearly : rowData.fileNameQ4,
                    rowData.keyActivity,
                    rowData.yearlyPoint,
                    rowData.yearlyNilai,
                    rowData.measurement
                  )
                }
              >
                {rowData.measurement === 'Yearly' ? rowData.yearlyPoint : rowData.q4Point}
              </a>
            </Table.Cell>
            <Table.Cell>{rowData.measurement === 'Yearly' ? rowData.yearlyNilai : rowData.q4Nilai}</Table.Cell>
            <Table.Cell>{rowData.measurement === 'Yearly' ? rowData.totalNilaiYearly : rowData.totalNilai}</Table.Cell>
            <Table.Cell>
              <a href="#" onClick={() => onRemark(rowData.measurementNumber, rowData.year, rowData.udcid, rowData.emplid)}>
                {rowData.remark != '' ? (
                  ReactHtmlParser(rowData.remark)
                ) : (
                  <Button type="button" color="blue" size="small" content="Add" onClick={onAddRemark} />
                )}
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
    </Fragment>
  );
};

export default KpiDetailsTableRow;
