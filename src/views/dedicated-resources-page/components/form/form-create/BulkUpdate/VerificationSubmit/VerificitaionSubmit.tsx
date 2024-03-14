import React, { Fragment, useState } from "react";
import { Grid, Form, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import "./VerificationSubmit.scss";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { Form as FinalForm, Field } from "react-final-form";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import RouteEnum from "constants/RouteEnum";

interface IProps {
  newValues: any;
  setTriggerDraft: any;
  triggerDraft: boolean;
  setDataDeductions: any;
  setDataSalaryBenefit: any;
  setDataOtherBenefit:any;
}

const VerificationSubmit: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const { newValues, setTriggerDraft, triggerDraft, setDataDeductions, setDataSalaryBenefit, setDataOtherBenefit } = props;

  const onClose = () => {
    dispatch(ModalAction.CLOSE());
    setTriggerDraft(false);
  };

  const onSubmitHandler = (values: any) => {
    if (triggerDraft) {
      dispatch(DedicatedResourcesActions.requestpostBulkUpdateAsDraft(newValues))
      .then(() => {
        window.location.replace(RouteEnum.DedicatedResourcesBulkUpdate);
    })
      // .then(() => {
      //   const newDeductions = newValues.listRenewalContractDash.deduction?.map(
      //       (obj) => {
      //         return {
      //           ...obj,
      //           isSave: 0,
      //         };
      //       }
      //     );
      //     setDataDeductions(newDeductions)
      //     const newSalaryBenefit = newValues.listRenewalContractDash.salaryBenefit?.map(
      //       (obj) => {
      //         return {
      //           ...obj,
      //           isSave: 0,
      //         };
      //       }
      //     );
      //     setDataSalaryBenefit(newSalaryBenefit)
      //     const newOtherBenefit = newValues.listRenewalContractDash.otherBenefit?.map(
      //       (obj) => {
      //         return {
      //           ...obj,
      //           isSave: 0,
      //         };
      //       }
      //     );
      //       setDataOtherBenefit(newOtherBenefit)
      // })
    } else {
      dispatch(DedicatedResourcesActions.requestpostBulkUpdate(newValues))
      .then(() => {
          window.location.replace(RouteEnum.DedicatedResources);
      })
    }

    onClose();
  };

  return (
    <Fragment>
      {/* <Grid.Column className='TopApproveReject' textAlign='center'>
            <p>Approve or Reject Extend Contract</p>
        </Grid.Column> */}
      {/* <Card.Header className='TopApproveReject'>Approve or Reject Extend Contract</Card.Header> */}
      {/* <div className='TopApproveReject'>
           
        </div> */}
      <Grid className="TopApproveReject">
        <Grid.Column textAlign="center">
          <p>Validation to Submit</p>
        </Grid.Column>
      </Grid>

      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Row style={{ padding: "50px" }}>
                <Grid.Column width={16} textAlign="center">
                  <div>
                    <h2>
                      Are You Sure to{" "}
                      {triggerDraft ? "Save as Draft" : "Submit Bulk"} <br />
                      of Renewal Contract?
                    </h2>
                  </div>
                </Grid.Column>
              </Grid.Row>

              {/* <Grid.Row style={{top:"20px"}}>
                        <Grid.Column width={16}>
                            <Field name="notes" component={RichTextEditor} placeholder="Please put remark or other notes" mandatorys={false} labelName="Remaks" />
                        </Grid.Column>
                    </Grid.Row> */}

              <Grid.Row style={{ top: "20px" }}>
                <Grid.Column style={{ backgroundColor: "#FFD2D2" }}>
                  <span style={{ color: "red", fontWeight: 600 }}>
                    Warning!!
                  </span>
                  <br />
                  <span style={{ color: "red" }}>
                    As another option you can keep Renewal Submission Contract
                    as Draft before you submit
                  </span>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row style={{ top: "20px" }}>
                <Grid.Column width={16}>
                  {/* disabled={pristine || invalid} */}
                  <Button color="blue" floated="right" content="Submit" />

                  <Button
                    type="button"
                    floated="right"
                    content="Close"
                    onClick={onClose}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default VerificationSubmit;
