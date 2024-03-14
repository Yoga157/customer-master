import React, { useCallback, useEffect, useState } from 'react';
import { Form, Grid, Card, Divider, Header, List, Tab } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { serialize } from 'object-to-formdata';
import environment from 'environment';
import { Dispatch } from 'redux';
import moment from 'moment';
import axios from 'axios';

import {
  Button,
  RichTextEditor,
  SearchInputList,
  LabelName,
  CheckBoxInput,
  FileUpload,
  SelectInput,
  Pagination,
  TextInput,
  CheckBox,
  InfoInputEnter,
} from 'views/components/UI';
import {
  selectListWorkAttachment,
  selectWorkActivityReport,
  selectWorkListDetail,
  selectWorklistDrpToStr,
} from 'selectors/work-list/WorklistSelector';
import {
  selectEmpHirarcy,
  selectEmployeeEmailFixAll,
  selectEmployeeSearchEmail,
  selectEmployeeSearchValEmail,
} from 'selectors/select-options/EmployeeSelector';
import TabPanesAttachment from 'views/pmo-page/page/pmo-project-gundam/components/form/childs/tab-panes-attachment/TabPanesAttachment';
import { getEmailList, getKeyValueEmailList, getResource, sendMail } from 'views/pmo-page/page/pmo-project-gundam/helper/pmo';
import { selectDropdownGundam, selectValueEmailGundam } from 'selectors/project-gundam/ProjectGundamSelector';
import TaskHistory from 'views/ticket-page/page-ticket/components/form/components/TaskHistory/TaskHistory';
import WorkAttachmentModel, { DataWorkAttachment } from 'stores/work-list/models/WorkAttachmentModel';
import * as ModalSecoundActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ProjectGundamActions from 'stores/project-gundam/ProjectGundamActions';
import GetEscalationModel from 'stores/project-gundam/models/GetEscalationModel';
import LabelNameMultiValue from 'views/components/UI/Label/LabelNameMultiValue';
import InputFormWorklistValidateHooks from './InputFormWorklistValidateHooks';
import PMOHooks from 'views/pmo-page/page/pmo-project-gundam/helper/PMOHooks';
import { selectGeneralList } from 'selectors/attachment/AttachmentSelector';
import AttachmentFilesTable from './components/table/AttachmentFilesTable';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ActivityReportTable from './components/table/ActivityReportTable';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import UpdateTaskModel from 'stores/work-list/models/UpdateTaskModel';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import { selectDrpEntryKey } from 'selectors/ticket/TicketSelector';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import ReGetData from 'views/work-list-page/main/hooks/ReGetData';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as TicketActions from 'stores/ticket/TicketActions';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './InputFormWorklist.module.scss';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { ActivityReportFormInput } from '../childs';
import IStore from 'models/IStore';

