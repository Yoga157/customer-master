import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const ReportViewer = (type) => {
  const [currentYears] = useState(new Date().getFullYear());
  const dispatch = useDispatch();

  useEffect(() => {
    window.jQuery('#reportViewer1').telerik_ReportViewer({
      serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
      //serviceUrl: 'http://bhpapisrv.berca.co.id:5013/api/reports/',
      reportSource: {
        //report: 'Telerik.Reporting.Examples.CSharp.ReportCatalog, CSharp.ReportLibrary'
        report:
          type.type === 'Mandiri'
            ? 'Mandiri.trdp'
            : type.type === 'Danamon'
            ? 'BankDanamonNew.trdp'
            : type.type === 'ReferenceLetter'
            ? 'ReferenceLetter.trdp'
            : type.type === 'Dukungan Bank'
            ? 'DukunganBank.trdp'
            : 'PrintAsuransi.trdp',
        parameters: { IdBG: type.IdBG, EntryKey: type.Issuer },
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
