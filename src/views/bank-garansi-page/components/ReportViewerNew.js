import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const ReportViewerNew = () => {
  const [currentYears] = useState(new Date().getFullYear());
  const dispatch = useDispatch();

  useEffect(() => {
    window.jQuery('#reportViewer1').telerik_ReportViewer({
      //serviceUrl: 'http://bhpapisrv.berca.co.id:5013/api/reports/',
      serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
      reportSource: {
        report: 'BankDanamonNew.trdp',
        parameters: { IdBG: 'DBRB/CI1/2021/000059' },
      },
      scale: 1.0,
      scaleMode: 'FIT_PAGE_WIDTH',
      enableAccessibility: false,

      ready: function() {
        window
          .jQuery("[data-command*='telerik_ReportViewer_toggleZoomMode']")
          .parent()
          .hide();
        window
          .jQuery("[data-command*='telerik_ReportViewer_zoomIn']")
          .parent()
          .hide();
        window
          .jQuery("[data-command*='telerik_ReportViewer_zoomOut']")
          .parent()
          .hide();
        window
          .jQuery("[data-command*='telerik_ReportViewer_togglePrintPreview']")
          .parent()
          .hide();
      },
    });
  }, [dispatch]);

  return <div id="reportViewer1"></div>;
};
