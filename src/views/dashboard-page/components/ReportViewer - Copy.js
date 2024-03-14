import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Tab, Menu } from 'semantic-ui-react';

export const ReportViewer = () => {
  const [dashboardPath, setDashboardPath] = useState('');
  const [tabActiveByRole, setTabActiveByRole] = useState(0);
  const [tabActive, setTab] = useState({
    active: false,
    key: 0,
  });
  const [menuTab, setMenuTab] = useState('');

  const [currentYears] = useState(new Date().getFullYear());
  const dispatch = useDispatch();

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

  const onTabChange = (e, data) => {
    setTab({
      active: true,
      key: data.activeIndex,
    });
  };

  const getItemDashboard = (key) => {
    cardMenuTab(
      GetLocalUserByKey('dashboardSecurity')
        .map(Function.prototype.call, String.prototype.trim)
        .indexOf(key)
    );

    const item = {
      itemDahsboard:
        dashboardPath === 'Finance'
          ? GetLocalUserByKey('dashboardSecurity')[
              GetLocalUserByKey('dashboardSecurity')
                .map(Function.prototype.call, String.prototype.trim)
                .indexOf(key)
            ].trim()
          : key,
    };
    return item;
  };

  useEffect(() => {
    if (GetLocalUserByKey('dashboardSecurity')?.length >= 1) {
      if (GetLocalUserByKey('role') === 'Sales' || GetLocalUserByKey('role') === 'SuperAdmin') {
        setDashboardPath(getItemDashboard('Sales').itemDahsboard);
      } else if (GetLocalUserByKey('role') === 'Product Manager') {
        setDashboardPath(getItemDashboard('Product Manager').itemDahsboard);
      } else if (GetLocalUserByKey('role') === 'Presales') {
        setDashboardPath(getItemDashboard('Presales').itemDahsboard);
      } else if (
        GetLocalUserByKey('role') === 'Sales Admin' ||
        GetLocalUserByKey('role') === 'Warehouse Admin' ||
        GetLocalUserByKey('role') === 'Purchasing'
      ) {
        setDashboardPath(getItemDashboard('Sales').itemDahsboard);
      } else {
        setDashboardPath(getItemDashboard('Sales').itemDahsboard);
      }
    }
  }, []);

  useEffect(() => {
    window.jQuery('#reportViewer1').telerik_ReportViewer({
      //serviceUrl: 'https://demos.telerik.com/reporting/api/reports/',
      serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
      //serviceUrl: 'http://192.168.10.43:5013/api/reports/',
      //serviceUrl: 'http://bhpapisrv.berca.co.id:5013/api/reports/',
      //serviceUrl: 'https://bhpapisrv.berca.co.id:5016/api/reports/',

      reportSource: {
        //report: 'Telerik.Reporting.Examples.CSharp.ReportCatalog, CSharp.ReportLibrary'
        report:
          GetLocalUserByKey('dashboardSecurity') !== undefined && GetLocalUserByKey('dashboardSecurity')?.length >= 1
            ? dashboardPath?.trim() === 'Sales'
              ? 'Dashboard-Style.trdp'
              : dashboardPath?.trim() === 'Product Manager'
              ? 'DashboardBrandPM.trdp'
              : dashboardPath?.trim() === 'Presales'
              ? 'DashboardPresales.trdp'
              : dashboardPath?.trim() === 'Postsales'
              ? 'DashboardPostSales.trdp'
              : /*: dashboardPath?.trim() === 'Finance'
              ? 'DashboardFinance.trdp'*/
                'Dashboard-Style.trdp'
            : GetLocalUserByKey('role') === 'Sales'
            ? 'Dashboard-Style.trdp'
            : GetLocalUserByKey('role') === 'Sales Admin' ||
              GetLocalUserByKey('role') === 'Warehouse Admin' ||
              GetLocalUserByKey('role') === 'Purchasing'
            ? 'Dashboard-Style.trdp'
            : GetLocalUserByKey('role') === 'Product Manager'
            ? 'DashboardBrandPM.trdp'
            : GetLocalUserByKey('role') === 'Presales'
            ? 'DashboardPresales.trdp'
            : GetLocalUserByKey('role') === 'Postsales'
            ? 'DashboardPostSales.trdp'
            : 'Dashboard-Style.trdp',
        //report :GetLocalUserByKey('role') === "Sales" ? "Dashboard-Style.trdp" : GetLocalUserByKey('role') === "Product Manager" ? "DashboardBrandPM.trdp" :  "Dashboard-Style.trdp",
        parameters: {
          UserLogin: GetLocalUserByKey('userName'),
          Year: currentYears,
          COCODE: 1,
          Direktorat: GetLocalUserByKey('direktoratName'),
          editors: {
            singleSelect: 'COMBO_BOX',
            multiSelect: 'COMBO_BOX',
          },
        },

        //parameters: { AccName: GetLocalUserByKey(), Year:currentYears, COCODE:1} ,
        //parameters: { AccName: 'jerfi.tan', Year:2021, COCODE:1}
      },
      error: function(e, args) {
        console.log('This event handler will be called after a page of the report is ready.');
        console.log('The error message is: ' + args);
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
        var viewer = window.jQuery('#reportViewer1').data('telerik_ReportViewer');
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
  }, [dispatch, tabActive, dashboardPath]);

  let itemPanes = [];
  GetLocalUserByKey('dashboardSecurity') !== undefined &&
    GetLocalUserByKey('dashboardSecurity').map((item, key) => {
      if (item != 'Finance' && item != 'Accounting') {
        itemPanes = [
          ...itemPanes,
          {
            menuItem: (
              <Menu.Item key={item} onClick={() => setDashboardPath(item)}>
                {item}
              </Menu.Item>
            ),
          },
        ];
      }
    });

  const cardMenuTab = (activeTab) => {
    setTabActiveByRole(activeTab);
    setMenuTab(
      <Grid columns="equal">
        <Grid.Column className="DqTabSt01 mt-6r">
          <Tab
            className={`DqTabSt01 tabDashboard`}
            menu={{ secondary: true, pointing: false }}
            panes={itemPanes}
            onTabChange={onTabChange}
            defaultActiveIndex={activeTab}
          />
        </Grid.Column>
      </Grid>
    );
  };

  // return <div id="reportViewer1"></div>;
  return (
    <>
      {// showing tab header
      GetLocalUserByKey('dashboardSecurity') !== undefined && GetLocalUserByKey('dashboardSecurity')?.length > 1 && menuTab}

      {GetLocalUserByKey('dashboardSecurity') !== undefined && GetLocalUserByKey('dashboardSecurity')?.length >= 1 ? (
        GetLocalUserByKey('dashboardSecurity')?.map((item, key) => {
          if (tabActive.active) {
            if (dashboardPath?.trim() === item.trim() && tabActive.key === key) {
              return (
                <div className="containerReportView" key={key}>
                  <div id="reportViewer1"></div>
                </div>
              );
            }
          } else {
            if (dashboardPath?.trim() === item.trim() && tabActiveByRole === key) {
              return (
                <div className="containerReportView" key={key}>
                  <div id="reportViewer1"></div>
                </div>
              );
            }
          }
        })
      ) : (
        <div className="containerReportView">
          <div id="reportViewer1"></div>
        </div>
      )}
    </>
  );
};
