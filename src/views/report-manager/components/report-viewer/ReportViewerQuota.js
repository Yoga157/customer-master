import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as UserActions from 'stores/users/UserActions';

export const ReportViewerQuota = () => {
  //const currentUser = useSelector((state) => selectUserResult(state));
  const [currentYears] = useState(new Date().getFullYear());
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const [localRole, setLocalRole] = useState('');

  const GetLocalUser = () => {
    let jsonString = localStorage.getItem('userLogin');
    var result = null;

    console.log(jsonString);
    if (jsonString !== null) {
      result = JSON.parse(jsonString);
    }

    return result.userName;
  };

  const GetLocalRoleUser = () => {
    let jsonString = localStorage.getItem('userLogin');
    var result = null;

    console.log(jsonString);
    if (jsonString !== null) {
      result = JSON.parse(jsonString);
    }

    return result.role;
  };

  useEffect(() => {
    window.jQuery('#reportViewer1').telerik_ReportViewer({
      //serviceUrl: 'https://demos.telerik.com/reporting/api/reports/',
      serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
      //serviceUrl: 'http://bhpapisrv.berca.co.id:5013/api/reports/',
      reportSource: {
        //report: 'Telerik.Reporting.Examples.CSharp.ReportCatalog, CSharp.ReportLibrary'
        report: 'ReportQuotaBrandSales.trdp',
        parameters: { Role: GetLocalRoleUser() },
        parameters: { AccName: GetLocalUser() },
        //parameters: { AccName: 'jerfi.tan', Year:2021, COCODE:1}
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
