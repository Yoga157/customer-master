import React, { useCallback, useState } from "react";
import { Button, Grid, Input } from "semantic-ui-react";
import styles from "./InputSearchARGrouping.module.scss";
import AdvancedSearchARGrouping from "./AdvancedSearchARGrouping";
import * as SidebarContainerActions from "stores/sidebar-containers/SidebarContainerActions";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ActivityReportGroupingActions from "stores/activity-report-grouping/ActivityReportGroupingActions";
import IStore from "models/IStore";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";

interface IProps {
  searchType: string;
  pageSize: number;
  page: number;
  searchText: string;
  columns: string;
  direction: string;
  setSearchText: any;
}

export const InputSearchARGrouping: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { searchType, pageSize, page, setSearchText, searchText, columns, direction } = props;
  const currentUser: IUserResult = useSelector((state: IStore) =>
  selectUserResult(state)
);
  const dispatch: Dispatch = useDispatch();
  const [btnCancel, setBtnCancel] = useState(false);
  const onShowAdvancedSearch = useCallback(
    (searchType): void => {
      dispatch(
        SidebarContainerActions.OPEN(
          <AdvancedSearchARGrouping searchType={searchType} />
        )
      );
    },
    [dispatch]
  );
  const onSearch = () => {
    // dispatch(
    //   CreditBillingActions.requestCreditBillings(
    //     currentUser.employeeID,
    //     btnCancel ? "" : searchText,
    //     "creditId",
    //     "descending",
    //     page,
    //     pageSize
    //   )
    // );
    dispatch(
      ActivityReportGroupingActions.RequestActivityReportGroupingSearch(
        page,
        pageSize,
        columns,
        direction,
        searchText,
        currentUser.employeeID
      )
    );
    if (btnCancel) {
      dispatch(
        ActivityReportGroupingActions.RequestActivityReportGrouping(
          page,
          pageSize,
          columns,
          direction,
          currentUser.employeeID
        )
      );
      setSearchText("");
    }
    setBtnCancel(!btnCancel);
  };
  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };
  return (
    <Grid.Column className="SearchFormDQ">
      <Button
        className="AdvSearchBtn"
        icon="sliders horizontal"
        size="small"
        color="yellow"
        button="true"
        floating="true"
        onClick={() => onShowAdvancedSearch(searchType)}
      />
      <Input
        className={styles.Rounded + " roundedSearchInput "}
        placeholder="Search..."
        onChange={onChangeSearch}
        onKeyPress={(event) => {
          if (event.charCode == 13) {
            onSearch();
          }
        }}
        value={searchText}
      />
      <Button
        className="Rounded SearchBtn"
        icon={btnCancel ? "close" : "search"}
        size="small"
        color="blue"
        onClick={onSearch}
        // loading={isRequesting}
      />
    </Grid.Column>
  );
};
