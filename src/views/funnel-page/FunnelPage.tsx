import "./FunnelPageStyle.scss";
import React, { Fragment, useEffect, useState } from "react";
import { Grid, Tab, Label, Menu, Header } from "semantic-ui-react";
import InputSearch from "./components/search/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IFunnelTable from "selectors/funnel/models/IFunnelTable";
import IStore from "models/IStore";
import * as FunnelActions from "stores/funnel/FunnelActions";
import * as FunnelOpportunityA from "stores/funnel-opportunity/FunnelActivityActions";
import { selectFunnels } from "selectors/funnel/FunnelSelector";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import TotalSalesAndGpm from "./components/total-sales-n-gpm/totalSalesAndGpm";
import FunnelOpportunity from "../funnel-opportunity/FunnelOpportunity";
import { selectFunnelOpportunity } from "selectors/funnel-opportunity/FunnelOpportunitySelector";
import SearchOpportunity from "../funnel-opportunity/components/funnel-main/search/InputSearch";
import WhatsNewNotes from "views/whats-new-page/WhatNewNotes";
import * as WhatsNewActions from "stores/whats-new/WhatsNewAction";
import TabComponent from "./components/tab/TabComponent";
import { useLocation } from "react-router-dom";

interface LocationState {
  tab: string;
}

interface IProps {
  readonly history: any;
}

const FunnelPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const tab = location?.state?.tab;

  const [pageSize, setPage] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [tabActive, setTab] = useState(0);
  const [tabComponent, setTabComponent] = useState(null);

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const columnsorting: string = useSelector(
    (state: IStore) => state.funnel.data.column
  );
  const direction: string = useSelector(
    (state: IStore) => state.funnel.data.sorting
  );
  const resultObject = useSelector(
    (state: IStore) => state.whatsNew.resultActions
  );
  const isExportExl = useSelector((state: IStore) => state.funnel.isExportExl);
  useEffect(() => {
    const userId: any = localStorage.getItem("userLogin");
    dispatch(WhatsNewActions.requestWhatsNew("Latest"));
    let tabActive = 0;

    if (window.location.pathname === "/data-quality/funnel/list-sa") {
      if (currentUser.role !== "Sales Admin") {
        onTabSalesAnalis();
        tabActive = 2;
        setTab(2);
      }
    } else if (window.location.pathname === "/data-quality/funnel") {
      if (currentUser.role === "Sales" || currentUser.role === "SuperAdmin") {
        if (tab === "list-sa") {
          onTabSalesAnalis();
          tabActive = 2;
          setTab(2);
        } else {
          onTabFunnel();
          tabActive = 1;
          setTab(1);
        }
      } else {
        if (currentUser.role === "Sales Admin") {
          onTabSalesAnalis();
        } else {
          onTabFunnel();
        }
        tabActive = 0;
        setTab(0);
      }
      dispatch(
        FunnelOpportunityA.requestFunnelSales(
          1,
          10,
          JSON.parse(userId).employeeID
        )
      );
    } else {
      dispatch(
        FunnelOpportunityA.requestFunnelOpp(
          activePage,
          pageSize,
          "funnelOpportunity",
          "ascending"
        )
      );
    }

    setTabComponent(
      <Tab
        defaultActiveIndex={tabActive}
        className="DqTabSt01"
        menu={{ secondary: true, pointing: false }}
        panes={panes}
        onTabChange={onTabChange}
      />
    );

    if (resultObject.resultObj.flagCheckUpdate == 0) {
      localStorage.setItem("showNews", "no");
    } else {
      localStorage.setItem("showNews", "yes");
    }

    if (resultObject.resultObj.flagCheckUpdate == 1) {
      setShowNews(localStorage.getItem("showNews") !== "no");
    }
  }, [location]);

  useEffect(() => {
    dispatch(FunnelActions.setActivePage(1));
  }, [tabActive]);

  const onTabFunnel = () => {
    dispatch(
      FunnelActions.requestFunnel(
        currentUser.employeeID,
        currentUser.role,
        "funnelGenID",
        "descending",
        "funnel",
        1,
        50
      )
    );
  };

  const onTabSalesAnalis = () => {
    dispatch(
      FunnelActions.requestSA(
        currentUser.employeeID,
        currentUser.role,
        "funnelGenID",
        "descending",
        1,
        50
      )
    );
  };

  let searchType = "";

  const onTabChange = (e, data) => {
    searchType = "";
    setTab(data.activeIndex);
    /*if (currentUser.role === 'Sales' || currentUser.role === 'SuperAdmin') {*/
    if (data.activeIndex == 0) {
      const userId: any = localStorage.getItem("userLogin");
      if (window.location.pathname === "/data-quality/funnel") {
        dispatch(
          FunnelOpportunityA.requestFunnelSales(
            1,
            10,
            JSON.parse(userId).employeeID
          )
        );
      } else {
        dispatch(
          FunnelOpportunityA.requestFunnelOpp(
            activePage,
            pageSize,
            "FunnelOpportunityID",
            "ascending"
          )
        );
      }
    } else if (data.activeIndex == 1) {
      onTabFunnel();
    } else if (data.activeIndex == 2) {
      onTabSalesAnalis();
    }
    /*} else {
      console.log(data.activeIndex);
      if (data.activeIndex == 0) {
        onTabFunnel();
      } else if (data.activeIndex == 1) {
        onTabSalesAnalis();
      }
    }*/
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelActions.REQUEST_POST_FUNNEL_FILTER,
      FunnelActions.REQUEST_POST_FUNNELSA_FILTER,
      FunnelActions.REQUEST_SAS,
      FunnelActions.REQUEST_FUNNELS,
      FunnelActions.REQUEST_FUNNELS_SEARCH,
      FunnelActions.REQUEST_SA_SEARCH,
      FunnelOpportunityA.REQUEST_FUNNELS_OPPORTUNITY,
      FunnelOpportunityA.REQUEST_SEARCH_MARKETING,
      FunnelOpportunityA.REQUEST_FUNNELS_OPPORTUNITY_SALES,
      FunnelOpportunityA.REQUEST_SEARCH_OPP,
    ])
  );
  const funnelTables: IFunnelTable = useSelector((state: IStore) =>
    selectFunnels(state)
  );
  const tableData = useSelector((state: IStore) =>
    selectFunnelOpportunity(state)
  );
  const [showNews, setShowNews] = useState(
    resultObject.resultObj.flagCheckUpdate > 0
  );

  const panes = [
    {
      menuItem: (
        <Menu.Item key="opportunity">
          Opportunity
          <Label circular color="red">
            {tableData.totalRow}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <FunnelOpportunity history={props.history} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Funnels",
      render: () => (
        <Tab.Pane attached={false}>
          <TabComponent history={props.history} tabItem="funnel" />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Sales Analysis",
      render: () => (
        <Tab.Pane attached={false}>
          <TabComponent history={props.history} tabItem="salesAnalysis" />
        </Tab.Pane>
      ),
    },
  ];

  const onCloseNews = () => {
    setShowNews(false);
    localStorage.setItem("showNews", "yes");
  };

  /*if (currentUser.role === 'Sales' || currentUser.role === 'SuperAdmin') {*/
  if (tabActive === 1) {
    searchType = "funnel";
  } else if (tabActive === 2) {
    searchType = "salesAnalysis";
  }
  /*} else {
    //panes.shift(); //drop first item tab
    if (currentUser.role === 'Sales Admin') {
      //panes.shift(); //drop first item tab
    }

    if (tabActive === 0) {
      if (currentUser.role === 'Sales Admin') {
        searchType = 'salesAnalysis';
      } else {
        searchType = 'funnel';
      }
    } else if (tabActive === 1) {
      searchType = 'salesAnalysis';
    }
  }*/

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting || isExportExl}>
        {showNews && <WhatsNewNotes onClose={onCloseNews} />}

        <Grid className="mt-10r">
          {/* {currentUser.role === 'Sales' || currentUser.role === 'SuperAdmin' ? ( */}
          <Grid.Column textAlign="center">
            {tabActive == 0 ? (
              <SearchOpportunity />
            ) : (
              <InputSearch searchType={searchType} />
            )}
          </Grid.Column>
          {/*  ) : (
            <Grid.Column textAlign="center">
              <InputSearch searchType={searchType} />
            </Grid.Column>
          )} */}
        </Grid>

        <Grid>
          <Grid.Column textAlign="center" className="DangerNote">
            {tabActive === 2 && (
              <span>
                * SO number will be update in 24 hour after "Sales Admin" submit
                it.
              </span>
            )}
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column className="DqTabSt01">{tabComponent}</Grid.Column>
        </Grid>

        <TotalSalesAndGpm tableData={funnelTables} />
      </LoadingIndicator>
    </Fragment>
  );
};

export default FunnelPage;
