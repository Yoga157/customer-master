import React, {
  useEffect,
  Fragment,
  useState,
  useRef,
  useCallback,
} from "react";
import * as data from "./data";
import {
  Button,
  Pagination,
  RichTextEditor,
  TextInput,
  SelectInput,
  DropdownInput,
  DropdownClearInput,
  TextAreaInput,
} from "views/components/UI";
import environment from "environment";
import axios from "axios";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import { Dispatch } from "redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm, Field } from "react-final-form";
import { useHistory } from "react-router-dom";
import TableRequestNewCustomer from "./components/table/table-request-new-customer/TableRequestNewCustomer";
import { reqNewCustomerData } from "./data";
import {
  Form,
  Grid,
  Divider,
  Segment,
  Icon,
  Dropdown,
} from "semantic-ui-react";
import { FileUpload } from "views/components/UI";
import { selectReqCustomerNewAccount } from "selectors/customer-master/CustomerMasterSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import "./addNewCustomerSetting.scss";
import CustomerMasterPostModel from "stores/customer-master/models/CustomerMasterPostModel";
import RouteEnum from "constants/RouteEnum";
import ModalEditViewNpwp from "./components/modal/viewedit-npwp/ModalViewEditNpwp";
import { selectIndustry } from "selectors/customer-master/CustomerMasterSelector";
import * as IndustryClassOptionsAction from "stores/customer-master/CustomerMasterActivityActions";

interface IProps {
  history: any;
}

