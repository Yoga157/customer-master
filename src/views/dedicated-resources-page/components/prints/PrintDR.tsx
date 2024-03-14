import React, { useEffect } from 'react';

import './PrintDR.scss';

function PrintDR({ contractID }) {
  useEffect(() => {
    window.jQuery('#reportViewer1').telerik_ReportViewer({
      serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
      reportSource: {
        report: 'PrintDR.trdp',
        parameters: {
            contractID
        },
      },
      scale: 1.0,
      scaleMode: 'FIT_PAGE_WIDTH',
      enableAccessibility: false,
      parameters: {
        editors: {
          singleSelect: 'COMBO_BOX',
          multiSelect: 'COMBO_BOX',
        },
      },
      ready: function() {
        const viewer = window.jQuery('#reportViewer1').data('telerik_ReportViewer');
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
  }, []);
  
  return (
    <div className="container-print-dr">
      <div id="reportViewer1"></div>
    </div>
  );
}

export default PrintDR;
