import React, { useEffect } from 'react';

function PrintSA(props) {
  // useEffect(() => {
  //   window.jQuery('#reportViewer1').telerik_ReportViewer({
  //     //serviceUrl: 'https://demos.telerik.com/reporting/api/reports/',
  //     serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
  //     // serviceUrl: 'http://192.168.10.43:5013/api/reports/',
  //     // serviceUrl: 'http://bhpapisrv.berca.co.id:5013/api/reports/',
  //     reportSource: {
  //       //report: 'Telerik.Reporting.Examples.CSharp.ReportCatalog, CSharp.ReportLibrary'
  //       report:
  //         GetLocalUserByKey('dashboardSecurity') !== undefined && GetLocalUserByKey('dashboardSecurity')?.length >= 1
  //           ? dashboardPath?.trim() === 'Sales'
  //             ? 'Dashboard-Style.trdp'
  //             : dashboardPath?.trim() === 'Product Manager'
  //             ? 'DashboardBrandPM.trdp'
  //             : dashboardPath?.trim() === 'Presales'
  //             ? 'DashboardPresales.trdp'
  //             : 'Dashboard-Style.trdp'
  //           : GetLocalUserByKey('role') === 'Sales'
  //           ? 'Dashboard-Style.trdp'
  //           : GetLocalUserByKey('role') === 'Product Manager'
  //           ? 'DashboardBrandPM.trdp'
  //           : GetLocalUserByKey('role') === 'Presales'
  //           ? 'DashboardPresales.trdp'
  //           : 'Dashboard-Style.trdp',
  //       //report :GetLocalUserByKey('role') === "Sales" ? "Dashboard-Style.trdp" : GetLocalUserByKey('role') === "Product Manager" ? "DashboardBrandPM.trdp" :  "Dashboard-Style.trdp",
  //       parameters: {
  //         UserLogin: GetLocalUserByKey('userName'),
  //         Year: currentYears,
  //         COCODE: 1,
  //         Direktorat: GetLocalUserByKey('direktoratName'),
  //         editors: {
  //           singleSelect: 'COMBO_BOX',
  //           multiSelect: 'COMBO_BOX',
  //         },
  //       },

  //       //parameters: { AccName: GetLocalUserByKey(), Year:currentYears, COCODE:1} ,
  //       //parameters: { AccName: 'jerfi.tan', Year:2021, COCODE:1}
  //     },
  //     scale: 1.0,
  //     scaleMode: 'FIT_PAGE_WIDTH',
  //     enableAccessibility: false,
  //     parameters: {
  //       editors: {
  //         singleSelect: 'COMBO_BOX',
  //         multiSelect: 'COMBO_BOX',
  //       },
  //     },
  //     ready: function() {
  //       var viewer = window.jQuery('#reportViewer1').data('telerik_ReportViewer');
  //       window
  //         .jQuery("[data-command*='telerik_ReportViewer_toggleZoomMode']")
  //         .parent()
  //         .hide();
  //       window
  //         .jQuery("[data-command*='telerik_ReportViewer_zoomIn']")
  //         .parent()
  //         .hide();
  //       window
  //         .jQuery("[data-command*='telerik_ReportViewer_zoomOut']")
  //         .parent()
  //         .hide();
  //       window
  //         .jQuery("[data-command*='telerik_ReportViewer_togglePrintPreview']")
  //         .parent()
  //         .hide();
  //     },
  //   });
  // }, []);

  return (
    <div className="containerReportView">
      <div id="reportViewer1"></div>
    </div>
  );
}

export default PrintSA;
