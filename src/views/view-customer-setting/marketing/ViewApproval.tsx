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
import { Divider, Icon, Button, Table, Form, Grid } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import ModalRejectApproval from "./components/modal/approval-page/ModalRejectApproval";
import ModalSuggestionList from "./components/modal/approval-page/ModalSuggestionList";
import { TextInput, Pagination } from "views/components/UI";

import IStore from "models/IStore";
import * as CustomerMaster from "stores/customer-master/CustomerMasterActivityActions";
import {
  selectNewCustomerDetailPending,
  selectReqCustomerNewAccount,
} from "selectors/customer-master/CustomerMasterSelector";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { ApprovePopUp } from "./components/modal/approve";
import BaseViewApprovedData from "./components/view/BaseViewApprovedData";
import ModalViewNpwp from "./components/modal/view-npwp/ModalViewNpwp";

interface routeParams {
  id: string;
}

const ViewApproval: React.FC = (props) => {
  const dispatch: Dispatch = useDispatch();
  const { id } = useParams<routeParams>();

  const customer = useSelector((state: IStore) =>
    selectNewCustomerDetailPending(state)
  );

  // search keyword
  const [customerName, setCustomerName] = useState(null);
  const [picName, setPicName] = useState(null);

  const onSearch = async (data) => {
    setCustomerName(data.customerName);
    setPicName(data.picName);
    dispatch(CustomerMaster.setActivePage(1));

    dispatch(
      CustomerMaster.requestSearchCustomerMaster(
        1,
        10,
        "CustomerID",
        "ascending",
        data.customerName,
        data.picName
      )
    );
  };

  // pagination
  const activePage = useSelector(
    (state: IStore) => state.customerMaster.activePage
  );
  const [pageSize, setPage] = useState(10);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(CustomerMaster.setActivePage(data.activePage));

    dispatch(
      CustomerMaster.requestSearchCustomerMaster(
        data.activePage,
        pageSize,
        "CustomerID",
        "ascending",
        customerName,
        picName
      )
    );
  };

  const suggestionList = useSelector((state: IStore) =>
    selectReqCustomerNewAccount(state)
  );

  const getCustomerName = (input: string): string => {
    const delimiter = ",";

    return input.split(delimiter)[0];
  };

  const highlightWords = (input: string): string => {
    const wordsArray = [];

    if (customer.length != 0 && customer?.customerName) {
      wordsArray.push(customer?.customerName.toLowerCase());
    }

    if (customer.length != 0 && customer?.picName) {
      wordsArray.push(customer?.picName.toLowerCase());
    }

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

  const openViewNPWP = useCallback(
    (src: string): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalViewNpwp imageSrc={src} />,
          ModalSizeEnum.Mini
        )
      );
    },
    [dispatch]
  );

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
        <ModalRejectApproval
          customer={customer}
          customerGenId={id}
          jenis="reject"
        />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, customer]);

  const openMatch = useCallback(
    (matchCustomer): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalRejectApproval
            customer={customer}
            customerGenId={id}
            matchCustomer={matchCustomer}
            jenis="match"
          />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch, customer]
  );

  const [isApprove, setIsApprove] = useState(false);

  const onApprove = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ApprovePopUp customerGenID={id} setIsApprove={setIsApprove} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, customer]);

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
        {!isApprove ? (
          <>
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

            <Divider style={{ marginTop: 0 }}></Divider>

            <LoadingIndicator isActive={isRequesting}>
              {!Array.isArray(customer) && (
                <>
                  <div className="padding-horizontal space-between-container">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div className="customer-data-container-left">
                        <label className="customer-data-label">
                          Customer ID
                        </label>
                        <p
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                          className="grey"
                        >
                          {customer.customerID}
                        </p>
                      </div>

                      <div className="customer-data-container-left">
                        <label className="customer-data-label">Requestor</label>
                        <p
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                          className="grey"
                        >
                          {customer.requestor}
                        </p>
                      </div>
                    </div>

                    <div className="customer-data-container-left">
                      <label className="customer-data-label">Create Date</label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.createDate}
                      </p>
                    </div>
                  </div>

                  <div className="padding-horizontal space-between-container">
                    <div className="customer-data-container-left">
                      <label className="customer-data-label">
                        Customer Name
                      </label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.customerName}
                      </p>
                    </div>
                    <div className="customer-data-container-left">
                      <label className="customer-data-label">
                        Customer Business Name
                      </label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.customerBusinessName}
                      </p>
                    </div>
                  </div>

                  <div
                    className="padding-horizontal"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <div className="customer-data-container-left">
                      <label className="customer-data-label">
                        Holding Company Name
                      </label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.holdingCompName}
                      </p>
                    </div>
                    <div
                      className="customer-data-container-left"
                      style={{ marginLeft: "2rem" }}
                    >
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
                    <label className="customer-data-label">
                      Customer Address
                    </label>
                    <p
                      style={{ fontSize: "20px" }}
                      className="grey"
                      dangerouslySetInnerHTML={{
                        __html: customer.customerAddress,
                      }}
                    ></p>
                  </div>

                  <div className="padding-horizontal space-between-container">
                    <div className="customer-data-container-left">
                      <label className="customer-data-label">Country</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.country}
                      </p>
                    </div>

                    <div className="customer-data-container-left">
                      <label className="customer-data-label">City</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.city}
                      </p>
                    </div>

                    <div className="customer-data-container-left">
                      <label className="customer-data-label">ZIP Code</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.zipCode}
                      </p>
                    </div>

                    <div className="customer-data-container-left">
                      <label className="customer-data-label">
                        Office Number
                      </label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.phoneNumber}
                      </p>
                    </div>

                    <div className="customer-data-container-left">
                      <label className="customer-data-label">Website</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.website}
                      </p>
                    </div>
                  </div>

                  <div className="padding-horizontal customer-data-container-left">
                    <label className="customer-data-label">
                      Coorporate Email
                    </label>
                    <p
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      className="grey"
                    >
                      {customer.coorporateEmail}
                    </p>
                  </div>

                  <div
                    className="padding-horizontal"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div className="customer-data-container-left">
                        <label className="customer-data-label">
                          NPWP (Tax ID Number)
                        </label>
                        <p
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                          className="grey"
                        >
                          {customer.npwpNumber}
                        </p>
                      </div>

                      <div className="customer-data-container-left">
                        <label className="customer-data-label">NIB</label>
                        <p
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                          className="grey"
                        >
                          {customer.nib}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label className="customer-data-label">NPWP Card</label>
                      <div
                        style={{
                          width: "15rem",
                          height: "10rem",
                          border: "#8D8C8C solid 2px",
                          borderStyle: "dashed",
                          borderRadius: "0.5rem",
                          position: "relative",
                        }}
                      >
                        {Object.keys(customer).length != 0 &&
                        Object.keys(customer.npwpCard).length == 0 ? (
                          <div
                            style={{
                              position: "absolute",
                              color: "#55637A",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              zIndex: 1,
                            }}
                          >
                            <Icon
                              name="picture"
                              style={{ fontSize: "3rem" }}
                            ></Icon>
                            <p style={{ margin: "auto" }}>No Data</p>
                          </div>
                        ) : (
                          <>
                            <div
                              style={{
                                position: "absolute",
                                backgroundColor: "#656DD1",
                                color: "white",
                                padding: "0.5rem 1.5rem",
                                borderRadius: "2rem",
                                boxShadow: "0px 0px 10px 0px #00000040",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 1,
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                openViewNPWP(
                                  Object.keys(customer).length != 0 &&
                                    `data:${customer.npwpCard?.extension};base64,${customer.npwpCard?.imageFile}`
                                )
                              }
                            >
                              View
                            </div>
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "blur(3px)",
                                borderRadius: "0.5rem",
                              }}
                              src={
                                Object.keys(customer).length != 0 &&
                                `data:${customer.npwpCard?.extension};base64,${customer.npwpCard?.imageFile}`
                              }
                            ></img>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="padding-horizontal">
                    <p className="grey margin-0 bold text-align-left">
                      PIC Details
                    </p>
                  </div>

                  <div className="padding-horizontal">
                    <div
                      style={{
                        borderRadius: "1rem",
                        backgroundColor: "#E1E1E1",
                        padding: "1rem",
                        margin: "1rem 0",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginRight: "4rem",
                        }}
                      >
                        <div className="customer-data-container-left">
                          <label className="customer-data-label">
                            PIC Name
                          </label>
                          <p
                            style={{ fontSize: "20px", fontWeight: "bold" }}
                            className="grey"
                          >
                            {customer.picName}
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

                      <div style={{ display: "flex", flexDirection: "column" }}>
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
                          <label className="customer-data-label">
                            Job Title
                          </label>
                          <p
                            style={{ fontSize: "20px", fontWeight: "bold" }}
                            className="grey"
                          >
                            {customer.picJobTitle}
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
                      render={({ handleSubmit, pristine, invalid, values }) => (
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
                            <Grid>
                              <Grid.Row>
                                {/* <Grid.Column
                                  width={16}
                                  mobile={16}
                                  tablet={16}
                                  computer={3}
                                >
                                  <Field
                                    name="titleCustomer"
                                    component={TextInput}
                                    placeholder="e.g.PT .."
                                    labelName="Title Customer"
                                    mandatory={false}
                                    defaultValue={customer?.titleCustomer}
                                  />
                                </Grid.Column> */}

                                <Grid.Column
                                  width={16}
                                  mobile={16}
                                  tablet={16}
                                  computer={8}
                                >
                                  {" "}
                                  <Field
                                    name="customerName"
                                    component={TextInput}
                                    placeholder="e.g. Berca Hardaya .."
                                    labelName="Customer Name"
                                    mandatory={false}
                                    defaultValue={customer?.customerName}
                                  />
                                </Grid.Column>

                                <Grid.Column
                                  width={16}
                                  mobile={16}
                                  tablet={16}
                                  computer={8}
                                >
                                  <Field
                                    name="picName"
                                    component={TextInput}
                                    placeholder="e.g.Jhon Doe .."
                                    labelName="PIC Name"
                                    mandatory={false}
                                    defaultValue={customer?.picName}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                              <Grid.Row columns="equal">
                                <Grid.Column
                                  width={16}
                                  mobile={16}
                                  tablet={16}
                                  computer={16}
                                >
                                  <Button
                                    type="submit"
                                    color="blue"
                                    disabled={!values.customerName}
                                    floated="right"
                                    size="small"
                                    content="Search"
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </div>
                        </Form>
                      )}
                    />
                  </div>

                  <div
                    className="padding-horizontal"
                    style={{ margin: "14px 0" }}
                  >
                    <div>
                      <p
                        className="warning-text"
                        style={{
                          backgroundColor: customerName ? "#E2EFFF" : "#FFE0D9",
                        }}
                      >
                        {customerName ? (
                          <>
                            There are <b>{suggestionList.rows.length}</b>{" "}
                            results from the customer search{" "}
                            <b>{customerName}</b>{" "}
                            {picName ? (
                              <>
                                with <b>{picName}</b>.
                              </>
                            ) : (
                              "."
                            )}{" "}
                            Please recheck again before you approve new customer
                            request.
                          </>
                        ) : (
                          <>
                            Best five suggestion customer for the word{" "}
                            <b>{customer.customerName}</b>. Please recheck again
                            before you APPROVE or REJECT.
                          </>
                        )}
                      </p>
                    </div>

                    <Table striped>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>No</Table.HeaderCell>
                          <Table.HeaderCell>Customer Name</Table.HeaderCell>
                          <Table.HeaderCell>Cust. ID</Table.HeaderCell>
                          <Table.HeaderCell>PIC Name</Table.HeaderCell>
                          <Table.HeaderCell>Blacklist</Table.HeaderCell>
                          <Table.HeaderCell>Holdshipment</Table.HeaderCell>
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
                              <Table.Cell>
                                {(activePage - 1) * pageSize + index + 1}
                              </Table.Cell>
                              <Table.Cell>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: highlightWords(data.customerName),
                                  }}
                                ></p>
                              </Table.Cell>
                              <Table.Cell>{data.customerID}</Table.Cell>
                              <Table.Cell>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: highlightWords(data.picName),
                                  }}
                                ></p>
                              </Table.Cell>
                              <Table.Cell textAlign="center">
                                {data.blacklist === true ? (
                                  <div className="blacklist-yes-table">
                                    <Icon name="address book" size="small" />
                                    <span>Yes</span>
                                  </div>
                                ) : (
                                  <div className="blacklist-no-table">
                                    <Icon name="address book" size="small" />
                                    <span>No</span>
                                  </div>
                                )}
                              </Table.Cell>
                              <Table.Cell
                                textAlign="center"
                                verticalAlign="middle"
                              >
                                {data.holdshipment === true ? (
                                  <div className="holdshipment-yes-table">
                                    <Icon name="truck" size="small" />
                                    <span>Yes</span>
                                  </div>
                                ) : (
                                  <div className="holdshipment-no-table">
                                    <Icon name="truck" size="small" />
                                    <span>No</span>
                                  </div>
                                )}
                              </Table.Cell>
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

                    {customerName && suggestionList.totalRows != 0 && (
                      <div style={{ marginTop: "1rem" }}>
                        <Pagination
                          activePage={activePage}
                          onPageChange={(e, data) =>
                            handlePaginationChange(e, data)
                          }
                          totalPage={suggestionList.totalRows}
                          pageSize={pageSize}
                        />
                      </div>
                    )}
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
                        onClick={() => onApprove()}
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
          </>
        ) : (
          <BaseViewApprovedData isView={false} status="APPROVE" />
        )}
      </div>
    </Fragment>
  );
};

export default ViewApproval;
