import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Form, Icon, Divider, Label } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Dispatch } from 'redux';
import moment from 'moment';

import { Button, CheckBoxInput, DateInput, InfoInputEnter, LabelName, RichTextEditor, SearchInput, TextInput } from 'views/components/UI';
import SearchAndAddInputList from 'views/components/UI/SearchAndAddInputList/SearchAndAddInputList';
import { selectEmployeeSearchAllOptions } from 'selectors/select-options/EmployeeSelector';
import { selectCustomerPmoProject, selectPMOCopyProject } from 'selectors/pmo/PMOSelector';
import * as ModalNoPaddingActions from 'stores/modal/no-padding/ModalNoPaddingActions';
import { selectFunnelSearchOptions } from 'selectors/select-options/PMOTypeSelector';
import LabelNameMultiValue from 'views/components/UI/Label/LabelNameMultiValue';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ValidateFormAddNewProject from '../hooks/ValidateFormAddNewProject';
import { selectViewFunnelStatus } from 'selectors/funnel/FunnelSelector';
import PMOProjectActivity from 'stores/pmo/models/PMOProjectActivity';
import PMOProjectEmplove from 'stores/pmo/models/PMOProjectEmplove';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import IPMOCopyProject from 'selectors/pmo/models/IPMOCopyProject';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import PMOProject from 'stores/pmo/models/PMOProject';
import * as PMOActions from 'stores/pmo/PMOActions';
import ResultActions from 'models/ResultActions';
import IStore from 'models/IStore';
import './InputFormPMO.scss';

interface IProps {
  type: string;
  projectID: number;
}

