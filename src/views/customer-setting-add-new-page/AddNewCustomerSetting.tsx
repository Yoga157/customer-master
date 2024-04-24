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
} from "views/components/UI";
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
import { Form, Grid, Divider, Segment, Icon } from "semantic-ui-react";
import { FileUpload } from "views/components/UI";
import { selectReqCustomerNewAccount } from "selectors/customer-master/CustomerMasterSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import "./addNewCustomerSetting.scss";
import CustomerMasterPostModel from "stores/customer-master/models/CustomerMasterPostModel";
import RouteEnum from "constants/RouteEnum";
import ModalEditViewNpwp from "./components/modal/viewedit-npwp/ModalViewEditNpwp";

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
  const history = useHistory();
  const [searchedCustomerName, setSearchedCustomerName] = useState("");
  const [searchedPicName, setSearcedhPicName] = useState("");
  const [searchedTitleCust, setSearchedTitleCust] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const activePage = useSelector(
    (state: IStore) => state.customerMaster.activePage
  );
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
        searchedTitleCust,
        searchedCustomerName
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

  const onSubmitHandler = async (data: any) => {
    const userId: any = localStorage.getItem("userLogin");
    // console.log("role", userId);
    const RequestNewCustomer = new CustomerMasterPostModel(data);
    if (JSON.parse(userId).role != "Sales") {
      RequestNewCustomer.approvalStatus = "Approve";
    } else {
      RequestNewCustomer.approvalStatus = "";
    }
    RequestNewCustomer.titleCustomer = searchedTitleCust;
    RequestNewCustomer.customerName = searchedCustomerName;
    RequestNewCustomer.picName = searchedPicName;
    RequestNewCustomer.customerAddress = data.customerAddress;
    RequestNewCustomer.phoneNumber = data.phoneNumber;
    RequestNewCustomer.industryClass = data.industryClass;
    RequestNewCustomer.website = data.website;
    RequestNewCustomer.socialMedia = data.socialMedia;
    RequestNewCustomer.picMobilePhone = data.picPhoneNumber;
    RequestNewCustomer.picJobTitle = data.picJobTitle;
    RequestNewCustomer.picEmailAddr = data.picEmail;
    RequestNewCustomer.createdUserID = JSON.parse(userId).employeeID;
    RequestNewCustomer.modifyUserID = JSON.parse(userId).employeeID;

    // console.log(RequestNewCustomer);
    dispatch(
      CustomerMasterActions.postNewCustomerMaster(RequestNewCustomer)
    ).then(() => {
      dispatch(CustomerMasterActions.setActiveTabs(4));
      dispatch(CustomerMasterActions.setSuccessModal(true));
      props.history.push({
        pathname: RouteEnum.CustomerSetting,
      });
    });
    dispatch(CustomerMasterActions.clearResult());
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 className="page-title grey">REQUEST NEW CUSTOMER</h1>
            </div>
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
                onClick={() => setOpenCustomerAvability(!openCustomerAvability)}
              >
                <h1 className="page-title-customer-result">
                  CHECK CUSTOMER AVABILITY RESULT
                </h1>
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
                      {tableData.rows.length === 0 ? (
                        <div className="info-recheck">
                          <p className="p-recheck">no-data</p>
                        </div>
                      ) : (
                        <div className="info-recheck">
                          <p className="p-recheck">
                            There are{" "}
                            <b style={{ color: "black" }}>
                              {tableData.totalRow}
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
                        totalPage={tableData.totalRow}
                        pageSize={pageSize}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {tableData.rows.length === 0 ? (
              <div className="recheck-submit-pad" style={{ opacity: 0.5 }}>
                <div className="container-recheck-submit-disable">
                  <input
                    type="checkbox"
                    disabled
                    checked={openCustomerInfo}
                    onChange={() => setOpenCustomerInfo(!openCustomerInfo)}
                    style={{
                      margin: "0 1rem",
                      transform: "scale(1)",
                    }}
                  ></input>
                  <p className="p-recheck" style={{ color: "red" }}>
                    I HAVE CHECKED THE CUSTOMER LIST FROM THE SEARCH RESULTS.
                    AND I DON'T FIND NAME OF THE CUSTOMER I WANT.
                  </p>
                </div>
              </div>
            ) : (
              <div className="recheck-submit-pad" style={{ opacity: 1 }}>
                <div className="container-recheck-submit">
                  <input
                    type="checkbox"
                    checked={openCustomerInfo}
                    onChange={() => {
                      setOpenCustomerInfo(!openCustomerInfo);
                      setIsCheckedToggle(!isChekedToggle);
                    }}
                    style={{
                      margin: "0 1rem",
                      transform: "scale(1)",
                    }}
                  ></input>
                  <p className="p-recheck" style={{ color: "#F97452" }}>
                    I HAVE CHECKED THE CUSTOMER LIST FROM THE SEARCH RESULTS.
                    AND I DON'T FIND NAME OF THE CUSTOMER I WANT.
                  </p>
                </div>
              </div>
            )}

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
              <h1 className="page-title-customer-info">CUSTOMER INFO</h1>
              {isChekedToggle ? (
                <Icon name="triangle down" />
              ) : (
                <Icon name="triangle right" />
              )}
            </div>
            <Divider className="margin-0"></Divider>

            {isChekedToggle && (
              <>
                <FinalForm
                  onSubmit={(values: any) => onSubmitHandler(values)}
                  render={({ handleSubmit, pristine, invalid, values }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="address-padd">
                        <Grid style={{ margin: "0" }}>
                          <Grid.Row columns="equal">
                            <Grid.Column width={8} className="FullGrid767">
                              <Field
                                name="customerLegalName"
                                component={TextInput}
                                labelName="Customer Legal Name"
                                placeholder="E.g. PT. Berca Hardayaperkasa"
                                mandatory={false}
                              />
                            </Grid.Column>
                            <Grid.Column width={8} className="FullGrid767">
                              <Field
                                name="customerBusinessName"
                                component={TextInput}
                                labelName="Customer Businnes Name"
                                placeholder="E.g. Berca.."
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
                                placeholder="E.g. Berca.."
                                mandatory={false}
                              />
                            </Grid.Column>
                            <Grid.Column width={4} className="FullGrid767">
                              <Field
                                name="industryClassification"
                                component={SelectInput}
                                labelName="Industry Classification"
                                allowAdditions={true}
                                placeholder="Pick one classification"
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
                                component={RichTextEditor}
                                placeholder="E.g Jl.Abdul Muis.."
                                labelName="Customer Address"
                                mandatory={false}
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
                                      placeholder="E.g.Indonesia"
                                      mandatory={false}
                                    />
                                  </Grid.Column>
                                  <Grid.Column>
                                    <Field
                                      name="city"
                                      component={TextInput}
                                      labelName="City"
                                      placeholder="E.g Jakarta"
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
                                      placeholder="E.g 123456.."
                                      mandatory={false}
                                    />
                                  </Grid.Column>
                                  <Grid.Column width={10}>
                                    <Field
                                      name="officeNumber"
                                      component={TextInput}
                                      labelName="Office Number"
                                      placeholder="E.g 789-456"
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
                                placeholder="E.g. www.berca.com"
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
                                placeholder="e.g.marketing@berca.co.id"
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
                                placeholder="E.g.1236-5468-0000"
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
                                mandatory={false}
                                placeholder="E.g.1145-4452-223"
                              />
                            </Grid.Column>
                            <Grid.Column width={4} className="FullGrid767">
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
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
                                            placeholder="E.g. Savannah N.."
                                            mandatory={false}
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                          <Field
                                            name="picMobilePhone"
                                            component={TextInput}
                                            labelName="PIC Mobile Phone"
                                            placeholder="E.g. 0812-3456-7890"
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
                                            placeholder="E.g. jhon.doe@berca.co.id"
                                            mandatory={false}
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={7}>
                                          <Field
                                            name="picJobTitle"
                                            component={TextInput}
                                            labelName="PIC Job Title"
                                            placeholder="E.g. Operational Manager"
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

                      {/* <Divider></Divider>
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
                              pristine ||
                              invalid ||
                              !values.customerAddress ||
                              !values.phoneNumber ||
                              !values.industryClassification ||
                              !values.picPhoneNumber ||
                              !values.picJobTitle ||
                              !values.picEmail
                            }
                          >
                            Submit
                          </Button>
                        </div>
                      </div> */}
                    </Form>
                  )}
                />
              </>
            )}
            <Divider style={{ marginBottom: "0px" }}></Divider>

            <div className="button-container">
              <div className="button-inner-container">
                <Button onClick={() => cancelClick()}>Cancel</Button>
                <Button
                  color="blue"
                  style={{ marginRight: "1rem" }}
                  type="submit"
                  onClick={() => onSubmitHandler(data)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </LoadingIndicator>
      </div>
    </Fragment>
  );
};

export default AddNewCustomerSetting;