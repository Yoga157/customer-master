import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
// import "./ViewCustomerSetting.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Icon, Divider, Form, Button } from "semantic-ui-react";
import IStore from "models/IStore";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput } from "views/components/UI";
import TableCustomerDetail from "./components/table/TableCustomerDetail";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ModalNewCustomerAddress from "./components/modal/approved-page/ModalNewCustomerAddress";
import ModalNewWebsiteMedia from "./components/modal/approved-page/ModalNewWebsiteMedia";
import ModalNewPIC from "./components/modal/approved-page/ModalNewPIC";
import ModalNewRelatedCustomer from "./components/modal/approved-page/ModalNewRelatedCustomer";

const ViewApprovedData: React.FC = () => {
  const dispatch: Dispatch = useDispatch();

  const customer = {
    customerID: 12345,
    titleCustomer: "PT",
    customerName: "Biffco Manufacturing",
    requestor: "Rosa Amalia",
    createDate: "02 January 2024",
    industryClass: "Manufacturing",
  };

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
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewCustomerAddress></ModalNewCustomerAddress>,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  // add website or social media
  const openNewWebsiteSocial = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewWebsiteMedia></ModalNewWebsiteMedia>,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  // add pic
  const openNewPIC = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewPIC></ModalNewPIC>,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  // add related customer
  const openNewRelatedCust = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewRelatedCustomer></ModalNewRelatedCustomer>,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  let addressOfficeHeader = [
    {
      key: "address",
      header: "Address",
    },
    {
      key: "officeNumber",
      header: "Office Number",
    },
  ];

  let addressOfficeResponse = [
    {
      id: 1,
      address: "Jl. Jenderal Sudirman No. 55",
      phoneNumber: "0123456789",
      alternateNumber: "0987689556",
      faxNumber: " 678990",
    },
    {
      id: 2,
      address: "Jl. Hang Tuah No. 72",
      phoneNumber: "0123456789",
      alternateNumber: "0987689556",
      faxNumber: " 678990",
    },
  ];

  let addressOffice = addressOfficeResponse.map((data) => {
    return {
      id: data.id,
      address: data.address,
      officeNumber: [
        data.phoneNumber,
        data.alternateNumber,
        data.faxNumber,
      ].join(", "),
      phoneNumber: data.phoneNumber,
      alternateNumber: data.alternateNumber,
      faxNumber: data.faxNumber,
    };
  });

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

  let websiteMedia = [
    {
      type: "Website",
      name: "www.biffco-manufacturing.com",
    },
    {
      type: "Instagram",
      name: "@biffco.manufacturing",
    },
    {
      type: "Facebook",
      name: "Life @ Biffco",
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

  let pic = [
    {
      name: "Paulus Jeharu",
      jabatan: "Business Owner",
      email: "paulus.j@mail.com",
      address: "Jl. Jenderal Sudirman No. 555",
      phoneNumber: "0123456789",
    },
    {
      name: "Paulus Jeharu",
      jabatan: "Business Owner",
      email: "paulus.j@mail.com",
      address: "Jl. Jenderal Sudirman No. 555",
      phoneNumber: "0123456789",
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

  let relatedAccount = [
    {
      customerID: 23456,
      accountName: "Biffco Factory LTD.",
    },
    {
      customerID: 23456,
      accountName: "Biffco Factory LTD.",
    },
  ];

  return (
    <Fragment>
      <Link to={"/customer-setting"} className="link">
        {"< Back to Customer Setting List"}
      </Link>

      <div className="form-container">
        <p className="page-title grey">CUSTOMER DETAILS</p>

        <Divider style={{ marginBottom: 0 }}></Divider>

        <LoadingIndicator isActive={false}>
          <div
            className="padding-horizontal space-between-container"
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
                    {customer.customerID}
                  </p>
                </div>

                <div className="customer-data-container-left">
                  <label className="customer-data-label">Title Customer</label>
                  <p
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    className="grey"
                  >
                    {customer.titleCustomer}
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
                    {customer.requestor}
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
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="data-container-column">
                <div className="customer-data-container-end">
                  <label className="customer-data-label">Create Date</label>
                  <p
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    className="grey"
                  >
                    {customer.createDate}
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
                        {customer.industryClass}
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

          <div className="padding-horizontal" style={{ margin: "2.5rem 0" }}>
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
                      data={addressOffice}
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
                      data={websiteMedia}
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
                    ADDRESS & OFFICE NUMBER
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
                      data={pic}
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
                      data={relatedAccount}
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
      </div>
    </Fragment>
  );
};

export default ViewApprovedData;