const InputFormPMO: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { type, projectID } = props;
  const dispatch: Dispatch = useDispatch();

  const [onChangeField, setOnchangeField] = useState({
    estStartBypmo: null,
    estEndBypmo: null,
    activityStart: null,
    searchEmp: null,
  });
  const [pmoProjectByIDState, setSmoProjectByID] = useState({} as any);
  const [assignToList, setAssignToList] = useState([] as any);
  const [changeFunnelNo, setChangeFunnelNo] = useState(false);
  const [assignCCList, setAssignCCList] = useState([] as any);
  const [projectAliasVal, setProjectAliasVal] = useState('');
  const [initialMeet, setInitialMeet] = useState(false);
  const [projectAlias, setProjectAlias] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [funnelGenId, setFunnelGenId] = useState('');

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      PMOActions.PMO_PROJECT,
      PMOActions.PMO_PROJECT_BY_PROJECTID,
      FunnelActions.REQUEST_VIEW_FUNNEL_STATUS,
      FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER,
    ])
  );
  const isReqFunnelId: boolean = useSelector((state: IStore) => selectRequesting(state, [PMOActions.FUNNEL_SO_OI_EXIST]));
  const pmoProjectByID: IPMOCopyProject = useSelector((state: IStore) => selectPMOCopyProject(state));
  const employeeSearchResults = useSelector((state: IStore) => selectEmployeeSearchAllOptions(state));
  const onResultSelectFunnel = useSelector((state: IStore) => selectFunnelSearchOptions(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectCustomerPmoProject(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));
  const result: ResultActions = useSelector((state: IStore) => state.pmo.resultActions);

  const onSubmitHandler = (values: any) => {
    const pmoProject = new PMOProject({
      ...values,
      estStartBypmo: moment(onChangeField.estStartBypmo).format('YYYY-MM-DDTHH:mm:ss.SSS'),
      estEndBypmo: moment(onChangeField.estEndBypmo).format('YYYY-MM-DDTHH:mm:ss.SSS'),
      projectAlias: projectAlias.length > 0 ? projectAlias.map((e) => e.name.trim()).join(',') : '',
      initialMeeting: initialMeet,
    });

    const pmoActivity = new PMOProjectActivity(values);

    pmoActivity.activityStart = moment(values.activityStart).format('YYYY-MM-DDTHH:mm:ss.SSS');
    pmoActivity.activityEnd = moment(values.activityEnd).format('YYYY-MM-DDTHH:mm:ss.SSS');
    pmoActivity.assignTo = assignToList
      ?.filter((item: any) => item.value !== '')
      .map((item: any) => item.value)
      .join(';');

    pmoActivity.assignCc = assignCCList
      ?.filter((item: any) => item.value !== '')
      .map((item: any) => item.value)
      .join(';');

    const newItems = new PMOProjectEmplove({
      pmoProject,
      pmoActivity: initialMeet ? pmoActivity : new PMOProjectActivity({}),
      createUserID: currentUser.employeeID,
      createDate: new Date().toISOString(),
    });

    dispatch(PMOActions.postPMOProject(newItems));
    setProjectAliasVal(' ');
  };

  const handleSearchChangeFunnelSoOiExist = (e) => {
    setFunnelGenId(e);
  };

  const onResultSelectFunnelNo = (e) => {
    dispatch(FunnelActions.requestViewFunnelStatusById(+e.result.title));
    dispatch(PMOActions.getCustomerForPmoProject(+e.result.title));
  };

  const handleSearchChangeEmployee = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        // dispatch(EmployeeActions.searchALL(data.value.trim(), ''));
        setSearchValue(data.value.trim());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    setOnchangeField({
      ...onChangeField,
      estStartBypmo: type === 'COPY PROJECT' && !changeFunnelNo ? pmoProjectByID.estStartBypmo : viewFunnelCustomer.estStartProjectDate,
      estEndBypmo: type === 'COPY PROJECT' && !changeFunnelNo ? pmoProjectByID.estEndBypmo : viewFunnelCustomer.estEndProjectDate,
    });
  }, [viewFunnelCustomer, pmoProjectByID, changeFunnelNo]);

  useEffect(() => {
    setOnchangeField({
      ...onChangeField,
      activityStart: pmoProjectByIDState.activityStart,
    });
  }, [pmoProjectByIDState]);

  const initValProjAliast = (values) => {
    let tempData = [];
    if (values) {
      values.split(',').map((e, i) => {
        tempData = [...tempData, { id: i + 1, name: e }];
      });
    }

    setProjectAlias(tempData);
  };

  useEffect(() => {
    if (type !== 'COPY PROJECT') {
      initValProjAliast(viewFunnelCustomer.projectAlias);
    }
  }, [viewFunnelCustomer]);

  useEffect(() => {
    if (type === 'COPY PROJECT') {
      dispatch(PMOActions.getPMOProjectBy(projectID));
    }
    // dispatch(PMOActions.reqFunnelSOorOiExist(''));

    // reset field when refresh page
    dispatch(FunnelActions.requestViewFunnelStatusById(-1));
    dispatch(PMOActions.getCustomerForPmoProject(-1));
    dispatch(FunnelActions.resetFunnelCustomerById());
  }, []);

  useEffect(() => {
    if (type === 'COPY PROJECT') {
      pmoProjectByID.funnelGenId && onResultSelectFunnelNo({ result: { title: pmoProjectByID.funnelGenId } });

      initValProjAliast(pmoProjectByID?.projectAlias);

      setInitialMeet(pmoProjectByID.initialMeeting);

      const assignCc = pmoProjectByID.assignCc
        ? pmoProjectByID.assignCc.split(';').map((val) => {
            return { value: val, text: val };
          })
        : [];
      const assignTo = pmoProjectByID.assignTo
        ? pmoProjectByID.assignTo.split(';').map((val) => {
            return { value: val, text: val };
          })
        : [];

      setAssignCCList(assignCc);
      setAssignToList(assignTo);
      setSmoProjectByID({ ...pmoProjectByID, assignTo, assignCc });
    }
  }, [pmoProjectByID]);

  const [validatePMONotInitialMeet, validatePMOActivity] = ValidateFormAddNewProject({ onChangeField, projectAlias, assignToList, assignCCList });

  useEffect(() => {
    if (result.errorNumber === '0') {
      dispatch(PMOActions.reqPMOList(1, 15, 'projectId', 'descending', currentUser.employeeID));
      // dispatch(PMOActions.reqPMOSummaryStatus());
      dispatch(ModalNoPaddingActions.CLOSE());
      dispatch(PMOActions.setActivePage(1));
    }
  }, [result]);

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={!initialMeet ? validatePMONotInitialMeet : validatePMOActivity}
      initialValues={type === 'COPY PROJECT' ? pmoProjectByIDState : {}}
      render={({ handleSubmit, pristine, invalid, submitting }) => (
        // <Form onSubmit={handleSubmit} loading={isRequesting}> // move to button
        <Form loading={isRequesting}>
          <Grid>
            <Grid.Row columns={2} className=" ph-1-5r">
              <Grid.Column className={`MaxHSearch pb-0" `}>
                <Field
                  name="funnelGenId"
                  component={SearchInput}
                  placeholder="e.g.1234 .."
                  labelName="Funnel No"
                  handleSearchChange={(e) => handleSearchChangeFunnelSoOiExist(e)}
                  onResultSelect={(e) => {
                    let value = e.result.title?.split('-');
                    if (value.length > 0) {
                      onResultSelectFunnelNo({ result: { title: value[0] } });
                    }
                    setChangeFunnelNo(true);
                  }}
                  results={onResultSelectFunnel}
                  mandatory={false}
                  loading={isReqFunnelId}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      dispatch(PMOActions.reqFunnelSOorOiExist(funnelGenId));
                    }
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <p className="BtmFormNote">
                    Hanya funnel yang memiliki SO atau OI yang akan ditampilkan Press <span style={{ fontWeight: 'bold' }}>ENTER</span> to show
                    results
                  </p>
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid className="wrap-yellow-no-padding modal-small ">
              <Grid.Row columns={2} className="ph-1-5r">
                <Grid.Column>
                  <Field
                    name="salesName"
                    component={LabelName}
                    labelName="Sales Name"
                    placeholder="e.g.Jhon Doe.."
                    values={viewFunnelStatus.salesName || '-'}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="customerName"
                    component={LabelName}
                    labelName="Customer Name"
                    placeholder="e.g.Customer.."
                    values={viewFunnelCustomer.customerName || '-'}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1} className="ph-1-5r">
                <Grid.Column>
                  <Field
                    name="projectName"
                    component={LabelName}
                    labelName="Project Name"
                    placeholder="e.g.Project.."
                    values={viewFunnelCustomer.projectName || '-'}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} className="ph-1-5r">
                <Grid.Column width={5}>
                  <Field
                    name="estStartBysales"
                    component={LabelName}
                    labelName="Sales Est. Project Start"
                    placeholder="e.g.09/09/2022"
                    values={
                      (viewFunnelCustomer?.estStartProjectDate && format(new Date(viewFunnelCustomer?.estStartProjectDate), 'MM/dd/yyyy')) || '-'
                    }
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  <Field
                    name="estEndBysales"
                    component={LabelName}
                    labelName="Sales Est. Project End"
                    placeholder="e.g.09/09/2022"
                    values={(viewFunnelCustomer?.estEndProjectDate && format(new Date(viewFunnelCustomer?.estEndProjectDate), 'MM/dd/yyyy')) || '-'}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="ph-1-5r">
                <Grid.Column>
                  <Field
                    name="presalesNameList"
                    component={LabelNameMultiValue}
                    labelName="Presales"
                    placeholder="e.g.Project.."
                    values={viewFunnelCustomer.presalesNameList ? viewFunnelCustomer.presalesNameList : '-'}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid.Row columns={1} className="pb-0 ph-1-5r pt-1r">
              <Grid.Column className="ViewLabel projectAliass">
                <Field
                  name="projectAliass"
                  component={TextInput}
                  labelName="Project Alias"
                  mandatory={true}
                  // disabled={disableComponent}
                  values={projectAliasVal}
                  onChange={(e) => setProjectAliasVal(e)}
                  icon={
                    <Icon
                      name="plus circle"
                      inverted
                      circular
                      link
                      disabled={projectAliasVal.trim().length === 0 ? true : false}
                      onClick={() => {
                        setProjectAlias([...projectAlias, { id: projectAlias.length + 1, name: projectAliasVal }]);
                        setProjectAliasVal(' ');
                        // dispatch(
                        //   FunnelActions.updateProjectAlias(
                        //     `${
                        //       projectAlias.length > 0
                        //         ? `${projectAlias?.map((e) => e.name.trim()).join(',')},${projectAliasVal.trim()}`
                        //         : projectAliasVal.trim()
                        //     }`,
                        //     currentUser.employeeID,
                        //     +funnelGenID
                        //   )
                        // );
                      }}
                    />
                  }
                />

                <Grid.Column className="ViewLabel" textAlign="center">
                  {projectAlias.map((item, i) => {
                    return (
                      <Label as="a" key={i} className="mb-5px">
                        {item.name}
                        <Icon
                          name="delete"
                          onClick={() => {
                            // !disableComponent && setProjectAlias(projectAlias?.filter((e) => e.id !== item.id));
                            setProjectAlias(projectAlias?.filter((e) => e.id !== item.id));
                            // dispatch(
                            //   FunnelActions.updateProjectAlias(
                            //     `${
                            //       projectAlias.length > 0
                            //         ? projectAlias
                            //             ?.filter((e) => e.id !== item.id)
                            //             .map((e) => e.name.trim())
                            //             .join(',')
                            //         : ''
                            //     }`,
                            //     currentUser.employeeID,
                            //     +funnelGenID
                            //   )
                            // );
                          }}
                        />
                      </Label>
                    );
                  })}
                </Grid.Column>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2} className="pb-0 ph-1-5r">
              <Grid.Column className="pb-0" width={5}>
                <Field
                  name="estStartBypmo"
                  component={DateInput}
                  labelName="PMO Est. Project Start"
                  placeholder="e.g.09/09/2022"
                  mandatory={false}
                  date={true}
                  dropUp={true}
                  onChange={(e) => setOnchangeField({ ...onChangeField, estStartBypmo: e })}
                  values={onChangeField.estStartBypmo}
                  formated={'MM/dd/yyyy'}
                />
              </Grid.Column>
              <Grid.Column className="pb-0" width={5}>
                <Field
                  name="estEndBypmo"
                  component={DateInput}
                  labelName="PMO Est. Project End"
                  placeholder="e.g.09/09/2022"
                  mandatory={false}
                  date={true}
                  dropUp={true}
                  disabled={!onChangeField.estStartBypmo}
                  minDate={new Date(moment(onChangeField.estStartBypmo).valueOf() + 24 * 60 * 60 * 1000)}
                  onChange={(e) => setOnchangeField({ ...onChangeField, estEndBypmo: e })}
                  values={onChangeField.estEndBypmo}
                  formated={'MM/dd/yyyy'}
                  // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1} className="pb-0 ph-1-5r">
              <Grid.Column className="pb-0">
                <Field
                  name="initialMeeting"
                  component={CheckBoxInput}
                  label="Initial Meeting"
                  onChange={(e) => {
                    setInitialMeet(!initialMeet);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {initialMeet && (
            <Grid className=" init-meeting-card">
              <Grid.Row columns={1} className="pb-0">
                <Grid.Column className="pb-0">
                  <Field
                    name="activityTitle"
                    labelName="Subject"
                    component={TextInput}
                    placeholder="e.g.Subject .."
                    mandatory={false}
                    // values={projectName}
                    // onChange={(value) => setProjectName(value)}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1} className="pb-0">
                <Grid.Column className="pb-0">
                  <Grid.Column>
                    <Field
                      name="assignTo"
                      searchField={onChangeField}
                      component={SearchAndAddInputList}
                      placeholder="e.g.Employee Name"
                      labelName="Sent Invitation To."
                      mandatory={false}
                      handleSearchChange={(e, data) => {
                        handleSearchChangeEmployee(e, data);
                        setOnchangeField({ ...onChangeField, searchEmp: 'assignTo' });
                      }}
                      onKeyPress={(event) => {
                        if (event.charCode === 13) {
                          searchValue && dispatch(EmployeeActions.searchALL(searchValue, ''));
                        }
                      }}
                      results={employeeSearchResults}
                      listSoftware={assignToList}
                      setListSoftware={setAssignToList}
                    />
                    {assignToList.length === 0 && <InfoInputEnter />}
                  </Grid.Column>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1} className="pb-0">
                <Grid.Column className="pb-0">
                  <Field
                    name="assignCc"
                    searchField={onChangeField}
                    labelName="CC To"
                    component={SearchAndAddInputList}
                    mandatory={true}
                    placeholder="e.g.Employee Name"
                    handleSearchChange={(e, data) => {
                      handleSearchChangeEmployee(e, data);
                      setOnchangeField({ ...onChangeField, searchEmp: 'assignCc' });
                    }}
                    onKeyPress={(event) => {
                      if (event.charCode === 13) {
                        searchValue && dispatch(EmployeeActions.searchALL(searchValue, ''));
                      }
                    }}
                    results={employeeSearchResults}
                    listSoftware={assignCCList}
                    setListSoftware={setAssignCCList}
                  />
                  {assignCCList.length === 0 && <InfoInputEnter />}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} className="pb-0">
                <Grid.Column className="pb-0" width={6}>
                  <Field
                    name="activityStart"
                    component={DateInput}
                    labelName="Meeting Start"
                    placeholder="e.g.11/05/2023, 09:00 AM"
                    mandatory={false}
                    time={true}
                    date={true}
                    formated="MM/dd/yyyy, hh:mm a"
                    onChange={(e) => setOnchangeField({ ...onChangeField, activityStart: e })}
                    // minDate={currentDate}
                  />
                </Grid.Column>
                <Grid.Column className="pb-0" width={6}>
                  <Field
                    name="activityEnd"
                    component={DateInput}
                    labelName="Meeting End"
                    placeholder="e.g.11/05/2023, 09:00 AM"
                    mandatory={false}
                    time={true}
                    date={true}
                    formated="MM/dd/yyyy, hh:mm a"
                    disabled={!onChangeField.activityStart}
                    minDate={new Date(moment(onChangeField.activityStart).valueOf() + 60 * 60 * 1000)}
                    // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1} className="pb-0">
                <Grid.Column className="pb-0">
                  <Field
                    name="activityText"
                    labelName="Venue (offline meeting) / Link (online meeting)"
                    component={TextInput}
                    placeholder="e.g.Venue .."
                    mandatory={false}
                    // values={projectName}
                    // onChange={(value) => setProjectName(value)}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1} className="pb-0">
                <Grid.Column className="pb-0">
                  <Field
                    name="activityRemark"
                    editorId="meetDescription"
                    component={RichTextEditor}
                    placeholder="e.g.Meeting Description.."
                    labelName="Meeting Description"
                    mandatorys={true}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}

          <Divider />
          <Grid className="ph-1-5r mt-1">
            <Grid.Row columns={1} centered className="pb-0">
              <Grid.Column textAlign="center" className="pb-0">
                <Button type="button" className="mr-1r" size="small" onClick={() => dispatch(ModalNoPaddingActions.CLOSE())}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleSubmit} className="" color="blue" size="small" disabled={submitting || isRequesting}>
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default InputFormPMO;
