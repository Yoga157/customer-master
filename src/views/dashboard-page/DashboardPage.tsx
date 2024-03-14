import React from 'react';
import { ReportViewer } from './components/ReportViewer';
import './DashboardPageStyle.scss';
import * as UserActions from 'stores/users/UserActions';

interface IProps {}

const DashboardPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return <ReportViewer />;
};

export default DashboardPage;
