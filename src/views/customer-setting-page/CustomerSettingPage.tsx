import React, { useState, useEffect } from "react";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import Tabs from "./components/customer-main/Tabs/Tabs";
import NoNameAccountsPage from "./components/customer-main/no-name-accounts-page/NoNameAccountsPage";
import NamedAccountsPage from "./components/customer-main/named-accounts-page/NamedAccountsPage";
import ShareableAccountsPage from "./components/customer-main/shareable-accounts-page/ShareableAccountsPage";
import AllAccountsPage from "./components/customer-main/all-accounts-page/AllAccountsPage";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";

interface IProps {
  history: any;
  role: string;
}

interface TabType {
  label: string;
  index: number;
  Component: React.FC<IProps>;
}

interface ILocation {
  isSuccess: boolean;
  selectedTab: number;
}

const tabs: TabType[] = [
  {
    label: "NO NAME ACCOUNTS",
    index: 1,
    Component: NoNameAccountsPage,
  },
  {
    label: "NAMED ACCOUNTS",
    index: 2,
    Component: NamedAccountsPage,
  },
  {
    label: "SHAREABLE ACCOUNTS",
    index: 3,
    Component: ShareableAccountsPage,
  },
  {
    label: "ALL ACCOUNTS",
    index: 4,
    Component: AllAccountsPage,
  },
];

export default function CustomerSettingPage() {
  const dispatch: Dispatch = useDispatch();
  const activeTab = useSelector(
    (state: IStore) => state.customerMaster.activeTabs
  );

  const [selectedTab, setSelectedTab] = useState<number>(activeTab);
  dispatch(CustomerMasterActions.setActiveTabs(1));

  return (
    <div className="App">
      <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
    </div>
  );
}
