import React, { useState, Fragment, useEffect } from "react";
import { Grid, Segment, Form, Header } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, RichTextEditor, Tooltips } from "views/components/UI";
import styles from "./SuperiorReview.module.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { selectUserResult } from "selectors/user/UserSelector";
import { selectViewSuperiorReview } from "selectors/activity-report/ActivityReportSelector";
import IUserResult from "selectors/user/models/IUserResult";
import * as ActivityReportSuperiorReviewActions from "stores/activity-report-superior-review/ActivityReportSuperiorReviewActions";
import moment from "moment";

interface IProps {
  id: number;
}

const SuperiorReview: React.FC<IProps> = ({ id }) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const [superiorName, setSuperiorName] = useState("");
  const [department, setDepartment] = useState("");
  const [reviewDate, setReviewDate] = useState("");

  const viewActivityReportSuperiorReview = useSelector((state: IStore) =>
    selectViewSuperiorReview(state)
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  
  useEffect(() => {
    dispatch(
      ActivityReportSuperiorReviewActions.requestViewSuperiorReviewById(
        +id,
        +currentUser.employeeID
      )
    );
  }, []);

  useEffect(() => {
    if (id > 0) {
      dispatch(
        ActivityReportSuperiorReviewActions.requestViewSuperiorReviewById(
          +id,
          +currentUser.employeeID
        )
      );
    }
  }, [dispatch, id]);

  useEffect(() => {
    setSuperiorName(
      viewActivityReportSuperiorReview.superiorName === ""
        ? "-"
        : viewActivityReportSuperiorReview.superiorName
    );
    setReviewDate(
      viewActivityReportSuperiorReview.reviewDate === undefined
        ? "-"
        : `${moment(viewActivityReportSuperiorReview.reviewDate).format(
            "DD MMMM yyyy"
          )} ${moment(viewActivityReportSuperiorReview.reviewDate).format(
            "HH:mm"
          )}`
    );

    setDepartment(
      viewActivityReportSuperiorReview.department === ""
        ? "-"
        : viewActivityReportSuperiorReview.department
    );
  }, [viewActivityReportSuperiorReview]);

  const onSubmitHandler = () => {};

  return (
    <>
      {viewActivityReportSuperiorReview.isAllowAccess && (
        <Segment className="LightGreyNotif">
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column width={16} className="ViewLabel">
                <FinalForm
                  onSubmit={(values: any) => onSubmitHandler()}
                  // validate={}
                  initialValues={viewActivityReportSuperiorReview}
                  key={1}
                  render={({ handleSubmit }) => (
                    <Form
                      key={1}
                      onSubmit={handleSubmit}
                      // loading={isRequesting}
                    >
                      <Grid>
                        <Grid.Row columns="equal">
                          <Grid.Column>
                            <Header>
                              <Header.Content>Superior Review</Header.Content>
                              {viewActivityReportSuperiorReview.isAllowReview && (
                                <Header.Content className="FloatRight">
                                  {disableComponent && (
                                    <Fragment>
                                      <Tooltips
                                        content="Edit Ticket Information"
                                        trigger={
                                          <Button
                                            basic
                                            type="button"
                                            compact
                                            icon="edit"
                                            // onClick={(e: Event) => onEditHandler(e)}
                                            floated="right"
                                          />
                                        }
                                      />
                                    </Fragment>
                                  )}
                                  {!disableComponent && (
                                    <Fragment>
                                      <Tooltips
                                        content="Save Update"
                                        trigger={
                                          <Button
                                            basic
                                            compact
                                            icon="save"
                                            floated="right"
                                          />
                                        }
                                      />
                                      <Tooltips
                                        content="Cancel Update"
                                        trigger={
                                          <Button
                                            type="button"
                                            basic
                                            compact
                                            icon="cancel"
                                            floated="right"
                                            // onClick={onCancelHandler}
                                          />
                                        }
                                      />
                                    </Fragment>
                                  )}
                                </Header.Content>
                              )}
                            </Header>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns="equal" className="pt-0">
                          <Grid.Column width={16} className="ViewLabel">
                            <Field
                              name="reviewNotes"
                              component={RichTextEditor}
                              disabled={disableComponent}
                              mandatory={false}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Form>
                  )}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column width={16} className="ViewLabel">
                <Segment className="WhiteNotes">
                  <table className={styles.fontTable}>
                    <tbody>
                      <tr>
                        <td>Name </td>
                        <td>: </td>
                        <td>{superiorName}</td>
                      </tr>
                      <tr>
                        <td>Department </td>
                        <td>: </td>
                        <td>{department}</td>
                      </tr>
                      <tr>
                        <td>Date </td>
                        <td>: </td>
                        <td>{reviewDate}</td>
                      </tr>
                    </tbody>
                  </table>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )}
    </>
  );
};

export default SuperiorReview;
