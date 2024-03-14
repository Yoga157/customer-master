import React, { Fragment, useEffect } from 'react';
import { ReportViewer } from '../ReportViewer';

interface IProps {
  type: string;
  IdBG: string;
  Issuer: string;
}

const ReportPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <div style={{ height: 700 }}>
      <ReportViewer type={props.type} IdBG={props.IdBG} Issuer={props.Issuer} />
    </div>
  );
};

export default ReportPage;