interface IProps {
  funnelGenID: string;
  rowData: any;
}
const InputFormWorklist: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  const [searchInput, setSearchInput] = useState({
    searchResource: '',
    searchSecondResource: '',
    searchEmailReceiver: '',
    searchEmailCc: '',
  });

  const [paginConfig, setPaginConfig] = useState({
    pageAttach: 1,
    pageSizeAttach: 5,
  });
  const [activePageAR, setActivePageAR] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [secoundResourceList, setSecoundResourceList] = useState([] as any);
  const [initialValues, setInitialValues] = useState({ inc: 0 } as any);
  const [emailReceiverList, setEmailReceiverList] = useState([] as any);
  const [listAttacment, setListAttachment] = useState([] as any);
  const [sendEmailValues, setEmailValues] = useState({} as any);
  const [assignToList, setAssignToList] = useState([] as any);
  const [sentEscalation, setSentEscalation] = useState(false);
  const [applyToChilds, setApplyToChilds] = useState(false);
  const [emailCcList, setEmailCcList] = useState([] as any);
  const [sendNotif, setSendNotif] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [issueType, setIssueType] = useState('');
  const [taskStatus, setStatus] = useState('');
  const [pageSize] = useState(5);
  const [reGetData] = ReGetData();

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      WorkListActions.PUT_TASK,
      WorkListActions.GET_HISTORY,
      WorkListActions.GET_DETAIL_WORKLIST,
      WorkListActions.GET_DROPDOWN_BRANCH,
      WorkListActions.POST_WORK_ATTACHMENT,
      WorkListActions.GET_DROPDOWN_TASK_STATUS,
      WorkListActions.GET_WORK_ACTIVITY_REPORT,
      WorkListActions.GET_DROPDOWN_SUB_BRANCH,
      WorkListActions.GET_LIST_WORK_ATTATCHMENT,
      ProjectGundamActions.VALUE_EMAIL,
      ProjectGundamActions.GET_DROPDOWN_SLA,
      TicketActions.GET_DROPDOWN_TASK_CATEGORY,
      TicketActions.GET_DROPDOWN_TASK_SUB_CATEGORY,
      TicketActions.GET_DROPDOWN_TASK_ISSUE,
      TicketActions.GET_DROPDOWN_TASK_SUB_ISSUE,
    ])
  );
  const isRequestingAttachment: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [AttachmentActions.GET_LIST_GENERAL, WorkListActions.COPY_FUNNEL_ATTACHMENT])
  );
  const workStatus: any = useSelector((state: IStore) => selectWorklistDrpToStr(state, 'taskStatus'));
  const taskSubCategory = useSelector((state: IStore) => selectDrpEntryKey(state, 'taskSubCategory'));
  const employeeSearchValEmail = useSelector((state: IStore) => selectEmployeeSearchValEmail(state));
  const subBranch: any = useSelector((state: IStore) => selectWorklistDrpToStr(state, 'subBranch'));
  const taskIssueType = useSelector((state: IStore) => selectDrpEntryKey(state, 'taskIssueType'));
  const taskSubIssue = useSelector((state: IStore) => selectDrpEntryKey(state, 'taskSubIssue'));
  const taskCategory = useSelector((state: IStore) => selectDrpEntryKey(state, 'taskCategory'));
  const employeeStoreSearch = useSelector((state: IStore) => selectEmployeeSearchEmail(state));
  const branch: any = useSelector((state: IStore) => selectWorklistDrpToStr(state, 'branch'));
  const workActivityReport = useSelector((state: IStore) => selectWorkActivityReport(state));
  const listWorkAttachment = useSelector((state: IStore) => selectListWorkAttachment(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const employeeFixAll = useSelector((state: IStore) => selectEmployeeEmailFixAll(state));
  const isEscalation = useSelector((state: IStore) => state.projectGundam.isEscalation);
  const valueEmail = useSelector((state: IStore) => selectValueEmailGundam(state));
  const workDetail = useSelector((state: IStore) => selectWorkListDetail(state));
  const sla = useSelector((state: IStore) => selectDropdownGundam(state, 'sla'));
  const generalList = useSelector((state: IStore) => selectGeneralList(state));
  const empHirarcy = useSelector((state: IStore) => selectEmpHirarcy(state));
  const history = useSelector((state: IStore) => state.workList.history);

  const { docTypeId } = PMOHooks();

  useEffect(() => {
    dispatch(TicketActions.getDrpByEntryKey('TaskIssueType'));
    dispatch(TicketActions.getDrpByEntryKey('TaskCategory'));

    dispatch(ProjectGundamActions.getDropdown('sla'));
  }, [dispatch]);

  const getDrpSub = (drp: string, text: string) => {
    dispatch(TicketActions.getDrpByEntryKey(drp, text));
  };

  useEffect(() => {
    if (workDetail.taskId) {
      let data = new GetEscalationModel({});
      data.taskId = +workDetail.taskId;
      data.userLoginId = currentUser.employeeID;
      data.userLoginKey = currentUser.employeeKey;
      data.userLogin = currentUser.email;

      dispatch(WorkListActions.getWorkActivityReport(activePageAR, pageSize, workDetail.taskUID));
      dispatch(WorkListActions.getDropdownByFunnelID('subBranch', +workDetail.funnelGenId, workDetail?.brand));
      dispatch(WorkListActions.getDropdown('taskStatus', +workDetail.taskId, currentUser.employeeID));
      dispatch(ProjectGundamActions.getValueEmail(+workDetail.taskId, currentUser.employeeID));
      dispatch(WorkListActions.getDropdownByFunnelID('branch', +workDetail.funnelGenId));
      dispatch(WorkListActions.getHistory(+workDetail.taskId));
      dispatch(ProjectGundamActions.getIsEscalation(data));
      getDrpSub('taskSubCategory', workDetail.category);
      getDrpSub('taskSubType', workDetail.issueType);
      setIssueType(workDetail.issueType);
      setStatus(workDetail.taskStatus);
      getAttachment(1);
    }

    return function cleanup() {
      setInitialValues({ inc: 0 } as any);
    };
  }, [dispatch, workDetail]);

  useEffect(() => {
    dispatch(AttachmentActions.getListGeneral(+workDetail.funnelGenId, activePage, 5)); // attachment
  }, [workDetail, activePage, dispatch]);

  const getAttachment = (pageAttach) => {
    dispatch(WorkListActions.getListWorkAttachment(pageAttach, paginConfig.pageSizeAttach, 5, workDetail.taskUID));
  };

  useEffect(() => {
    setInitialValues({
      ...workDetail,
    });
  }, [dispatch, workDetail]);

  useEffect(() => {
    setEmailValues({ ...valueEmail });
  }, [valueEmail]);

  useEffect(() => {
    if (sentEscalation) {
      setEmailValues({ ...valueEmail, subject: `Escalation Task In Progress - ${valueEmail.subject}` });
      let emailReceiver = [];
      emailReceiver = sendMail(getEmailList(workDetail.primaryResources?.split(','), employeeFixAll).join(','));
      setEmailReceiverList(emailReceiver);

      let emailCc = [];
      emailCc = sendMail(getEmailList(workDetail.secondaryResources?.split(','), employeeFixAll).join(','));
      setEmailCcList(emailCc);
    } else {
      setEmailValues({ ...valueEmail });
      setEmailReceiverList(sendMail(workDetail?.emailReceiver));
      setEmailCcList(sendMail(workDetail?.emailCc));
    }
  }, [sentEscalation]);

  useEffect(() => {
    if (sendEmail) {
      setEmailReceiverList(
        workDetail?.emailReceiver
          ? sendMail(workDetail?.emailReceiver)
          : sendMail(getEmailList(workDetail.primaryResources?.split(','), employeeFixAll).join(','))
      );
      setEmailCcList(
        workDetail?.emailCc
          ? sendMail(workDetail?.emailCc)
          : sendMail(getEmailList(workDetail.secondaryResources?.split(','), employeeFixAll).join(','))
      );
    }
  }, [sendEmail]);

  const onSubmitHandler = (values: any) => {
    const putTask = new UpdateTaskModel(values);
    putTask.category = taskCategory?.find((e) => e.value === values.category)?.text;
    putTask.subcategory = taskSubCategory?.find((e) => e.value === values.subcategory)?.text;
    putTask.issueType = taskIssueType?.find((e) => e.value === values.issueType)?.text;
    putTask.issueSubtype = taskSubIssue?.find((e) => e.value === values.issueSubtype)?.text;
    putTask.taskId = workDetail.taskId;
    putTask.taskUID = workDetail.taskUID;
    putTask.primaryResources = getResource(assignToList, 'assignTo')
      .map((item: any) => item)
      .join(',');
    putTask.secondaryResources = getResource(secoundResourceList, 'secoundResource')
      .map((item: any) => item)
      .join(',');
    putTask.modifyDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    putTask.modifyUserID = currentUser.employeeID;
    putTask.brand = issueType === 'Add-on (Hardware)' || issueType === 'Hardware Problem' ? values.brand : '';
    putTask.subBrand = issueType === 'Add-on (Hardware)' || issueType === 'Hardware Problem' ? values.subBrand : '';

    putTask.funnelGenId = +workDetail.funnelGenId;
    putTask.IsApplyPrimaryResourcesToAllChild = applyToChilds;
    putTask.isSendEmailNotification = sendEmail;
    putTask.isSendEmailTaskStatusInProgressEscalation = sentEscalation;
    putTask.isSendNotificationToPmo = false;
    putTask.emailReceiver = getResource(emailReceiverList, 'emailReceiver')
      .map((item: any) => item)
      .join(',');
    putTask.emailCc = getResource(emailCcList, 'emailCC')
      .map((item: any) => item)
      .join(',');

    dispatch(WorkListActions.putTask(putTask)).then(() => {
      reGetData();
      onCancelHandler();
      dispatch(EmployeeActions.requestEmployee());
    });

    dispatch(WorkListActions.clearListActivity());
  };

  const fileChange = (e: any) => {
    const fileName = e.target.files[0].name;
    // dispatch(ToastsAction.add('There is already the same!', ToastStatusEnum.Error));

    const newObject = new WorkAttachmentModel({});
    const data = new FormData();
    const getExt = fileName.split('.');
    newObject.Attachment = e.target.files[0];
    newObject.Data = new DataWorkAttachment({});
    newObject.Data.FileName = fileName;
    newObject.Data.FunnelGenID = workDetail.funnelGenId;
    newObject.Data.DocNumber = workDetail.taskUID;
    newObject.Data.Modul = 5;
    newObject.Data.DocumentTypeID = docTypeId;
    newObject.Data.DocumentName = fileName.replace(/\.[^/.]+$/, '');
    newObject.Data.Notes = '';
    newObject.Data.CreateDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    newObject.Data.CreateUserID = currentUser.employeeID;

    const options = {
      indices: false,
      nullsAsUndefineds: false,
      booleansAsIntegers: false,
      allowEmptyArrays: false,
    };

    serialize(
      newObject,
      options, // optional
      data // optional
    );

    dispatch(WorkListActions.postWorkAttachment(data)).then(() => {
      getAttachment(1);
      setPaginConfig({ ...paginConfig, pageAttach: 1 });
    });
  };

  const onCancelHandler = () => {
    dispatch(ModalFirstActions.CLOSE());
    dispatch(WorkListActions.clearListActivity());
  };

  useEffect(() => {
    setAssignToList(getKeyValueEmailList(workDetail?.primaryResources?.split(','), employeeFixAll));
    setSecoundResourceList(getKeyValueEmailList(workDetail?.secondaryResources?.split(','), employeeFixAll));

    setEmailReceiverList(sendMail(workDetail?.emailReceiver));
    setEmailCcList(sendMail(workDetail?.emailCc));
  }, [workDetail, employeeFixAll]);

  const handleSearchChangeEmployee = (e: any, data: any) => {
    if (data.value.length >= 2) {
      setSearchInput({
        ...searchInput,
        searchResource: $.trim(data.value),
      });
    }
  };

  const handleSearchSecoundResource = (e: any, data: any) => {
    if (data.value.length >= 2) {
      setSearchInput({
        ...searchInput,
        searchSecondResource: $.trim(data.value),
      });
    }
  };

  const handlePagination = (e, data, pagin) => {
    if (pagin === 'activity') {
      setActivePageAR(data.activePage);
      dispatch(WorkListActions.getWorkActivityReport(data.activePage, pageSize, workDetail.taskUID));
    } else {
      setPaginConfig({ ...paginConfig, pageAttach: data.activePage });
      dispatch(WorkListActions.getListWorkAttachment(data.activePage, pageSize, 5, workDetail.taskUID));
    }
  };

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
  };

  let task = {
    uid: workDetail.taskUID,
    createDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
  };

  const handleChange = (e, change) => {
    if (change === 'category') {
      const category = taskCategory.find((item) => item.value === e);
      getDrpSub('taskSubCategory', category.text);
    } else {
      const issue = taskIssueType.find((item) => item.value === e);
      setIssueType(issue.text);
      getDrpSub('taskSubType', issue.text);
    }
  };

  const handleChecked = (e, checked, checkBox) => {
    setSentEscalation(checked.checked);
    setSendEmail(checked.checked);
  };

  const { panes } = TabPanesAttachment({
    fileChange,
    isRequestingAttachment,
    generalList,
    setListAttachment,
    listAttacment,
    task,
    docTypeId,
    getAttachment,
    setPaginConfig,
    paginConfig,
    activePage,
    handlePaginationChange,
  });

  const { validate } = InputFormWorklistValidateHooks({
    assignToList,
    taskStatus,
    issueType,
    emailReceiverList,
    emailCcList,
    sendEmail,
  });

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={initialValues}
      render={({ handleSubmit, invalid, submitting, pristine }) => (
        <Form
          // onSubmit={handleSubmit}
          loading={isRequesting}
        >
          <Card.Header className={styles.headerProjectSummary}>
            <h4>Project Summary</h4>
          </Card.Header>
          <Divider></Divider>

          <Grid className={`${styles.containerProjectSummary}`}>
            <Grid.Row columns={2} className="pb-0">
              <Grid.Column className="pb-0">
                <Field name="pmoName" component={LabelName} labelName="PMO/S Name" placeholder="e.g.Jhon Doe.." values={''} />
              </Grid.Column>
              <Grid.Column className="pb0">
                <Field name="customerName" component={LabelName} labelName="Customer Name" placeholder="e.g.Customer.." values={''} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="pb-0">
              <Grid.Column className="pb0">
                <Field name="projectName" component={LabelName} labelName="Project Name" placeholder="e.g.Project.." values={''} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="pb-0">
              <Grid.Column className="pb0">
                <Field
                  name="projectAlias"
                  component={LabelNameMultiValue}
                  labelName="Project Alias"
                  placeholder="e.g.Project.."
                  // values={'septe,habudin'}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns="equal">
            <Grid.Column width={4}>
              <Header as="h5" className="">
                <Header.Content>WORK DETAILS</Header.Content>
              </Header>
            </Grid.Column>
          </Grid>
          <Divider></Divider>

          <Grid className="mb-1r">
            <Grid.Row className="pb-0">
              <Grid.Column className="pb-0" width={4}>
                <Field name="taskUID" component={LabelName} labelName="Task ID" placeholder="e.g.T0001.." values={''} />
              </Grid.Column>
              <Grid.Column className="pb0" width={4}>
                <Field name="estStartDate" component={LabelName} labelName="Est. Work Start" placeholder="e.g.24/05/2022.." values={''} />
              </Grid.Column>
              <Grid.Column className="pb0" width={4}>
                <Field name="estEndDate" component={LabelName} labelName="Est. Work End" placeholder="e.g.24/05/2022.." values={''} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className="pb-0">
              <Grid.Column className="pb-0">
                <Field name="taskTitle" component={LabelName} labelName="Task Name" placeholder="e.g.Penarikkan Kabel FO.." values={''} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className="pb-0">
              <Grid.Column className="pb-0">
                <Field
                  name="taskDescription"
                  component={LabelName}
                  labelName="Task Description"
                  placeholder="e.g.Penarikkan Kabel FO-140Km  Jawa Tengah.."
                  values={''}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className="pb-0">
              <Grid.Column className="pb-0" width={4}>
                <Field name="actualStartDate" component={LabelName} labelName="Act. Task Start" placeholder="e.g.T0001.." values={''} />
              </Grid.Column>
              <Grid.Column className="pb0" width={4}>
                <Field name="actualEndDate" component={LabelName} labelName="Act. Task End" placeholder="e.g.24/05/2022.." values={''} />
              </Grid.Column>
              <Grid.Column className="pb0" width={4}>
                <Field
                  name="taskStatus"
                  component={SelectInput}
                  placeholder="e.g. New.."
                  labelName="Task Status"
                  options={workStatus}
                  mandatory={false}
                  onChanged={(e) => setStatus(e)}
                  // values={}
                  // defaultValue={}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Field
                  name="remark"
                  editorId="work-remark"
                  component={RichTextEditor}
                  placeholder="e.g.Type your remarks here.."
                  labelName="Remarks"
                  mandatorys={taskStatus !== 'Void' && taskStatus !== 'Hold'}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                >
                  {
                    <p className="BlackListText" style={{ fontWeight: 'lighter' }}>
                      Mandatory when status change to <span style={{ fontWeight: 'bold' }}>On Hold</span> or{' '}
                      <span style={{ fontWeight: 'bold' }}>Void</span>
                    </p>
                  }
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="category"
                  component={SelectInput}
                  placeholder="e.g. Corrective .."
                  labelName="Category"
                  mandatory={false}
                  options={taskCategory.filter((e) => e.text === 'Implementation')}
                  onChanged={(e) => handleChange(e, 'category')}
                />
              </Grid.Column>

              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="subcategory"
                  component={SelectInput}
                  placeholder="e.g. Corrective .."
                  labelName="Sub Category"
                  options={taskSubCategory}
                  disabled={taskSubCategory?.length === 0}
                  // onChanged={(e) =>
                  //   setInitialValues({
                  //     ...initialValues,
                  //     subCategory: e,
                  //   })
                  // }
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="issueType"
                  component={SelectInput}
                  placeholder="e.g. Request .."
                  labelName="Issue Type"
                  mandatory={false}
                  options={taskIssueType}
                  onChanged={(e) => handleChange(e, 'issue')}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="issueSubtype"
                  component={SelectInput}
                  placeholder="e.g. JDE .."
                  labelName="Sub Type"
                  options={taskSubIssue}
                  disabled={taskSubIssue?.length === 0}
                  // onChanged={(e) =>
                  //   setInitialValues({
                  //     ...initialValues,
                  //     subType: e,
                  //   })
                  // }
                />
              </Grid.Column>
            </Grid.Row>

            {(issueType === 'Add-on (Hardware)' || issueType === 'Hardware Problem') && (
              <>
                <Grid.Row columns="equal">
                  <Grid.Column className=" ViewLabel FullGrid1200 " width={6}>
                    <Field
                      name="brand"
                      component={SelectInput}
                      placeholder="e.g. Hawllet Packard .."
                      labelName="Brand"
                      options={branch}
                      onChanged={(e) => dispatch(WorkListActions.getDropdownByFunnelID('subBranch', +workDetail.funnelGenId, e))}
                      mandatory={issueType ? issueType !== 'Add-on (Hardware)' && issueType !== 'Hardware Problem' : true}
                    />
                  </Grid.Column>
                  <Grid.Column className=" ViewLabel FullGrid1200 " width={6}>
                    <Field
                      name="subBrand"
                      component={SelectInput}
                      placeholder="e.g. HP Wolf Security .."
                      labelName="Sub Brand"
                      options={subBranch}
                      disabled={branch?.length === 0 || subBranch?.length === 0}
                      mandatory={issueType ? issueType !== 'Add-on (Hardware)' && issueType !== 'Hardware Problem' : true}
                      // onChanged={(e) =>
                      //   setInitialValues({
                      //     ...initialValues,
                      //     subCategory: e,
                      //   })
                      // }
                    />
                  </Grid.Column>
                </Grid.Row>
              </>
            )}

            <Grid.Row columns="equal">
              <Grid.Column className={`${styles.MaxHSearch} ${styles.searchInputList} ViewLabel FullGrid1200 `} width={11}>
                <Field
                  name="taskResource"
                  component={SearchInputList}
                  placeholder="e.g.Han.Solo@berca.co.id"
                  labelName="Assigned To"
                  handleSearchChange={handleSearchChangeEmployee}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      searchInput.searchResource &&
                        dispatch(
                          EmployeeActions.reqEmployeeHierarcyDqSearch('subordinate', currentUser.userName, $.trim(searchInput.searchResource), true)
                        );
                    }
                  }}
                  results={empHirarcy}
                  listSoftware={assignToList}
                  setListSoftware={setAssignToList}
                  mandatory={taskStatus === 'New' || taskStatus === 'Hold' || taskStatus === 'Void'}
                  listOnDelete={(list) => list.length === 0 && setApplyToChilds(!applyToChilds)}
                />
                {assignToList.length === 0 && <InfoInputEnter />}
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 " verticalAlign="middle" width={5}>
                <Field
                  name="isApplyTaskResourceToAllChild"
                  component={CheckBoxInput}
                  label="Apply to all child task"
                  onChange={(e) => {
                    setApplyToChilds(!applyToChilds);
                  }}
                  disabled={assignToList.length === 0}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column className={`${styles.MaxHSearch} ${styles.searchInputList} ViewLabel FullGrid1200 `}>
                <Field
                  name="secondaryResources"
                  component={SearchInputList}
                  placeholder="e.g.Han.Solo@berca.co.id"
                  labelName="Secondary Resourch"
                  handleSearchChange={handleSearchSecoundResource}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      searchInput.searchSecondResource &&
                        dispatch(EmployeeActions.requestEmployeeByName($.trim(searchInput.searchSecondResource), ''));
                    }
                  }}
                  results={searchInput.searchSecondResource.length >= 2 ? employeeStoreSearch : []}
                  listSoftware={secoundResourceList}
                  setListSoftware={setSecoundResourceList}
                  mandatory={false}
                />
                {secoundResourceList.length === 0 && <InfoInputEnter />}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767" width={8}>
                <Field
                  name="slaAssignment"
                  component={SelectInput}
                  placeholder="e.g. 2 + 1 BD .."
                  labelName="Serive Level Agreement"
                  options={sla}
                  mandatory={false}
                  // values={'Hardware'}
                  // defaultValue={}
                />
              </Grid.Column>
            </Grid.Row>

            {/* <Grid.Row columns={1} className="pb-0">
              <Grid.Column className="pb-0">
                <Field
                  name="isSendNotificationToPmo"
                  component={CheckBoxInput}
                  label="Send Notification to PMO/S"
                  onChange={(e) => {
                    setSendNotif(!sendNotif);
                  }}
                />
              </Grid.Column>
            </Grid.Row> */}
          </Grid>

          <Divider></Divider>
          <Grid columns="equal">
            <Grid.Column verticalAlign="middle">
              <Header as="h5" className="">
                <Header.Content>ACTIVITY REPORT</Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Button
                className="m-05r"
                icon="plus"
                color="yellow"
                disabled={initialValues.taskStatus?.toLowerCase() === 'closed'}
                floated="right"
                size="small"
                content="Add New"
                type="button"
                onClick={() =>
                  dispatch(
                    ModalSecoundActions.OPEN(
                      <ActivityReportFormInput
                        type={'ADD NEW'}
                        rowData={{
                          ...workDetail,
                          contactName: workDetail.customerPicName,
                          address: workDetail.customerAddress,
                          phone: workDetail.customerPhone,
                          engineerList: workDetail.primaryResources
                            .split(',')
                            .map((item) => {
                              let temp = '';
                              employeeFixAll.map((e) => {
                                if (e.price === item) {
                                  temp += e.title;
                                }
                              });

                              return temp;
                            })
                            .join(';'),
                        }}
                        activePage={activePageAR}
                        setActivePage={setActivePageAR}
                      />,
                      ModalSizeEnum.Large
                    )
                  )
                }
              />
            </Grid.Column>
          </Grid>
          <Divider></Divider>
          <Grid className="mb-1r">
            <Grid.Row className="hozontal-scroll">
              <Grid.Column>
                <div className="mb-1r">
                  <ActivityReportTable tableData={workActivityReport.rows} />
                </div>
                <Pagination
                  activePage={activePageAR}
                  onPageChange={(e, data) => handlePagination(e, data, 'activity')}
                  totalPage={workActivityReport.totalRows}
                  pageSize={pageSize}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider></Divider>
          <Grid columns="equal">
            <Grid.Column width={16} verticalAlign="middle">
              <Header as="h5" className="">
                <Header.Content>ATTACHMENT FILES </Header.Content>
              </Header>
            </Grid.Column>
          </Grid>
          <Divider></Divider>
          <Grid>
            <Grid.Column width={16}>
              <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column>
              <div className="mb-1r">
                <AttachmentFilesTable tableData={listWorkAttachment.rows} activePage={paginConfig} setActivePage={setPaginConfig} />
              </div>
              <Pagination
                activePage={paginConfig.pageAttach}
                onPageChange={(e, data) => handlePagination(e, data, 'listWorkAttacment')}
                totalPage={listWorkAttachment.totalRows}
                pageSize={pageSize}
              />
            </Grid.Column>
          </Grid>

          <Divider></Divider>
          <Grid columns="equal">
            <Grid.Column verticalAlign="top" className="pb-05">
              <Field
                name="isSendEmailNotification"
                component={CheckBoxInput}
                label="Send Email Notification"
                values={sendEmail}
                useValues={true}
                disabled={sentEscalation}
                onChange={(e) => {
                  setSendEmail(!sendEmail);
                }}
              />
            </Grid.Column>

            <Grid.Column verticalAlign="middle" textAlign="right" className={styles.itemToggle}>
              <span>Sent Escalation</span>
              <span>
                <Field
                  name={'sentEscalation'}
                  toggle
                  component={CheckBox}
                  disabled={
                    initialValues.taskStatus === 'In Progress' && (rowData.creatorId === currentUser.employeeID || isEscalation?.isAllow)
                      ? false
                      : true
                  }
                  checked={sentEscalation}
                  onChange={(e, checked) => handleChecked(e, checked, 'sentEsc')}
                />
              </span>
            </Grid.Column>
          </Grid>
          <Divider></Divider>

          {sendEmail && (
            <>
              <Grid className="ph-5px">
                <Grid.Row className={styles.greySection}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column className=" ViewLabel FullGrid1200 " width={16}>
                        <Field
                          name="subject"
                          values={sendEmailValues.subject}
                          component={TextInput}
                          placeholder="e.g.Task UID: TS2023.1081 Name: Task Title #1.19 Edit has been updated"
                          labelName="Subject"
                          disabled={true}
                          mandatory={false}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns="equal">
                      <Grid.Column className={`${styles.MaxHSearch} ${styles.searchInputList} ViewLabel FullGrid1200 `}>
                        <Field
                          name="emailReceiver"
                          component={SearchInputList}
                          placeholder="e.g.Han.Solo@berca.co.id"
                          labelName="Sent Email To"
                          // handleSearchChange={(e, data) =>
                          //   dispatch(EmployeeActions.reqEmployeeHierarcyDqSearch('subordinate', currentUser.userName, $.trim(data.value), true))
                          // }
                          // results={empHirarcy}
                          handleSearchChange={handleSearchSecoundResource}
                          onKeyPress={(event) => {
                            if (event.charCode === 13) {
                              searchInput.searchSecondResource &&
                                dispatch(EmployeeActions.requestEmployeeByName($.trim(searchInput.searchSecondResource), ''));
                            }
                          }}
                          results={employeeSearchValEmail}
                          listSoftware={emailReceiverList}
                          setListSoftware={setEmailReceiverList}
                          mandatory={!sendEmail}
                        />
                        {emailReceiverList.length === 0 && <InfoInputEnter />}
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns="equal">
                      <Grid.Column className={`${styles.MaxHSearch} ${styles.searchInputList} ViewLabel FullGrid1200 `}>
                        <Field
                          name="emailCc"
                          component={SearchInputList}
                          placeholder="e.g.Han.Solo@berca.co.id"
                          labelName="CC To"
                          handleSearchChange={handleSearchSecoundResource}
                          onKeyPress={(event) => {
                            if (event.charCode === 13) {
                              searchInput.searchSecondResource &&
                                dispatch(EmployeeActions.requestEmployeeByName($.trim(searchInput.searchSecondResource), ''));
                            }
                          }}
                          results={employeeSearchValEmail}
                          listSoftware={emailCcList}
                          setListSoftware={setEmailCcList}
                          mandatory={true}
                        />
                        {emailCcList.length === 0 && <InfoInputEnter />}
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <Field
                          name="body"
                          initialValues={sendEmailValues.body}
                          editorId="work-message"
                          component={RichTextEditor}
                          disabled={true}
                          placeholder="e.g.Type your message here.."
                          labelName="Message"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Row>
              </Grid>
            </>
          )}

          {history?.length > 0 && <Divider></Divider>}

          <Grid>
            {history?.length > 0 && (
              <div className="wrap-yellow-no-padding modal-small">
                <Grid.Row verticalAlign="middle" columns="equal" className="pb-0 pt-1r">
                  <Grid.Column verticalAlign="middle">
                    <Header as="h5">
                      <Header.Content>Task History</Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <div className="ui divider FullHdivider" />
                <Grid.Row className="pt-0 pb-1-5r">
                  <Grid.Column>
                    <TaskHistory page="gundam" history={history} />
                  </Grid.Column>
                </Grid.Row>
              </div>
            )}
          </Grid>

          <Divider className="mb-1r"></Divider>

          <Grid columns="equal" padded>
            <Grid.Column textAlign="center">
              <Button content="Cancel" type="button" onClick={onCancelHandler} />
              <Button
                color="blue"
                content="Submit"
                type="button"
                disabled={submitting || workDetail.projectStatus === 'Void'}
                loading={isRequesting}
                onClick={handleSubmit}
              />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default InputFormWorklist;
