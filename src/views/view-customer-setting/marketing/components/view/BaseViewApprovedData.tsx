import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
// import "./ModalApprovedData.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Icon, Divider, Form, Button } from "semantic-ui-react";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput } from "views/components/UI";
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
import { selectCustomerMoreDetails } from "selectors/customer-master/CustomerMasterSelector";
import { selectRequesting } from "selectors/requesting/RequestingSelector";

interface ICustomer {
  customerID: any;
  titleCustomer: any;
  customerName: any;
  industryClass: any;
  requestor: any;
  cpAddressOfficeNumbers: any;
  cpWebsiteSocialMedias: any;
  customerPICs: any;
  cpRelatedCustomers: any;
  createDate: any;
  createUserID: any;
  modifyDate: any;
  modifyUserID: any;
}

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
          <ModalNewCustomerAddress isView={isView}></ModalNewCustomerAddress>,
          ModalSizeEnum.Small
        )
      );
    } else {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalNewCustomerAddress></ModalNewCustomerAddress>,
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
          <ModalNewRelatedCustomer isView={isView}></ModalNewRelatedCustomer>,
          ModalSizeEnum.Small
        )
      );
    } else {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalNewRelatedCustomer></ModalNewRelatedCustomer>,
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
      key: "name",
      header: "Name",
    },
    {
      key: "jabatan",
      header: "Jabatan",
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

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      const titleDiv = titleRef.current;
      const contentDiv = contentRef.current;
      const tableDiv = tableRef.current;

      if (titleDiv && contentDiv && tableDiv && isView) {
        var titleHeight = titleDiv.offsetHeight;
        var contentHeight = contentDiv.offsetHeight;
        contentDiv.style.position = "absolute";
        contentDiv.style.width = "100%";
        contentDiv.style.left = "0";
        contentDiv.style.top = `calc(${titleHeight}px + 1.5rem + 1rem + 1px)`;

        tableDiv.style.paddingTop = `${contentHeight}px`;
      }
    };

    // inisialisasi ukuran
    updateDimensions();

    // Event listener for window resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [isView]);

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
        ref={titleRef}
        className={isView ? `title-paragraph` : `page-title grey`}
      >
        CUSTOMER DETAILS
      </p>

      <Divider style={{ marginBottom: 0 }}></Divider>

      <LoadingIndicator isActive={isRequesting}>
        <div
          ref={contentRef}
          className="space-between-container padding-horizontal"
          style={{
            backgroundColor: "#FFFB9A",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className="data-container-column"
              style={{ marginRight: "1rem" }}
            >
              <div className="customer-data-container-left">
                <label className="customer-data-label">Customer ID</label>
                <p
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  className="grey"
                >
                  {customer.customerID ? customer.customerID : "-"}
                </p>
              </div>

              <div className="customer-data-container-left">
                <label className="customer-data-label">Title Customer</label>
                <p
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  className="grey"
                >
                  {customer.titleCustomer ? customer.titleCustomer : "-"}
                </p>
              </div>
            </div>

            <div className="data-container-column">
              <div className="customer-data-container-left">
                <label className="customer-data-label">Requestor</label>
                <p
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  className="grey"
                >
                  {customer.requestor ? customer.requestor : "-"}
                </p>
              </div>

              <div className="customer-data-container-left">
                <label className="customer-data-label">Customer Name</label>
                <p
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  className="grey"
                >
                  {customer.customerName ? customer.customerName : "-"}
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="data-container-column">
              <div className="customer-data-container-end">
                <label className="customer-data-label">Create Date</label>
                <p
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  className="grey"
                >
                  {customer.createDate ? customer.createDate : "-"}
                </p>
              </div>

              <div className="customer-data-container-end">
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
                      {customer.industryClass ? customer.industryClass : "-"}
                    </p>
                  </>
                )}
              </div>
            </div>

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
          </div>
        </div>

        <div
          ref={tableRef}
          className={!isView && `padding-horizontal`}
          style={{ margin: "2.5rem 0" }}
        >
          <div className="grey get-data-container">
            <div className="accordion-container">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className="bold" style={{ marginRight: "1rem" }}>
                  ADDRESS & OFFICE NUMBER
                </span>
                <div
                  className="match-button"
                  style={{ fontSize: "12px" }}
                  onClick={() => openNewAddress()}
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
                  />
                </div>
                <Divider className="margin-0"></Divider>
              </>
            )}

            <div className="accordion-container">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className="bold" style={{ marginRight: "1rem" }}>
                  WEBSITE & SOCIAL MEDIA
                </span>
                <div
                  className="match-button"
                  style={{ fontSize: "12px" }}
                  onClick={() => openNewWebsiteSocial()}
                >
                  <Icon name="plus" />
                  <p>Add New</p>
                </div>
              </div>
              <div onClick={() => setOpenWebsiteMedia(!openWebsiteMedia)}>
                {openWebsiteMedia ? (
                  <Icon name="triangle down" />
                ) : (
                  <Icon name="triangle right" />
                )}
              </div>
            </div>

            <Divider className="margin-0"></Divider>

            {openWebsiteMedia && (
              <>
                <div className="table-container">
                  <TableCustomerDetail
                    data={customer.cpWebsiteSocialMedias}
                    header={websiteMediaHeader}
                    sequenceNum={true}
                    Modal={ModalNewWebsiteMedia}
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
                  className="match-button"
                  style={{ fontSize: "12px" }}
                  onClick={() => openNewPIC()}
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
                  className="match-button"
                  style={{ fontSize: "12px" }}
                  onClick={() => openNewRelatedCust()}
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
                    relatedCustomer
                  />
                </div>
              </>
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
