import React, { useState } from "react";
import { Input, Button, Grid } from "semantic-ui-react";
import styles from "./InputSearch.module.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { selectUserResult } from "selectors/user/UserSelector";
import IStore from "models/IStore";
import IUserResult from "selectors/user/models/IUserResult";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";
import { useLocation, RouteProps } from "react-router-dom";
import { selectRequesting } from "selectors/requesting/RequestingSelector";

export const InputSearch: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [btnCancel, setBtnCancel] = useState(false);

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    // if (location.pathname == "/data-quality/customer-setting") {
    if (btnCancel || searchText.length === 0) {
      dispatch(
        CustomerSetting.requestNamedAcc(1, 10, "CustomerID", "ascending")
      );
      dispatch(CustomerSetting.setActivePage(1));
      setSearchText("");
      setBtnCancel(false);
    } else {
      if (searchText.length > 1) {
        dispatch(
          CustomerSetting.requestSearchNamedAcc(1, 10, "CustomerID", searchText)
        );
        dispatch(CustomerSetting.setActivePage(1));
        setBtnCancel(!btnCancel);
      }
    }
    // }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerSetting.REQUEST_NAMED_ACCOUNTS,
      CustomerSetting.REQUEST_NAMED_SEARCH_FINISHED,
    ])
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        // width: "fit-content",
        alignItems: "center",
      }}
    >
      <div style={{ flex: "1" }}>
        {" "}
        <Input
          style={{ width: "45rem", maxWidth: "45rem", height: "3.5rem" }}
          className={styles.Rounded + " roundedSearchInput "}
          placeholder="Search..."
          onChange={onChangeSearch}
          onKeyPress={(event) => {
            if (event.charCode == 13) {
              onSearch();
            }
          }}
          value={searchText}
          id={"search-input-customer"}
        />
      </div>

      <div>
        <Button
          className="Rounded SearchBtn"
          icon={btnCancel ? "close" : "search"}
          size="huge"
          color="blue"
          onClick={onSearch}
          // loading={isRequesting}
        />
      </div>
    </div>
  );
};
export default InputSearch;
