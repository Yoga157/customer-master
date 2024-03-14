import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import "./Filter.scss";
import { Divider, Grid, Form } from "semantic-ui-react";
import { Button } from "views/components/UI";
import { Form as FinalForm } from "react-final-form";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

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
  const dispatch: Dispatch = useDispatch();

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const onSubmitHandler = async () => {
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

    getFilterData({
      pmo_customer: pmo_customer,
      holdshipment: holdshipment,
      blacklist: blacklist,
    });

    dispatch(
      CustomerSettingAct.requestSearchNoNameAcc(
        1,
        10,
        "CustomerID",
        null,
        "ascending",
        pmo_customer,
        holdshipment,
        blacklist
      )
    );
  };

  const resetClick = () => {
    setPmo_customerYesChecked(false);
    setPmo_customerNoChecked(false);
    setHoldshipmentYesChecked(false);
    setHoldshipmentNoChecked(false);
    setBlacklistYesChecked(false);
    setBlacklistNoChecked(false);
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
                              onChange={() =>
                                setHoldshipmentNoChecked(!holdshipmentNoChecked)
                              }
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Divider></Divider>

                  <div>
                    <p>Blacklist Customer</p>
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
                    </div>
                  </div>

                  <Divider></Divider>
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
