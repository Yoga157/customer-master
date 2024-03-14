import React, { Fragment, useEffect } from 'react';
import { ReportViewerNew } from '../ReportViewerNew';

interface IProps {}

const ReportPageNew: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <div style={{ height: 700 }}>
      <ReportViewerNew />
    </div>
  );
};

export default ReportPageNew;
