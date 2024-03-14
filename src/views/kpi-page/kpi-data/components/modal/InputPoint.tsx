import React, { Fragment, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider, Form } from 'semantic-ui-react';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import KpiRemarkTable from '../table/KpiRemarkTable';
import { selectKpiDataRemarks, selectPeriodeQuartal } from 'selectors/kpi/kpi-data/KpiDataSelector';
import IKpiDataRemarkTable from 'selectors/kpi/kpi-data/models/IKpiDataRemarkTable';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { Button, NumberInput, RichTextEditor } from 'views/components/UI';
import KpiDataDashboardModel from 'stores/kpi/kpi-data/models/KpiDataDashboardModel';
import KpiUpdatePointModel from 'stores/kpi/kpi-data/models/KpiUpdatePointModel';
import KpiUpdatePointMapper from 'stores/kpi/kpi-data/models/KpiUpdatePointMapper';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { serialize } from 'object-to-formdata';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import axios from 'axios';
import fileDownload from 'js-file-download';
import environment from 'environment';

interface IProps {
  quarter: string;
  measurement: string;
  tahun: number;
  udcid: number;
  emplid: number;
  fileName: string;
  kpiSetting: string;
}

const InputPoint: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const bRefreshPage: boolean = useSelector((state: IStore) => state.kpiData.refreshPage);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [fileAttachment, setFileAttachment] = useState('');
  const [point, setPoint] = useState(0);
  const today = new Date();

  useEffect(() => {
    dispatch(KpiDataActions.requestKpiRemarks(props.udcid, props.emplid, props.tahun, activePage, pageSize));
  }, [dispatch, activePage, pageSize]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
  };

  const kpiRemark: IKpiDataRemarkTable = useSelector((state: IStore) => selectKpiDataRemarks(state));
  const periodeQuartal: any = useSelector((state: IStore) => selectPeriodeQuartal(state));
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [KpiDataActions.REQUEST_KPI_DATAS, KpiDataActions.REQUEST_POST_UPDATE_POINT_SUMMARY])
  );

  const onSubmitHandler = (values: any) => {
    const newObject = new KpiUpdatePointMapper();
    const data = new FormData();

    newObject.KpiUpdatePoint = new KpiUpdatePointModel(values);
    newObject.KpiUpdatePoint.udcid = props.udcid;
    newObject.KpiUpdatePoint.emplid = props.emplid;
    newObject.KpiUpdatePoint.year = props.tahun;
    newObject.KpiUpdatePoint.userlogin = currentUser.employeeID;
    newObject.KpiUpdatePoint.fileName = fileAttachment['name'];

    if (props.measurement === 'Yearly') {
      newObject.KpiUpdatePoint.measurementNumber = 'Yearly';
    } else {
      newObject.KpiUpdatePoint.measurementNumber = props.quarter;
    }

    newObject.File = fileAttachment;

    const options = {
      indices: false,
      nullsAsUndefineds: false,
      booleansAsIntegers: false,
      allowEmptyArrays: false,
    };

    serialize(newObject, options, data);
    dispatch(KpiDataActions.postUpdatePointManual(data));
  };

  const fileChange = (e: any) => {
    setFileAttachment(e.target.files[0]);
  };

  const onDownloadFile = () => {
    const controllerName = `Kpi/download/${props.fileName}`;
    const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
    handleDownload(endpoint, props.fileName);
  };

  const handleDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const onPoint = (event: any) => {
    if (event > 1) {
      setPoint(1);
    } else if (event < -1) {
      setPoint(-1);
    } else {
      setPoint(0);
    }
  };

  if (bRefreshPage) {
    dispatch(KpiDataActions.requestKpiDatas(new Date().getFullYear(), currentUser.userName, activePage, pageSize));
    dispatch(ModalAction.CLOSE());
  }

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Card.Header>
          Input Point - {props.kpiSetting} | {props.quarter}
        </Card.Header>
        <Divider></Divider>
        <FinalForm
          onSubmit={(values: any) => onSubmitHandler(values)}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} loading={isRequesting}>
              <Field
                name="point"
                component={NumberInput}
                placeholder="e.g.1"
                labelName="Point"
                mandatory={false}
                onChange={onPoint}
                thousandSeparator={false}
                values={point}
              />
              <label style={{ fontWeight: 'bold' }}>
                Attachment<label style={{ color: 'red' }}> *</label>
              </label>
              <input type="file" name="imageFile" onChange={fileChange} /> <br /> <br />
              {props.fileName != '' && props.fileName != null && (
                <Fragment>
                  <Button type="button" color="blue" onClick={onDownloadFile}>
                    Download Attachment
                  </Button>
                  <br />
                  <br />
                </Fragment>
              )}
              <Field name="remark" component={RichTextEditor} labelName="Remark" />
              <br />
              <br />
              <Button disabled={today > new Date(periodeQuartal.nextMonth) ? true : false} type="submit" color="blue" floated="right">
                Submit
              </Button>
              <br /> <br />
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default InputPoint;
