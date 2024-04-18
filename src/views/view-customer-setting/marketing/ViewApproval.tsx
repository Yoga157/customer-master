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
import { TextInput } from "views/components/UI";

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

  const onSearch = async (data) => {
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

            <Divider></Divider>

            <LoadingIndicator isActive={isRequesting}>
              {!Array.isArray(customer) && (
                <>
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
                        {customer.customerName}
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
                        Biffco Group
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
                        Manufacturing
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
                        Indonesia
                      </p>
                    </div>

                    <div className="customer-data-container-left">
                      <label className="customer-data-label">City</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        Jakarta
                      </p>
                    </div>

                    <div className="customer-data-container-left">
                      <label className="customer-data-label">ZIP Code</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        12345
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
                        021-789-0985
                      </p>
                    </div>

                    <div className="customer-data-container-left">
                      <label className="customer-data-label">Webiste</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        www.biffco.com
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
                      marketing.biffco@biffco.com
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
                          1145-4452-223
                        </p>
                      </div>

                      <div className="customer-data-container-left">
                        <label className="customer-data-label">NIB</label>
                        <p
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                          className="grey"
                        >
                          9987-8874-887
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
                              "https://images.unsplash.com/photo-1566125882500-87e10f726cdc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                          src="https://images.unsplash.com/photo-1566125882500-87e10f726cdc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ></img>
                      </div>
                    </div>
                  </div>

                  {/* 
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
                  </div> */}

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
                                <Grid.Column
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
                                </Grid.Column>

                                <Grid.Column
                                  width={16}
                                  mobile={16}
                                  tablet={16}
                                  computer={7}
                                >
                                  {" "}
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
                                </Grid.Column>

                                <Grid.Column
                                  width={16}
                                  mobile={16}
                                  tablet={16}
                                  computer={6}
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
                                    disabled={
                                      !values.titleCustomer ||
                                      !values.customerName
                                    }
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
                    <p
                      className="warning-text"
                      style={{ backgroundColor: "#ffe0d9" }}
                    >
                      Best five suggestion customer for the word{" "}
                      <b>{customer.customerName}</b>. Please recheck again
                      before you <b>APPROVE or REJECT</b>.
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
          <BaseViewApprovedData isView={false} />
        )}
      </div>
    </Fragment>
  );
};

export default ViewApproval;
