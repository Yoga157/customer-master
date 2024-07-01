import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import "./Filter.scss";
import { Divider, Grid, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";
import * as IndustryClass from "stores/industry-class/IndustryClassActions";
import { Button, DropdownAdvanceFilter } from "views/components/UI";
import { selectIndustryDropdown } from "selectors/select-options/IndustryClassSelector";

interface IProps {
  rowData: any;
  getRowData: (data: any) => void;
  getFilterData: (data: any) => void;
}

const FilterCustomer: React.FC<{
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  openFilter: boolean;
} & IProps> = ({
  setOpenFilter,
  openFilter,
  rowData,
  getRowData,
  getFilterData,
}) => {
  const [pmo_customerYesChecked, setPmo_customerYesChecked] = useState(false);
  const [pmo_customerNoChecked, setPmo_customerNoChecked] = useState(false);
  const [holdshipmentYesChecked, setHoldshipmentYesChecked] = useState(false);
  const [holdshipmentNoChecked, setHoldshipmentNoChecked] = useState(false);
  const [blacklistYesChecked, setBlacklistYesChecked] = useState(false);
  const [blacklistNoChecked, setBlacklistNoChecked] = useState(false);
  const [capNoChecked, setCapNoChecked] = useState(false);
  const [capYesChecked, setCapYesChecked] = useState(false);

  const [industryClass, setIndustryClass] = useState("");
  const [industryClassArray, setIndustryClassArray] = useState([]);
  const [industryClassFilter, setIndustryClassFilter] = useState([]);
  const [resetIndustryClass, setResetIndustryClass] = useState(false);
  const [resetSales, setResetSales] = useState(false);
  const dispatch: Dispatch = useDispatch();

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

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
    const newIndustryClass =
      industryClassFilter.length == 0 ? null : industryClassFilter.join(",");

    const pmo_customer =
      pmo_customerYesChecked && pmo_customerNoChecked
        ? null
        : pmo_customerYesChecked
        ? true
        : pmo_customerNoChecked
        ? false
        : null;

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

    const cap =
      capYesChecked && capNoChecked
        ? null
        : capYesChecked
        ? true
        : capNoChecked
        ? false
        : null;

    getFilterData({
      newIndustryClass: newIndustryClass,
      pmo_customer: pmo_customer,
      holdshipment: holdshipment,
      blacklist: blacklist,
      cap: cap,
    });

    dispatch(
      CustomerSettingAct.requestSearchNoNameAcc(
        1,
        10,
        "CustomerID",
        null,
        "ascending",
        newIndustryClass,
        pmo_customer,
        holdshipment,
        blacklist,
        cap
      )
    );
  };

  const industryClassStoreDropdown = useSelector((state: IStore) =>
    selectIndustryDropdown(state)
  );

  useEffect(() => {
    dispatch(IndustryClass.requestIndustryDropdown());
  }, [dispatch]);

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
    setPmo_customerYesChecked(false);
    setPmo_customerNoChecked(false);
    setHoldshipmentYesChecked(false);
    setHoldshipmentNoChecked(false);
    setBlacklistYesChecked(false);
    setBlacklistNoChecked(false);
    setCapYesChecked(false);
    setCapNoChecked(false);
    setResetSales(true);
    setIndustryClass("");
    setIndustryClassArray([]);
    setIndustryClassFilter([]);
    setResetIndustryClass(true);
    getRowData([]);

    dispatch(
      CustomerSettingAct.requestNoNameAcc(1, 10, "CustomerID", "ascending")
    );
  };

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
          <Form onSubmit={handleSubmit} style={{ height: "100%" }}>
            <div className="container-filter ">
              <Grid columns="equal" widht={8}>
                <Grid.Column width={8} verticalAlign="middle">
                  <h4>ADVANCE FILTER</h4>
                </Grid.Column>

                <Grid.Column width={8}>
                  <Button
                    className="m-05r"
                    icon="close"
                    style={{ backgroundColor: "transparent", color: "black" }}
                    floated="right"
                    size="tiny"
                    onClick={() => setOpenFilter(!openFilter)}
                  />
                </Grid.Column>
              </Grid>

              <Divider></Divider>
              <LoadingIndicator isActive={isRequesting}>
                <div>
                  <div>
                    <p>PMO Customer</p>
                    <div>
                      <div className="checkbox-filter">
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
                    </div>
                  </div>

                  <Divider></Divider>

                  <div>
                    <p>Holdshipment Customer</p>
                    <div>
                      <div className="checkbox-filter">
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
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
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
                    </div>
                  </div>
                  <Divider></Divider>

                  <div>
                    <p>BlackList</p>
                    <div>
                      <div className="checkbox-filter">
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
                    </div>
                  </div>
                  <Divider></Divider>

                  <div>
                    <p>Cap</p>
                    <div>
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
                    </div>
                  </div>
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

                <div className="cointainer-filter-btn">
                  <div>
                    <Button type="submit" className="btn-apply-filter">
                      Apply Filter
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="button"
                      onClick={() => resetClick()}
                      className="btn-reset-filter"
                    >
                      <p>Reset Filter</p>
                    </Button>
                  </div>
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
