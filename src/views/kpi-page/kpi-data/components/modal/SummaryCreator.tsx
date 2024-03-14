import React, { Fragment, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider, Grid, Table } from 'semantic-ui-react';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import KpiDataSummaryCreatorTable from '../table/KpiDataSummaryCreatorTable';
import { selectKpiDataCreators, selectKpiCondition } from 'selectors/kpi/kpi-data/KpiDataSelector';
import IKpiDataCreatorSummaryTable from 'selectors/kpi/kpi-data/models/IKpiDataCreatorSummaryTable';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { Pagination } from '../../../../components/UI';
import InputPoint from '../modal/InputPoint';
import './DetailPointStyle.scss';

interface IProps {
  quarter: string;
  measurement: string;
  tahun: number;
  udcid: number;
  emplid: number;
  manual: number;
  fileName: string;
  kpiSetting: string;
}

const SummaryCreator: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    dispatch(KpiDataActions.requestPeriodeQuartal(props.quarter));
    dispatch(KpiDataActions.requestKpiCreatorSummarys(props.udcid, props.emplid, props.quarter, props.tahun, activePage, pageSize));
    dispatch(KpiDataActions.requestKpiCondition(props.udcid));
  }, [dispatch, activePage, pageSize]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
  };

  const kpiDataTable: IKpiDataCreatorSummaryTable = useSelector((state: IStore) => selectKpiDataCreators(state));
  const kpiCondition: any = useSelector((state: IStore) => selectKpiCondition(state));
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [KpiDataActions.REQUEST_KPI_CREATOR_SUMMARYS, KpiDataActions.REQUEST_POST_UPDATE_POINT_SUMMARY])
  );

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
        {props.manual == 1 && (
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
        <KpiDataSummaryCreatorTable
          tableData={kpiDataTable}
          tahun={props.tahun}
          emplid={props.emplid}
          udcid={props.udcid}
          quarter={props.quarter}
          manual={props.manual}
          kpiSetting={props.kpiSetting}
          fileName={props.fileName}
          measurement={props.measurement}
        />
        <Pagination
          activePage={activePage}
          onPageChange={(e, data) => handlePaginationChange(e, data)}
          totalPage={kpiDataTable.totalRow}
          pageSize={pageSize}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default SummaryCreator;
