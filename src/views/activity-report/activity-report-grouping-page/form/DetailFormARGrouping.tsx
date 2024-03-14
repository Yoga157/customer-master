import IStore from "models/IStore";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Radio,
  Segment,
} from "semantic-ui-react";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import FormARGrouping from "./main-content/FormARGrouping/FormARGrouping";
import FormTableARGrouping from "./main-content/FormTableARGrouping/FormTableARGrouping";
import "./FormARGrouping.scss";
import NotifARGrouping from "./main-content/NotifARGrouping/NotifARGrouping";
import {
  RichTextEditor,
  SearchInputList,
  TextInput,
} from "views/components/UI";
import { Field, Form as FinalForm } from "react-final-form";
import ProductList from "./main-content/ProductList/ProductList";
import TotalCustomerExperience from "./main-content/TotalCustomerExperience/TotalCustomerExperience";
import CustomerSignature from "./main-content/CustomerSignature/CustomerSignature";
import SuperiorReview from "./main-content/SuperiorReview/SuperiorReview";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/second-level/ModalSecondLevelActions";
import * as WorkListActions from "stores/work-list/WorkListActions";
import { selectViewActivityReport } from "selectors/work-list/WorklistSelector";
import * as ActivityReportTotalCustomerExperienceActions from "stores/activity-report-total-customer-experience/ActivityReportTotalCustomerExperienceActions";
import * as ActivityReportSuperiorReviewActions from 'stores/activity-report-superior-review/ActivityReportSuperiorReviewActions';
import * as ActivityReportCustomerSignatureActions from 'stores/activity-report-customer-signature/ActivityReportCustomerSignatureActions';
import moment from "moment";

interface IProps {
  type: string;
  id: number;
}

