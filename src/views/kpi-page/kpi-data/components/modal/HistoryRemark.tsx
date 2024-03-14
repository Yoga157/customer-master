import React, { Fragment, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider, Form } from 'semantic-ui-react';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import KpiRemarkTable from '../table/KpiRemarkTable';
import { selectKpiDataRemarks } from 'selectors/kpi/kpi-data/KpiDataSelector';
import IKpiDataRemarkTable from 'selectors/kpi/kpi-data/models/IKpiDataRemarkTable';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { Button, DateInput, RichTextEditor, TextInput, NumberInput, SelectInput, Pagination } from 'views/components/UI';
import KpiDataDashboardModel from 'stores/kpi/kpi-data/models/KpiDataDashboardModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';

interface IProps {
  quarter: string;
  tahun: number;
  udcid: number;
  emplid: number;
}

const HistoryRemark: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(20);
  const [activePage, setActivePage] = useState(1);
  const bRefreshPage: boolean = useSelector((state: IStore) => state.kpiData.refreshPage);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(KpiDataActions.requestKpiRemarks(props.udcid, props.emplid, props.tahun, activePage, pageSize));
  }, [dispatch, activePage, pageSize]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
  };

  const kpiRemark: IKpiDataRemarkTable = useSelector((state: IStore) => selectKpiDataRemarks(state));
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [KpiDataActions.REQUEST_KPI_REMARKS, KpiDataActions.REQUEST_POST_UPDATE_REMARK])
  );

  const onSubmitHandler = (values: any) => {
    const updateRemark = new KpiDataDashboardModel(values);

    updateRemark.remark = values.remark;
    updateRemark.udcid = props.udcid;
    updateRemark.emplid = props.emplid;
    updateRemark.year = props.tahun;
    updateRemark.userlogin = currentUser.employeeID;
    updateRemark.weight = 0;
    updateRemark.point = 0;
    updateRemark.q1Nilai = 0;
    updateRemark.q1Point = 0;
    updateRemark.q2Nilai = 0;
    updateRemark.q2Point = 0;
    updateRemark.q3Nilai = 0;
    updateRemark.q3Point = 0;
    updateRemark.q4Nilai = 0;
    updateRemark.q4Point = 0;
    updateRemark.manual = 0;
    updateRemark.totalNilai = 0;
    updateRemark.totalNilaiYearly = 0;

    dispatch(KpiDataActions.postUpdateRemark(updateRemark));
  };

  if (bRefreshPage) {
    dispatch(KpiDataActions.requestKpiRemarks(props.udcid, props.emplid, props.tahun, activePage, pageSize));
    dispatch(KpiDataActions.requestKpiDatas(2021, currentUser.userName, activePage, pageSize));
    dispatch(ModalAction.CLOSE());
  }

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Card.Header>History Remark</Card.Header>
        <Divider></Divider>
        <FinalForm
          onSubmit={(values: any) => onSubmitHandler(values)}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} loading={isRequesting}>
              <Field name="remark" component={RichTextEditor} placeholder="e.g.Remark.." labelName="Remark" />
              <Button type="submit" color="blue" floated="right">
                Submit
              </Button>
              <br /> <br />
            </Form>
          )}
        />

        <KpiRemarkTable tableData={kpiRemark} />
        <Pagination
          activePage={activePage}
          onPageChange={(e, data) => handlePaginationChange(e, data)}
          totalPage={kpiRemark.totalRow}
          pageSize={pageSize}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default HistoryRemark;
