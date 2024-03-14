import React, { Fragment, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ReportViewer } from './report-viewer/ReportViewer';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as ReportManagerActions from 'stores/report-manager/ReportManagerActions';
import IStore from 'models/IStore';
import ReportManagerModel from 'stores/report-manager/models/ReportManagerModel';
import { selectReportItemByID } from 'selectors/report-manager/ReportManagerSelector';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ReportPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  /* useEffect(() => {
    dispatch(ReportManagerActions.requestReportItemByID(+props.match.params.id));
  }, [dispatch,+props.match.params.id]);

  const reportItem = useSelector((state: IStore) => selectReportItemByID(state)); */

  return (
    <div style={{ height: 700 }}>
      <ReportViewer id={props.match.params.id} />
    </div>
  );
};

export default ReportPage;
