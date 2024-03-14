import React, { useEffect, useState } from "react";
import { Card, Divider, Form, Grid, Header, Tab } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { serialize } from "object-to-formdata";
import { gantt } from "dhtmlx-gantt";
import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "redux";
import moment from "moment";

import {
  Button,
  CheckBox,
  CheckBoxInput,
  DateInput,
  InfoInputEnter,
  Pagination,
  RichTextEditor,
  SearchInputList,
  SelectInput,
  TextAreaInput,
  TextInput,
} from "views/components/UI";
import {
  selectDropdownGundam,
  selectDropdownGundamEntryKey,
  selectProjectGundamTaskLinkList,
  selectValueEmailGundam,
} from "selectors/project-gundam/ProjectGundamSelector";
import {
  selectEmpHirarcy,
  selectEmployeeSearchEmail,
  selectEmployeeSearchValEmail,
} from "selectors/select-options/EmployeeSelector";
import {
  getEmailList,
  getKeyValueEmailList,
  getResource,
  mandatoryBranchSubranch,
  sendMail,
} from "../../helper/pmo";
import ProjectGundamTaskModel, {
  ProjectTasktModel,
} from "stores/project-gundam/models/ProjectGundamTaskModel";
import TaskHistory from "views/ticket-page/page-ticket/components/form/components/TaskHistory/TaskHistory";
import {
  selectListWorkAttachment,
  selectWorklistDrpToStr,
} from "selectors/work-list/WorklistSelector";
import WorkAttachmentModel, {
  DataWorkAttachment,
} from "stores/work-list/models/WorkAttachmentModel";
import { AttachmentTable } from "views/ticket-page/page-ticket/components/form/components/Table";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import IOptionsDataString from "selectors/select-options/models/IOptionsDataString";
import * as ProjectGundamActions from "stores/project-gundam/ProjectGundamActions";
import TabPanesAttachment from "./childs/tab-panes-attachment/TabPanesAttachment";
import GetEscalationModel from "stores/project-gundam/models/GetEscalationModel";
import { selectEmployeeFixAll } from "selectors/select-options/PMOTypeSelector";
import { selectGeneralList } from "selectors/attachment/AttachmentSelector";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import TaskDeleteModel from "stores/project-gundam/models/TaskDeleteModel";
import * as AttachmentActions from "stores/attachment/AttachmentActions";
import FormGundamValidateHook from "./hooks/FormGundamValidateHook";
import * as WorkListActions from "stores/work-list/WorkListActions";
import { selectDrpEntryKey } from "selectors/ticket/TicketSelector";
import * as EmployeeActions from "stores/employee/EmployeeActions";
import AlertConfirm from "views/components/confirm/AlertConfirm";
import { selectUserResult } from "selectors/user/UserSelector";
import * as TicketActions from "stores/ticket/TicketActions";
import IUserResult from "selectors/user/models/IUserResult";
import * as ToastsAction from "stores/toasts/ToastsAction";
import ToastStatusEnum from "constants/ToastStatusEnum";
import ModalSizeEnum from "constants/ModalSizeEnum";
import styles from "./FormGundam.module.scss";
import PMOHooks from "../../helper/PMOHooks";
import IStore from "models/IStore";

