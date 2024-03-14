import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import "./Filter.scss";
import { Divider, Grid, Form } from "semantic-ui-react";
import { Button, DropdownClearInput } from "views/components/UI";
import { Form as FinalForm, Field } from "react-final-form";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectSalesOptions } from "selectors/select-options/SalesAssignSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";
import * as SalesAssign from "stores/customer-sales/SalesAssignActivityActions";

interface IProps {
  rowData: any;
  getFilterData: (data: any) => void;
}

const FilterCustomer: React.FC<{
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  openFilter: boolean;
} & IProps> = ({ setOpenFilter, openFilter, rowData, getFilterData }) => {
  const [salesName, setSalesName] = useState("");
  const [salesAssignArray, setSalesAssignArray] = useState([]);
  const [salesFilter, setSalesFilter] = useState([]);
  const [noNameAccountYesChecked, setNoNameAccountYesChecked] = useState(true);
  const [noNameAccountNoChecked, setNoNameAccountNoChecked] = useState(true);
  const [namedAccountYesChecked, setNamedAccountYesChecked] = useState(true);
  const [namedAccountNoChecked, setNamedAccountNoChecked] = useState(true);
  const [sharaebleAccountYesChecked, setShareableAccountYesChecked] = useState(
    true
  );
  const [shareableAccountNoChecked, setShareableAccountNoChecked] = useState(
    true
  );
  const [pmo_customerYesChecked, setPmo_customerYesChecked] = useState(false);
  const [pmo_customerNoChecked, setPmo_customerNoChecked] = useState(false);
  const [holdshipmentYesChecked, setHoldshipmentYesChecked] = useState(false);
  const [holdshipmentNoChecked, setHoldshipmentNoChecked] = useState(false);
  const [blacklistYesChecked, setBlacklistYesChecked] = useState(false);
  const [blacklistNoChecked, setBlacklistNoChecked] = useState(false);

  const dispatch: Dispatch = useDispatch();

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerSettingAct.REQUEST_ALL_ACCOUNTS,
      CustomerSettingAct.REQUEST_ALL_SEARCH,
    ])
  );

  const onResultSelectSales = (data: any): any => {
    let checkSales = salesAssignArray.find((obj) => obj.sales === data.salesID);
    if (checkSales === undefined && data.salesID != undefined) {
      setSalesAssignArray([
        ...salesAssignArray,
        {
          salesName: data.salesName,
          salesID: data.salesID,
        },
      ]);
      console.log(data.salesID);
      setSalesFilter([...salesFilter, data.salesID.toString()]);
    }
  };

  const onSubmitHandler = async () => {
    const nonameAccount =
      noNameAccountYesChecked && noNameAccountNoChecked
        ? null
        : noNameAccountYesChecked
        ? true
        : noNameAccountNoChecked
        ? false
        : null;

    const namedAccount =
      namedAccountYesChecked && namedAccountNoChecked
        ? null
        : namedAccountYesChecked
        ? true
        : namedAccountNoChecked
        ? false
        : null;

    const shareableAccount =
      sharaebleAccountYesChecked && shareableAccountNoChecked
        ? null
        : sharaebleAccountYesChecked
        ? true
        : shareableAccountNoChecked
        ? false
        : null;

    const pmo_customer =
      pmo_customerYesChecked && pmo_customerNoChecked
        ? null
        : pmo_customerYesChecked
        ? true
        : pmo_customerNoChecked
        ? false
        : null;

    const newsalesAssign =
      salesFilter.length == 0 ? null : salesFilter.join(",");

    const holdshipment =
      holdshipmentYesChecked && holdshipmentNoChecked
        ? null
        : holdshipmentYesChecked
        ? true
        : holdshipmentNoChecked
        ? false
        : null;

    const blacklist =
      blacklistYesChecked && blacklistNoChecked
        ? null
        : blacklistYesChecked
        ? true
        : blacklistNoChecked
        ? false
        : null;

    getFilterData({
      nonameAccount: nonameAccount,
      namedAccount: namedAccount,
      shareableAccount: shareableAccount,
      pmo_customer: pmo_customer,
      newsalesAssign: newsalesAssign,
      holdshipment: holdshipment,
      blacklist: blacklist,
    });

    dispatch(
      CustomerSettingAct.requestSearchAllAcc(
        1,
        10,
        "CustomerID",
        null,
        "ascending",
        newsalesAssign,
        null,
        pmo_customer,
        blacklist,
        holdshipment,
        nonameAccount,
        namedAccount,
        shareableAccount
      )
    );
  };

  const salesStoreDropdown = useSelector((state: IStore) =>
    selectSalesOptions(state)
  );

  useEffect(() => {
    dispatch(SalesAssign.requestSalesDropdown());
  }, [dispatch]);

  const deleteClick = (salesID) => {
    let filteredArray = salesAssignArray.filter(
      (obj) => obj.salesID !== salesID
    );
    setSalesAssignArray(filteredArray);
  };

  const resetClick = () => {
    setNoNameAccountYesChecked(true);
    setNoNameAccountNoChecked(true);
    setNamedAccountYesChecked(true);
    setNamedAccountNoChecked(true);
    setShareableAccountYesChecked(true);
    setShareableAccountNoChecked(true);
    setPmo_customerYesChecked(false);
    setPmo_customerNoChecked(false);
    setHoldshipmentYesChecked(false);
    setHoldshipmentNoChecked(false);
    setBlacklistYesChecked(false);
    setBlacklistNoChecked(false);
    setSalesName("");
    setSalesAssignArray([]);

    dispatch(
      CustomerSettingAct.requestAllAcc(1, 10, "CustomerID", "ascending")
    );
  };

  /** mengatur tinggi filter */
  const titleFilterRef = useRef(null);
  const contentFilterRef = useRef(null);
  const buttonFilterRef = useRef(null);

  useEffect(() => {
    const titleFilterElement = titleFilterRef.current;
    const contentFilterElement = contentFilterRef.current;
    const buttonFilterElement = buttonFilterRef.current;

    if (titleFilterElement && contentFilterElement && buttonFilterElement) {
      const titleFilterElementHeight = titleFilterElement.offsetHeight;
      const buttonFilterElementHeight = buttonFilterElement.offsetHeight;

      contentFilterRef.current.style.height = `calc(100vh - ${titleFilterElementHeight}px - ${buttonFilterElementHeight}px - 25px)`;
    }
  }, []);

  return (
    <div
      style={{
        top: "0",
        right: "0",
        position: "fixed",
        zIndex: 999,
      }}
    >
      <FinalForm
        onSubmit={() => onSubmitHandler()}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="position-relative">
              <LoadingIndicator isActive={isRequesting}>
                <div ref={titleFilterRef}>
                  <Grid columns="equal" widht={8}>
                    <Grid.Column width={8} verticalAlign="middle">
                      <h4>ADVANCE FILTER</h4>
                    </Grid.Column>

                    <Grid.Column width={8}>
                      <Button
                        className="m-05r"
                        icon="close"
                        style={{
                          backgroundColor: "transparent",
                          color: "black",
                        }}
                        floated="right"
                        size="tiny"
                        onClick={() => setOpenFilter(!openFilter)}
                      />
                    </Grid.Column>
                  </Grid>

                  <Divider></Divider>
                </div>
                <div ref={contentFilterRef} style={{ overflowY: "auto" }}>
                  <Grid.Row>
                    <p>Account Status</p>
                    <Grid.Row>
                      <div className="checkbox-nonameaccount">
                        <div className="color-checbox-noname">
                          <label className="flex-center">
                            <input
                              name="shareable"
                              type="checkbox"
                              style={{
                                transform: "scale(1)",
                                margin: "0.5rem",
                              }}
                              checked={noNameAccountYesChecked}
                              onChange={() =>
                                setNoNameAccountYesChecked(
                                  !noNameAccountYesChecked
                                )
                              }
                            ></input>
                            <span style={{ color: "white" }}>
                              No Name Account
                            </span>
                          </label>
                        </div>

                        <div style={{ margin: "0.3rem" }}></div>

                        <div className="checkbox-namedaccount">
                          <label className="flex-center">
                            <input
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                                margin: "0.5rem",
                              }}
                              checked={sharaebleAccountYesChecked}
                              onChange={() =>
                                setShareableAccountYesChecked(
                                  !sharaebleAccountYesChecked
                                )
                              }
                            ></input>
                            <span style={{ color: "white" }}>
                              Shareable Account
                            </span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid.Row>
                  <Grid.Row>
                    <div className="checkbox-nonameaccount">
                      <div className="color-checbox-named">
                        <label className="flex-center">
                          <input
                            name="shareable"
                            type="checkbox"
                            style={{
                              transform: "scale(1)",
                              margin: "0.5rem",
                            }}
                            checked={namedAccountYesChecked}
                            onChange={() =>
                              setNamedAccountYesChecked(!namedAccountYesChecked)
                            }
                          ></input>
                          <span style={{ color: "white" }}>Named Account</span>
                        </label>
                      </div>
                    </div>
                  </Grid.Row>
                  <Divider></Divider>

                  <Grid.Row>
                    <p>PMO Customer</p>
                    <Grid.Row>
                      <div className="checkbox-nonameaccount">
                        <div className="flex-center">
                          <label className="flex-center">
                            <input
                              name="pmo_customer"
                              type="checkbox"
                              checked={pmo_customerYesChecked}
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setPmo_customerYesChecked(
                                  !pmo_customerYesChecked
                                )
                              }
                            ></input>
                            <span>Yes</span>
                          </label>
                        </div>
                        <div style={{ margin: "0 1rem" }}></div>
                        <div className="flex-center">
                          <label className="flex-center">
                            <input
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              checked={pmo_customerNoChecked}
                              onChange={() =>
                                setPmo_customerNoChecked(!pmo_customerNoChecked)
                              }
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid.Row>
                  <Divider></Divider>

                  <Grid.Row>
                    <Grid.Column>
                      <p>Sales Assign</p>
                      <Field
                        name="salesName"
                        component={DropdownClearInput}
                        placeholder="-Choose Sales-"
                        values={salesName}
                        options={salesStoreDropdown}
                        onChanged={onResultSelectSales}
                      />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column>
                      {salesAssignArray.map((data) => {
                        return (
                          <div
                            style={{ marginTop: "0.5rem" }}
                            className="ui label labelBorPad"
                            key={data.salesID}
                          >
                            <span>{data.salesName}</span>
                            <i
                              className="delete icon btnSales"
                              onClick={() => deleteClick(data.salesID)}
                            ></i>
                          </div>
                        );
                      })}
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>

                  <Grid.Row>
                    <p>Holdshipment Customer</p>
                    <Grid.Row>
                      <div className="checkbox-nonameaccount">
                        <div className="flex-center">
                          <label className="flex-center">
                            <input
                              name="holdshipment"
                              value="yes"
                              type="checkbox"
                              checked={holdshipmentYesChecked}
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setHoldshipmentYesChecked(
                                  !holdshipmentYesChecked
                                )
                              }
                            ></input>
                            <span>Yes</span>
                          </label>
                        </div>
                        <div style={{ margin: "0 1rem" }}></div>
                        <div className="flex-center">
                          <label className="flex-center">
                            <input
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              checked={holdshipmentNoChecked}
                              onChange={() =>
                                setHoldshipmentNoChecked(!holdshipmentNoChecked)
                              }
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid.Row>

                  <Divider></Divider>

                  <Grid.Row>
                    <p>Blacklist Customer</p>
                    <Grid.Row>
                      <div className="checkbox-nonameaccount">
                        <div className="flex-center">
                          <label className="flex-center">
                            <input
                              type="checkbox"
                              name="blacklist"
                              value="yes"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              checked={blacklistYesChecked}
                              onChange={() =>
                                setBlacklistYesChecked(!blacklistYesChecked)
                              }
                            ></input>
                            <span>Yes</span>
                          </label>
                        </div>
                        <div style={{ margin: "0 1rem" }}></div>
                        <div className="flex-center">
                          <label className="flex-center">
                            <input
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              checked={blacklistNoChecked}
                              onChange={() =>
                                setBlacklistNoChecked(!blacklistNoChecked)
                              }
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid.Row>
                </div>

                <div ref={buttonFilterRef} className="btn-filter-ref">
                  <Divider style={{ width: "100%" }}></Divider>

                  <Grid.Row>
                    <Button className="MarBot20 btn-apply" type="submit">
                      Apply Filter
                    </Button>
                  </Grid.Row>
                  <Grid.Row>
                    <Button
                      type="button"
                      onClick={() => resetClick()}
                      className="btn-reset"
                    >
                      <p>Reset Filter</p>
                    </Button>
                  </Grid.Row>
                </div>
              </LoadingIndicator>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default FilterCustomer;