const DetailFormARGrouping: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { type, id } = props;
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      WorkListActions.GET_ACTIVITY_REPORT_BY_GENID,
      WorkListActions.GET_LIST_PRODUCT_ACTIVITY_REPORT,
      ActivityReportTotalCustomerExperienceActions.REQUEST_VIEW_TOTAL_CUSTOMER_EXPERIENCE,
      ActivityReportSuperiorReviewActions.REQUEST_VIEW_SUPERIOR_REVIEW,
      ActivityReportCustomerSignatureActions.REQUEST_VIEW_CUSTOMER_SIGNATURE
    ])
  );
  const [finishDate, setFinishDate] = useState("")
  const [arrivalDate, setArrivalDate] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [startDate, setStartDate] = useState("")
  const activityReportView = useSelector((state: IStore) =>
    selectViewActivityReport(state)
  ); 
  const productList = useSelector(
    (state: IStore) => state.workList.productList
  );

  const onSubmitHandler = (values: any) => {};

  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };

  useEffect(() => {
    setFinishDate(moment(activityReportView.endDate).format(
      "DD MMMM yyyy HH:mm"
    ))
    setArrivalDate(moment(activityReportView.arrivalDate).format(
      "DD MMMM yyyy HH:mm"
    ))
    setDepartureDate(moment(activityReportView.departureDate).format(
      "DD MMMM yyyy HH:mm"
    ))
    setStartDate(moment(activityReportView.startDate).format(
      "DD MMMM yyyy HH:mm"
    ))
  },[activityReportView.endDate,activityReportView.arrivalDate])

  useEffect(() => {
    dispatch(WorkListActions.getActivityReportBy(id));
    dispatch(WorkListActions.getListActivityReportProduct(id));
  }, []);

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid>
          <Grid.Row className="pb-0">
            <Grid.Column className="FullNotif" width={16}>
              <FormARGrouping
                activityReportView={activityReportView}
                type={type}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-0">
            <Grid.Column className="FullNotif" width={16}>
              <NotifARGrouping type="DETAIL" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pl-1 pr-1">
            <Grid.Column>
              <FinalForm
                onSubmit={(values: any) => onSubmitHandler(values)}
                initialValues={activityReportView}
                render={({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} loading={isRequesting}>
                    <Grid>
                      {/* {type === "ADD" && ( */}
                      <>
                        <Grid.Row columns={2}>
                          <Grid.Column
                            style={{ padding: "15px" }}
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={6}
                          >
                            <Field
                              name="contactName"
                              component={TextInput}
                              labelName="Contact Name"
                              disabled={true}
                            />
                          </Grid.Column>
                          <Grid.Column
                            style={{ padding: "15px" }}
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={6}
                          >
                            <Field
                              name="phone"
                              component={TextInput}
                              labelColor="white"
                              labelName="Contact Number"
                              disabled={true}
                            />
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={16}
                          >
                            <Field
                              style={{
                                paddingTop: "-15px",
                                paddingRight: "15px",
                                paddingLeft: "15px",
                              }}
                              name="address"
                              component={RichTextEditor}
                              placeholder="e.g.What customer need.."
                              labelName="Address"
                              TextAlign="left"
                            />
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={2}>
                          <Grid.Column
                            style={{ padding: "15px" }}
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={8}
                          >
                            <Field
                              name="activityCategory"
                              component={TextInput}
                              labelName="Activity Category"
                              mandatory={false}
                              disabled={true}
                            />
                          </Grid.Column>
                          <Grid.Column
                            style={{ padding: "15px" }}
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={8}
                          >
                            <Field
                              name="Datedeparture"
                              component={TextInput}
                              labelColor="white"
                              labelName="Departure Date"
                              disabled={true}
                              mandatory={false}
                              defaultValue={departureDate}
                            />
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={2}>
                          <Grid.Column
                            style={{ padding: "15px" }}
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={8}
                          >
                            <Field
                              name="Datestart"
                              component={TextInput}
                              labelName="Start Date"
                              mandatory={false}
                              disabled={true}
                              defaultValue={startDate}
                            />
                          </Grid.Column>
                          <Grid.Column
                            style={{ padding: "15px" }}
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={8}
                          >
                            <Field
                              name="status"
                              component={TextInput}
                              labelColor="white"
                              labelName="Status"
                              disabled={true}
                              mandatory={false}
                            />
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={1}>
                          <Grid.Column
                            style={{ padding: "15px" }}
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={16}
                          >
                            <Field
                              name="engineerList"
                              // component={SearchInputList}
                              component={TextInput}
                              labelName="Engineer List"
                              mandatory={false}
                              disabled={true}
                            />
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={16}
                          >
                            <Field
                              style={{
                                paddingTop: "-15px",
                                paddingRight: "15px",
                                paddingLeft: "15px",
                              }}
                              name="notes"
                              component={RichTextEditor}
                              placeholder="e.g.What customer need.."
                              labelName="Note"
                              TextAlign="left"
                              defaultValue={"Lorem Ipsum dolor sit amet"}
                            />
                          </Grid.Column>
                        </Grid.Row>

                        {/* ProductListTable */}
                        <Grid.Row>
                          <Grid.Column
                            // className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={16}
                          >
                            <ProductList productList={productList} />
                            <Divider />
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={16}
                          >
                            <Field
                              style={{
                                paddingTop: "-15px",
                                paddingRight: "15px",
                                paddingLeft: "15px",
                              }}
                              name="description"
                              component={RichTextEditor}
                              placeholder="e.g.What customer need.."
                              labelName="Description/Error Message"
                              TextAlign="left"
                            />
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={16}
                          >
                            <Field
                              style={{
                                paddingTop: "-15px",
                                paddingRight: "15px",
                                paddingLeft: "15px",
                              }}
                              name="actionTaken"
                              component={RichTextEditor}
                              placeholder="e.g.What customer need.."
                              labelName="Action Taken"
                              TextAlign="left"
                            />
                          </Grid.Column>
                        </Grid.Row>

                        {/* TotalCustomerExperience */}
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <TotalCustomerExperience id={id} />
                          </Grid.Column>
                        </Grid.Row>

                        {/* CustomerSignature */}
                        <Grid.Row>
                          <Grid.Column>
                            <CustomerSignature id={id} />
                          </Grid.Column>
                        </Grid.Row>

                        {/* SuperiorReview */}
                        <Grid.Row>
                          <Grid.Column>
                            <SuperiorReview id={id} />
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={2}>
                          <Grid.Column
                            style={{ padding: "15px" }}
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={8}
                          >
                            <Field
                              name="DateStart"
                              component={TextInput}
                              labelName="Finish Date"
                              // mandatory={false}
                              disabled={true}
                              defaultValue={finishDate}
                            />
                          </Grid.Column>
                          <Grid.Column
                            style={{ padding: "15px" }}
                            className="ViewLabel"
                            mobile={16}
                            tablet={16}
                            computer={8}
                          >
                            <Field
                              name="DateArrival"
                              component={TextInput}
                              labelColor="white"
                              labelName="Arrival Date"
                              disabled={true}
                              defaultValue={arrivalDate}
                              // mandatory={false}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Divider />

                        <Grid.Row>
                          <Grid.Column textAlign="center">
                            <Button
                              type="button"
                              onClick={onClose}
                              content="Cancel"
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </>
                      {/* )} */}
                    </Grid>
                  </Form>
                )}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default DetailFormARGrouping;
