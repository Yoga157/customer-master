import React, { useEffect, useState } from 'react';
import { Grid, Tab, Menu, Header, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import RouteEnum from 'constants/RouteEnum';
import { useDispatch } from 'react-redux';

import './QuotaList.scss';

interface LocationState {
  from: {
    pathname: string;
  };
  userName: string;
}

export const QuotaList = () => {
  const location = useLocation<LocationState>();
  const userName = location?.state?.userName;

  const [dashboardPath, setDashboardPath] = useState('');
  const [tabActiveByRole, setTabActiveByRole] = useState(0);
  const [tabActive, setTab] = useState({
    active: false,
    key: 0,
  });
  const [menuTab, setMenuTab] = useState<any>('');
  const dispatch = useDispatch();

  const GetLocalUserByKey = (keyParam) => {
    const jsonString = localStorage.getItem('userLogin');
    let result = null;

    // console.log(jsonString);
    if (jsonString !== null) {
      result = JSON.parse(jsonString);
      for (const key of Object.keys(result)) {
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
    cardMenuTab(['Unset Quota', 'Quota Not Full Distributed'].map(Function.prototype.call, String.prototype.trim).indexOf(key));

    const item = {
      itemDahsboard: ['Unset Quota', 'Quota Not Full Distributed'][
        ['Unset Quota', 'Quota Not Full Distributed'].map(Function.prototype.call, String.prototype.trim).indexOf(key)
      ].trim(),
    };
    return item;
  };

  useEffect(() => {
    // console.log('location.pathname', location.pathname);
    if (location.pathname === '/unset-quota') {
      setDashboardPath(getItemDashboard('Unset Quota').itemDahsboard);
    } else if (location.pathname === '/not-full-distributed-quota') {
      setDashboardPath(getItemDashboard('Quota Not Full Distributed').itemDahsboard);
    } else {
      setDashboardPath(getItemDashboard('Unset Quota').itemDahsboard);
    }
  }, []);

  useEffect(() => {
    window.jQuery('#reportViewer1').telerik_ReportViewer({
      //serviceUrl: 'https://demos.telerik.com/reporting/api/reports/',
      // serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
      // serviceUrl: 'http://192.168.10.43:5013/api/reports/',
      serviceUrl: 'https://bhpapisrv.berca.co.id:5008/api/reports/',
      reportSource: {
        report: dashboardPath === 'Unset Quota' ? 'ReportUnsetQuota.trdp' : 'ReportQuotaNotFullDistributed.trdp',
        parameters: {
          // accountName: GetLocalUserByKey('userName'),
          accountName: userName,
          tahun: new Date().getFullYear(),
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
  }, [dispatch, tabActive, dashboardPath]);

  let itemPanes = [];
  ['Unset Quota', 'Quota Not Full Distributed'].map((item, key) => {
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

  return (
    <>
      {// showing tab header
      ['Unset Quota', 'Quota Not Full Distributed'].length > 1 && menuTab}

      {['Unset Quota', 'Quota Not Full Distributed'].length >= 1 &&
        ['Unset Quota', 'Quota Not Full Distributed'].map((item, key) => {
          if (tabActive.active) {
            if (dashboardPath?.trim() === item.trim() && tabActive.key === key) {
              return (
                <div className="containerReportQuota" key={key}>
                  <Link to={RouteEnum.QuotaSetting}>
                    <Header as="h5">
                      <Icon name="chevron left" />
                      Back to Quota Setting
                    </Header>
                  </Link>
                  <div id="reportViewer1"></div>
                </div>
              );
            }
          } else {
            if (dashboardPath?.trim() === item.trim() && tabActiveByRole === key) {
              return (
                <div className="containerReportQuota" key={key}>
                  <Link to={RouteEnum.QuotaSetting}>
                    <Header as="h5">
                      <Icon name="chevron left" />
                      Back to Quota Setting
                    </Header>
                  </Link>
                  <div id="reportViewer1"></div>
                </div>
              );
            }
          }
        })}
    </>
  );
};
