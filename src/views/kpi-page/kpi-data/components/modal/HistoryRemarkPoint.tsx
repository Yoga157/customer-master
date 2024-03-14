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
import { Button, RichTextEditor, TextInput, NumberInput, SelectInput, Pagination } from 'views/components/UI';
import KpiDataDetailPointModel from 'stores/kpi/kpi-data/models/KpiDataDetailPointModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  docno: string;
  udcid: number;
  emplid: number;
  doctype: string;
  tahun: number;
  quarter: string;
  creator: string;
}

const HistoryRemarkPoint: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(20);
  const [activePage, setActivePage] = useState(1);
  const bRefreshPage: boolean = useSelector((state: IStore) => state.kpiData.refreshPage);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(KpiDataActions.requestKpiDetailRemarks(props.udcid, props.emplid, props.docno, props.doctype, activePage, pageSize));
  }, [dispatch, activePage, pageSize]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
  };

  const kpiRemark: IKpiDataRemarkTable = useSelector((state: IStore) => selectKpiDataRemarks(state));
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      KpiDataActions.REQUEST_KPI_DETAIL_REMARKS,
      KpiDataActions.REQUEST_KPI_DETAIL_POINTS,
      KpiDataActions.REQUEST_POST_UPDATE_REMARK_POINT,
    ])
  );

  const onSubmitHandler = (values: any) => {
    const updateRemark = new KpiDataDetailPointModel(values);

    updateRemark.remark = values.remark;
    updateRemark.udcid = props.udcid;
    updateRemark.emplid = props.emplid;
    updateRemark.modifyUserID = currentUser.employeeID;
    updateRemark.docno = props.docno;
    updateRemark.doctype = props.doctype;
    updateRemark.point = 0;
    updateRemark.rnum2 = 0;

    dispatch(KpiDataActions.postUpdateRemarkPoint(updateRemark));
  };

  if (bRefreshPage) {
    dispatch(KpiDataActions.requestKpiDetailRemarks(props.udcid, props.emplid, props.docno, props.doctype, activePage, pageSize));
    dispatch(KpiDataActions.requestKpiDatas(props.tahun, currentUser.userName, activePage, pageSize));
    dispatch(
      KpiDataActions.requestKpiDetailPoints(props.udcid, props.emplid, props.quarter, props.tahun, props.creator, activePage, pageSize, '', '')
    );
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

export default HistoryRemarkPoint;
