import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import "../../ModalApprovedData.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Icon,
  Divider,
  Form,
  Button,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, TextInput } from "views/components/UI";
import TableCustomerDetail from "../table/TableCustomerDetail";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ModalNewCustomerAddress from "../modal/approved-page/ModalNewCustomerAddress";
import ModalNewWebsiteMedia from "../modal/approved-page/ModalNewWebsiteMedia";
import ModalNewPIC from "../modal/approved-page/ModalNewPIC";
import ModalNewRelatedCustomer from "../modal/approved-page/ModalNewRelatedCustomer";
import IStore from "models/IStore";
import ToastStatusEnum from "constants/ToastStatusEnum";
import * as ToastsAction from "stores/toasts/ToastsAction";
import CustomerMoreDetailsModel from "stores/customer-master/models/CustomerMoreDetailsModel";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import * as RelatedCustomerActions from "stores/related-customer/RelatedCustomerActivityActions";

import {
  selectAddressOfficeOptions,
  selectCustomerMoreDetails,
  selectAccountHistory,
} from "selectors/customer-master/CustomerMasterSelector";

import { selectRequesting } from "selectors/requesting/RequestingSelector";
import ModalViewNpwp from "../modal/view-npwp/ModalViewNpwp";
import { selectIndustry } from "selectors/customer-master/CustomerMasterSelector";
import * as IndustryClassOptionsAction from "stores/customer-master/CustomerMasterActivityActions";

interface IProps {
  isView?: boolean;
  customerId?: any;
  status?: string;
  // customer: ICustomer;
}

interface routeParams {
  id: any;
}