function FormGundam({ task, projectId, funnelGenId }) {
  const dispatch: Dispatch = useDispatch();
  task = gantt.getTask(task);

  const [isMilestone, setMilestone] = useState(false);
  const [searchEmployee, onSearchEmployee] = useState("");
  const [searchSecondResource, onSearchSecondResource] = useState("");
  const [searchEmailReceiver, onSearchEmailReceiver] = useState("");
  const [searchEmailCc, onSearchEmailCc] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [template, setTemplate] = useState("");
  const [initValTemplate, setInitValTemplate] = useState({
    inc: 0,
    category: "",
    subcategory: "",
    issueType: "",
    issueSubtype: "",
    taskDescription: "",
  } as any);

  const [paginConfig, setPaginConfig] = useState({
    pageAttach: 1,
    pageSizeAttach: 5,
  });
  const [endDate, setEndDate] = useState(
    new Date(moment().valueOf() + 24 * 60 * 60 * 1000)
  );
  const [secoundResourceList, setSecoundResourceList] = useState([] as any);
  const [initialValues, setInitialValues] = useState({ inc: 0 } as any);
  const [sendEmailValues, setEmailValues] = useState({} as any);
  const [assignToList, setAssignToList] = useState([] as any);
  const [activePage, setActivePage] = useState(1);
  const [issueType, setIssueType] = useState("");
  const [status, setStatus] = useState("");

  const [sentEscalation, setSentEscalation] = useState(false);
  const [applyToChilds, setApplyToChilds] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

  const [emailReceiverList, setEmailReceiverList] = useState([] as any);
  const [emailCcList, setEmailCcList] = useState([] as any);

  const [listAttacment, setListAttachment] = useState([] as any);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ProjectGundamActions.GET_PROJECT_GUNDAM_TASK_WITH_LINK,
      ProjectGundamActions.POST_PROJECT_GUNDAM_TASK,
      ProjectGundamActions.PUT_PROJECT_GUNDAM_TASK,
      ProjectGundamActions.GET_DROPDOWN_TASK_TEMPLATE,
      ProjectGundamActions.DELETE_PROJECT_GUNDAM_TASK,
      ProjectGundamActions.GET_TASK_FORM_TEMPLATE,
      ProjectGundamActions.GET_DROPDOWN_SLA,
      ProjectGundamActions.VALUE_EMAIL,
      WorkListActions.GET_DROPDOWN_TASK_STATUS,
      WorkListActions.POST_WORK_ATTACHMENT,
      WorkListActions.DELETE_WORK_ATTACHMENT,
      WorkListActions.GET_LIST_WORK_ATTATCHMENT,
      WorkListActions.GET_DROPDOWN_BRANCH,
      WorkListActions.GET_DROPDOWN_SUB_BRANCH,
      AttachmentActions.POST_TEMP_GENERIC,
      TicketActions.GET_DROPDOWN_TASK_CATEGORY,
      TicketActions.GET_DROPDOWN_TASK_SUB_CATEGORY,
      TicketActions.GET_DROPDOWN_TASK_ISSUE,
      TicketActions.GET_DROPDOWN_TASK_SUB_ISSUE,
    ])
  );
  const isRequestingAttachment: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AttachmentActions.GET_LIST_GENERAL,
      WorkListActions.COPY_FUNNEL_ATTACHMENT,
    ])
  );

  const isRequestingEmp: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [EmployeeActions.REQUEST_EMPLOYEES_BY_NAME])
  );
  const taskTemplate: IOptionsDataString[] = useSelector((state: IStore) =>
    selectDropdownGundamEntryKey(state, "taskTemplate")
  );
  const ticketStatus: any = useSelector((state: IStore) =>
    selectWorklistDrpToStr(state, "taskStatus")
  );
  const taskSubCategory = useSelector((state: IStore) =>
    selectDrpEntryKey(state, "taskSubCategory")
  );
  const employeeSearchValEmail = useSelector((state: IStore) =>
    selectEmployeeSearchValEmail(state)
  );
  const subBranch: any = useSelector((state: IStore) =>
    selectWorklistDrpToStr(state, "subBranch")
  );
  const taskIssueType = useSelector((state: IStore) =>
    selectDrpEntryKey(state, "taskIssueType")
  );
  const taskSubIssue = useSelector((state: IStore) =>
    selectDrpEntryKey(state, "taskSubIssue")
  );
  const taskCategory = useSelector((state: IStore) =>
    selectDrpEntryKey(state, "taskCategory")
  );
  const employeeStoreSearch = useSelector((state: IStore) =>
    selectEmployeeSearchEmail(state)
  );
  const branch: any = useSelector((state: IStore) =>
    selectWorklistDrpToStr(state, "branch")
  );
  const listTaskLink = useSelector((state: IStore) =>
    selectProjectGundamTaskLinkList(state)
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const typeTask = useSelector((state: IStore) =>
    selectDropdownGundam(state, "typeTask")
  );
  const formTemplate = useSelector(
    (state: IStore) => state.projectGundam.formTemplate
  );
  const listAttachment = useSelector((state: IStore) =>
    selectListWorkAttachment(state)
  );
  const isEscalation = useSelector(
    (state: IStore) => state.projectGundam.isEscalation
  );
  const employeeFixAll = useSelector((state: IStore) =>
    selectEmployeeFixAll(state)
  );
  const valueEmail = useSelector((state: IStore) =>
    selectValueEmailGundam(state)
  );
  const sla = useSelector((state: IStore) =>
    selectDropdownGundam(state, "sla")
  );
  const generalList = useSelector((state: IStore) => selectGeneralList(state));
  const empHirarcy = useSelector((state: IStore) => selectEmpHirarcy(state));
  const history = useSelector((state: IStore) => state.workList.history);

  const { docTypeId } = PMOHooks();

  useEffect(() => {
    setStartDate(task.start_date);
    if (task?.createDate) {
      setEndDate(task.end_date);
      setMilestone(task.isMilestone);
      setStatus(task.status);
      setIssueType(task.issueType);

      setInitialValues({
        ...task,
        inc: 0,
      });
    } else {
      setInitialValues({
        ...task,
        inc: 0,
      });
    }
  }, [task, valueEmail]);

  useEffect(() => {
    setEmailValues({ ...valueEmail });
  }, [valueEmail]);

  useEffect(() => {
    if (sentEscalation) {
      setEmailValues({
        ...valueEmail,
        subject: `Escalation Task In Progress - ${valueEmail.subject}`,
      });
      if (task?.createDate) {
        let emailReceiver = [];
        emailReceiver = sendMail(
          getEmailList(task.assigns, employeeFixAll).join(",")
        );
        setEmailReceiverList(emailReceiver);

        let emailCc = [];
        emailCc = sendMail(
          getEmailList(task.secondaryResources, employeeFixAll).join(",")
        );
        setEmailCcList(emailCc);
      }
    } else {
      setEmailValues({ ...valueEmail });
      setEmailReceiverList(sendMail(task?.emailReceiver));
      setEmailCcList(sendMail(task?.emailCc));
    }
  }, [sentEscalation]);

  useEffect(() => {
    if (sendEmail) {
      setEmailReceiverList(
        task?.emailReceiver
          ? sendMail(task?.emailReceiver)
          : sendMail(getEmailList(task.assigns, employeeFixAll).join(","))
      );
      setEmailCcList(
        task?.emailCc
          ? sendMail(task?.emailCc)
          : sendMail(
              getEmailList(task.secondaryResources, employeeFixAll).join(",")
            )
      );
    }
  }, [sendEmail]);

  const getDrpSub = (drp: string, text: string) => {
    dispatch(TicketActions.getDrpByEntryKey(drp, text));
  };

  useEffect(() => {
    if (task?.createDate) {
      let data = new GetEscalationModel({});
      data.taskId = +task.id;
      data.userLoginId = currentUser.employeeID;
      data.userLoginKey = currentUser.employeeKey;
      data.userLogin = currentUser.email;

      dispatch(
        WorkListActions.getDropdown(
          "taskStatus",
          +task.id,
          currentUser.employeeID
        )
      );
      dispatch(
        ProjectGundamActions.getValueEmail(+task.id, currentUser.employeeID)
      );
      dispatch(ProjectGundamActions.getIsEscalation(data));
      dispatch(WorkListActions.getHistory(+task.id));
      setInitValTemplate({
        ...initValTemplate,
        issueType: task?.issueType,
        taskDescription: task?.taskDescription,
        inc: 0,
      });
      getAttachment(1);
    }

    setAssignToList(getKeyValueEmailList(task.assigns, employeeFixAll));
    setSecoundResourceList(
      getKeyValueEmailList(task.secondaryResources, employeeFixAll)
    );
    setEmailReceiverList(sendMail(task?.emailReceiver));
    setEmailCcList(sendMail(task?.emailCc));

    task?.brand &&
      dispatch(
        WorkListActions.getDropdownByFunnelID(
          "subBranch",
          +funnelGenId,
          task?.brand
        )
      );
    dispatch(WorkListActions.getDropdownByFunnelID("branch", +funnelGenId));
    dispatch(ProjectGundamActions.getDropdownByEntryKey("taskTemplate"));
    dispatch(TicketActions.getDrpByEntryKey("TaskIssueType"));
    dispatch(TicketActions.getDrpByEntryKey("TaskCategory"));
    dispatch(ProjectGundamActions.getDropdown("sla"));
  }, [task]);

  useEffect(() => {
    if (formTemplate?.templateName) {
      getDrpSub("taskSubCategory", formTemplate?.category);
      getDrpSub("taskSubType", formTemplate?.issueType);
    } else if (task?.createDate) {
      task?.issueType && getDrpSub("taskSubCategory", task.category);
      task?.category && getDrpSub("taskSubType", task.issueType);
    }
  }, [formTemplate, task]);

  useEffect(() => {
    if (formTemplate?.templateName) {
      setInitValTemplate({
        inc: 1,
        category: formTemplate?.category ? formTemplate?.category : "",
        subcategory: formTemplate?.subcategory ? formTemplate?.subcategory : "",
        issueType: formTemplate?.issueType ? formTemplate?.issueType : "",
        issueSubtype: formTemplate?.issueSubtype
          ? formTemplate?.issueSubtype
          : "",
        taskDescription: formTemplate?.description
          ? formTemplate?.description
          : "",
      });

      if (formTemplate?.primaryResource) {
        setAssignToList(
          getKeyValueEmailList(
            formTemplate.primaryResource.split(","),
            employeeFixAll
          )
        );
      } else {
        setAssignToList([]);
      }

      if (formTemplate?.secondaryResource) {
        setSecoundResourceList(
          getKeyValueEmailList(
            formTemplate.secondaryResource.split(","),
            employeeFixAll
          )
        );
      } else {
        setSecoundResourceList([]);
      }
    }
  }, [formTemplate, template]);

  useEffect(() => {
    dispatch(AttachmentActions.getListGeneral(+funnelGenId, activePage, 5)); // attachment
  }, [activePage, dispatch]);

  const handleSelectTemplate = (e) => {
    const getTextVal = taskTemplate.find((item) => item.value === `${e}`).text;
    dispatch(ProjectGundamActions.getFormTemplate(getTextVal)).then(() => {
      setInitValTemplate({
        ...initValTemplate,
        inc: 0,
      });
    });
    setTemplate(e);
  };

  const handleSearchChangeEmployee = (e: any, data: any) => {
    if (data.value.length >= 2) {
      onSearchEmployee($.trim(data.value));
    }
  };

  const handleSearchSecoundResource = (e: any, data: any) => {
    if (data.value.length >= 2) {
      onSearchSecondResource($.trim(data.value));
    }
  };

  const onSubmitHandler = (values: any) => {
    var task: any = gantt.getTask(values.id);

    const assignTo = getResource(assignToList, "assignTo");
    const secoundResource = getResource(secoundResourceList, "secoundResource");

    const category = values.category || initValTemplate?.category;
    const subCategory =
      taskSubCategory?.length === 0
        ? ""
        : values.subcategory || initValTemplate?.subcategory;
    const issueType = initValTemplate?.issueType || values.issueType;
    const subIssueType =
      taskSubIssue?.length === 0
        ? ""
        : initValTemplate?.issueSubtype || values.issueSubtype;

    task.projectId = projectId;
    task.funnelGenId = funnelGenId;
    // task.type = isMilestone ? 'milestone' : 'task';
    task.isMilestone = isMilestone;
    task.text = values.text;
    task.taskDescription =
      $.trim(initValTemplate?.taskDescription) || values.taskDescription;
    task.start_date = startDate;
    task.end_date = endDate;
    task.assigns = assignTo;
    task.secondaryResources = secoundResource;
    task.slaName = values.slaName;
    task.status = values.status;
    task.remark = values.remark;
    task.category = category;
    task.subcategory = subCategory;
    task.issueType = issueType;
    task.issueSubtype = subIssueType;

    task.brand =
      issueType === "Add-on (Hardware)" || issueType === "Hardware Problem"
        ? values.brand
        : "";
    task.subBrand =
      issueType === "Add-on (Hardware)" || issueType === "Hardware Problem"
        ? values.subBrand
        : "";
    task.isSendEmailNotification = sendEmail;
    task.isSendEmailTaskStatusInProgressEscalation = sentEscalation;
    task.emailReceiver = getResource(emailReceiverList, "emailReceiver")
      .map((item: any) => item)
      .join(",");
    task.emailCc = getResource(emailCcList, "emailCC")
      .map((item: any) => item)
      .join(",");

    if (task.$new) {
      delete task.$new;
      gantt.addTask(task, task.parent);
    } else {
      task.isApplyTaskResourceToAllChild = applyToChilds;
      gantt.updateTask(task.id);
    }

    // gantt.hideLightbox();
    if (!listTaskLink.data.find((e) => e.id === task.id)) {
      onSave(task);
      // onRemove(task.id);
    }

    setTimeout(() => {
      reset();
    }, 350);
  };

  const onSave = (data) => {
    const newItems = new ProjectTasktModel({
      ...data,
      taskTitle: data.text,
      ganttType: isMilestone ? "milestone" : "task",
      primaryResources: data.assigns?.map((item: any) => item).join(","),
      secondaryResources: data.secondaryResources
        ?.map((item: any) => item)
        .join(","),
      estStartDate: moment(data.start_date).format("YYYY-MM-DDTHH:mm:ss.SSS"),
      estEndDate: moment(data.end_date).format("YYYY-MM-DDTHH:mm:ss.SSS"),
      taskDuration: data.duration,
      taskProgress: data.progress,
      parentTaskId: +data.parent,
      createDate: new Date(),
      createUserID: currentUser.employeeID,
    });

    const itemsForm = new ProjectGundamTaskModel({});

    itemsForm.task = newItems;
    itemsForm.attachments = listAttacment;

    dispatch(ProjectGundamActions.postProjectGundamTask(itemsForm)).then(() => {
      dispatch(ModalFirstLevelActions.CLOSE());
      dispatch(ProjectGundamActions.getProjectGundamTaskWithLink(+projectId));
    });
  };

  const onCancel = (taskId) => {
    var task = gantt.getTask(taskId);
    if (task.$new) gantt.deleteTask(task.id);
    // gantt.hideLightbox();
    dispatch(ModalFirstLevelActions.CLOSE());
    reset();
  };

  const onRemove = (taskId) => {
    dispatch(ModalSecondLevelActions.CLOSE());
    // gantt.hideLightbox();
    const deleteItem = new TaskDeleteModel({
      projectId: +projectId,
      taskId: +taskId,
      deleteDate: moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
      deleteUserID: +currentUser.employeeID,
    });

    if (listTaskLink.data.find((e) => e.id === +taskId)) {
      dispatch(ProjectGundamActions.deleteProjectGundamTask(deleteItem)).then(
        () => {
          dispatch(
            ProjectGundamActions.getProjectGundamTaskWithLink(+projectId)
          ).then(() => dispatch(ModalFirstLevelActions.CLOSE()));
          // gantt.deleteTask(taskId);
        }
      );
    }
    reset();
  };

  const handleConfirm = (taskId: any) => {
    let mssg = `<span class='bold-8'>${task.uid}</span><br>
			<span class='bold-2'>"${task.text}"</span>`;

    dispatch(
      ModalSecondLevelActions.OPEN(
        <AlertConfirm
          type={"confirm"}
          handleSave={() => onRemove(taskId)}
          handleCancle={() => dispatch(ModalSecondLevelActions.CLOSE())}
          content={{
            title: "Are You Sure to Delete This Task ?",
            body: mssg,
            // body: `<span class='bold-8'>test</span> <br> <span class='bold-2'>test</span>`,
          }}
        />,
        ModalSizeEnum.Mini
      )
    );
  };

  const reset = () => {
    setInitialValues({
      inc: 0,
    });
    setInitValTemplate({
      inc: 0,
    });
    dispatch(
      ProjectGundamActions.getDropdownByEntryKey("taskSubCategory", "-")
    );
    dispatch(ProjectGundamActions.getDropdownByEntryKey("taskSubType", "-"));
    dispatch(ProjectGundamActions.resetTemplate());
    task?.createDate && dispatch(EmployeeActions.requestEmployeeByName("", ""));
  };

  const handleChange = (e, change) => {
    if (change === "category") {
      const category = taskCategory.find((item) => item.value === e);
      getDrpSub("taskSubCategory", category.text);
      setInitValTemplate({
        ...initValTemplate,
        category: e,
      });
    } else {
      const issue = taskIssueType.find((item) => item.value === e);

      setIssueType(issue.text);
      getDrpSub("taskSubType", issue.text);
      setInitValTemplate({
        ...initValTemplate,
        issueType: e,
      });
    }
  };

  const getAttachment = (pageAttach) => {
    dispatch(
      WorkListActions.getListWorkAttachment(
        pageAttach,
        paginConfig.pageSizeAttach,
        5,
        task.uid
      )
    );
  };

  const fileChange = (e: any) => {
    const fileName = e.target.files[0].name;

    if (listAttacment?.find((e) => e.fileName === fileName)) {
      dispatch(
        ToastsAction.add("There is already the same!", ToastStatusEnum.Error)
      );
    } else {
      if (task?.createDate) {
        const newObject = new WorkAttachmentModel({});
        const data = new FormData();
        const getExt = fileName.split(".");
        newObject.Attachment = e.target.files[0];
        newObject.Data = new DataWorkAttachment({});
        newObject.Data.FileName = fileName;
        newObject.Data.FunnelGenID = funnelGenId;
        newObject.Data.DocNumber = task.uid;
        newObject.Data.Modul = 5;
        newObject.Data.DocumentTypeID = docTypeId;
        newObject.Data.DocumentName = fileName.replace(/\.[^/.]+$/, "");
        newObject.Data.Notes = "";
        newObject.Data.CreateDate = moment().format("YYYY-MM-DDTHH:mm:ss.SSS");
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
      } else {
        setListAttachment([
          ...listAttacment,
          {
            funnelAttachmentID: uuidv4(),
            funnelGenID: funnelGenId,
            documentTypeID: docTypeId,
            docNumber: task.uid,
            fileName: e.target.files[0].name,
            modul: 5,
            createDate: moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
            createUserID: currentUser.employeeID,
            isLocal: true,

            // file: e.target.files[0],
            // fileDownload: '',
            // docNumber: '',
            uploadByName: currentUser.fullName,
          },
        ]);

        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("domainName", currentUser.userName);
        dispatch(AttachmentActions.postTempGeneric(data));
      }
    }
  };

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
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

  const { validate } = FormGundamValidateHook({
    status,
    initValTemplate,
    taskIssueType,
    assignToList,
    secoundResourceList,
    task,
    sendEmail,
    emailReceiverList,
    emailCcList,
  });

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, invalid, pristine, submitting, errors }) => (
        <Form className={styles.gundamForm} loading={isRequesting}>
          <Card.Header>
            {task?.createDate ? (
              <>
                <b>{`${moment(task.start_date).format("DD MM yyyy")} - ${moment(
                  task.end_date
                ).format("DD MM yyyy")}`}</b>
                <span
                  style={{ fontWeight: 400, marginLeft: 10 }}
                >{` ${task.text}`}</span>
              </>
            ) : (
              "New Task"
            )}
          </Card.Header>
          <Divider />
          <Grid className="mb-1r">
            <Grid.Row textAlign="left">
              <Grid.Column className=" ViewLabel FullGrid1200 " width={5}>
                <Field
                  name="taskTypee"
                  component={SelectInput}
                  placeholder="e.g.Task .."
                  labelName="Choose Task Template"
                  options={taskTemplate}
                  onChanged={handleSelectTemplate}
                  mandatory={true}
                />
              </Grid.Column>
              <Grid.Column
                className=" ViewLabel FullGrid1200 "
                verticalAlign="bottom"
                width={3}
              >
                <Field
                  name="milestone"
                  component={CheckBoxInput}
                  label="Milestone"
                  onChange={() => setMilestone(!isMilestone)}
                  values={isMilestone}
                  useValues={true}
                />
              </Grid.Column>

              <Grid.Column className=" ViewLabel FullGrid1200 " width={6}>
                <Field
                  name="status"
                  component={SelectInput}
                  placeholder="e.g. New.."
                  labelName="Task Status"
                  options={
                    !task?.createDate
                      ? [{ text: "New", value: "New" }]
                      : ticketStatus
                  }
                  mandatory={false}
                  onChanged={(e) => setStatus(e)}
                  disabled={!task?.createDate}
                  defaultValue={task?.createDate ? "" : "New"}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Field
                  name="remark"
                  editorId="gundam-remark"
                  component={RichTextEditor}
                  placeholder="e.g.Type your remarks here.."
                  labelName="Remarks"
                  mandatorys={status !== "Void" && status !== "Hold"}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  {
                    <p
                      className="BlackListText"
                      style={{ fontWeight: "lighter" }}
                    >
                      Mandatory when status change to{" "}
                      <span style={{ fontWeight: "bold" }}>On Hold</span> or{" "}
                      <span style={{ fontWeight: "bold" }}>Void</span>
                    </p>
                  }
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767">
                <Field
                  name="category"
                  component={SelectInput}
                  placeholder="e.g. Corrective .."
                  labelName="Category"
                  options={taskCategory.filter(
                    (e) => e.text === "Implementation"
                  )}
                  onChanged={(e) => handleChange(e, "category")}
                  mandatory={false}
                  values={initValTemplate.category}
                  defaultValue={initValTemplate.category}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="subcategory"
                  component={SelectInput}
                  placeholder="e.g. Corrective .."
                  labelName="Sub Category"
                  options={taskSubCategory}
                  disabled={taskSubCategory?.length === 0}
                  onChanged={(e) =>
                    setInitValTemplate({
                      ...initValTemplate,
                      subcategory: e,
                    })
                  }
                  values={initValTemplate.subcategory}
                  defaultValue={initValTemplate.subcategory}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="issueTypes"
                  component={SelectInput}
                  placeholder="e.g. Request .."
                  labelName="Issue Type"
                  options={taskIssueType}
                  onChanged={(e) => handleChange(e, "issue")}
                  mandatory={false}
                  values={initValTemplate.issueType}
                  defaultValue={initValTemplate.issueType}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="issueSubtype"
                  component={SelectInput}
                  placeholder="e.g. JDE .."
                  labelName="Sub Type"
                  options={taskSubIssue}
                  disabled={taskSubIssue?.length === 0}
                  onChanged={(e) =>
                    setInitValTemplate({
                      ...initValTemplate,
                      issueSubtype: e,
                    })
                  }
                  values={initValTemplate.issueSubtype}
                  defaultValue={initValTemplate.issueSubtype}
                  // mandatory={false}
                />
              </Grid.Column>
            </Grid.Row>

            {(issueType === "Add-on (Hardware)" ||
              issueType === "Hardware Problem") && (
              <>
                <Grid.Row columns="equal">
                  <Grid.Column className=" ViewLabel FullGrid1200 " width={6}>
                    <Field
                      name="brand"
                      component={SelectInput}
                      placeholder="e.g. Hawllet Packard .."
                      labelName="Brand"
                      options={branch}
                      onChanged={(e) =>
                        dispatch(
                          WorkListActions.getDropdownByFunnelID(
                            "subBranch",
                            +funnelGenId,
                            e
                          )
                        )
                      }
                      mandatory={
                        initValTemplate.issueType
                          ? mandatoryBranchSubranch(
                              initValTemplate.issueType,
                              taskIssueType
                            )
                          : true
                      }
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
                      mandatory={
                        initValTemplate.issueType
                          ? mandatoryBranchSubranch(
                              initValTemplate.issueType,
                              taskIssueType
                            )
                          : true
                      }
                      // onChanged={(e) =>
                      //   setInitialValues({
                      //     ...initialValues,
                      //     subCategory: e,
                      //   })
                      // }
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="equal">
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="text"
                      component={TextInput}
                      placeholder="e.g. Main Task For Project Gundam OO.."
                      labelName="Task Name"
                      mandatory={false}
                    />
                  </Grid.Column>
                </Grid.Row>
              </>
            )}

            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767">
                <Field
                  name="taskDescriptions"
                  editorId={"gundam-description"}
                  component={TextAreaInput}
                  placeholder="e.g.Description Project.."
                  labelName="Description/Task Name"
                  mandatory={false}
                  onChange={(e) =>
                    setInitValTemplate({
                      ...initValTemplate,
                      taskDescription: e,
                    })
                  }
                  initialValues={initValTemplate.taskDescription}
                  values={initValTemplate.taskDescription}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className="pb-0" width={5}>
                <Field
                  name="start_datee"
                  component={DateInput}
                  labelName="Start Date"
                  placeholder="e.g.09/09/2022"
                  mandatory={false}
                  date={true}
                  dropUp={false}
                  values={startDate}
                  onChange={(e) => {
                    setStartDate(e);
                    setEndDate(
                      new Date(moment(e).valueOf() + 24 * 60 * 60 * 1000)
                    );
                  }}
                />
              </Grid.Column>
              <Grid.Column className="pb-0" width={5}>
                <Field
                  name="end_datee"
                  component={DateInput}
                  labelName="End Date"
                  placeholder="e.g.09/09/2022"
                  mandatory={false}
                  date={true}
                  dropUp={false}
                  disabled={!startDate}
                  values={endDate}
                  onChange={(e) => {
                    setEndDate(e);
                  }}
                  minDate={
                    new Date(moment(startDate).valueOf() + 1 * 60 * 60 * 1000)
                  }
                  // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column
                className={`${styles.searchInputList} ${styles.ColSearch} ViewLabel FullGrid1200 `}
                width={11}
              >
                <Field
                  name="assignToo"
                  component={SearchInputList}
                  placeholder="e.g.. Jhon Doe"
                  labelName="Assign To"
                  handleSearchChange={handleSearchChangeEmployee}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      searchEmployee &&
                        dispatch(
                          EmployeeActions.reqEmployeeHierarcyDqSearch(
                            "subordinate",
                            currentUser.userName,
                            $.trim(searchEmployee),
                            true
                          )
                        );
                    }
                  }}
                  results={empHirarcy}
                  listSoftware={assignToList}
                  setListSoftware={setAssignToList}
                  mandatory={
                    task?.createDate
                      ? status === "New" ||
                        status === "Hold" ||
                        status === "Void"
                      : true
                  }
                  listOnDelete={(list) =>
                    list?.filter((e) => e.value !== "").length === 0 &&
                    setApplyToChilds(false)
                  }
                  // loading={isRequestingEmp}
                />
                {assignToList.length === 0 && <InfoInputEnter />}
              </Grid.Column>
              <Grid.Column
                className=" ViewLabel FullGrid1200 "
                verticalAlign="middle"
                width={5}
              >
                <Field
                  name="isApplyTaskResourceToAllChild"
                  component={CheckBoxInput}
                  label="Apply to all child task"
                  disabled={!task?.createDate || assignToList.length === 0}
                  onChange={() => setApplyToChilds(!applyToChilds)}
                  values={applyToChilds}
                  useValues={true}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column
                className={`${styles.searchInputList} ${styles.ColSearch}`}
              >
                <Field
                  name="secondaryResourcess"
                  component={SearchInputList}
                  placeholder="e.g. Jhon Doe"
                  labelName="Secoundary Resource"
                  handleSearchChange={handleSearchSecoundResource}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      searchSecondResource &&
                        dispatch(
                          EmployeeActions.requestEmployeeByName(
                            $.trim(searchSecondResource),
                            ""
                          )
                        );
                    }
                  }}
                  results={employeeStoreSearch}
                  listSoftware={secoundResourceList}
                  setListSoftware={setSecoundResourceList}
                  mandatory={false}
                  // loading={isRequestingEmp}
                />
                {secoundResourceList.length === 0 && <InfoInputEnter />}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767" width={8}>
                <Field
                  name="slaName"
                  component={SelectInput}
                  placeholder="e.g. 2 + 1 BD .."
                  labelName="Serive Level Agreement"
                  options={sla}
                  mandatory={!task?.createDate}
                  // values={'Hardware'}
                  // defaultValue={}
                />
              </Grid.Column>
            </Grid.Row>

            {/* {taskType === 'Ordering' && task?.createDate && (
              <>
                <div className="ui divider FullHdivider" />
                <Grid.Row>
                  <Grid.Column verticalAlign="middle">
                    <Header as="h5">
                      <Header.Content>List Product</Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8} className="mb-10px">
                    <Input
                      className={styles.Rounded}
                      // iconPosition="left"
                      icon="search"
                      // loading={}
                      placeholder="Type: Product Number"
                      // onChange={onChangeSearch}
                      // onKeyPress={(event) => {
                      //   if (event.charCode == 13) {
                      //     onSearch();
                      //   }
                      // }}
                      // value={searchText}
                    />
                  </Grid.Column>
                  <Grid.Column width={16}>
                    <ProductTable tableData={[...Array.from(Array(5).keys())]} />
                  </Grid.Column>
                </Grid.Row>

                <div className="ui divider FullHdivider" />
                <Grid.Row>
                  <Grid.Column verticalAlign="middle">
                    <Header as="h5">
                      <Header.Content>Ordering Schedule</Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <OrderingTable tableData={[...Array.from(Array(5).keys())]} />
                  </Grid.Column>
                </Grid.Row>
              </>
            )} */}
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
              <AttachmentTable
                tableData={
                  task?.createDate ? listAttachment.rows : listAttacment
                }
                setListAttachment={setListAttachment}
                rowData={task}
                type={task?.createDate ? "EDIT" : "ADD"}
                setPaginConfig={setPaginConfig}
                paginConfig={paginConfig}
              />
              {task?.createDate && (
                <Pagination
                  activePage={paginConfig.pageAttach}
                  onPageChange={(e, data) =>
                    setPaginConfig({
                      ...paginConfig,
                      pageAttach: data.activePage,
                    })
                  }
                  totalPage={listAttachment.totalRows}
                  pageSize={paginConfig.pageSizeAttach}
                />
              )}
            </Grid.Column>
          </Grid>

          <Divider></Divider>
          <Grid columns="equal">
            <Grid.Column verticalAlign="top" className="pb-05">
              <Field
                name="isSendEmailNotification"
                component={CheckBoxInput}
                label="Send Email Notification"
                disabled={sentEscalation}
                values={sendEmail}
                useValues={true}
                onChange={(e) => {
                  setSendEmail(!sendEmail);
                }}
              />
            </Grid.Column>

            {task?.createDate && (
              <Grid.Column
                verticalAlign="middle"
                textAlign="right"
                className={styles.itemToggle}
              >
                <span>Sent Escalation</span>
                <span>
                  <Field
                    name={"sentEscalation"}
                    toggle
                    component={CheckBox}
                    disabled={
                      task.status === "In Progress" &&
                      (task?.createUserID === currentUser.employeeID ||
                        isEscalation?.isAllow)
                        ? false
                        : true
                    }
                    checked={sentEscalation}
                    onChange={(e, checked) =>
                      handleChecked(e, checked, "sentEsc")
                    }
                  />
                </span>
              </Grid.Column>
            )}
          </Grid>
          <Divider></Divider>

          {sendEmail && (
            <>
              <Grid className="ph-5px">
                <Grid.Row className={styles.greySection}>
                  <Grid columns={16} centered>
                    {task?.createDate && (
                      <Grid.Row>
                        <Grid.Column
                          className=" ViewLabel FullGrid1200 "
                          width={16}
                        >
                          <Field
                            name="subject"
                            values={sendEmailValues.subject}
                            component={TextInput}
                            placeholder="e.g.Task UID: TS2023.1081 Name: Task Title #1.19 Edit has been updated"
                            labelName="Subject"
                            disabled={true}
                            mandatory={false}
                            // defaultValue={projectSummary.projectId}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    )}
                    onSearchEmailCc
                    <Grid.Row columns={1} centered>
                      <Grid.Column
                        className={`${styles.ColSearch} ${styles.searchInputList} ViewLabel FullGrid1200 `}
                      >
                        <Field
                          name="emailReceiver"
                          component={SearchInputList}
                          placeholder="e.g.Han.Solo@berca.co.id"
                          labelName="Sent Email To"
                          handleSearchChange={(e, data) =>
                            onSearchEmailReceiver($.trim(data.value))
                          }
                          onKeyPress={(event) => {
                            if (event.charCode === 13) {
                              searchEmailReceiver &&
                                dispatch(
                                  EmployeeActions.requestEmployeeByName(
                                    $.trim(searchEmailReceiver),
                                    ""
                                  )
                                );
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
                    <Grid.Row columns={1} centered>
                      <Grid.Column
                        className={`${styles.ColSearch} ${styles.searchInputList} ViewLabel FullGrid1200 `}
                      >
                        <Field
                          name="emailCc"
                          component={SearchInputList}
                          placeholder="e.g.Han.Solo@berca.co.id"
                          labelName="CC To"
                          handleSearchChange={(e, data) =>
                            onSearchEmailCc($.trim(data.value))
                          }
                          onKeyPress={(event) => {
                            if (event.charCode === 13) {
                              searchEmailCc &&
                                dispatch(
                                  EmployeeActions.requestEmployeeByName(
                                    $.trim(searchEmailCc),
                                    ""
                                  )
                                );
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
                    {task?.createDate && (
                      <Grid.Row columns={1} centered>
                        <Grid.Column>
                          <Field
                            name="body"
                            initialValues={sendEmailValues.body}
                            editorId="work-message"
                            component={RichTextEditor}
                            placeholder="e.g.Type your message here.."
                            labelName="Message"
                            disabled={true}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    )}
                  </Grid>
                </Grid.Row>
              </Grid>

              <Divider></Divider>
            </>
          )}

          <Grid>
            {task?.createDate && history?.length > 0 && (
              <div className="wrap-yellow-no-padding modal-small">
                <Grid.Row
                  verticalAlign="middle"
                  columns="equal"
                  className="pb-0 pt-1r"
                >
                  <Grid.Column verticalAlign="middle">
                    <Header as="h5">
                      <Header.Content>Task History</Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <div className="ui divider FullHdivider" />
                <Grid.Row className="pt-0">
                  <Grid.Column>
                    <TaskHistory page="gundam" history={history} />
                  </Grid.Column>
                </Grid.Row>
              </div>
            )}
          </Grid>

          <Grid>
            {/* <Grid.Column verticalAlign="middle" textAlign="center" className="mt-1r">
              <Button
                className=" mh-5"
                id="cancel"
                // icon="close"
                content={`Cancel`}
                style={{ color: '#656DD1' }}
                type="button"
                onClick={() => onCancel(task.id)}
                // loading={isRequesting || requesting}
                // disabled={disable || isRequesting || requesting}
              />

              <Button
                className=" mh-5"
                color="blue"
                // icon="save outline"
                content={`Submit`}
                loading={isRequesting}
                disabled={submitting || isRequesting}
                />
              </Grid.Column> */}

            <Grid.Column>
              <Button
                className="mt-1r"
                color="blue"
                floated="left"
                // icon="save outline"
                type="button"
                onClick={handleSubmit}
                content={`Submit`}
                loading={isRequesting}
                disabled={
                  submitting ||
                  isRequesting ||
                  localStorage.getItem("@sttsPMOProject") === "void"
                }
              />

              <Button
                className="mt-1r"
                floated="left"
                id="cancel"
                // icon="close"
                content={`Cancel`}
                loading={isRequesting}
                style={{ color: "#656DD1" }}
                type="button"
                onClick={() => onCancel(task.id)}
                // loading={isRequesting || requesting}
                // disabled={disable || isRequesting || requesting}
              />

              {task?.createDate && task.status === "New" && (
                <Button
                  className="mt-1r"
                  color="yellow"
                  floated="right"
                  id="remove"
                  // icon="trash alternate outline"
                  content={`Delete`}
                  loading={isRequesting}
                  style={{ color: "#55637A" }}
                  type="button"
                  disabled={
                    submitting ||
                    isRequesting ||
                    localStorage.getItem("@sttsPMOProject") === "void"
                  }
                  onClick={() => handleConfirm(task.id)}
                  // loading={isRequesting || requesting}
                />
              )}
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
}

export default FormGundam;
