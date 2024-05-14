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
import { Icon, Divider, Form, Button } from "semantic-ui-react";
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
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import * as RelatedCustomerActions from "stores/related-customer/RelatedCustomerActivityActions";

import {
  selectAddressOfficeOptions,
  selectCustomerMoreDetails,
} from "selectors/customer-master/CustomerMasterSelector";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import ModalViewNpwp from "../modal/view-npwp/ModalViewNpwp";

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
  const industryClassificationOptions = [
    {
      text: "Manufacturing",
      value: "Manufacturing",
    },
    {
      text: "Industry",
      value: "Industry",
    },
  ];

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

  let accountActivityHistory = [
    {
      activity: "Created",
      employeeName: "Jenny Wilson",
      time: "02-02-2024 11:30 AM",
      reason: null,
    },
    {
      activity: "Rejected",
      employeeName: "Jenny Wilson",
      time: "02-02-2024 11:30 AM",
      reason: "Lorem ipsum",
    },
  ];

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerMasterActions.REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID,
      CustomerMasterActions.REQUEST_CUSTOMER_MORE_DETAILS_BY_CUST_ID,
      CustomerMasterActions.REQUEST_APPROVED_DATA_DETAIL_BY_GEN_ID,
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
          <div className="space-between-container padding-horizontal">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="customer-data-container-left">
                <label className="customer-data-label">Customer ID</label>
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

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="customer-data-container-end">
                <label className="customer-data-label">Create Date</label>
                <p
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  className="grey"
                >
                  {customer.createDate}
                </p>
              </div>

              {status != "REJECT" && (
                <div
                  style={{ paddingTop: "14px" }}
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
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="padding-horizontal space-between-container">
            <div className="customer-data-container-left">
              {editView ? (
                <FinalForm
                  onSubmit={(values: any) => {}}
                  render={({ handleSubmit, pristine, invalid }) => (
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
                  )}
                />
              ) : (
                <>
                  <label className="customer-data-label">Customer Name</label>
                  <p
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    className="grey"
                  >
                    {customer.customerName}
                  </p>
                </>
              )}
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
              {editView ? (
                <FinalForm
                  onSubmit={(values: any) =>
                    onSubmitIndustryClassification(values)
                  }
                  render={({ handleSubmit, pristine, invalid }) => (
                    <Form onSubmit={handleSubmit}>
                      <Field
                        labelName="Industry Classification"
                        name="industryClassification"
                        component={DropdownClearInput}
                        placeholder="Choose class..."
                        options={industryClassificationOptions}
                        onChanged={onChangeIndustryClassification}
                        values={industryClassification}
                        mandatory={true}
                      />
                    </Form>
                  )}
                />
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
            </div>
          </div>

          <div className="padding-horizontal customer-data-container-left">
            <label className="customer-data-label">Customer Address</label>
            <p
              style={{ fontSize: "20px" }}
              className="grey"
              dangerouslySetInnerHTML={{
                __html: customer.address || "-",
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
              <label className="customer-data-label">Office Number</label>
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
            {editView ? (
              <FinalForm
                onSubmit={(values: any) => {}}
                render={({ handleSubmit, pristine, invalid }) => (
                  <Form onSubmit={handleSubmit}>
                    <div style={{ width: "70%" }}>
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
                )}
              />
            ) : (
              <>
                <label className="customer-data-label">Corporate Email</label>
                <p
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  className="grey"
                >
                  {customer.coorporateEmail}
                </p>
              </>
            )}
          </div>

          <div
            className="padding-horizontal"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="customer-data-container-left">
                {editView ? (
                  <FinalForm
                    onSubmit={(values: any) => {}}
                    render={({ handleSubmit, pristine, invalid }) => (
                      <Form onSubmit={handleSubmit}>
                        <div style={{ width: "100%" }}>
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
                    )}
                  />
                ) : (
                  <>
                    <label className="customer-data-label">
                      NPWP (Tax ID Number)
                    </label>
                    <p
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      className="grey"
                    >
                      {customer.npwpNumber}
                    </p>
                  </>
                )}
              </div>

              <div className="customer-data-container-left">
                {editView ? (
                  <FinalForm
                    onSubmit={(values: any) => {}}
                    render={({ handleSubmit, pristine, invalid }) => (
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
                    )}
                  />
                ) : (
                  <>
                    <label className="customer-data-label">NIB</label>
                    <p
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      className="grey"
                    >
                      {customer.nib}
                    </p>
                  </>
                )}
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
                    <Icon name="picture" style={{ fontSize: "3rem" }}></Icon>
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

            {accountActivityHistory.map((data) => (
              <p
                style={{
                  padding: "0 1rem",
                  marginBottom: "0",
                  marginTop: "14px",
                }}
              >
                {data.activity} by <b>{data.employeeName}</b> on {data.time}{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    fontSize: "small",
                  }}
                >
                  {data.reason && `- ${data.reason}`}
                </span>
              </p>
            ))}
            <p></p>
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
