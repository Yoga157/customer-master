import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

export const ReportViewer = (id) => {
  const currentDateTime = new Date();
  const currentYears = currentDateTime.getFullYear();
  const currentMonths = currentDateTime.getMonth();
  const firstDay = moment(new Date(currentYears, currentMonths, 1)).format('MM-DD-yyyy');
  const lastDay = moment(new Date(currentYears, currentMonths+1, 0)).format('MM-DD-yyyy');
  const dispatch = useDispatch();

  const GetReport = () => {
    let jsonString = localStorage.getItem('reportManager');
    var result = null;

    if (jsonString !== null) {
      result = JSON.parse(jsonString);
    }

    const newValue = result.filter((item) => {
      return item.udcid == +id.id;
    });

    return newValue[0].text3;
  };

  const GetLocalUserLoginID = () => {
    let jsonString = localStorage.getItem('userLogin');
    var result = null;

    if (jsonString !== null) {
      result = JSON.parse(jsonString);
    }

    return result.employeeID;
  };

  const GetLocalUser = () => {
    let jsonString = localStorage.getItem('userLogin');
    var result = null;

    if (jsonString !== null) {
      result = JSON.parse(jsonString);
    }

    return result.userName;
  };

  const GetLocalEmployeeName = () => {
    let jsonString = localStorage.getItem('userLogin');
    var result = null;

    if (jsonString !== null) {
      result = JSON.parse(jsonString);
    }

    return result.fullName;
  };

  const GetLocalRoleUser = () => {
    let jsonString = localStorage.getItem('userLogin');
    var result = null;

    if (jsonString !== null) {
      result = JSON.parse(jsonString);
    }

    return result.role;
  };

  const GetLocalUserByKey = (keyParam) => {
    let jsonString = localStorage.getItem('userLogin');
    var result = null;

    // console.log(jsonString);
    if (jsonString !== null) {
      result = JSON.parse(jsonString);
      for (var key of Object.keys(result)) {
        if (key === keyParam) {
          return result[key];
        }
      }
    }
  };

  useEffect(() => {
    GetReport();
    window.jQuery('#reportViewer1').telerik_ReportViewer({
      //Notes 5013 Dummy, 5008 Production
      serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
      //serviceUrl: 'http://bhpapisrv.berca.co.id:5013/api/reports/',
      //serviceUrl: 'https://bhpapisrv.berca.co.id:5016/api/reports/', //msg
      reportSource: {
        report: GetReport(),
        //parameters : GetReport() === "CustomerReport.trdp" ? {} : { AccName: GetLocalUser(), Role:GetLocalRoleUser()}
        parameters: {
          AccName: GetLocalUser(),
          LoginBy: GetLocalUser(),
          Role: GetLocalRoleUser(),
          UserLoginID: GetLocalUserLoginID(),
          userLogin: GetLocalUserByKey('email'),
          StartDate: firstDay,
          EndDate: lastDay,
        },
      },
      scale: 1.0,
      scaleMode: 'SPECIFIC',
      enableAccessibility: false,
      viewMode: 'INTERACTIVE',
      parameters: {
        editors: {
          singleSelect: 'COMBO_BOX',
          multiSelect: 'COMBO_BOX',
        },
      },
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
