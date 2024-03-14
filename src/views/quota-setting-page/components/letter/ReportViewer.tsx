import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as UserActions from 'stores/users/UserActions';
import { useLocation } from 'react-router-dom';
import { Form, Grid, Card, Divider, DropdownProps, Dropdown, Icon } from 'semantic-ui-react';

interface LocationState {
  type: string;
  formID: string;
}

interface IProps {
  type: string;
  formID: string;
}

const ReportViewer = (props: IProps) => {
  //const currentUser = useSelector((state) => selectUserResult(state));
  const [currentYears] = useState(new Date().getFullYear());
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const [localRole, setLocalRole] = useState('');
  const [dashboardPath, setDashboardPath] = useState('Dashboard-Style.trdp');
  const location = useLocation<LocationState>();
  // const {type, formID} = location.state
  const { type, formID } = props;
  //    const GetLocalUser = () => {
  //         let jsonString =  localStorage.getItem("userLogin")
  //         var result = null;

  //         console.log(jsonString)
  //         if(jsonString !== null)
  //         {
  //             result = JSON.parse(jsonString);
  //         }

  //         return result.userName;
  //    }

  //    const GetLocalRoleUser = () => {
  //         let jsonString =  localStorage.getItem("userLogin")
  //         var result = null;

  //         console.log(jsonString)
  //         if(jsonString !== null)
  //         {
  //             result = JSON.parse(jsonString);
  //         }

  //         return result.role;
  //    }

  useEffect(() => {
    window.jQuery('#reportViewer12').telerik_ReportViewer({
      //serviceUrl: 'https://demos.telerik.com/reporting/api/reports/',
      serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
      //serviceUrl: 'http://bhpapisrv.berca.co.id:5013/api/reports/',
      reportSource: {
        //report: 'Telerik.Reporting.Examples.CSharp.ReportCatalog, CSharp.ReportLibrary'
        report: type === 'Letter' ? 'Letter.trdp' : type === 'Contract' ? 'Kontrak.trdp' : 'BAST.trdp',
        parameters: { FormID: formID },
        // parameters: { AccName: GetLocalUser(), Year:currentYears, COCODE:1} ,
        //parameters: { AccName: 'jerfi.tan', Year:2021, COCODE:1}
      },
      scale: 1.0,
      scaleMode: 'FIT_PAGE_WIDTH',
      enableAccessibility: false,

      // pageMode: telerikReportViewer.PageModes.SINGLE_PAGE,
      pageReady: function(e, args) {
        resizeViewer();
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

    function resizeViewer() {
      const pageHeight = window.jQuery('.trv-pages-area .trv-page-wrapper').height() + window.jQuery('.trv-nav').outerHeight() + 2, // Calculate the report page height
        viewer = window.jQuery('#reportViewer12'),
        viewerHeight = viewer.height();

      if (viewerHeight !== pageHeight) {
        viewer.height(pageHeight);
        const documentMapSplitter = window.jQuery('.trv-document-map-splitter').data('kendoSplitter');
        documentMapSplitter.resize(true);

        const parameterSplitter = window.jQuery('.trv-parameters-splitter').data('kendoSplitter');
        parameterSplitter.resize(true);
      }
    }
  }, [dispatch]);

  return (
    <>
      <div style={{ display: 'flex', color: '#db2828', fontWeight: 'bold' }}>
        <p style={{ color: 'black', fontWeight: 'bold' }}>Generated Report</p>
      </div>
      <Divider></Divider>
      <div id="reportViewer12"></div>
    </>
  );
};

export default ReportViewer;
