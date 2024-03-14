import React, { Fragment, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider, Grid, Table, Button, GridRow } from 'semantic-ui-react';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import KpiDetailPointTable from '../table/KpiDetailPointTable';
import { selectKpiDataDetailPoints, selectKpiCondition } from 'selectors/kpi/kpi-data/KpiDataSelector';
import IKpiDataDetailPointTable from 'selectors/kpi/kpi-data/models/IKpiDataDetailPointTable';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { Pagination } from '../../../../components/UI';
import InputPoint from '../modal/InputPoint';
import './DetailPointStyle.scss';
import TableToExcel from '@linways/table-to-excel';
import { format } from 'date-fns';

interface IProps {
  quarter: string;
  measurement: string;
  tahun: number;
  udcid: number;
  emplid: number;
  creator: string;
  points: number;
  nilais: number;
  manual: number;
  kpiSetting: string;
  fileName: string;
}

const DetailPoint: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const direction: string = useSelector((state: IStore) => state.kpiData.detailPoint.sorting);
  const columnsorting: string = useSelector((state: IStore) => state.kpiData.detailPoint.column);
  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');

  useEffect(() => {
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
        columnsorting
      )
    );
    dispatch(KpiDataActions.requestKpiCondition(props.udcid));
  }, [dispatch, activePage, pageSize]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
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
        columnsorting
      )
    );
  };

  const kpiDataTable: IKpiDataDetailPointTable = useSelector((state: IStore) => selectKpiDataDetailPoints(state));
  const kpiCondition: any = useSelector((state: IStore) => selectKpiCondition(state));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [KpiDataActions.REQUEST_KPI_DETAIL_POINTS]));

  const exportTableToExcel = (): void => {
    dispatch(KpiDataActions.setActivePage(1));
    dispatch(
      KpiDataActions.requestKpiDetailPoints(
        props.udcid,
        props.emplid,
        props.quarter,
        props.tahun,
        props.creator,
        1,
        kpiDataTable.totalRow,
        direction,
        columnsorting
      )
    );
    if (isRequesting == false) {
      setTimeout(() => {
        const tableSelect = document.getElementById('detailPoint') as HTMLTableElement;
        TableToExcel.convert(tableSelect, {
          name: 'DetailPoint-' + props.kpiSetting + '-' + props.creator + '.xlsx',
          sheet: {
            name: 'Sheet 1',
          },
        });
      }, 3000);
    }
  };

  let rNum2: number = 0;

  kpiDataTable.rows.map((model: any) => (rNum2 = model.rnum2));

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Card.Header>Detail Point {props.quarter}</Card.Header>
        <Divider></Divider>
        <Grid className="lightGreyKpi">
          <Grid.Row>
            <Grid.Column className="lightGreyKpiColumn">
              <h4>KPI Condition</h4>

              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Point</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {kpiCondition.map((model: any) => (
                    <Table.Row key={model.kpiConditionID}>
                      <Table.Cell>{model.description}</Table.Cell>
                      <Table.Cell>{model.point}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Button
                type="button"
                icon="file excel"
                color="green"
                floated="right"
                size="small"
                content="To Excel"
                onClick={() => exportTableToExcel()}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {props.creator != 'blank' && (
          <Fragment>
            <KpiDetailPointTable
              tableData={kpiDataTable}
              tahun={props.tahun}
              quarter={props.quarter}
              udcid={props.udcid}
              emplid={props.emplid}
              creator={props.creator}
            />
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={kpiDataTable.totalRow}
              pageSize={pageSize}
            />
          </Fragment>
        )}
        {props.manual == 1 && (props.udcid === 12818 || props.udcid === 2679) && (
          <InputPoint
            quarter={props.quarter}
            measurement={props.measurement}
            tahun={props.tahun}
            udcid={props.udcid}
            emplid={props.emplid}
            fileName={props.fileName}
            kpiSetting={props.kpiSetting}
          />
        )}
        <Grid className="mt-0" columns="equal">
          <Grid.Column className="kpiJumbotron">
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <h5>Total Point</h5>
                  {props.creator != 'blank' && (
                    <span>
                      ({kpiDataTable.totalPoint} / {kpiDataTable.totalRow})
                    </span>
                  )}
                </Grid.Column>
                <Grid.Column>
                  <h1>{props.creator === 'blank' ? props.points : (kpiDataTable.totalPoint / kpiDataTable.totalRow).toFixed(3).slice(0, -1)}</h1>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column className="kpiJumbotron">
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <h5>Total Nilai</h5>
                  {props.creator != 'blank' && (
                    <span>
                      ({(kpiDataTable.totalPoint / kpiDataTable.totalRow).toFixed(3).slice(0, -1)} x {rNum2})
                    </span>
                  )}
                </Grid.Column>
                <Grid.Column>
                  <h1>
                    {' '}
                    {props.creator === 'blank'
                      ? props.nilais
                      : (parseFloat((kpiDataTable.totalPoint / kpiDataTable.totalRow).toFixed(3).slice(0, -1)) * rNum2).toFixed(3).slice(0, -1)}
                  </h1>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default DetailPoint;
