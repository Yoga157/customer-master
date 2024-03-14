import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Card, Divider } from 'semantic-ui-react';

interface IProps {
    activityReportGenID: number
}

const ReportViewer: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch = useDispatch();
    
    // console.log("Test: " + props.activityReportGenID)

    useEffect(() => {
        window.jQuery('#reportViewer12').telerik_ReportViewer({
          // serviceUrl: 'http://bhpapisrv.berca.co.id:5013/api/reports/',
          serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
          reportSource: {
            report: 'ActivityReport.trdp',
            parameters: { activityReportGenID: props.activityReportGenID },
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
                <p style={{ color: 'black', fontWeight: 'bold' }}>Activity Report</p>
            </div>
            <Divider></Divider>
            <div style={{ height: 700 }} id="reportViewer12"></div>
        </>
    );
};

export default ReportViewer;