import "./EmployeeDetailStyle.scss";
import React, { useState, Fragment, useEffect } from "react";
import { Grid, Form, Card, Header } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput, Button, Tooltips, DateName } from "views/components/UI";
import { useSelector, useDispatch } from "react-redux";
import IStore from "models/IStore";
import IUserResult from "selectors/user/models/IUserResult";
import { Dispatch } from "redux";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectEmployeeDetail, selectEmployeeInfo, selectWorkFlowHeader } from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import { selectUserResult } from "selectors/user/UserSelector";
import PutEmployeeDetailModel from "stores/dedicated-resources/models/DedicatedResourcesViewEdit/PutEmployeeDetailModel";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";

interface IProps {
  contractID: number;
}

const EmployeeDetail: React.FC<IProps> = ({ contractID }) => {
  const dispatch: Dispatch = useDispatch();
  const [validate, setValidate] = useState(false);
  const [disableComponent, setDisableComponent] = useState(true);

  const EmployeeDetailStore = useSelector((state: IStore) =>
    selectEmployeeDetail(state)
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const EmployeeInfo = useSelector((state: IStore) =>
    selectEmployeeInfo(state)
  );

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );
  const WorkFlowHeader = useSelector((state: IStore) =>
  selectWorkFlowHeader(state)
);

  const onEditHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onCancel = () => {
    if (!disableComponent) {
      setDisableComponent(true);
    }
  };
  const onSubmitHandler = (values: any) => {
    const newValues = new PutEmployeeDetailModel();

    newValues.contractNo = values.contractNo;
    newValues.contractID = values.contractID;
    newValues.employeeDiv = values.employeeDiv;
    newValues.employeeDept = values.employeeDept;
    newValues.position = values.position;
    newValues.education = values.education;
    newValues.expBeforeJoin = values.expBeforeJoin;
    newValues.workInBHP = values.workInBHP;
    newValues.level = values.level;
    newValues.supervisor = values.supervisor;
    newValues.lastPeriodInBHP = values.lastPeriodInBHP;
    newValues.newBeginDate = values.newBeginDate;
    newValues.newEndDate = values.newEndDate;
    newValues.reasonToExtend = values.reasonToExtend;
    newValues.placement = values.placement;
    newValues.userLoginID = currentUser.employeeID;

    dispatch(DedicatedResourcesActions.requestPutEmployeeDetail(newValues));
    setDisableComponent(true);
  };
  const result = useSelector(
    (state: IStore) => state.dedicatedresources.resultActions
  );

  
  useEffect(() => {
    // Check yang Login sesuai dengan Waiting Approval && Check Setelah SubmitApproval Button Disabled
   
        if(WorkFlowHeader.resultObj?.length > 0)
        {
            //Cek Approval Pertama Bukan pak Alex
            if(WorkFlowHeader.resultObj[0].status === "Waiting For Approval")
            {
              setValidate(true);
            }

            if(WorkFlowHeader.resultObj[0].status === "APPROVED" && WorkFlowHeader.resultObj[1].status === "Waiting For Approval")
            {
              setValidate(true);
            }

            if(WorkFlowHeader.resultObj[0].status === "APPROVED" && WorkFlowHeader.resultObj[1].status === "APPROVED")
            {
              setValidate(true);
            }

            if(WorkFlowHeader.resultObj[0].status === "REJECTED")
            {
              setValidate(false);
            }

            if(WorkFlowHeader.resultObj[1].status === "REJECTED")
            {
              setValidate(false);
            }
        }
   
  }, [WorkFlowHeader.resultObj]);

  return (
    <FinalForm
      onSubmit={(values: PutEmployeeDetailModel) => onSubmitHandler(values)}
      initialValues={EmployeeDetailStore}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column width={16} className="FloatRight">
                {disableComponent && (
                  <>
                    <Tooltips
                      content="Edit Employee Details"
                      trigger={
                        <Button
                          basic
                          type="button"
                          compact
                          icon="edit"
                          onClick={(e: Event) => onEditHandler(e)}
                          disabled={
                            validate
                          }
                          floated="right"
                        />
                      }
                    />

                    <Header as="h4" className="mt-0">
                      <Header.Content>
                        Employee Detail
                      </Header.Content>
                    </Header>
                  </>
                )}
                {!disableComponent && (
                  <Header.Content className="FloatRight">
                    <Tooltips
                      content="Save Update"
                      trigger={
                        <Button basic compact icon="save" floated="right" />
                      }
                      // chkPMODeptID
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
                          onClick={() => {
                            onCancel();
                          }}
                        />
                      }
                    />
                  </Header.Content>
                )}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column className="ViewLabel">
                <Field
                  name="employeeDiv"
                  component={TextInput}
                  placeholder="e.g.Your Project Name"
                  labelName="Employee Div"
                  disabled={true}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
            <Grid.Column className="ViewLabel" width={4}>
                <Field
                  name="employeeDept"
                  component={TextInput}
                  placeholder="e.g.Your Project Name"
                  labelName="Employee Dept"
                  disabled={true}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel" width={12}>
                <Field
                  name="position"
                  component={TextInput}
                  placeholder="e.g.Engineer"
                  labelName="Position"
                  disabled={true}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column className="ViewLabel">
                <Field
                  name="education"
                  component={TextInput}
                  placeholder="e.g.Bachelor"
                  labelName="Education"
                  disabled={true}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="expBeforeJoin"
                  component={TextInput}
                  placeholder="e.g.PT. ABCD..."
                  labelName="Experience before join in BHP"
                  disabled={true}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column className="ViewLabel">
                <Field
                  name="workInBHP"
                  component={TextInput}
                  placeholder="e.g.Project Name"
                  labelName="Work in BHP"
                  disabled={true}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="level"
                  component={TextInput}
                  placeholder="e.g.Super Visor"
                  labelName="Level"
                  disabled={true}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column className="ViewLabel">
                <Field
                  name="supervisor"
                  component={TextInput}
                  placeholder="e.g.Jhon Doe"
                  labelName="Supervisor"
                  disabled={true}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="lastPeriodInBHP"
                  component={TextInput}
                  placeholder="e.g.December"
                  labelName="Last Period in BHP (months)"
                  disabled={true}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column className="ViewLabel">
                {/* <Field
                                    name="projectName"
                                    component={TextInput}
                                    placeholder="e.g.Your Project Name"
                                    labelName="New Begin Date"
                                    values={"01/01/2023"}
                                    disabled={disableComponent}
                                /> */}
                <Field
                  name="newBeginDate"
                  component={DateName}
                  date={true}
                  labelName="New Begin Date"
                  placeholder="09/09/2020"
                  disabled={disableComponent}
                  formated="MMM yyyy"
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="newEndDate"
                  component={DateName}
                  date={true}
                  labelName="New End Date"
                  placeholder="09/09/2020"
                  disabled={disableComponent}
                  formated="MMM yyyy"
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column className="ViewLabel">
                <Field
                  name="reasonToExtend"
                  component={TextInput}
                  placeholder="e.g.New project.."
                  labelName="Reason to Extend"
                  disabled={disableComponent}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="placement"
                  component={TextInput}
                  placeholder="e.g.Jakarta"
                  labelName="Placement"
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default EmployeeDetail;
