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
import { selectReqCustomerNewAccount } from "selectors/customer-master/CustomerMasterSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectUserResult } from "selectors/user/UserSelector";
import "./addNewCustomerSetting.scss";

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
  const [allCustomerData, setAllCustomerData] = useState(tableData.rows);
  const [reqCustomerPageSize, setReqCustomerPageSize] = useState(10);
  const [reqCustomerActivePage, setReqCustomerActivePage] = useState(1);
  const [reqCustomerData, setReqCustomerData] = useState(
    allCustomerData.slice(0, reqCustomerPageSize)
  );
  const history = useHistory();
  const [pageSize, setPage] = useState(10);
  const activePage = useSelector(
    (state: IStore) => state.customerSetting.activePage
  );
  const [titleCustomer, setTitleCustomer] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [picName, setPicName] = useState("");

  // fungsi mengatur perubahan halaman Request New Customer
  const reqCustomerChangePage = (e, page) => {
    const startIndex = (page.activePage - 1) * reqCustomerPageSize;
    const endIndex = startIndex + reqCustomerPageSize;
    const paginatedData = allCustomerData.slice(startIndex, endIndex);

    setReqCustomerData(paginatedData);
    setReqCustomerActivePage(page.activePage);
  };

  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const [address, setAddress] = useState({ address: "" });
  const [uploadFile, setUploadFile] = useState("");

  const onSubmitSearch = async (data) => {
    dispatch(
      CustomerMasterActions.requestSearchCustomerMaster(
        1,
        10,
        "CustomerID",
        "ascending",
        data.titleCustomer,
        data.customerName,
        data.picName
      )
    );
  };

  const cancelClick = () => {
    history.push("/customer-setting");
  };

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

              <div className="container-recheck">
                {tableData.rows.length === 0 ? (
                  <div className="info-recheck">
                    <p className="p-recheck">No data</p>
                  </div>
                ) : (
                  <div className="info-recheck">
                    <p className="p-recheck">
                      There are{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {tableData.rows.length}
                      </span>{" "}
                      result from the customer search{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {tableData.rows.customerName}.{" "}
                      </span>
                      Please recheck again before you make new customers
                      request.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="padding-horizontal">
              <TableRequestNewCustomer
                data={tableData.rows}
                header={data.reqNewCustomerHeader}
                sequenceNum={true}
              />
              <div style={{ marginTop: "1rem" }}>
                <Pagination
                  activePage={reqCustomerActivePage}
                  onPageChange={(e, data) => reqCustomerChangePage(e, data)}
                  totalPage={allCustomerData.length}
                  pageSize={reqCustomerPageSize}
                />
              </div>
            </div>
            {tableData.rows.length === 0 ? (
              <div className="recheck-submit-pad" style={{ opacity: 0.7 }}>
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
                onSubmit={(values: any) => onSubmitSearch(values)}
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
                              name="address"
                              component={RichTextEditor}
                              placeholder="2118 Thornridge Cir. Syracuse"
                              labelName="Customer Address"
                              // value={address}
                              // defaultValue={address}
                            />
                          </div>
                          <div className="container-upload">
                            <Field
                              name="uploadBusinessCard"
                              component={FileUpload}
                              labelName="Upload Business Card"
                              placeholder="Pick your bussines card image.."
                              onChanged={(e) =>
                                setUploadFile(e.target.files[0])
                              }
                              // mandatory={true}
                            />
                          </div>
                        </div>

                        <Grid style={{ margin: "0" }}>
                          <Grid.Row columns="equal">
                            <Grid.Column
                              width={3}
                              className="FullGrid767 LabelNameLabel"
                            >
                              <Field
                                name="OfficeNumber"
                                component={TextInput}
                                labelName="Office Number"
                              />
                            </Grid.Column>
                            <Grid.Column width={4} className="FullGrid767">
                              <Field
                                name="industryClassification"
                                component={SelectInput}
                                // onChanged={onChangeCustomerPIC}
                                // placeholder="e.g.Jhon Doe.."
                                labelName="Industry Classification"
                                allowAdditions={true}
                                // onAddItems={onAddCustomerPIC}
                                // mandatory={false}
                                // options={customerPICStore}
                                // values={customerPICID}
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
                                name="sosialMedia"
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
                                  name="picMobilePhone"
                                  component={TextInput}
                                  labelName="PIC Mobile Phone"
                                />
                              </Grid.Column>
                              <Grid.Column width={6} className="FullGrid767">
                                <Field
                                  name="jobTitle"
                                  component={TextInput}
                                  labelName="Job Title"
                                />
                              </Grid.Column>
                              <Grid.Column width={6} className="FullGrid767">
                                <Field
                                  name="email"
                                  component={TextInput}
                                  labelName="Email"
                                />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Segment>
                      </div>
                      <Divider></Divider>
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
