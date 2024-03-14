import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Grid, DropdownProps, Form, Card, Header, Segment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Button,
  DateName,
  LabelName,
  LabelRenewalStatus,
  NumberInput,
  SelectInput,
  TextInput,
  Tooltips,
} from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { History } from "history";
import {
  selectCheckApproval,
  selectDropDownContractStatus,
  selectEmployeeInfo,
  selectWorkFlowHeader,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import PutEmployeeInfoModel from "stores/dedicated-resources/models/DedicatedResourcesViewEdit/PutEmplyoeeInfoModel";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ApproveReject from "../../../form-create/ApproveReject/ApproveReject";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import SendDocument from "../../../form-create/SendDocument/SendDocument";
import DocumentSender from "../../../form-create/DocumentSender/DocumentSender";
import "./ResourceEditStatusStyle.scss";

interface IProps {
  contractID: number;
  history: History;
}

const ResourcesEditStatus: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { contractID } = props;

  const DropdownContractStatus = useSelector((state: IStore) =>
    selectDropDownContractStatus(state)
  );
  const EmployeeInfo = useSelector((state: IStore) =>
    selectEmployeeInfo(state)
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const WorkFlowHeader = useSelector((state: IStore) =>
    selectWorkFlowHeader(state)
  );
  const CheckApproval = useSelector((state: IStore) =>
  selectCheckApproval(state)
);
  const [disableComponent, setDisableComponent] = useState(true);
  const [Status, setStatus] = useState("");
  const [StatusName, setStatusName] = useState("")
  const [validate, setValidate] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [tempStatus, setTempStatus] = useState([]);

  useEffect(() => {
    setStatus(EmployeeInfo.contractStatus);
  }, []);

  const onSubmitHandler = (values: any) => {
    const newValues = new PutEmployeeInfoModel();

    newValues.contractID = contractID;
    // newValues.contractNo = EmployeeInfo.contractNo;
    newValues.contractStatus = parseInt(Status)
      ? parseInt(Status)
      : parseInt(EmployeeInfo.contractStatus);
    // newValues.employeeID = EmployeeInfo.employeeID;
    // newValues.employeeClass = EmployeeInfo.employeeClass;
    // newValues.beginDate = EmployeeInfo.beginDate;
    // newValues.endDate = EmployeeInfo.endDate;
    newValues.userLoginID = currentUser.employeeID;

    dispatch(DedicatedResourcesActions.requestPutEmployeeInfo(newValues))
    setDisableComponent(true)
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
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

  const SendDocumentPopUp = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <DocumentSender setDisableComponent={setDisableComponent} contractID={contractID} setCheckSubmit={setCheckSubmit} />,
        ModalSizeEnum.Small,
        false,
        false
      )
    );
  };

  const onChangeStatus = (event: any) => {
    const docTypes = DropdownContractStatus.filter((item: any) => {
      return item.value === event;
    });
    if (docTypes[0].text === "Ready To Sent") {
      SendDocumentPopUp();
    }
    setStatus(docTypes[0] && docTypes[0].value);
    setStatusName(docTypes[0] && docTypes[0].text);
  };

  const ColorReturnStatus = (status: string) => {
    if (status === "Terminated") {
      return "#5E6B81";
    }
    if (status === "Waiting Approval") {
      return "#FFD500";
    }
    if (status === "Rejected") {
      return "#F97452";
    }
    if (status === "Full Approved") {
      return "#8BCF35";
    }
    if (status === "Processed By ComBen") {
      return "#656DD1";
    }
    if (status === "Ready To Sent") {
      return "#3ABAD6";
    }
    if (status === "Sent To Employee") {
      return "#638CDB";
    }
    if (status === "Renewal Completed") {
      return "#27D4A5";
    }
    if (status === "Contract Will Be End") {
      return "#D97BC3";
    }
  };

  const onPopupSideMenu = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalAction.OPEN(content, size));
    },
    [dispatch]
  );
    // console.log('WorkFlowHeader.resultObj',WorkFlowHeader.resultObj && WorkFlowHeader.resultObj)
    // console.log('currentUser.userName',currentUser.userName)
  useEffect(() => {
    // Check yang Login sesuai dengan Waiting Approval && Check Setelah SubmitApproval Button Disabled
    if(currentUser.userName === "alex.mulyono" || currentUser.userName === "natanael.natanael" )
    {
        if(WorkFlowHeader.resultObj?.length > 0)
        {
            //Cek Approval Pertama Bukan pak Alex
            if(WorkFlowHeader.resultObj[0].status === "Waiting For Approval"  && currentUser.userName !== WorkFlowHeader.resultObj[0].stepName)
            {
              setValidate(true);
            }

            if(WorkFlowHeader.resultObj[0].status === "REJECTED"  && currentUser.userName !== WorkFlowHeader.resultObj[0].stepName)
            {
              setValidate(true);
            }

            //Setelah Pak Alex Approval ==  Success
            if(WorkFlowHeader.resultObj && WorkFlowHeader.resultObj[0].status === "APPROVED" && currentUser.userName === WorkFlowHeader.resultObj[0].stepName)
            {
              setValidate(true);
            }

            //Cek Approval bukan pak Natan
            if(WorkFlowHeader.resultObj && WorkFlowHeader.resultObj[0].status === "APPROVED" && currentUser.userName !== WorkFlowHeader.resultObj[1].stepName)
            {
              setValidate(true);
            }
            //Cek Setelah Approval pak Natan
            if(WorkFlowHeader.resultObj && WorkFlowHeader.resultObj[1].status === "APPROVED" && currentUser.userName === WorkFlowHeader.resultObj[1].stepName)
            {
              setValidate(true);
            }
        }
    } else {
      setValidate(true);
    }
  }, [WorkFlowHeader.resultObj]);
  return (
    <Fragment>
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={EmployeeInfo}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <Grid stackable padded>
              <Grid.Row columns={2}>
                <Grid.Column width={11}>
                  <Header as="h4">
                    <Header.Content>
                      Employee Info
                    </Header.Content>
                    <Header.Content className="FloatLeft">
                      {disableComponent && (
                        <>
                          {/* {EmployeeInfo.contractStatusName === "Waiting Approval" && */}
                          <Tooltips
                            content="Submit Approval"
                            trigger={
                              <Button
                                basic
                                type="button"
                                compact
                                icon="check circle outline"
                                // || EmployeeInfo.contractStatusName === "Full Approved"
                                disabled={
                                  validate
                                }
                                onClick={() =>
                                  onPopupSideMenu(
                                    <ApproveReject contractID={contractID} />,
                                    ModalSizeEnum.Tiny
                                  )
                                }
                              />
                            }
                          />
                          {/* // } */}

                          <Tooltips
                            content="Edit Employee Info"
                            trigger={
                              <Button
                                basic
                                type="button"
                                compact
                                icon="edit"
                                disabled={
                                  EmployeeInfo.contractStatusName ===
                                  "Terminated" 
                                    ? //   ||
                                      // EmployeeInfo.contractStatusName ===
                                      //   "Full Approved"
                                      true
                                    : false
                                }
                                onClick={(e: Event) => onEditHandler(e)}
                              />
                            }
                          />
                        </>
                      )}
                      {!disableComponent && (
                        <Fragment>
                          <Tooltips
                            content="Save Update"
                            trigger={
                              <Button
                                type="button"
                                basic
                                compact
                                icon="save"
                                disabled={StatusName === "Ready To Sent" && !checkSubmit}
                                onClick={onSubmitHandler}
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
                                onClick={() => {
                                  onCancel();
                                }}
                              />
                            }
                          />
                        </Fragment>
                      )}
                    </Header.Content>
                  </Header>
                </Grid.Column>
                
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column width={3} className="ViewLabel">
                  {disableComponent ? (
                    <Field
                      name="contractStatusName"
                      values={EmployeeInfo.contractStatusName}
                      backgroundColor={ColorReturnStatus(
                        EmployeeInfo.contractStatusName
                      )}
                      component={LabelRenewalStatus}
                      labelName="Renewal Status"
                      placeholder="e.g.Renewal"
                    />
                  ) : (
                    <Field
                      name="contractStatus"
                      disabled={disableComponent}
                      onChanged={onChangeStatus}
                      options={ DropdownContractStatus}
                      component={SelectInput}
                      labelName="Renewal Status"
                      placeholder="e.g.Renewal"
                    />
                  )}
                </Grid.Column>
                <Grid.Column className="ViewLabel" width={2}>
                  <Field
                    name="employeeID"
                    component={LabelName}
                    labelName="Employee ID"
                    placeholder="e.g.01234"
                  />
                </Grid.Column>
                <Grid.Column className="ViewLabel" width={4}>
                  <Field
                    name="employeeName"
                    component={LabelName}
                    labelName="Employee Name"
                    placeholder="e.g.01234"
                  />
                </Grid.Column>
                <Grid.Column className="ViewLabel" width={2}>
                  <Field
                    name="employeeClass"
                    component={LabelName}
                    labelName="Employee Class"
                    placeholder="e.g.Project.."
                  />
                </Grid.Column>

                <Grid.Column  width={5} className="mt-min20"> 
                    <Segment>
                      <h4>Current Contract</h4>
                      <Grid columns='equal'>
                      <Grid.Column className="ViewLabel">
                        <Field
                          name="beginDate"
                          component={DateName}
                          labelName="Begin Date"
                          placeholder="09/09/2020"
                          disabled={true}
                          date={true}
                        />
                      </Grid.Column>
                      <Grid.Column className="ViewLabel">
                        <Field
                          name="endDate"
                          component={DateName}
                          date={true}
                          labelName="End Date"
                          placeholder="09/09/2020"
                          disabled={true}
                        />
                      </Grid.Column>
                      </Grid>
                    </Segment>
                </Grid.Column>
                
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ResourcesEditStatus;
