import "./ProjectInfoStyle.scss";
import styles from "./ProjectInfo.module.scss";
import React, { useState, Fragment, useCallback, useEffect } from "react";
import { Grid, Form, Card, Dropdown, Header, Segment, Divider } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  TextInput,
  Button,
  Tooltips,
  SearchInput,
  SelectInput,
  NumberInput,
} from "views/components/UI";
import { useSelector, useDispatch } from "react-redux";
import IStore from "models/IStore";
import { Dispatch } from "redux";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import {
  selectProjectInfo,
  selectSearchSOOI,
  selectEmployeeInfo,
  selectDropDownBuCost,
  selectWorkFlowHeader,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import GetProjectInfoModel from "stores/dedicated-resources/models/DedicatedResourcesViewEdit/GetProjectInfoModel";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";

interface IProps {
  contractID?: number;
  type: string;
  resultBulk?: any;
  setBuCostBulk?: any;
}

const ProjectInfo: React.FC<IProps> = ({
  contractID,
  type,
  resultBulk,
  setBuCostBulk,
}) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const [result, setResult] = useState({});
  const [buCost, setBuCost] = useState("");
  const [validate, setValidate] = useState(false);

  const ListProjectInfo = useSelector((state: IStore) =>
    selectProjectInfo(state)
  );
  const SOOIProjectInfo = useSelector((state: IStore) =>
    selectSearchSOOI(state)
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const EmployeeInfo = useSelector((state: IStore) =>
    selectEmployeeInfo(state)
  );
  const ListBuCost = useSelector((state: IStore) =>
    selectDropDownBuCost(state)
  );
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );
  const WorkFlowHeader = useSelector((state: IStore) =>
  selectWorkFlowHeader(state)
);

  useEffect(() => {
    if (resultBulk) {
      setResult(resultBulk);
    }
  }, [result, resultBulk]);

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
    const newValues = new GetProjectInfoModel({});

    newValues.contractID = contractID;
    newValues.so = values.so;
    newValues.oi = values.oi;
    newValues.referToSO = values.referToSO;
    newValues.customerName = values.customerName;
    newValues.projectName = values.projectName;
    newValues.projectAlias = values.projectAlias;
    newValues.projectCategory = values.projectCategory;
    newValues.projectComplexity = values.projectComplexity;
    newValues.estProjectDuration = values.estProjectDuration;
    newValues.buCost = buCost;
    newValues.userLoginID = currentUser.employeeID;

    dispatch(DedicatedResourcesActions.requestPutProjectInfo(newValues));
    setDisableComponent(true);
  };

  const isLoadingSOOI: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [DedicatedResourcesActions.REQUEST_GET_SEARCH_SOOI])
  );

  const handleSearchChangeSO = useCallback(
    (data) => {
      if (type !== "bulk") {
        dispatch(DedicatedResourcesActions.requestGetSearchSOOI(data, "SO"));
      }
    },
    [dispatch, SOOIProjectInfo]
  );

  const handleSearchChangeOI = useCallback(
    (data) => {
      if (type !== "bulk") {
        dispatch(DedicatedResourcesActions.requestGetSearchSOOI(data, "OI"));
      }
    },
    [dispatch, SOOIProjectInfo]
  );

  const onResultSelectSO = (data: any) => {
    setResult(data.result);
  };

  const onResultSelectOI = (data: any) => {
    setResult(data.result);
  };

  const resultRenderer = ({ image, text, title, description, flag, id }) => {
    return (
      <div
        key={id}
        className="content"
        style={{
          backgroundColor: flag === "1" ? "rgba(255, 248, 54, 0.5)" : "",
        }}
      >
        <div className="price">{title}</div>
        <div className="title"> {text}</div>
      </div>
    );
  };

  const onChangeBUCost = (event: any) => {
    const docTypes = ListBuCost.filter((item: any) => {
      return item.value === event;
    });
    if (type === "bulk") {
      setBuCostBulk(docTypes[0].text);
    }
    setBuCost(docTypes[0].text);

  };

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
    <LoadingIndicator isActive={isLoadingSOOI}>
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={
          SOOIProjectInfo.length > 0 || type === "bulk"
            ? result
            : ListProjectInfo
        }
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row columns={1} className="pb-0">
                <Grid.Column width={16} className="FloatRight">
                <Divider/>
                  {disableComponent && (
                    <>
                      <Tooltips
                        content="Edit Project Info"
                        trigger={
                          <Button
                            basic
                            type="button"
                            disabled={
                              type !== "bulk" ? validate : false
                            }
                            compact
                            icon="edit"
                            onClick={(e: Event) => onEditHandler(e)}
                            floated="right"
                          />
                        }
                      />
                      {type === "edit" && (
                        <Header as="h4" className="mt-0">
                          <Header.Content>
                            Project Info
                          </Header.Content>
                        </Header>
                      )}
                    </>
                  )}
                  {!disableComponent && (
                    <Header.Content className="FloatRight">
                      <Tooltips
                        content="Save Update"
                        trigger={
                          <Button basic compact icon="save" floated="right" />
                        }
                        chkPMODeptID
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

              <Grid.Row columns={2}>
                <Grid.Column width={5}>
                  <Segment className="YellowCardChild">
                      <Grid columns='equal'>
                          <Grid.Column className="ViewLabel">
                            <Field
                              name="so"
                              component={SearchInput}
                              placeholder="e.g.12345"
                              loading={isLoadingSOOI}
                              labelName="SO"
                              disabled={type === "bulk" ? true : disableComponent}
                              handleSearchChange={handleSearchChangeSO}
                              onResultSelect={onResultSelectSO}
                              results={SOOIProjectInfo}
                              resultRenderer={resultRenderer}
                              // onKeyPress={(event) => {
                              //     dispatch(DedicatedResourcesActions.requestGetSearchSOOI())
                              // }}
                            />
                          </Grid.Column>

                          <Grid.Column className="ViewLabel">
                            <Field
                              name="oi"
                              component={SearchInput}
                              placeholder="e.g.12345"
                              loading={isLoadingSOOI}
                              labelName="OI"
                              disabled={type === "bulk" ? true : disableComponent}
                              handleSearchChange={handleSearchChangeOI}
                              onResultSelect={onResultSelectOI}
                              results={SOOIProjectInfo}
                              resultRenderer={resultRenderer}
                              // onKeyPress={(event) => {
                              //     // if (event.charCode == 13) {
                              //     //   dispatch(CustomerActions.requestCustomerByNameBlackList(customerName));
                              //     // }
                              //     if(event.charCode === 13)
                              //     {
                              //     event.preventDefault()
                              //     setValidateEntr(true)
                              //     }
                              // }}
                            />
                          </Grid.Column>

                          <Grid.Column className="ViewLabel">
                            <Field
                              name="referToSO"
                              component={TextInput}
                              placeholder="e.g.12345"
                              labelName="Refer to (SO)"
                              disabled={true}
                              mandatory={disableComponent ? true : false}
                            />
                          </Grid.Column>
                      </Grid>
                    </Segment>
                </Grid.Column>

                <Grid.Column className="ViewLabel" width={8}>
                  <Field
                    name="projectName"
                    component={TextInput}
                    placeholder="e.g.Your Project Name"
                    labelName="Project Name"
                    disabled={true}
                  />
                </Grid.Column>

                <Grid.Column className="ViewLabel" width={3}>
                  <Field
                    name="projectCategory"
                    disabled={true}
                    component={SelectInput}
                    // options={documentTypeStoreCBV}
                    placeholder="e.g.Maintenance"
                    labelName="Project Category"
                    // onChanged={onChangeDocument}
                    // mandatory={false}
                  />
                </Grid.Column>
                
              </Grid.Row>

              <Grid.Row columns={4}>
                <Grid.Column className="ViewLabel" width={3}>
                  <Field
                    name="estProjectDuration"
                    component={TextInput}
                    disabled={true}
                    labeled={
                      <Dropdown
                        disabled={true}
                        // options={durationTypeOptions}
                        // onChange={onChangeDurationType}
                        // value={durationType}
                      />
                    }
                    type="number"
                    min={true}
                    // onChange={onDuration} //Hendz - 2022-02-23 untuk add cof karena membutuhkan project duration
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    // values={estDurationProject}
                    labelPosition="right"
                    placeholder="e.g.90.."
                    labelName="Est. Proj. Duration"
                    // toolTipPosition="top center"
                    // toolTipContents="Fill this estimate project duration, if you have
                    //                     warranty to the customer (Not Vendor Warranty)"
                  />
                </Grid.Column>

                <Grid.Column className="ViewLabel" width={5}>
                  <Field
                    name="customerName"
                    component={SearchInput}
                    placeholder="e.g.PT. Customer .."
                    // loading={isLoadingCustomer}
                    labelName="Customer Name"
                    disabled={true}
                    // handleSearchChange={handleSearchChangeCust}
                    // onResultSelect={onResultSelectCustomer}
                    // results={customerStoreSearch}
                    // mandatory={mandatory.sCustomerName}

                    // resultRenderer={resultRenderer}
                    // onKeyPress={(event) => {
                    //     // if (event.charCode == 13) {
                    //     //   dispatch(CustomerActions.requestCustomerByNameBlackList(customerName));
                    //     // }
                    //     if(event.charCode === 13)
                    //     {
                    //     event.preventDefault()
                    //     setValidateEntr(true)
                    //     }
                    // }}
                  />
                </Grid.Column>

                <Grid.Column className="ViewLabel" width={5}>
                  <Field
                    name="projectAlias"
                    component={TextInput}
                    placeholder="e.g.Your Project Name"
                    labelName="Project Alias"
                    disabled={true}
                  />
                </Grid.Column>

                <Grid.Column className="ViewLabel" width={3}>
                  <Field
                    name="projectComplexity"
                    disabled={true}
                    component={SelectInput}
                    // options={documentTypeStoreCBV}
                    placeholder="Project Category"
                    labelName="Project Complexity"
                    // onChanged={onChangeDocument}
                    // mandatory={false}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column className="ViewLabel" width={3}>
                  <Field
                    name="buCostID"
                    component={SelectInput}
                    placeholder="e.g.Your BuCost"
                    labelName="BU Cost"
                    mandatory={false}
                    disabled={disableComponent}
                    onChanged={onChangeBUCost}
                    options={ListBuCost}

                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    </LoadingIndicator>
  );
};

export default ProjectInfo;
