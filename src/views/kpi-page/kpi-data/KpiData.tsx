import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { Button, Grid, Header, Form } from 'semantic-ui-react';
import KpiDetailsTable from './components/table/KpiDetailsTable';
import KpiDetailsPdf from './components/table/KpiDetailsPdf';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import IKpiDataTable from 'selectors/kpi/kpi-data/models/IKpiDataTable';
import IStore from 'models/IStore';
import { selectKpiDatas, selectKpiPdf } from 'selectors/kpi/kpi-data/KpiDataSelector';
import { Pagination } from '../../components/UI';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Form as FinalForm, Field } from 'react-final-form';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import TableToExcel from '@linways/table-to-excel';

interface IProps {
  history: History;
}

const KpiDataPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(25);
  const [vPdf] = useState(1);

  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');
  const activePage: number = useSelector((state: IStore) => state.kpiData.activePage);
  const activeYear: number = useSelector((state: IStore) => state.kpiData.activeYear);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(KpiDataActions.requestKpiDatas(new Date().getFullYear(), currentUser.userName, activePage, pageSize));
    //dispatch(KpiDataActions.requestKpiPdf(new Date().getFullYear(), currentUser.userName));
  }, [dispatch, activePage, pageSize]);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(KpiDataActions.setActivePage(data.activePage));
    //dispatch(KpiDataActions.requestKpiDatas(activePage, pageSize));
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [KpiDataActions.REQUEST_KPI_DATAS, KpiDataActions.REQUEST_SEARCH_KPI_DATA, KpiDataActions.REQUEST_POST_KPI_FILTER])
  );

  const kpiDataTable: IKpiDataTable = useSelector((state: IStore) => selectKpiDatas(state));
  const kpiPdf: any = useSelector((state: IStore) => selectKpiPdf(state));
  const kpiDireksis = kpiDataTable.rows.map((x) => x.kpiDireksi);
  const kpiDireksiArr = Array.from(new Set(kpiDireksis));

  // const onShowDetailData = useCallback(
  //     (): void => {
  //         dispatch(ModalFirstLevelActions.OPEN(
  //             <KpiDetailData />, ModalSizeEnum.Small
  //         ));
  //     },
  //     [dispatch]
  // );
  const exportTableToExcel = (tableID: string, filename: string): void => {
    dispatch(KpiDataActions.setActivePage(1));

    dispatch(KpiDataActions.requestKpiDatas(activeYear, currentUser.userName, 1, kpiDataTable.totalRow));
    if (isRequesting == false) {
      setTimeout(() => {
        const tableSelect = document.getElementById('pdf') as HTMLTableElement;
        const tableHead = document.querySelector('#pdf > thead > tr > th:nth-child(1)') as HTMLTableElement;
        tableHead.style.display = 'none';
        for (let i = 0; i < tableSelect.rows.length; i++) {
          const firstCol = tableSelect.rows[i].cells[0];
          //firstCol.remove();
        }
        TableToExcel.convert(tableSelect, {
          name: 'KPIData ' + currDate + '.xlsx',
          sheet: {
            name: 'Sheet 1',
          },
        });
      }, 3000);
      setTimeout(() => {
        window.location.href = window.location.origin + window.location.pathname;
      }, 4000);
    }
  };
  const onPdf = () => {
    const doc = new jsPDF('l', 'mm', 'a4');

    // const head = [['KPI Direksi', 'Key Activity', 'PIC', 'Measurement', 'Weight', 'Point', 'Q1', 'Q2', 'Q3', 'Q4', 'Remark']];

    const data = kpiDataTable.rows.map((item) => [
      item.kpiDireksi,
      item.keyActivity,
      item.pic,
      item.measurement,
      item.weight,
      item.point,
      item.q1Point,
      item.q2Point,
      item.q3Point,
      item.q4Point,
      item.remark,
    ]);

    autoTable(doc, {
      html: '#pdf',
      body: data,
    });

    /* autoTable(doc, {
      head: [
        [
          { content: 'KPI Direksi', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
          { content: 'Key Activity', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
          { content: 'PIC', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
          { content: 'Measurement', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
          { content: 'Weight', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
          { content: 'Point', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
          { content: 'Q1', colSpan: 2, styles: { halign: 'center' } },
          { content: 'Q2', colSpan: 2, styles: { halign: 'center' } },
          { content: 'Q3', colSpan: 2, styles: { halign: 'center' } },
          { content: 'Q4', colSpan: 2, styles: { halign: 'center' } },
          { content: 'Remark', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
        ],
      ],
      body: [
        [
          { content: '', colSpan: 6, styles: { halign: 'center' } },
          { content: 'Point' },
          { content: 'Nilai' },
          { content: 'Point' },
          { content: 'Nilai' },
          { content: 'Point' },
          { content: 'Nilai' },
          { content: 'Point' },
          { content: 'Nilai' },
        ],
      ],
    }); */

    doc.save('kpi-data.pdf');
  };

  const onSubmitHandler = (values: any) => {
    dispatch(KpiDataActions.requestKpiDatas(values.year, values.pic, activePage, pageSize));
  };

  const showTableKpiDetails = (
    <Fragment>
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Header as="h4">
                  <Header.Content>KPI Details</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button type="button" icon="file pdf" color="yellow" floated="right" size="small" content="To PDF" onClick={onPdf} />
                <Button
                  type="button"
                  icon="file excel"
                  color="green"
                  floated="right"
                  size="small"
                  content="To Excel"
                  onClick={() => exportTableToExcel('export', `KPIData ${currDate}`)}
                />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column>
                {vPdf === 0 && <KpiDetailsPdf tableData={kpiPdf} />}

                <KpiDetailsTable tableData={kpiDataTable} kpiDireksiArr={kpiDireksiArr} />
                <Pagination
                  activePage={activePage}
                  onPageChange={(e, data) => handlePaginationChange(e, data)}
                  totalPage={kpiDataTable.totalRow}
                  pageSize={pageSize}
                />
              </Grid.Column>
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>{showTableKpiDetails}</LoadingIndicator>
    </Fragment>
  );
};

export default KpiDataPage;
