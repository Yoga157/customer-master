import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
// import "./ViewCustomerSetting.scss";
import { Dispatch } from "redux";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Icon, Button, Table, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import ModalRejectApproval from "./components/modal/approval-page/ModalRejectApproval";
import ModalSuggestionList from "./components/modal/approval-page/ModalSuggestionList";
import { TextInput } from "views/components/UI";

import IStore from "models/IStore";
import * as CustomerMaster from "stores/customer-master/CustomerMasterActivityActions";
import {
  selectNewCustomerDetailPending,
  selectReqCustomerNewAccount,
} from "selectors/customer-master/CustomerMasterSelector";
import { selectRequesting } from "selectors/requesting/RequestingSelector";

interface routeParams {
  id: string;
}

const ViewApproval: React.FC = (props) => {
  const dispatch: Dispatch = useDispatch();
  const { id } = useParams<routeParams>();

  const onSearch = async (data) => {
    console.log(data);

    dispatch(
      CustomerMaster.requestSearchCustomerMaster(
        1,
        5,
        "CustomerID",
        "ascending",
        data.titleCustomer,
        data.customerName,
        data.picName
      )
    );
  };

  const customer = useSelector((state: IStore) =>
    selectNewCustomerDetailPending(state)
  );

  const suggestionList = useSelector((state: IStore) =>
    selectReqCustomerNewAccount(state)
  );

  const getCustomerName = (input: string): string => {
    const delimiter = ",";

    return input.split(delimiter)[0];
  };

  const highlightWords = (input: string): string => {
    const wordsArray = [
      customer.length != 0 && customer?.customerName.toLowerCase(),
      customer.length != 0 && customer?.picName.toLowerCase(),
    ];
    const wordsToHighlight = wordsArray.join(" ");
    const words = input.split(" ");

    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      if (wordsToHighlight.includes(word)) {
        words[i] = `<b>${words[i]}</b>`;
      }
    }

    return words.join(" ");
  };

  const openSuggestionList = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalSuggestionList
          suggestionList={suggestionList}
          customer={customer}
        />,
        ModalSizeEnum.Large
      )
    );
  }, [dispatch]);

  const rejectApproval = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalRejectApproval customer={customer} jenis="reject" />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  const openMatch = useCallback(
    (matchCustomer): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalRejectApproval
            customer={customer}
            matchCustomer={matchCustomer}
            jenis="match"
          />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch]
  );

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerMaster.REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID,
      CustomerMaster.REQUEST_CUSTOMERS_MASTER_SEARCH,
    ])
  );

  useEffect(() => {
    dispatch(CustomerMaster.requestNewCustomerDetailByGenId(Number(id)));
  }, [id]);

  useEffect(() => {
    if (!Array.isArray(customer)) {
      dispatch(
        CustomerMaster.requestSearchCustomerMaster(
          1,
          5,
          "CustomerID",
          "ascending",
          customer.titleCustomer,
          getCustomerName(customer.customerName),
          customer.picName
        )
      );
    }
  }, [customer]);

  return (
    <Fragment>
      <Link to="/customer-setting" className="link">
        {"< Back to Customer Setting List"}
      </Link>

      <div className="form-container">
        <div
          className="space-between-container"
          style={{
            alignItems: "center",
          }}
        >
          <p className="page-title grey">NEW CUSTOMER REQUEST</p>
          {/* <div className="pmo-toggle">
            <div className="business-card">
              <Icon name="address card" />
              <p>View Business Card</p>
            </div>
          </div> */}
        </div>

        <Divider></Divider>

        <LoadingIndicator isActive={isRequesting}>
          {!Array.isArray(customer) && (
            <>
              <div className="padding-horizontal space-between-container">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="customer-data-container-left">
                    <label className="customer-data-label">
                      Title Customer
                    </label>
                    <p
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      className="grey"
                    >
                      {customer.titleCustomer}
                    </p>
                  </div>
                  <div className="customer-data-container-left">
                    <label className="customer-data-label">Customer Name</label>
                    <p
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      className="grey"
                    >
                      {customer.customerName}
                    </p>
                  </div>
                </div>

                <div className="customer-data-container-left">
                  <label className="customer-data-label">
                    Industry Classification
                  </label>
                  <p
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    className="grey"
                  >
                    {customer.industryClass}
                  </p>
                </div>
              </div>

              <div className="padding-horizontal customer-data-container-left">
                <label className="customer-data-label">Customer Address</label>
                <p style={{ fontSize: "20px" }} className="grey">
                  {customer.customerAddress}
                </p>
              </div>

              <div className="padding-horizontal space-between-container">
                <div className="customer-data-container-left">
                  <label className="customer-data-label">Office Number</label>
                  <p
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    className="grey"
                  >
                    {customer.phoneNumber}
                  </p>
                </div>

                <div className="customer-data-container-left">
                  <label className="customer-data-label">Website</label>
                  <p
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    className="grey"
                  >
                    {customer.website}
                  </p>
                </div>

                <div className="customer-data-container-left">
                  <label className="customer-data-label">Social Media</label>
                  <p
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    className="grey"
                  >
                    {customer.socialMedia}
                  </p>
                </div>
              </div>

              <div className="padding-horizontal">
                <div
                  style={{
                    borderRadius: "1rem",
                    backgroundColor: "#E1E1E1",
                    padding: "1rem",
                    margin: "1rem 0",
                  }}
                >
                  <div className="space-between-container">
                    <div className="customer-data-container-left">
                      <label className="customer-data-label">PIC Name</label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.picName}
                      </p>
                    </div>

                    <div className="customer-data-container-left">
                      <label className="customer-data-label">Job Title</label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.picJobTitle}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="customer-data-container-left">
                      <label className="customer-data-label">
                        PIC Mobile Phone
                      </label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.picMobilePhone}
                      </p>
                    </div>
                    <div className="customer-data-container-left">
                      <label className="customer-data-label">Email</label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.picEmailAddr}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Divider></Divider>

              <div className="padding-horizontal title-button-row">
                <p className="grey margin-0 bold text-align-left">
                  SUGGESTION LIST
                </p>

                {/* <Button
              style={{ backgroundColor: "#656DD1", color: "white" }}
              size="small"
              type="button"
              onClick={() => openSuggestionList()}
            >
              <Icon name="search" />
              Search Customer
            </Button> */}
              </div>

              <Divider className="margin-bottom-0"></Divider>

              <div
                className="padding-horizontal"
                style={{
                  backgroundColor: "#FFFB9A",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem 0",
                  width: "100%",
                }}
              >
                <FinalForm
                  onSubmit={(values: any) => onSearch(values)}
                  render={({ handleSubmit, pristine, invalid }) => (
                    <Form onSubmit={handleSubmit}>
                      <div
                        style={{
                          backgroundColor: "#FFFB9A",
                          display: "flex",
                          flexDirection: "column",
                          padding: "1rem 0",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                          }}
                        >
                          <div style={{ marginRight: "1rem", width: "20%" }}>
                            <Field
                              name="titleCustomer"
                              component={TextInput}
                              placeholder="e.g.PT .."
                              labelName="Title Customer"
                              mandatory={false}
                              defaultValue={customer?.titleCustomer}
                            />
                          </div>
                          <div style={{ marginRight: "1rem", width: "40%" }}>
                            <Field
                              name="customerName"
                              component={TextInput}
                              placeholder="e.g. Berca Hardaya .."
                              labelName="Customer Name"
                              mandatory={false}
                              defaultValue={getCustomerName(
                                customer?.customerName
                              )}
                            />
                          </div>
                          <div style={{ width: "40%" }}>
                            <Field
                              name="picName"
                              component={TextInput}
                              placeholder="e.g.Jhon Doe .."
                              labelName="PIC Name"
                              mandatory={false}
                              defaultValue={customer?.picName}
                            />
                          </div>
                        </div>

                        <div
                          style={{ alignSelf: "flex-end", marginTop: "1rem" }}
                        >
                          <Button
                            type="submit"
                            color="blue"
                            disabled={false}
                            floated="right"
                            size="small"
                            content="Search"
                          />
                        </div>
                      </div>
                    </Form>
                  )}
                />
              </div>

              <div className="padding-horizontal" style={{ margin: "14px 0" }}>
                <p
                  className="warning-text"
                  style={{ backgroundColor: "#ffe0d9" }}
                >
                  Best five suggestion customer for the word{" "}
                  <b>{customer.customerName}</b>. Please recheck again before
                  you <b>APPROVE or REJECT</b>.
                </p>

                <Table striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>Customer Name</Table.HeaderCell>
                      <Table.HeaderCell>PIC Name</Table.HeaderCell>
                      <Table.HeaderCell>Cust. ID</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Action
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {suggestionList.rows.length == 0 ? (
                      <Table.Row>
                        <Table.Cell colSpan={16} textAlign="center">
                          No data
                        </Table.Cell>
                      </Table.Row>
                    ) : (
                      suggestionList.rows.map((data, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>{index + 1}</Table.Cell>
                          <Table.Cell>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: highlightWords(data.customerName),
                              }}
                            ></p>
                          </Table.Cell>
                          <Table.Cell>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: highlightWords(data.picName),
                              }}
                            ></p>
                          </Table.Cell>
                          <Table.Cell>{data.customerID}</Table.Cell>
                          <Table.Cell
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              className="match-button"
                              onClick={() => openMatch(data)}
                            >
                              <Icon name="check" />
                              <p>Match</p>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Body>
                </Table>
              </div>
              <Divider style={{ marginBottom: "0px" }}></Divider>

              <div className="button-container">
                <div className="button-inner-container">
                  <Button style={{ marginRight: "1rem" }} type="button">
                    Close
                  </Button>
                  <Button
                    color="blue"
                    style={{ marginRight: "1rem" }}
                    type="button"
                  >
                    Approve
                  </Button>
                  <Button color="yellow" onClick={() => rejectApproval()}>
                    Reject
                  </Button>
                </div>
              </div>
            </>
          )}
        </LoadingIndicator>
      </div>
    </Fragment>
  );
};

export default ViewApproval;