const BaseViewApprovedData: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { isView, customerId, status } = props;
  const { id } = useParams<routeParams>();

  const customer = useSelector((state: IStore) =>
    selectCustomerMoreDetails(state)
  );

  useEffect(() => {
    if (status == "NOT_NEW") {
      dispatch(
        CustomerMasterActions.requestCustomerMoreDetailsByCustId(
          customerId ? customerId : Number(id)
        )
      );
    } else {
      dispatch(
        CustomerMasterActions.requestApprovedCustomerByGenId(Number(id))
      );
    }
  }, [status, id]);

  // edit view
  const [editView, setEditView] = useState(false);

  // industry classification
  const onSubmitIndustryClassification = async (e) => {};
  const [industryClassification, setIndustryClassification] = useState(
    customer.industryClass
  );
  const onChangeIndustryClassification = (data: any) => {
    setIndustryClassification(data);
  };

  const industryClassificationOptions = useSelector((state: IStore) =>
    selectIndustry(state)
  );

  // const onSaveEdit = async (values) => {
  //   let userLogin = JSON.parse(localStorage.getItem("userLogin"));

  //   const PutCustomerMoreDetails = new CustomerMoreDetailsModel({});
  //   PutCustomerMoreDetails.industryClass = customer.industryClassification;
  //   PutCustomerMoreDetails.customerName = customer.customerName;
  //   PutCustomerMoreDetails.coorporateEmail = customer.coorporateEmail;
  //   PutCustomerMoreDetails.npwpNumber = customer.npwpNumber;
  //   PutCustomerMoreDetails.nib = customer.nib;
  //   PutCustomerMoreDetails.modifyUserID = userLogin.employeeID;

  //   await dispatch(
  //     CustomerMasterActions.updateIndustryClassByID(
  //       PutCustomerMoreDetails,
  //       Number(id) || customer.customerId
  //     )
  //   );
  //   await dispatch(
  //     CustomerMasterActions.requestCustomerMoreDetailsByCustId(
  //       customerId ? customerId : Number(id)
  //     )
  //   );
  //   await dispatch(
  //     CustomerMasterActions.requestApprovedCustomerByGenId(Number(id))
  //   );
  //   await dispatch(
  //     ToastsAction.add(
  //       "Update customer detail data success!",
  //       ToastStatusEnum.Success
  //     )
  //   );
  // };

  const onSaveEdit = async (values) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));

    const PutCustomerMoreDetails = new CustomerMoreDetailsModel({});
    PutCustomerMoreDetails.industryClass = values.industryClassification;
    PutCustomerMoreDetails.customerName = values.customerName;
    PutCustomerMoreDetails.coorporateEmail = values.coorporateEmail;
    PutCustomerMoreDetails.npwpNumber = values.npwpNumber;
    PutCustomerMoreDetails.nib = values.nib;
    PutCustomerMoreDetails.modifyUserID = userLogin.employeeID;

    const customerIdToUse = customerId || Number(id);

    await dispatch(
      CustomerMasterActions.updateIndustryClassByID(
        PutCustomerMoreDetails,
        customerIdToUse
      )
    );
    await dispatch(
      ToastsAction.add(
        "Update customer detail data success!",
        ToastStatusEnum.Success
      )
    );
    await dispatch(
      CustomerMasterActions.requestCustomerMoreDetailsByCustId(customerIdToUse)
    );
    await dispatch(
      CustomerMasterActions.requestApprovedCustomerByGenId(Number(id))
    );
    setEditView(false);
  };

  useEffect(() => {
    dispatch(IndustryClassOptionsAction.getIndustryClassification());
  }, []);

  // npwp
  const openViewNPWP = useCallback(
    (src: string): void => {
      if (isView) {
        dispatch(
          ModalSecondLevelActions.OPEN(
            <ModalViewNpwp imageSrc={src} isView={isView} />,
            ModalSizeEnum.Mini
          )
        );
      } else {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModalViewNpwp imageSrc={src} />,
            ModalSizeEnum.Mini
          )
        );
      }
    },
    [dispatch]
  );

  // state tabel
  const [openAddressOffice, setOpenAddressOffice] = useState(false);
  const [openWebsiteMedia, setOpenWebsiteMedia] = useState(false);
  const [openPic, setOpenPic] = useState(false);
  const [openRelatedAcc, setOpenRelatedAcc] = useState(false);

  // add new customer address
  const openNewAddress = useCallback((): void => {
    if (isView) {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <ModalNewCustomerAddress
            isView={isView}
            customerId={
              status == "NOT_NEW"
                ? customerId
                  ? customerId
                  : Number(id)
                : null
            }
            customerGenId={status != "NOT_NEW" ? Number(id) : null}
          ></ModalNewCustomerAddress>,
          ModalSizeEnum.Small
        )
      );
    } else {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalNewCustomerAddress
            customerId={
              status == "NOT_NEW"
                ? customerId
                  ? customerId
                  : Number(id)
                : null
            }
            customerGenId={status != "NOT_NEW" ? Number(id) : null}
          ></ModalNewCustomerAddress>,
          ModalSizeEnum.Small
        )
      );
    }
  }, [dispatch]);

  // add website or social media
  const openNewWebsiteSocial = useCallback((): void => {
    if (isView) {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <ModalNewWebsiteMedia isView={isView}></ModalNewWebsiteMedia>,
          ModalSizeEnum.Small
        )
      );
    } else {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalNewWebsiteMedia></ModalNewWebsiteMedia>,
          ModalSizeEnum.Small
        )
      );
    }
  }, [dispatch]);

  // add pic
  const openNewPIC = useCallback((): void => {
    if (isView) {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <ModalNewPIC
            isView={isView}
            customerId={
              status == "NOT_NEW"
                ? customerId
                  ? customerId
                  : Number(id)
                : null
            }
            customerGenId={status != "NOT_NEW" ? Number(id) : null}
            customerCAPFlag={customer.capFlag}
          ></ModalNewPIC>,
          ModalSizeEnum.Small
        )
      );
    } else {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalNewPIC
            customerId={
              status == "NOT_NEW"
                ? customerId
                  ? customerId
                  : Number(id)
                : null
            }
            customerGenId={status != "NOT_NEW" ? Number(id) : null}
            customerCAPFlag={false}
          ></ModalNewPIC>,
          ModalSizeEnum.Small
        )
      );
    }
  }, [dispatch]);

  // add related customer
  const openNewRelatedCust = useCallback((): void => {
    if (isView) {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <ModalNewRelatedCustomer
            isView={isView}
            customerId={
              status == "NOT_NEW"
                ? customerId
                  ? customerId
                  : Number(id)
                : null
            }
            customerGenId={status != "NOT_NEW" ? Number(id) : null}
          ></ModalNewRelatedCustomer>,
          ModalSizeEnum.Small
        )
      );
    } else {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalNewRelatedCustomer
            customerId={
              status == "NOT_NEW"
                ? customerId
                  ? customerId
                  : Number(id)
                : null
            }
            customerGenId={status != "NOT_NEW" ? Number(id) : null}
          ></ModalNewRelatedCustomer>,
          ModalSizeEnum.Small
        )
      );
    }
  }, [dispatch]);

  let addressOfficeHeader = [
    {
      key: "type",
      header: "Type",
    },
    {
      key: "address",
      header: "Address",
    },
    {
      key: "country",
      header: "Country",
    },
    {
      key: "city",
      header: "City",
    },
    {
      key: "zipCode",
      header: "ZIP Code",
    },
    {
      key: "officeNumber",
      header: "Office Number",
    },
  ];

  let websiteMediaHeader = [
    {
      key: "type",
      header: "Type",
    },
    {
      key: "name",
      header: "Name",
    },
  ];

  let picHeader = [
    {
      key: "pin",
      header: "Pin",
    },
    {
      key: "cap",
      header: "CAP",
    },
    {
      key: "name",
      header: "Name",
    },
    {
      key: "jobTitle",
      header: "Job Title",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "address",
      header: "Address",
    },
    {
      key: "phoneNumber",
      header: "Phone Number",
    },
  ];

  let relatedAccountHeader = [
    {
      key: "customerID",
      header: "Customer ID",
    },
    {
      key: "accountName",
      header: "Account Name",
    },
  ];

  const accountActivityHistory = useSelector((state: IStore) =>
    selectAccountHistory(state)
  );

  useEffect(() => {
    if (status === "NOT_NEW") {
      dispatch(
        CustomerMasterActions.requestAccountHistoryByCustId(
          customerId ? customerId : Number(id)
        )
      );
    } else {
      dispatch(CustomerMasterActions.requestAccountHistoryByGenId(Number(id)));
    }
  }, [status, id]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerMasterActions.REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID,
      CustomerMasterActions.REQUEST_CUSTOMER_MORE_DETAILS_BY_CUST_ID,
      CustomerMasterActions.REQUEST_APPROVED_DATA_DETAIL_BY_GEN_ID,
      CustomerMasterActions.REQUEST_ACCOUNT_HISTORY_BY_CUST_ID,
      CustomerMasterActions.REQUEST_ACCOUNT_HISTORY_BY_GEN_ID,
    ])
  );

  return (
    <Fragment>
      <p
        className={`page-title grey ${isView && "page-title-isview"}`}
        style={{
          backgroundColor:
            (status == "REJECT" && "#FFE0D9") ||
            (status == "APPROVE" && "#ECF9C6"),
          borderRadius: "1rem 1rem 0 0",
        }}
      >
        CUSTOMER DETAILS{" "}
        {(status == "REJECT" && `- REJECTED`) ||
          (status == "APPROVE" && `-   APPROVED`)}
      </p>

      <Divider className="margin-0"></Divider>

      <LoadingIndicator isActive={isRequesting}>
        <div
          style={{
            backgroundColor: "#FFFB9A",
            padding: "14px 0px",
          }}
        >
          <FinalForm
            onSubmit={(values: any) => onSaveEdit(values)}
            render={({ handleSubmit, pristine, invalid, values }) => (
              <Form onSubmit={handleSubmit}>
                <Grid>
                  <Grid.Row>
                    <GridColumn>
                      {status != "REJECT" && (
                        <div
                          style={{
                            float: "right",
                            margin: "0rem 2rem -1rem",
                          }}
                          onClick={() => setEditView(!editView)}
                        >
                          {!editView ? (
                            <Icon name="edit" />
                          ) : (
                            <Icon
                              name="save"
                              fitted
                              circular
                              className="save-button-approved-page"
                              onClick={handleSubmit}
                            />
                          )}
                        </div>
                      )}
                    </GridColumn>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3} className="grid-padding-horizontal">
                      <label className="customer-data-label">Customer ID</label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.customerID}
                      </p>
                    </Grid.Column>
                    <Grid.Column width={5} style={{ padding: "0" }}>
                      <label className="customer-data-label">Requestor</label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.requestor}
                      </p>
                    </Grid.Column>
                    <Grid.Column
                      width={4}
                      floated="right"
                      style={{ padding: "0" }}
                    >
                      <label className="customer-data-label">Create Date</label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.createDate}
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={5} className="grid-padding-horizontal">
                      {editView ? (
                        <Form onSubmit={handleSubmit}>
                          <div style={{ width: "100%" }}>
                            <Field
                              name="customerName"
                              component={TextInput}
                              placeholder="Type customer name here..."
                              labelName="Customer Name"
                              mandatory={false}
                              defaultValue={customer.customerName || null}
                            />
                          </div>
                        </Form>
                      ) : (
                        <>
                          <label className="customer-data-label">
                            Customer Name
                          </label>
                          <p
                            style={{ fontSize: "20px", fontWeight: "bold" }}
                            className="grey"
                          >
                            {customer.customerName}
                          </p>
                        </>
                      )}
                    </Grid.Column>{" "}
                    <Grid.Column floated="right" width={6}>
                      <label className="customer-data-label">
                        Customer Business Name
                      </label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.customerBusinessName}
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column
                      width={5}
                      className="grid-padding-horizontal"
                      style={{ marginRight: "10rem" }}
                    >
                      <label className="customer-data-label">
                        Holding Company Name
                      </label>
                      <p
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.holdingCompName}
                      </p>
                    </Grid.Column>{" "}
                    <Grid.Column width={4} style={{ padding: "0" }}>
                      {editView ? (
                        <Form onSubmit={handleSubmit}>
                          <Field
                            name="industryClassification"
                            component={DropdownClearInput}
                            labelName="Industry Classification"
                            placeholder="Choose class..."
                            options={industryClassificationOptions}
                            onChanged={onChangeIndustryClassification}
                            values={industryClassification}
                            mandatory={false}
                          />
                        </Form>
                      ) : (
                        <>
                          <label className="customer-data-label">
                            Industry Classification
                          </label>
                          <p
                            style={{ fontSize: "20px", fontWeight: "bold" }}
                            className="grey"
                          >
                            {customer.industryClass}
                          </p>
                        </>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column className="grid-padding-horizontal">
                      <label className="customer-data-label">
                        Customer Address
                      </label>
                      <p
                        style={{ fontSize: "20px" }}
                        className="grey"
                        dangerouslySetInnerHTML={{
                          __html: customer.address || "-",
                        }}
                      ></p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column
                      className="grid-padding-horizontal custom-paddingRight"
                      width={2}
                    >
                      <label className="customer-data-label">Country</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.country}
                      </p>
                    </Grid.Column>
                    <Grid.Column
                      width={2}
                      className="custom-paddingRight"
                      style={{ padding: "0" }}
                    >
                      <label className="customer-data-label ">City</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.city}
                      </p>
                    </Grid.Column>
                    <Grid.Column
                      width={2}
                      className="custom-paddingRight"
                      style={{ padding: "0" }}
                    >
                      <label className="customer-data-label">ZIP Code</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.zipCode}
                      </p>
                    </Grid.Column>
                    <Grid.Column
                      width={2}
                      className="custom-paddingRight"
                      style={{ padding: "0" }}
                    >
                      <label className="customer-data-label">
                        Office Number
                      </label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.phoneNumber}
                      </p>
                    </Grid.Column>
                    <Grid.Column width={4} style={{ padding: "0" }}>
                      <label className="customer-data-label">Website</label>
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="grey"
                      >
                        {customer.website}
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column className="grid-padding-horizontal">
                      {editView ? (
                        <Form onSubmit={handleSubmit}>
                          <div style={{ width: "35%" }}>
                            <Field
                              name="corporateEmail"
                              component={TextInput}
                              placeholder="Type corporate email here..."
                              labelName="Corporate Email"
                              mandatory={false}
                              defaultValue={customer.coorporateEmail}
                            />
                          </div>
                        </Form>
                      ) : (
                        <>
                          <label className="customer-data-label">
                            Corporate Email
                          </label>
                          <p
                            style={{ fontSize: "20px", fontWeight: "bold" }}
                            className="grey"
                          >
                            {customer.coorporateEmail}
                          </p>
                        </>
                      )}
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns={2}>
                    <Grid.Column width={5}>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column
                            width={12}
                            className="grid-padding-horizontal"
                          >
                            {editView ? (
                              <Form onSubmit={handleSubmit}>
                                <div style={{ width: "30" }}>
                                  <Field
                                    name="taxIDNumber"
                                    component={TextInput}
                                    placeholder="Type tax ID number here..."
                                    labelName="NPWP (Tax ID Number)"
                                    mandatory={false}
                                    defaultValue={customer.npwpNumber}
                                  />
                                </div>
                              </Form>
                            ) : (
                              <>
                                <label className="customer-data-label">
                                  NPWP (Tax ID Number)
                                </label>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                  }}
                                  className="grey"
                                >
                                  {customer.npwpNumber}
                                </p>
                              </>
                            )}
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column
                            width={10}
                            className="grid-padding-horizontal"
                          >
                            {editView ? (
                              <Form onSubmit={handleSubmit}>
                                <div style={{ width: "100%" }}>
                                  <Field
                                    name="NIB"
                                    component={TextInput}
                                    placeholder="Type NIB here..."
                                    labelName="NIB"
                                    mandatory={false}
                                    defaultValue={customer.nib}
                                  />
                                </div>
                              </Form>
                            ) : (
                              <>
                                <label className="customer-data-label">
                                  NIB
                                </label>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                  }}
                                  className="grey"
                                >
                                  {customer.nib}
                                </p>
                              </>
                            )}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column>
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
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            )}
          />
        </div>

        <div
          // ref={tableRef}
          // className={!isView && `padding-horizontal`}
          className="padding-horizontal"
          style={{ margin: "2.5rem 0" }}
        >
          <div className="grey get-data-container">
            <div className="accordion-container">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className="bold" style={{ marginRight: "1rem" }}>
                  ADDRESS & OFFICE NUMBER
                </span>
                <div
                  className={`match-button ${status == "REJECT" &&
                    `button-disable`}`}
                  style={{ fontSize: "12px" }}
                  onClick={status != "REJECT" && (() => openNewAddress())}
                >
                  <Icon name="plus" />
                  <p>Add New</p>
                </div>
              </div>
              <div onClick={() => setOpenAddressOffice(!openAddressOffice)}>
                {openAddressOffice ? (
                  <Icon name="triangle down" />
                ) : (
                  <Icon name="triangle right" />
                )}
              </div>
            </div>

            <Divider className="margin-0"></Divider>

            {openAddressOffice && (
              <>
                <div className="table-container">
                  <TableCustomerDetail
                    data={customer.cpAddressOfficeNumbers}
                    header={addressOfficeHeader}
                    sequenceNum={true}
                    Modal={ModalNewCustomerAddress}
                    deleteData={
                      CustomerMasterActions.deleteCustomerOfficeNumber
                    }
                    refreshData={
                      status == "NOT_NEW"
                        ? CustomerMasterActions.requestCustomerMoreDetailsByCustId
                        : CustomerMasterActions.requestApprovedCustomerByGenId
                    }
                    customerId={
                      status == "NOT_NEW"
                        ? customerId
                          ? customerId
                          : Number(id)
                        : Number(id)
                    }
                    isView={isView}
                    status={status}
                    jenis="ADDRESSOFFICENUMBER"
                  />
                </div>
                <Divider className="margin-0"></Divider>
              </>
            )}

            <div className="accordion-container">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className="bold" style={{ marginRight: "1rem" }}>
                  PEOPLE IN CHARGE (PIC)
                </span>
                <div
                  className={`match-button ${status == "REJECT" &&
                    `button-disable`}`}
                  style={{ fontSize: "12px" }}
                  onClick={status != "REJECT" && (() => openNewPIC())}
                >
                  <Icon name="plus" />
                  <p>Add New</p>
                </div>
              </div>
              <div onClick={() => setOpenPic(!openPic)}>
                {openPic ? (
                  <Icon name="triangle down" />
                ) : (
                  <Icon name="triangle right" />
                )}
              </div>
            </div>

            <Divider className="margin-0"></Divider>

            {openPic && (
              <>
                <div className="table-container">
                  <TableCustomerDetail
                    data={customer.customerPICs}
                    header={picHeader}
                    sequenceNum={true}
                    Modal={ModalNewPIC}
                    deleteData={CustomerMasterActions.deletePIC}
                    refreshData={
                      status == "NOT_NEW"
                        ? CustomerMasterActions.requestCustomerMoreDetailsByCustId
                        : CustomerMasterActions.requestApprovedCustomerByGenId
                    }
                    customerId={
                      status == "NOT_NEW"
                        ? customerId
                          ? customerId
                          : Number(id)
                        : Number(id)
                    }
                    isView={isView}
                    status={status}
                    customerCAPFlag={customer.capFlag}
                  />
                </div>
                <Divider className="margin-0"></Divider>
              </>
            )}

            <div className="accordion-container">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className="bold" style={{ marginRight: "1rem" }}>
                  RELATED ACCOUNT/CUSTOMER
                </span>
                <div
                  className={`match-button ${status == "REJECT" &&
                    `button-disable`}`}
                  style={{ fontSize: "12px" }}
                  onClick={status != "REJECT" && (() => openNewRelatedCust())}
                >
                  <Icon name="plus" />
                  <p>Add New</p>
                </div>
              </div>
              <div onClick={() => setOpenRelatedAcc(!openRelatedAcc)}>
                {openRelatedAcc ? (
                  <Icon name="triangle down" />
                ) : (
                  <Icon name="triangle right" />
                )}
              </div>
            </div>

            {openRelatedAcc && (
              <>
                <Divider className="margin-0"></Divider>
                <div className="table-container">
                  <TableCustomerDetail
                    data={customer.cpRelatedCustomers}
                    header={relatedAccountHeader}
                    sequenceNum={true}
                    Modal={ModalNewRelatedCustomer}
                    deleteData={RelatedCustomerActions.deleteRelatedCustomer}
                    refreshData={
                      status == "NOT_NEW"
                        ? CustomerMasterActions.requestCustomerMoreDetailsByCustId
                        : CustomerMasterActions.requestApprovedCustomerByGenId
                    }
                    customerId={
                      status == "NOT_NEW"
                        ? customerId
                          ? customerId
                          : Number(id)
                        : Number(id)
                    }
                    isView={isView}
                    status={status}
                    jenis={"RELATEDCUSTOMER"}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="padding-horizontal">
          <div
            className="grey account-activity-container"
            style={{ paddingBottom: "1rem", marginBottom: "1rem" }}
          >
            <p className="bold margin-0" style={{ padding: "1rem" }}>
              ACCOUNT ACTIVITY HISTORY
            </p>
            <Divider style={{ margin: 0 }}></Divider>

            {accountActivityHistory.length > 0 &&
              accountActivityHistory.map((data) => (
                <p
                  style={{
                    padding: "0 1rem",
                    marginBottom: "0",
                    marginTop: "14px",
                  }}
                >
                  {/* {data.description}{" "} */}
                  {data.description.slice(
                    0,
                    data.description.indexOf("by") + 3
                  )}
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    {data.description.slice(
                      data.description.indexOf("by") + 3,
                      data.description.indexOf("on")
                    )}
                  </span>
                  {data.description.slice(data.description.indexOf("on"))}
                </p>
              ))}
            {accountActivityHistory.length === 0 && (
              <p
                style={{ textAlign: "center", margin: "1rem", color: "black" }}
              >
                No activity history found.
              </p>
            )}
          </div>
        </div>
      </LoadingIndicator>

      {/* <Divider className="margin-0"></Divider>
  
          <div className="button-container">
            <div className="button-inner-container">
              <Button style={{ marginRight: "1rem" }} type="button">
                Close
              </Button>
              <Button color="blue" type="button">
                Save Change
              </Button>
            </div>
          </div> */}
    </Fragment>
  );
};

export default BaseViewApprovedData;
