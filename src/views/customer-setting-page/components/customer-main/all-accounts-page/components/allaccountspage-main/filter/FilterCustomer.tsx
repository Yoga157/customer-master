import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import "./Filter.scss";
import { Divider, Grid, Form } from "semantic-ui-react";
import { Button, DropdownAdvanceFilter } from "views/components/UI";
import { Form as FinalForm, Field } from "react-final-form";
import { selectIndustryDropdown } from "selectors/select-options/IndustryClassSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectSalesOptions } from "selectors/select-options/SalesAssignSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";
import * as SalesAssign from "stores/customer-sales/SalesAssignActivityActions";
import * as IndustryClass from "stores/industry-class/IndustryClassActions";

interface IProps {
  rowData: any;
  getFilterData: (data: any) => void;
}

const FilterCustomer: React.FC<{
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  openFilter: boolean;
} & IProps> = ({ setOpenFilter, openFilter, rowData, getFilterData }) => {
  const [salesName, setSalesName] = useState("");
  const [industryClass, setIndustryClass] = useState("");
  const [salesAssignArray, setSalesAssignArray] = useState([]);
  const [industryClassArray, setIndustryClassArray] = useState([]);
  const [salesFilter, setSalesFilter] = useState([]);
  const [industryClassFilter, setIndustryClassFilter] = useState([]);
  const [resetIndustryClass, setResetIndustryClass] = useState(false);
  const [resetSales, setResetSales] = useState(false);
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
  const [isNewYesChecked, setIsNewYesChecked] = useState(true);
  const [isNewNoChecked, setIsNewNoChecked] = useState(true);
  const [pmo_customerYesChecked, setPmo_customerYesChecked] = useState(false);
  const [pmo_customerNoChecked, setPmo_customerNoChecked] = useState(false);
  const [holdshipmentYesChecked, setHoldshipmentYesChecked] = useState(false);
  const [holdshipmentNoChecked, setHoldshipmentNoChecked] = useState(false);
  const [blacklistYesChecked, setBlacklistYesChecked] = useState(false);
  const [blacklistNoChecked, setBlacklistNoChecked] = useState(false);
  const [capNoChecked, setCapNoChecked] = useState(false);
  const [capYesChecked, setCapYesChecked] = useState(false);
  const [newRequestYesChecked, setNewRequestYesChecked] = useState(true);
  const [newRequestNoChecked, setNewRequestNoChecked] = useState(true);
  const [rejectYesChecked, setRejectYesChecked] = useState(true);
  const [rejectNoChecked, setRejectNoChecked] = useState(true);
  const [approveYesChecked, setApproveYesChecked] = useState(true);
  const [approveNoChecked, setApproveNoChecked] = useState(true);

  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(10);
  const activePage = useSelector(
    (state: IStore) => state.customerSetting.activePage
  );

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

      setSalesFilter([...salesFilter, data.salesID.toString()]);
    }
  };

  const onResultSelectIndustryClass = (values: any): any => {
    let checkIndustry = industryClassArray.find(
      (obj) => obj.industryClassID === values.industryClassID
    );
    if (checkIndustry === undefined && values.industryClassID != undefined) {
      setIndustryClassArray([
        ...industryClassArray,
        {
          industryClass: values.industryClass,
          industryClassID: values.industryClassID,
        },
      ]);

      setIndustryClassFilter([
        ...industryClassFilter,
        values.industryClassID.toString(),
      ]);
    }
  };

  const onSubmitHandler = async () => {
    const nonameAccount =
      noNameAccountYesChecked && noNameAccountNoChecked
        ? true
        : noNameAccountYesChecked
        ? true
        : noNameAccountNoChecked
        ? false
        : true;

    const namedAccount =
      namedAccountYesChecked && namedAccountNoChecked
        ? true
        : namedAccountYesChecked
        ? true
        : namedAccountNoChecked
        ? false
        : true;

    const shareableAccount =
      sharaebleAccountYesChecked && shareableAccountNoChecked
        ? true
        : sharaebleAccountYesChecked
        ? true
        : shareableAccountNoChecked
        ? false
        : true;

    const isNew =
      isNewYesChecked && isNewNoChecked
        ? true
        : isNewYesChecked
        ? true
        : isNewNoChecked
        ? false
        : true;

    const newRequestChecked =
      newRequestYesChecked && newRequestNoChecked
        ? true
        : newRequestYesChecked
        ? true
        : newRequestNoChecked
        ? false
        : true;

    const isReject =
      rejectYesChecked && rejectNoChecked
        ? true
        : rejectYesChecked
        ? true
        : rejectNoChecked
        ? false
        : true;

    const isApprove =
      approveYesChecked && approveNoChecked
        ? true
        : approveYesChecked
        ? true
        : approveNoChecked
        ? false
        : true;

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

    const newIndustryClass =
      industryClassFilter.length == 0 ? null : industryClassFilter.join(",");

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

    const isCap =
      capYesChecked && capNoChecked
        ? null
        : capYesChecked
        ? true
        : capNoChecked
        ? false
        : null;

    // console.log({
    //   nonameAccount: nonameAccount,
    //   namedAccount: namedAccount,
    //   shareableAccount: shareableAccount,
    //   isNew: isNew,
    //   pmo_customer: pmo_customer,
    //   newsalesAssign: newsalesAssign,
    //   holdshipment: holdshipment,
    //   blacklist: blacklist,
    // });

    getFilterData({
      nonameAccount: nonameAccount,
      namedAccount: namedAccount,
      shareableAccount: shareableAccount,
      isNew: isNew,
      pmo_customer: pmo_customer,
      newsalesAssign: newsalesAssign,
      newIndustryClass: newIndustryClass,
      holdshipment: holdshipment,
      blacklist: blacklist,
      isCap: isCap,
      showPending: newRequestChecked,
      showApprove: isApprove,
      showReject: isReject,
    });

    dispatch(
      CustomerSettingAct.requestSearchAllAcc(
        1,
        10,
        "CustomerID",
        null,
        "ascending",
        newsalesAssign,
        newIndustryClass,
        null,
        pmo_customer,
        blacklist,
        holdshipment,
        isCap,
        nonameAccount,
        namedAccount,
        shareableAccount,
        isNew,
        newRequestChecked,
        isApprove,
        isReject
      )
    );
  };

  const salesStoreDropdown = useSelector((state: IStore) =>
    selectSalesOptions(state)
  );

  useEffect(() => {
    dispatch(SalesAssign.requestSalesDropdown());
  }, [dispatch]);

  const industryClassStoreDropdown = useSelector((state: IStore) =>
    selectIndustryDropdown(state)
  );

  useEffect(() => {
    dispatch(IndustryClass.requestIndustryDropdown());
  }, [dispatch]);

  const deleteClick = (salesID) => {
    let filteredArray = salesAssignArray.filter(
      (obj) => obj.salesID !== salesID
    );
    setSalesAssignArray(filteredArray);
    setSalesFilter(salesFilter.filter((id) => id !== salesID.toString()));
  };

  const deleteClickIndustry = (industryClassID) => {
    let filteredArray = industryClassArray.filter(
      (obj) => obj.industryClassID !== industryClassID
    );
    setIndustryClassArray(filteredArray);
    setIndustryClassFilter(
      industryClassFilter.filter((id) => id !== industryClassID.toString())
    );
  };

  const resetClick = () => {
    setNoNameAccountYesChecked(true);
    setNoNameAccountNoChecked(true);
    setNamedAccountYesChecked(true);
    setNamedAccountNoChecked(true);
    setShareableAccountYesChecked(true);
    setShareableAccountNoChecked(true);
    setIsNewYesChecked(true);
    setIsNewNoChecked(true);
    setNewRequestYesChecked(true);
    setNewRequestYesChecked(true);
    setApproveYesChecked(true);
    setApproveNoChecked(true);
    setRejectYesChecked(true);
    setRejectNoChecked(true);
    setPmo_customerYesChecked(false);
    setPmo_customerNoChecked(false);
    setHoldshipmentYesChecked(false);
    setHoldshipmentNoChecked(false);
    setBlacklistYesChecked(false);
    setBlacklistNoChecked(false);
    setCapYesChecked(false);
    setCapNoChecked(false);
    setSalesName("");
    setSalesAssignArray([]);
    setSalesFilter([]);
    setResetSales(true);
    setIndustryClass("");
    setIndustryClassArray([]);
    setIndustryClassFilter([]);
    setResetIndustryClass(true);

    dispatch(
      CustomerSettingAct.requestSearchAllAcc(
        activePage,
        pageSize,
        "CustomerID",
        null,
        "ascending",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        true,
        true,
        true,
        true,
        true,
        true,
        true
      )
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
                              name="noName"
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
                              name="shareable"
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
                            name="named"
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

                      <div style={{ margin: "0.3rem" }}></div>

                      <div className="checkbox-newaccount">
                        <label className="flex-center">
                          <input
                            name="newAccount"
                            type="checkbox"
                            style={{
                              marginRight: "0.5rem",
                              transform: "scale(1)",
                              margin: "0.5rem",
                            }}
                            checked={isNewYesChecked}
                            onChange={() =>
                              setIsNewYesChecked(!isNewYesChecked)
                            }
                          ></input>
                          <span>New Account</span>
                        </label>
                      </div>
                    </div>
                  </Grid.Row>

                  <Divider></Divider>

                  <Grid.Row>
                    <p>New Account Type</p>
                    <Grid.Row>
                      <div className="checkbox-nonameaccount">
                        <div className="flex-center">
                          <label className="flex-center">
                            <input
                              name="newRequest"
                              type="checkbox"
                              checked={newRequestYesChecked}
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setNewRequestYesChecked(!newRequestYesChecked)
                              }
                              // disabled={!isNewYesChecked}
                            ></input>
                            <span>New Request</span>
                          </label>
                        </div>

                        <div style={{ margin: "0 1rem" }}></div>
                        <div className="flex-center">
                          <label className="flex-center">
                            <input
                              name="rejected"
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              checked={rejectYesChecked}
                              onChange={() =>
                                setRejectYesChecked(!rejectYesChecked)
                              }
                              // disabled={!isNewYesChecked}
                            ></input>
                            <span>Reject</span>
                          </label>
                        </div>

                        <div style={{ margin: "0 1rem" }}></div>
                        <div className="flex-center">
                          <label className="flex-center">
                            <input
                              name="approve"
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              checked={approveYesChecked}
                              onChange={() =>
                                setApproveYesChecked(!approveYesChecked)
                              }
                              // disabled={!isNewYesChecked}
                            ></input>
                            <span>Approve</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
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
                              onChange={() => {
                                setPmo_customerYesChecked(
                                  !pmo_customerYesChecked
                                );
                                if (pmo_customerNoChecked)
                                  setPmo_customerNoChecked(false);
                              }}
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
                              onChange={() => {
                                setPmo_customerNoChecked(
                                  !pmo_customerNoChecked
                                );
                                if (pmo_customerYesChecked)
                                  setPmo_customerYesChecked(false);
                              }}
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
                      {/* <p>Sales Assign</p> */}
                      <Field
                        name="salesName"
                        labelName="Sales Assign"
                        component={DropdownAdvanceFilter}
                        placeholder="-Choose Sales-"
                        values={salesName}
                        options={salesStoreDropdown}
                        onChanged={onResultSelectSales}
                        resetSales={resetSales}
                        onReset={() => setResetSales(false)}
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
                              onChange={() => {
                                setHoldshipmentYesChecked(
                                  !holdshipmentYesChecked
                                );
                                if (holdshipmentNoChecked)
                                  setHoldshipmentNoChecked(false);
                              }}
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
                              onChange={() => {
                                setHoldshipmentNoChecked(
                                  !holdshipmentNoChecked
                                );
                                if (holdshipmentYesChecked)
                                  setHoldshipmentYesChecked(false);
                              }}
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
                              onChange={() => {
                                setBlacklistYesChecked(!blacklistYesChecked);
                                if (blacklistNoChecked)
                                  setBlacklistNoChecked(false);
                              }}
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
                              onChange={() => {
                                setBlacklistNoChecked(!blacklistNoChecked);
                                if (blacklistYesChecked)
                                  setBlacklistYesChecked(false);
                              }}
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid.Row>

                  <Divider></Divider>

                  <Grid.Row>
                    <p>Cap</p>
                    <Grid.Row>
                      <div className="checkbox-filter">
                        <div className="flex-center">
                          <label className="flex-center">
                            <input
                              type="checkbox"
                              name="cap"
                              value="yes"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              checked={capYesChecked}
                              onChange={() => {
                                setCapYesChecked(!capYesChecked);
                                if (capNoChecked) setCapNoChecked(false);
                              }}
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
                              checked={capNoChecked}
                              onChange={() => {
                                setCapNoChecked(!capNoChecked);
                                if (capYesChecked) setCapYesChecked(false);
                              }}
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
                      {/* <p>Industry Class</p> */}
                      <Field
                        name="industryClass"
                        labelName="Industry Class"
                        component={DropdownAdvanceFilter}
                        placeholder="-Choose IndustryClass-"
                        values={industryClass}
                        options={industryClassStoreDropdown}
                        onChanged={onResultSelectIndustryClass}
                        resetSales={resetIndustryClass}
                        onReset={() => setResetIndustryClass(false)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      {industryClassArray.map((values) => {
                        return (
                          <div
                            style={{ marginTop: "0.5rem" }}
                            className="ui label labelBorPad"
                            key={values.industryClassID}
                          >
                            <span>{values.industryClass}</span>
                            <i
                              className="delete icon btnSales"
                              onClick={() =>
                                deleteClickIndustry(values.industryClassID)
                              }
                            ></i>
                          </div>
                        );
                      })}
                    </Grid.Column>
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