const AddNewCustomerSetting: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const linkRef = useRef(null);
  const tableData = useSelector((state: IStore) =>
    selectReqCustomerNewAccount(state)
  );
  // const industryClassOptions = useSelector((state: IStore) =>
  //   selectIndustryOptions(state)
  // );

  const history = useHistory();
  const [searchedCustomerName, setSearchedCustomerName] = useState("");
  const [searchedPicName, setSearcedhPicName] = useState("");
  const [searchedTitleCust, setSearchedTitleCust] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const activePage = useSelector(
    (state: IStore) => state.customerMaster.activePage
  );
  const userId: any = localStorage.getItem("userLogin");

  const [pageSize, setPage] = useState(10);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [openCustomerAvability, setOpenCustomerAvability] = useState(true);
  const [openCustomerInfo, setOpenCustomerInfo] = useState(false);
  const [canToggleCustomerInfo, setCanToggleCustomerInfo] = useState(false);
  const [isChekedToggle, setIsCheckedToggle] = useState(false);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(CustomerMasterActions.setActivePage(data.activePage));

    // if (window.location.pathname === "/customer-setting/add") {
    dispatch(
      CustomerMasterActions.requestSearchCustomerMaster(
        data.activePage,
        pageSize,
        "CustomerID",
        "ascending",
        searchedCustomerName,
        searchedPicName
      )
    );
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [CustomerMasterActions.CLEAR_RESULT_CM])
  );

  const onSubmitSearch = async (data) => {
    dispatch(
      CustomerMasterActions.requestSearchCustomerMaster(
        activePage,
        pageSize,
        "CustomerID",
        "ascending",
        data.customerName,
        data.picName
      )
    );
    dispatch(CustomerMasterActions.setActivePage(1));
    setSearchedCustomerName(data.customerName);
    setSearcedhPicName(data.picName);
  };

  // const industryClassOptions = [
  //   {
  //     text: "Industry1",
  //     value: "Industry1",
  //   },
  //   {
  //     text: "Industry2",
  //     value: "Industry2",
  //   },
  // ];

  const industryClassOptions = useSelector((state: IStore) =>
    selectIndustry(state)
  );

  useEffect(() => {
    dispatch(IndustryClassOptionsAction.getIndustryClassification());
  }, []);

  const onSubmitHandler = async (data: any) => {
    const userId: any = localStorage.getItem("userLogin");

    let formData = new FormData();
    formData.append("CustomerName", data.customerLegalName);
    formData.append("CustomerAddress", data.customerAddress);
    formData.append("PhoneNumber", data.officeNumber);
    formData.append("IndustryClass", data.industryClassification);
    formData.append("Website", data.website);
    formData.append("CustomerBusinessName", data.customerBusinessName);
    formData.append("HoldingCompName", data.holdingCompanyName);
    formData.append("City", data.city);
    formData.append("Country", data.country);
    formData.append("ZipCode", data.zipCode);
    formData.append("CoorporateEmail", data.coorporateEmail);
    formData.append("NIB", data.nib);
    formData.append("NPWPNumber", data.Npwp);
    formData.append("PICName", data.picName);
    formData.append("PICMobilePhone", data.picMobilePhone);
    formData.append("PICJobTitle", data.picJobTitle);
    formData.append("PICEmailAddr", data.picEmail);
    formData.append("CreatedUserID", JSON.parse(userId).employeeID);
    formData.append("ModifyUserID", JSON.parse(userId).employeeID);
    formData.append("File", uploadFile);
    if (JSON.parse(userId).role === "Sales") {
      formData.append("ApprovalStatus", "PENDING");
    }
    if (JSON.parse(userId).role === "Marketing") {
      formData.append("ApprovalStatus", "APPROVE");
    }

    try {
      const endpoint: string = environment.api.customer.replace(
        ":controller",
        "CustomerSetting/InsertRequestNewCustomer"
      );

      await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadFile(null);
      dispatch(CustomerMasterActions.setActiveTabs(4));
      dispatch(CustomerMasterActions.setSuccessModal(true));
      props.history.push({
        pathname: RouteEnum.CustomerSetting,
      });
      dispatch(CustomerMasterActions.clearResult());
    } catch (error) {
      console.error(error);
    }
  };

  const cancelClick = () => {
    setSearchedCustomerName("");
    dispatch(CustomerMasterActions.setActiveTabs(4));
    props.history.push({
      pathname: RouteEnum.CustomerSetting,
    });
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (!uploadFile && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setUploadFile(selectedFile);
    }
  };

  const openEditViewNPWP = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalEditViewNpwp
          uploadFile={uploadFile}
          setUploadFile={setUploadFile}
        />,
        ModalSizeEnum.Mini
      )
    );
  }, [dispatch, uploadFile]);

  useEffect(() => {
    dispatch(CustomerMasterActions.clearResult());
    // dispatch(CustomerMasterActions.getIndustryClass());
  }, []);

  useEffect(() => {
    if (isButtonClicked) {
      setCanToggleCustomerInfo(true);
    }
  }, [isButtonClicked]);

  return (
    <Fragment>
      <div>
        <div onClick={cancelClick} style={{ cursor: "pointer" }}>
          <p className="link">{"< Back to Customer List"}</p>
        </div>
        <LoadingIndicator>
          <div className="form-container">
            <p className="page-title grey">REQUEST NEW CUSTOMER</p>
            <Divider></Divider>

            <div className="FullContainer">
              <FinalForm
                onSubmit={(values: any) => onSubmitSearch(values)}
                render={({ handleSubmit, pristine, invalid, values }) => (
                  <Form onSubmit={handleSubmit}>
                    <Segment className="LightYellowContainer">
                      <Grid>
                        <Grid.Row>
                          <Grid.Column
                            width={16}
                            mobile={16}
                            tablet={16}
                            computer={10}
                          >
                            <Field
                              name="customerName"
                              component={TextInput}
                              placeholder="e.g. Berca Hardaya .."
                              labelName="Customer Name"
                              mandatory={false}
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
                                pristine || invalid || !values.customerName
                              }
                              floated="right"
                              size="small"
                              content="Check Customer Availability"
                              onClick={handleButtonClick}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Form>
                )}
              />

              <div
                className="accordion-container"
                style={{ marginTop: "1rem" }}
                onClick={() => setOpenCustomerAvability(!openCustomerAvability)}
              >
                <span className="page-title-customer-result">
                  CHECK CUSTOMER AVAILABILITY RESULT
                </span>
                {openCustomerAvability ? (
                  <Icon name="triangle down" />
                ) : (
                  <Icon name="triangle right" />
                )}
              </div>
              <Divider className="margin-0"></Divider>

              {openCustomerAvability && (
                <>
                  <LoadingIndicator>
                    <div className="container-recheck">
                      {tableData.rows.length === 0 &&
                      searchedCustomerName === "" ? (
                        <div className="info-recheck">
                          <p className="p-recheck">no-data</p>
                        </div>
                      ) : (
                        <div className="info-recheck">
                          <p className="p-recheck">
                            There are{" "}
                            <b style={{ color: "black" }}>
                              {tableData.totalRows}
                            </b>{" "}
                            result from the customer search{" "}
                            <b style={{ color: "black" }}>
                              {searchedCustomerName
                                ? searchedCustomerName.charAt(0).toUpperCase() +
                                  searchedCustomerName.slice(1)
                                : ""}
                            </b>{" "}
                            Please recheck again before you make new customers
                            request.
                          </p>
                        </div>
                      )}
                    </div>
                  </LoadingIndicator>

                  <div className="padding-horizontal">
                    <TableRequestNewCustomer
                      data={tableData.rows}
                      header={data.reqNewCustomerHeader}
                      sequenceNum={true}
                      customerName={searchedCustomerName}
                      picName={searchedPicName}
                      activePage={activePage}
                      totalData={tableData.rows.length}
                    />
                    <div style={{ marginTop: "1rem" }}>
                      <Pagination
                        activePage={activePage}
                        onPageChange={(e, data) =>
                          handlePaginationChange(e, data)
                        }
                        totalPage={tableData.totalRows}
                        pageSize={pageSize}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div
              className="recheck-submit-pad"
              style={{
                opacity:
                  tableData.rows.length === 0 && searchedCustomerName === ""
                    ? 0.5
                    : 1,
              }}
            >
              <div className="container-recheck-submit">
                <input
                  type="checkbox"
                  disabled={
                    tableData.rows.length === 0 && searchedCustomerName === ""
                      ? true
                      : false
                  }
                  checked={openCustomerInfo}
                  onChange={() => {
                    setOpenCustomerInfo(!openCustomerInfo);
                    if (
                      tableData.rows.length === 0 &&
                      searchedCustomerName === ""
                    ) {
                      setIsCheckedToggle(!isChekedToggle);
                    }
                    if (openCustomerInfo) {
                      setIsCheckedToggle(false);
                    }
                  }}
                  style={{
                    margin: "0 1rem",
                    transform: "scale(1)",
                  }}
                ></input>
                <div
                  className="p-recheck"
                  style={{
                    color: "red",
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "1rem",
                  }}
                >
                  <span>
                    I HAVE CHECKED THE CUSTOMER LIST FROM THE SEARCH RESULTS.
                  </span>
                  <span>AND I DON'T FIND NAME OF THE CUSTOMER I WANT.</span>
                </div>
              </div>
            </div>

            <Divider className="margin-0"></Divider>

            <div
              className="accordion-container"
              onClick={() => {
                if (openCustomerInfo) {
                  setIsCheckedToggle(!isChekedToggle);
                }
              }}
              style={{ opacity: openCustomerInfo ? 1 : 0.5 }}
            >
              <span className="page-title-customer-info">CUSTOMER INFO</span>
              {isChekedToggle ? (
                <Icon name="triangle down" />
              ) : (
                <Icon name="triangle right" />
              )}
            </div>

            {isChekedToggle && (
              <>
                <FinalForm
                  onSubmit={(values: any) => onSubmitHandler(values)}
                  render={({ handleSubmit, pristine, invalid, values }) => (
                    <Form onSubmit={handleSubmit}>
                      <Divider className="margin-0"></Divider>

                      <div className="address-padd">
                        <Grid style={{ margin: "0" }}>
                          <Grid.Row columns="equal">
                            <Grid.Column width={8} className="FullGrid767">
                              <Field
                                name="customerLegalName"
                                component={TextInput}
                                labelName="Customer Legal Name"
                                placeholder="Type customer legal name here..."
                                mandatory={false}
                              />
                            </Grid.Column>
                            <Grid.Column width={8} className="FullGrid767">
                              <Field
                                name="customerBusinessName"
                                component={TextInput}
                                labelName="Customer Business Name"
                                placeholder="Type customer business name here..."
                                mandatory={false}
                              />
                            </Grid.Column>
                          </Grid.Row>

                          <Grid.Row columns="equal">
                            <Grid.Column width={6} className="FullGrid767">
                              <Field
                                name="holdingCompanyName"
                                component={TextInput}
                                labelName="Holding Company Name"
                                placeholder="Type holding company name here..."
                                mandatory={false}
                              />
                            </Grid.Column>
                            <Grid.Column width={4} className="FullGrid767">
                              <Field
                                name="industryClassification"
                                component={DropdownClearInput}
                                labelName="Industry Classification"
                                allowAdditions={true}
                                placeholder="Pick one classification"
                                options={industryClassOptions}
                                mandatory={false}
                              />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>

                        <Grid>
                          <Grid.Row columns={2}>
                            <Grid.Column width={10}>
                              <Field
                                name="customerAddress"
                                component={TextAreaInput}
                                placeholder="Type customer address here..."
                                labelName="Customer Address"
                                mandatory={false}
                                rows={7}
                              />
                            </Grid.Column>
                            <Grid.Column width={6}>
                              <Grid>
                                <Grid.Row columns={2}>
                                  <Grid.Column>
                                    <Field
                                      name="country"
                                      component={TextInput}
                                      labelName="Country"
                                      placeholder="Type country name here..."
                                      mandatory={false}
                                    />
                                  </Grid.Column>
                                  <Grid.Column>
                                    <Field
                                      name="city"
                                      component={TextInput}
                                      labelName="City"
                                      placeholder="Type city name here..."
                                      mandatory={false}
                                    />
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                  <Grid.Column width={6}>
                                    <Field
                                      name="zipCode"
                                      component={TextInput}
                                      labelName="Zip Code"
                                      placeholder="Type zip code here..."
                                      mandatory={false}
                                    />
                                  </Grid.Column>
                                  <Grid.Column width={10}>
                                    <Field
                                      name="officeNumber"
                                      component={TextInput}
                                      labelName="Office Number"
                                      placeholder="Type office number here..."
                                      mandatory={false}
                                    />
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>

                        <Grid style={{ margin: "0" }}>
                          <Grid.Row columns="equal">
                            <Grid.Column
                              width={16}
                              mobile={16}
                              tablet={16}
                              computer={6}
                              className="FullGrid767"
                            >
                              <Field
                                name="website"
                                component={TextInput}
                                labelName="Website"
                                placeholder="Type website name here..."
                                mandatory={false}
                              />
                            </Grid.Column>
                            <Grid.Column
                              width={16}
                              mobile={16}
                              tablet={16}
                              computer={6}
                              className="FullGrid767"
                            >
                              <Field
                                name="coorporateEmail"
                                component={TextInput}
                                labelName="Coorporate Email"
                                placeholder="Type coorporate email here..."
                                mandatory={false}
                              />
                            </Grid.Column>

                            <Grid.Column
                              width={16}
                              mobile={16}
                              tablet={16}
                              computer={4}
                              className="FullGrid767"
                            >
                              <Field
                                name="nib"
                                component={TextInput}
                                labelName="NIB"
                                placeholder="Type NIB here..."
                                mandatory={false}
                              />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>

                        <Grid style={{ margin: "0" }}>
                          <Grid.Row columns={3}>
                            <Grid.Column width={4} className="FullGrid767">
                              <Field
                                name="Npwp"
                                component={TextInput}
                                labelName="NPWP (Tax ID Number)"
                                placeholder="Type tax id number here..."
                                mandatory={
                                  JSON.parse(userId).role === "Sales"
                                    ? false
                                    : true
                                }
                              />
                            </Grid.Column>
                            <Grid.Column width={4} className="FullGrid767">
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                onClick={handleUploadClick}
                              >
                                <label style={{ color: "#A9A8C4" }}>
                                  NPWP Card{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <div
                                  style={{
                                    height: "10rem",
                                    maxWidth: "15rem",
                                    width: "100%",
                                    border: "#8D8C8C solid 2px",
                                    borderStyle: "dashed",
                                    borderRadius: "0.5rem",
                                    position: "relative",
                                    backgroundColor: "#FBFBFB",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    backgroundImage: uploadFile
                                      ? `url(${URL.createObjectURL(
                                          uploadFile
                                        )})`
                                      : "none",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    {uploadFile ? null : (
                                      <Icon name="upload" size="big" />
                                    )}{" "}
                                    <span style={{ marginTop: "0.5rem" }}>
                                      {uploadFile
                                        ? ""
                                        : "Upload NPWP photo images"}
                                    </span>
                                  </div>
                                  {uploadFile && (
                                    <div
                                      style={{
                                        position: "absolute",
                                        backgroundColor: "#656DD1",
                                        color: "white",
                                        padding: "0.3rem 0.5rem",
                                        borderRadius: "2rem",
                                        boxShadow: "0px 0px 10px 0px #00000040",
                                        bottom: "3rem",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        zIndex: 1,
                                        cursor: "pointer",
                                        fontSize: "0.8rem",
                                      }}
                                      onClick={openEditViewNPWP}
                                    >
                                      <span>View or Reupload</span>
                                    </div>
                                  )}
                                </div>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={handleFileChange}
                                />
                              </div>
                            </Grid.Column>
                            <Grid.Column width={8} className="FullGrid767">
                              <label
                                style={{
                                  color: "#55637A",
                                  fontSize: "1rem",
                                  fontWeight: "bold",
                                }}
                              >
                                PIC Details
                              </label>
                              <div className="grey-padding">
                                <Segment className="LightGreyContainer">
                                  <Grid.Column width={6}>
                                    <Grid>
                                      <Grid.Row columns={2}>
                                        <Grid.Column width={10}>
                                          <Field
                                            name="picName"
                                            component={TextInput}
                                            labelName="PIC Name"
                                            placeholder="Type PIC Name here..."
                                            mandatory={false}
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                          <Field
                                            name="picMobilePhone"
                                            component={TextInput}
                                            labelName="PIC Mobile Phone"
                                            placeholder="Type PIC Mobile phone here..."
                                            mandatory={false}
                                          />
                                        </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row columns={2}>
                                        <Grid.Column width={9}>
                                          <Field
                                            name="picEmail"
                                            component={TextInput}
                                            labelName="Email"
                                            placeholder="Type PIC Email here..."
                                            mandatory={false}
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={7}>
                                          <Field
                                            name="picJobTitle"
                                            component={TextInput}
                                            labelName="PIC Job Title"
                                            placeholder="Type PIC Job title here..."
                                            mandatory={false}
                                          />
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Grid.Column>{" "}
                                </Segment>
                              </div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </div>

                      <Divider className="margin-0"></Divider>
                      <div className="button-container">
                        <div className="button-inner-container">
                          <Button
                            style={{ marginRight: "1rem" }}
                            type="button"
                            onClick={cancelClick}
                          >
                            Cancel
                          </Button>
                          <Button
                            color="blue"
                            style={{ marginRight: "1rem" }}
                            type="submit"
                            disabled={
                              !values.customerLegalName ||
                              !values.customerBusinessName ||
                              !values.holdingCompanyName ||
                              !values.industryClassification ||
                              !values.customerAddress ||
                              !values.country ||
                              !values.city ||
                              !values.zipCode ||
                              !values.officeNumber ||
                              !values.website ||
                              !values.coorporateEmail ||
                              !values.nib ||
                              (!values.Npwp &&
                                JSON.parse(userId).role === "Sales") ||
                              (!uploadFile &&
                                JSON.parse(userId).role === "Sales") ||
                              !values.picName ||
                              !values.picMobilePhone ||
                              !values.picEmail ||
                              !values.picJobTitle
                            }
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </Form>
                  )}
                />
              </>
            )}

            {!isChekedToggle && (
              <>
                <Divider className="margin-0"></Divider>

                <div className="button-container">
                  <div className="button-inner-container">
                    <Button onClick={() => cancelClick()}>Cancel</Button>
                    <Button
                      color="blue"
                      style={{ marginRight: "1rem" }}
                      type="submit"
                      disabled
                      // onClick={() => onSubmitHandler(data)}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </LoadingIndicator>
      </div>
    </Fragment>
  );
};

export default AddNewCustomerSetting;
