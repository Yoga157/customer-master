import React, { useEffect, Fragment, useState, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm, Field } from "react-final-form";
import { useHistory } from "react-router-dom";
import TableRequestNewCustomer from "./components/table/table-request-new-customer/TableRequestNewCustomer";
import { reqNewCustomerData } from "./data";
import { Form, Grid, Divider, Segment } from "semantic-ui-react";
import { selectReqCustomerNewAccount } from "selectors/customer-master/CustomerMasterSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import "./addNewCustomerSetting.scss";
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
  const history = useHistory();
  const [searchedCustomerName, setSearchedCustomerName] = useState("");
  const [searchedPicName, setSearcedhPicName] = useState("");
  const [searchedTitleCust, setSearchedTitleCust] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const activePage = useSelector(
    (state: IStore) => state.customerMaster.activePage
  );
  const [pageSize, setPage] = useState(10);
  const [uploadFile, setUploadFile] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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

  useEffect(() => {
    dispatch(CustomerMasterActions.clearResult());
  }, []);

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
            <Divider style={{ marginTop: 0 }}></Divider>

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
                            computer={3}
                          >
                            <Field
                              name="titleCustomer"
                              component={TextInput}
                              placeholder="e.g.PT .."
                              labelName="Title Customer"
                              mandatory={false}
                            />
                          </Grid.Column>
                          <Grid.Column
                            width={16}
                            mobile={16}
                            tablet={16}
                            computer={7}
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
                                pristine ||
                                invalid ||
                                !values.titleCustomer ||
                                !values.customerName
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

              <LoadingIndicator>
                <div className="container-recheck">
                  {tableData.rows.length === 0 ? (
                    <div className="info-recheck">
                      <p className="p-recheck">No-data</p>
                    </div>
                  ) : (
                    <div className="info-recheck">
                      <p className="p-recheck">
                        There are{" "}
                        <b style={{ color: "black" }}>{tableData.totalRow}</b>{" "}
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
            {isButtonClicked != true ? (
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
                render={({ handleSubmit, pristine, invalid, values }) => (
                  <Form onSubmit={handleSubmit}>
                    <div>
                      <h1 className="page-title-customer grey">
                        CUSTOMER INFO
                      </h1>
                      <Divider style={{ marginTop: 0 }}></Divider>
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
                        </div>

                        <Grid style={{ margin: "0" }}>
                          <Grid.Row columns="equal">
                            <Grid.Column
                              width={16}
                              mobile={16}
                              tablet={16}
                              computer={3}
                              className="FullGrid767"
                            >
                              <Field
                                name="phoneNumber"
                                component={TextInput}
                                labelName="Office Number"
                                placeholder="e.g.021345 .."
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
                                name="industryClassification"
                                component={SelectInput}
                                labelName="Industry Classification"
                                allowAdditions={true}
                                placeholder="e.g.Manufacturing .."
                              />
                            </Grid.Column>
                            <Grid.Column
                              width={16}
                              mobile={16}
                              tablet={16}
                              computer={5}
                              className="FullGrid767"
                            >
                              <Field
                                name="website"
                                component={TextInput}
                                labelName="Website"
                                placeholder="e.g.www.google.com .."
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
                                name="socialMedia"
                                component={TextInput}
                                placeholder="e.g.social media .."
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
                                width={16}
                                mobile={16}
                                tablet={16}
                                computer={4}
                                className="FullGrid767 "
                              >
                                <Field
                                  name="picPhoneNumber"
                                  component={TextInput}
                                  labelName="PIC Mobile Phone"
                                  placeholder="e.g.0812345.."
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
                                  name="picJobTitle"
                                  component={TextInput}
                                  labelName="Job Title"
                                  placeholder="e.g.Manager .."
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
                                  name="picEmail"
                                  component={TextInput}
                                  labelName="Email"
                                  placeholder="e.g.email@gmail.com.."
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
