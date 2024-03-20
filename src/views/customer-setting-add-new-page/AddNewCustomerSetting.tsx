import React, {
  useEffect,
  Fragment,
  useState,
  useCallback,
  useRef,
} from "react";
import * as data from "./data";
import {
  Button,
  Pagination,
  RichTextEditor,
  FileUpload,
  TextInput,
  SelectInput,
} from "views/components/UI";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Link, useParams, useHistory } from "react-router-dom";
import TableRequestNewCustomer from "./components/table/table-request-new-customer/TableRequestNewCustomer";
import { reqNewCustomerData } from "./data";
import { Form, Grid, Divider, Segment } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import {
  combineValidators,
  isRequired,
  composeValidators,
  createValidator,
} from "revalidate";
import { format } from "date-fns";
import { selectReqCustomerNewAccount } from "selectors/customer-master/CustomerMasterSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectUserResult } from "selectors/user/UserSelector";
import "./addNewCustomerSetting.scss";
import * as CustomerName from "stores/customer-name/CustomerNameActivityActions";
import CustomerMasterPostModel from "stores/customer-master/models/CustomerMasterPostModel";
import RouteEnum from "constants/RouteEnum";

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
  // console.log("Hasil Tabel", tableData);

  const history = useHistory();
  const [searchedCustomerName, setSearchedCustomerName] = useState("");
  const [searchedPicName, setSearcedhPicName] = useState("");
  const [searchedTitleCust, setSearchedTitleCust] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const activePage = useSelector(
    (state: IStore) => state.customerMaster.activePage
  );
  const [pageSize, setPage] = useState(10);

  const [address, setAddress] = useState({ address: "" });
  const [uploadFile, setUploadFile] = useState("");

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
        data.titleCustomer,
        data.customerName,
        data.picName
      )
    );
    dispatch(CustomerMasterActions.setActivePage(1));
    setSearchedCustomerName(data.customerName);
    setSearcedhPicName(data.picName);
    setSearchedTitleCust(data.titleCustomer);
  };

  const onSubmitHandler = async (data: any) => {
    const userId: any = localStorage.getItem("userLogin");
    const date = format(new Date(), "yyyy-MM-dd");
    const isSuccess = true;

    const RequestNewCustomer = new CustomerMasterPostModel(data);
    RequestNewCustomer.titleCustomer = searchedTitleCust;
    RequestNewCustomer.customerName = searchedCustomerName;
    RequestNewCustomer.picName = searchedPicName;
    RequestNewCustomer.customerAddress = data.customerAddress;
    RequestNewCustomer.phoneNumber = data.phoneNumber;
    RequestNewCustomer.industryClass = data.industryClass;
    RequestNewCustomer.website = data.website;
    RequestNewCustomer.socialMedia = data.socialMedia;
    RequestNewCustomer.picPhoneNumber = data.picPhoneNumber;
    RequestNewCustomer.picJobTitle = data.picJobTitle;
    RequestNewCustomer.picEmail = data.picEmail;
    RequestNewCustomer.createdUserID = JSON.parse(userId).employeeID;
    RequestNewCustomer.modifyUserID = JSON.parse(userId).employeeID;

    dispatch(
      CustomerMasterActions.postNewCustomerMaster(RequestNewCustomer)
    ).then(() => {
      dispatch(CustomerMasterActions.setActiveTabs(4));
      // props.history.push({
      //   pathname: RouteEnum.CustomerSetting,
      //   state: { isSuccess },
      // });
    });
    dispatch(CustomerMasterActions.clearResult());
  };

  const cancelClick = () => {
    setSearchedCustomerName("");
    history.push("/customer-setting");
  };

  useEffect(() => {
    dispatch(CustomerMasterActions.clearResult());
  }, []);

  return (
    <Fragment>
      <div ref={linkRef}>
        <Link to="/customer-setting" className="link">
          {"< Back to Customer List"}
        </Link>
        <LoadingIndicator>
          <div className="form-container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 className="page-title grey">REQUEST NEW CUSTOMER</h1>
            </div>
            <Divider></Divider>

            <div className="FullContainer">
              <FinalForm
                onSubmit={(values: any) => onSubmitSearch(values)}
                render={({ handleSubmit, pristine, invalid }) => (
                  <Form onSubmit={handleSubmit}>
                    <Segment className="LightYellowContainer">
                      <Grid>
                        <Grid.Row columns="equal">
                          <Grid.Column
                            width={3}
                            className="FullGrid767 LabelNameLabel"
                          >
                            <Field
                              name="titleCustomer"
                              component={TextInput}
                              placeholder="e.g.PT .."
                              labelName="Title Customer"
                              mandatory={false}
                            />
                          </Grid.Column>
                          <Grid.Column width={7} className="FullGrid767">
                            <Field
                              name="customerName"
                              component={TextInput}
                              placeholder="e.g. Berca Hardaya .."
                              labelName="Customer Name"
                              mandatory={false}
                            />
                          </Grid.Column>
                          <Grid.Column width={6} className="FullGrid767">
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
                          <Grid.Column>
                            <Button
                              type="submit"
                              color="blue"
                              disabled={false}
                              floated="right"
                              size="small"
                              content="Check Customer Avability"
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Form>
                )}
              />

              <LoadingIndicator isActive={isRequesting}>
                <div className="container-recheck">
                  {tableData.rows.length === 0 ? (
                    <div className="info-recheck">
                      <p className="p-recheck">No-data</p>
                    </div>
                  ) : (
                    <div className="info-recheck">
                      <p className="p-recheck">
                        There are{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {tableData.totalRow}
                        </span>{" "}
                        result from the customer search{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {searchedCustomerName
                            ? searchedCustomerName.charAt(0).toUpperCase() +
                              searchedCustomerName.slice(1)
                            : ""}
                        </span>{" "}
                        Please recheck again before you make new customers
                        request.
                      </p>
                    </div>
                  )}
                </div>
              </LoadingIndicator>
            </div>

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
                  onPageChange={(e, data) => handlePaginationChange(e, data)}
                  totalPage={tableData.totalRow}
                  pageSize={pageSize}
                />
              </div>
            </div>
            {tableData.rows.length === 0 ? (
              <div className="recheck-submit-pad" style={{ opacity: 0.5 }}>
                <div className="container-recheck-submit-disable">
                  <input
                    type="checkbox"
                    disabled
                    checked={showAdditionalInfo}
                    onChange={() => setShowAdditionalInfo(!showAdditionalInfo)}
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
                    checked={showAdditionalInfo}
                    onChange={() => setShowAdditionalInfo(!showAdditionalInfo)}
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

            <Divider></Divider>
            {showAdditionalInfo && (
              <FinalForm
                onSubmit={(values: any) => onSubmitHandler(values)}
                render={({ handleSubmit, pristine, invalid }) => (
                  <Form onSubmit={handleSubmit}>
                    <div>
                      <h1 className="page-title-customer grey">
                        CUSTOMER INFO
                      </h1>
                      <Divider></Divider>
                      <div className="address-padd">
                        <div className="container-flex-customer">
                          <div className="container-address">
                            <Field
                              name="customerAddress"
                              component={RichTextEditor}
                              placeholder="2118 Thornridge Cir. Syracuse"
                              labelName="Customer Address"
                            />
                          </div>
                          {/* <div className="container-upload">
                            <Field
                              name="uploadBusinessCard"
                              component={FileUpload}
                              labelName="Upload Business Card"
                              placeholder="Pick your bussines card image.."
                              onChanged={(e) =>
                                setUploadFile(e.target.files[0])
                              }
                            />
                          </div> */}
                        </div>

                        <Grid style={{ margin: "0" }}>
                          <Grid.Row columns="equal">
                            <Grid.Column
                              width={3}
                              className="FullGrid767 LabelNameLabel"
                            >
                              <Field
                                name="phoneNumber"
                                component={TextInput}
                                labelName="Office Number"
                              />
                            </Grid.Column>
                            <Grid.Column width={4} className="FullGrid767">
                              <Field
                                name="industryClassification"
                                component={SelectInput}
                                labelName="Industry Classification"
                                allowAdditions={true}
                              />
                            </Grid.Column>
                            <Grid.Column width={5} className="FullGrid767">
                              <Field
                                name="website"
                                component={TextInput}
                                labelName="Website"
                              />
                            </Grid.Column>

                            <Grid.Column width={4} className="FullGrid767">
                              <Field
                                name="socialMedia"
                                component={TextInput}
                                // placeholder="e.g.Jhon Doe .."
                                labelName="Social Media"
                              />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </div>
                      <div className="grey-padding">
                        <Segment className="LightGreyContainer">
                          <Grid>
                            <Grid.Row columns="equal">
                              <Grid.Column
                                width={4}
                                className="FullGrid767 LabelNameLabel"
                              >
                                <Field
                                  name="picPhoneNumber"
                                  component={TextInput}
                                  labelName="PIC Mobile Phone"
                                />
                              </Grid.Column>
                              <Grid.Column width={6} className="FullGrid767">
                                <Field
                                  name="picJobTitle"
                                  component={TextInput}
                                  labelName="Job Title"
                                />
                              </Grid.Column>
                              <Grid.Column width={6} className="FullGrid767">
                                <Field
                                  name="picEmail"
                                  component={TextInput}
                                  labelName="Email"
                                />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Segment>
                      </div>
                      <Divider></Divider>
                    </div>
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
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              />
            )}
          </div>
        </LoadingIndicator>
      </div>
    </Fragment>
  );
};

export default AddNewCustomerSetting;
