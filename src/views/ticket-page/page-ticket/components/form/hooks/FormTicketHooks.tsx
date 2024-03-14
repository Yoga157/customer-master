import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serialize } from 'object-to-formdata';
import { Dispatch } from 'redux';
import moment from 'moment';

import {
  selectDrpByEntryKey,
  selectDrpEntryKey,
  selectSearchProjSummary,
  selectTicketDetail,
  selectValueEmailTicket,
  selectValueSummaryProject,
} from 'selectors/ticket/TicketSelector';
import { selectListWorkAttachment, selectWorkActivityReport, selectWorklistDrpToStr } from 'selectors/work-list/WorklistSelector';
import {
  selectEmpHirarcy,
  selectEmployeeEmailFixAll,
  selectEmployeeSearchEmail,
  selectEmployeeSearchValEmail,
} from 'selectors/select-options/EmployeeSelector';
import { getKeyValueEmailList, getResource, sendMail } from 'views/pmo-page/page/pmo-project-gundam/helper/pmo';
import { selectConfigBySerialNumber, selectSearchSN } from 'selectors/config-items/ConfigItemSelector';
import WorkAttachmentModel, { DataWorkAttachment } from 'stores/work-list/models/WorkAttachmentModel';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import CIBySerialReqBodyModel from 'stores/config-items/models/CIBySerialReqBodyModel';
import { selectDropdownGundam } from 'selectors/project-gundam/ProjectGundamSelector';
import IOptionsDataString from 'selectors/select-options/models/IOptionsDataString';
import * as ProjectGundamActions from 'stores/project-gundam/ProjectGundamActions';
import TicketPageHooks from 'views/ticket-page/page-ticket/hooks/TicketPageHooks';
import PMOHooks from 'views/pmo-page/page/pmo-project-gundam/helper/PMOHooks';
import * as ConfigItemActions from 'stores/config-items/ConfigItemsActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import TicketCreateModel from 'stores/ticket/models/TicketCreateModel';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import TicketPutModel from 'stores/ticket/models/TicketPutModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as TicketActions from 'stores/ticket/TicketActions';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import IStore from 'models/IStore';

function FormTicketHooks({ type, page, projectId, rowData }) {
  const dispatch: Dispatch = useDispatch();
  const [template, setTemplate] = useState('');

  const [initValTemplate, setInitValTemplate] = useState({
    inc: 0,
    category: '',
    subcategory: '',
    issueType: '',
    issueSubtype: '',
    description: '',
  });

  const [searchInput, setSearchInput] = useState({
    searchResource: '',
    searchSecondResource: '',
    serialNumber: '',
    searchEmailReceiver: '',
    searchEmailCc: '',
  });

  const [valSearchSummary, setSearchSummary] = useState({
    funnelGenId: 0,
    so: '',
    title: '',
    price: '',
    isSelect: false,
  });
  const [paginConfig, setPaginConfig] = useState({
    page: 1,
    pageSize: 5,
    pageAttach: 1,
    pageSizeAttach: 5,
  });
  const [estDate, setEstDate] = useState({
    estStartDate: null,
    estEndDate: null,
  });
  const [forValueEndDate, setForValueEndDate] = useState({
    slaCustomer: '',
    priority: '',
  });
  const [activePage, setActivePage] = useState({
    activityReport: 1,
  });

  const [secondResourceList, setSecondResourceList] = useState([] as any);
  const [initialValues, setInitialValues] = useState({ inc: 0 } as any);
  const [activityHeader, setActivityHeader] = useState({} as any);
  const [valSNSearchList, setValSNSearchList] = useState([] as any);
  const [listAttacment, setListAttachment] = useState([] as any);
  const [sendEmailValues, setEmailValues] = useState({} as any);
  const [resourceList, setResourceList] = useState([] as any);
  const [sendEmail, setSendEmail] = useState(false);
  const [valueRadio, setValueRadio] = useState('');
  const [status, setStatus] = useState('');

  const [emailReceiverList, setEmailReceiverList] = useState([] as any);
  const [emailCcList, setEmailCcList] = useState([] as any);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AttachmentActions.POST_TEMP_GENERIC,
      EmployeeActions.REQUEST_EMPLOYEES_BY_NAME,
      EmployeeActions.REQUEST_EMP_HIRARCY_DQSEARCH,
      ProjectGundamActions.GET_TASK_FORM_TEMPLATE,
      ProjectGundamActions.GET_DROPDOWN_SLA,
      TicketActions.GET_PROJECT_SUMMARY_BY_PROJECT_ID,
      TicketActions.GET_PROJECT_SUMMARY_BY_FUNNEL_ID,
      TicketActions.GET_PROJECT_SUMMARY_BY_CUSTOMER,
      TicketActions.GET_PROJECT_SUMMARY_BY_TICKETID,
      TicketActions.GET_DROPDOWN_TASK_SUB_CATEGORY,
      TicketActions.GET_DROPDOWN_TASK_SUB_ISSUE,
      TicketActions.GET_DROPDOWN_TASK_TEMPLATE,
      TicketActions.GET_DROPDOWN_TASK_CATEGORY,
      TicketActions.GET_DROPDOWN_TASK_PRIORITY,
      TicketActions.GET_PROJECT_SUMMARY_BY_SO,
      TicketActions.GET_DROPDOWN_SLA_CUSTOMER,
      TicketActions.GET_DROPDOWN_COMPLEXITY,
      TicketActions.GET_DROPDOWN_TASK_ISSUE,
      TicketActions.VALUE_END_DATE,
      TicketActions.POST_TICKET,
      TicketActions.PUT_TICKET,
      WorkListActions.GET_LIST_WORK_ATTATCHMENT,
      WorkListActions.GET_DROPDOWN_TASK_STATUS,
      WorkListActions.GET_LIST_WORK_ATTATCHMENT,
      WorkListActions.DELETE_WORK_ATTACHMENT,
      WorkListActions.POST_WORK_ATTACHMENT,
      WorkListActions.GET_HISTORY,
    ])
  );
  const isReqSearchBy: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      TicketActions.GET_VAL_SEARCH_PROJECT_ID,
      TicketActions.GET_VAL_SEARCH_FUNNEL_ID,
      TicketActions.GET_VAL_SEARCH_SO,
      TicketActions.GET_VAL_SEARCH_CUSTOMER,
    ])
  );
  const isReqConfigList: boolean = useSelector((state: IStore) => selectRequesting(state, [ConfigItemActions.GET_LIST_BY_SN]));
  const taskTemplate: IOptionsDataString[] = useSelector((state: IStore) => selectDrpEntryKey(state, 'taskTemplate'));
  const slaCustomer: IOptionsDataString[] = useSelector((state: IStore) => selectDrpEntryKey(state, 'slaCustomer'));
  const ticketStatus: any = useSelector((state: IStore) => selectWorklistDrpToStr(state, 'taskStatus'));
  const taskSubCategory = useSelector((state: IStore) => selectDrpEntryKey(state, 'taskSubCategory'));
  const employeeSearchValEmail = useSelector((state: IStore) => selectEmployeeSearchValEmail(state));
  const drpComplexity = useSelector((state: IStore) => selectDrpByEntryKey(state, 'drpComplexity'));
  const taskIssueType = useSelector((state: IStore) => selectDrpEntryKey(state, 'taskIssueType'));
  const taskSubIssue = useSelector((state: IStore) => selectDrpEntryKey(state, 'taskSubIssue'));
  const taskCategory = useSelector((state: IStore) => selectDrpEntryKey(state, 'taskCategory'));
  const drpPriority = useSelector((state: IStore) => selectDrpByEntryKey(state, 'drpPriority'));
  const employeeStoreSearch = useSelector((state: IStore) => selectEmployeeSearchEmail(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const employeeFixAll = useSelector((state: IStore) => selectEmployeeEmailFixAll(state));
  const projectSummary = useSelector((state: IStore) => selectValueSummaryProject(state));
  const listAttachment = useSelector((state: IStore) => selectListWorkAttachment(state));
  const sorting: any = useSelector((state: IStore) => state.ticket?.ticketList?.sorting);
  const activityReport = useSelector((state: IStore) => selectWorkActivityReport(state));
  const formTemplate = useSelector((state: IStore) => state.projectGundam.formTemplate);
  const column: any = useSelector((state: IStore) => state.ticket?.ticketList?.column);
  const searchSummary = useSelector((state: IStore) => selectSearchProjSummary(state));
  const configList = useSelector((state: IStore) => selectConfigBySerialNumber(state));
  const ticketDetail: any = useSelector((state: IStore) => selectTicketDetail(state));
  const valueEmail = useSelector((state: IStore) => selectValueEmailTicket(state));
  const valueEndDate = useSelector((state: IStore) => state.ticket.valueEndDate);
  const sla = useSelector((state: IStore) => selectDropdownGundam(state, 'sla'));
  const empHirarcy = useSelector((state: IStore) => selectEmpHirarcy(state));
  const resSearchSN = useSelector((state: IStore) => selectSearchSN(state));
  const history = useSelector((state: IStore) => state.workList.history);

  const { docTypeId } = PMOHooks();
  const { reloads } = TicketPageHooks();

  useEffect(() => {
    if (type !== 'EDIT') {
      dispatch(TicketActions.clearValueEndDate());
    }
  }, []);

  useEffect(() => {
    if (type !== 'EDIT') {
      setEstDate({ ...estDate, estEndDate: valueEndDate.estEndDate ? new Date(valueEndDate.estEndDate) : null });
    }
  }, [valueEndDate]);

  useEffect(() => {
    if (type === 'EDIT') {
      dispatch(WorkListActions.getDropdown('taskStatus', +rowData.ticketId, currentUser.employeeID));
      dispatch(TicketActions.getTicketDetail(+rowData.ticketId));
      dispatch(WorkListActions.getHistory(+rowData.ticketId));
    }

    dispatch(TicketActions.getDrpByEntryKey('taskTemplate'));
    dispatch(TicketActions.getDrpByEntryKey('TaskIssueType'));
    dispatch(TicketActions.getDrpByEntryKey('TaskCategory'));
    dispatch(TicketActions.getDrpByEntryKey('TaskPriority'));
    dispatch(TicketActions.getDrpByEntryKey('slaCustomer'));
    dispatch(TicketActions.getDrpByEntryKey('Complexity'));
    dispatch(ProjectGundamActions.getDropdown('sla'));

    if (rowData?.ticketId) {
      rowData?.ticketId && dispatch(TicketActions.getSummaryBy('ticketId', rowData?.ticketId));
    }

    if (type !== 'EDIT') {
      onCancel();
    } else {
      dispatch(ProjectGundamActions.resetTemplate());
    }
  }, [rowData]);

  useEffect(() => {
    if (type === 'EDIT') {
      setInitialValues({
        ...initialValues,
        ...ticketDetail,
      });

      setResourceList(getKeyValueEmailList(ticketDetail?.primaryResources?.split(','), employeeFixAll));
      setSecondResourceList(getKeyValueEmailList(ticketDetail?.secondaryResources?.split(','), employeeFixAll));

      setEmailReceiverList(sendMail(ticketDetail?.emailReceiver));
      setEmailCcList(sendMail(ticketDetail?.emailCc));
    }
  }, [ticketDetail, employeeFixAll]);

  useEffect(() => {
    if (type === 'EDIT') {
      setStatus(ticketDetail.status);

      // if (ticketDetail?.so) {
      // ticketDetail?.ticketId && dispatch(TicketActions.getSummaryBy('ticketId', ticketDetail?.ticketId));
      // }

      ticketDetail?.ticketId && dispatch(TicketActions.getValueEmail(+ticketDetail?.ticketId, currentUser?.employeeID));

      let SNList = [];
      if (ticketDetail.serialNumberList) {
        ticketDetail.serialNumberList.split(',').map((val) => {
          SNList = [...SNList, { value: val, text: val }];
        });
      }
      setValSNSearchList(SNList);

      setEstDate({
        estStartDate: ticketDetail.estStartDate,
        estEndDate: ticketDetail.estEndDate,
      });
    }
  }, [ticketDetail]);

  useEffect(() => {
    setEmailValues({ ...valueEmail });
  }, [valueEmail]);

  useEffect(() => {
    if (type === 'EDIT') {
      setInitValTemplate({
        ...initValTemplate,
        category: ticketDetail?.category,
        subcategory: ticketDetail?.subcategory,
        issueType: ticketDetail?.issueType,
        issueSubtype: ticketDetail?.issueSubtype,
        description: ticketDetail?.description,
      });

      setActivityHeader({
        taskId: ticketDetail.ticketId,
        taskUID: ticketDetail.ticketUID,
        projectId: projectSummary.projectId,
        funnelGenId: projectSummary.funnelGenId,
        projectName: projectSummary.projectName,
        customerName: projectSummary.customerName,
        contactName: projectSummary.customerPicName,
        address: projectSummary.customerAddress,
        phone: projectSummary.phone,
        engineerList: ticketDetail?.primaryResources
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
        so: projectSummary.so,
      });
    }
  }, [ticketDetail, projectSummary]);

  useEffect(() => {
    if (type === 'EDIT') {
      getAttachment(paginConfig.pageAttach);
    }
  }, [paginConfig.pageAttach]);

  useEffect(() => {
    if (type === 'EDIT') {
      getAcitivtyReport(activePage.activityReport);
    }
  }, [paginConfig.pageAttach]);

  const resetValue = () => {
    dispatch(TicketActions.clearSearch());
    dispatch(TicketActions.clearProjSummary());
    dispatch(WorkListActions.clearListActivity());
    dispatch(ProjectGundamActions.resetTemplate());

    setValSNSearchList([]);
    dispatch(ConfigItemActions.clearDataBy('radioChange'));
    setSearchSummary({
      funnelGenId: 0,
      so: '',
      title: '',
      price: '',
      isSelect: false,
    });
  };

  useEffect(() => {
    resetValue();
  }, [valueRadio]);

  useEffect(() => {
    setPaginConfig({ ...paginConfig, page: 1 });
  }, [valSNSearchList]);

  useEffect(() => {
    if (projectSummary.projectId || ticketDetail.ticketId) {
      getListConfig(valSNSearchList.length > 0 ? valSNSearchList.map((e) => e.value).join(',') : '', paginConfig.page);
    }
  }, [projectSummary, valSNSearchList, paginConfig]);

  const getListConfig = (sn: string, page) => {
    const item = new CIBySerialReqBodyModel({
      serialNumberList: sn,
      projectId: type === 'EDIT' ? ticketDetail.projectId : projectSummary.projectId,
      funnelGenId: type === 'EDIT' ? ticketDetail.funnelGenId : projectSummary.funnelGenId,
      page: page,
      pageSize: 5,
    });
    dispatch(ConfigItemActions.getListBySerialNumber(item));
  };

  const getDrpSub = (drp: string, text: string) => {
    dispatch(TicketActions.getDrpByEntryKey(drp, text));
  };

  useEffect(() => {
    if (type === 'EDIT') {
      getDrpSub('taskSubCategory', ticketDetail.category);
      getDrpSub('taskSubType', ticketDetail.issueType);
    }
  }, [ticketDetail]);
  useEffect(() => {
    if (formTemplate?.templateName) {
      getDrpSub('taskSubCategory', formTemplate?.category);
      getDrpSub('taskSubType', formTemplate?.issueType);
    }
  }, [formTemplate]);

  useEffect(() => {
    if (type !== 'EDIT') {
      if (formTemplate?.templateName) {
        setInitValTemplate({
          inc: 1,
          category: formTemplate?.category ? formTemplate?.description : '',
          subcategory: formTemplate?.subcategory ? formTemplate?.subcategory : '',
          issueType: formTemplate?.issueType ? formTemplate?.issueType : '',
          issueSubtype: formTemplate?.issueSubtype ? formTemplate?.issueSubtype : '',
          description: formTemplate?.description ? formTemplate?.description : '',
        });

        formTemplate?.primaryResource?.length > 0
          ? setResourceList(getKeyValueEmailList(formTemplate?.primaryResource?.split(','), employeeFixAll))
          : setResourceList([]);
        formTemplate?.secondaryResource?.length > 0
          ? setSecondResourceList(getKeyValueEmailList(formTemplate?.secondaryResource?.split(','), employeeFixAll))
          : setSecondResourceList([]);
      }
    }
  }, [formTemplate, template]);

  const handleSelect = (e, selectName: string) => {
    if (selectName === 'ticketTemplate') {
      if (e !== '- Select Template -') {
        const getTextVal = taskTemplate.find((item) => item.value === `${e}`).text;
        dispatch(ProjectGundamActions.getFormTemplate(getTextVal));
        setTemplate(e);
      } else {
        onCancel();
      }
    } else if (selectName === 'category') {
      setInitValTemplate({
        ...initValTemplate,
        category: e,
        subcategory: '',
      });
      dispatch(TicketActions.getDrpByEntryKey('taskSubCategory', e));
    } else if (selectName === 'issueType') {
      setInitValTemplate({
        ...initValTemplate,
        issueType: e,
        issueSubtype: '',
      });
      dispatch(TicketActions.getDrpByEntryKey('taskSubType', e));
    }
  };

  const handleSearch = (val, data: any, searchType: string) => {
    if (searchType === 'resource' && data.value.length >= 2) {
      setSearchInput({ ...searchInput, searchResource: $.trim(data.value) });
    } else if (searchType === 'secondaryResource' && data.value.length >= 2) {
      setSearchInput({ ...searchInput, searchSecondResource: $.trim(data.value) });
    } else if (searchType === 'serialNumber' && data.value.length >= 2) {
      setSearchInput({ ...searchInput, serialNumber: $.trim(data.value) });
    }
  };

  const handleSearchProjSummary = (e) => {
    setSearchSummary({ ...valSearchSummary, title: e, isSelect: false });
  };

  const getList = (item: string) => {
    if (item === 'resource') {
      dispatch(EmployeeActions.reqEmployeeHierarcyDqSearch('subordinate', currentUser.userName, $.trim(searchInput.searchResource), true));
    } else if (item === 'secondaryResource') {
      dispatch(EmployeeActions.requestEmployeeByName($.trim(searchInput.searchSecondResource), ''));
    } else if (item === 'serialNumber') {
      if (type === 'EDIT') {
        ticketDetail.projectId &&
          ticketDetail.funnelGenId &&
          dispatch(ConfigItemActions.getSearchSerialNumber($.trim(searchInput.serialNumber), ticketDetail.projectId, ticketDetail.funnelGenId));
      } else {
        projectSummary.projectId &&
          projectSummary.funnelGenId &&
          dispatch(ConfigItemActions.getSearchSerialNumber($.trim(searchInput.serialNumber), projectSummary.projectId, projectSummary.funnelGenId));
      }
    }
  };

  const getEndDate = (estStartDate, slaCustomer, priority) => {
    let data = {
      estStartDate: estStartDate ? moment(estStartDate).format('YYYY-MM-DDTHH:mm:ss.SSS') : '',
      slaCustomer: slaCustomer,
      priority: priority,
    };
    if (type !== 'EDIT' && slaCustomer && priority && estStartDate) {
      dispatch(TicketActions.getValueEndDate(data));
    }
  };

  const getValueSearchBy = () => {
    if (valueRadio === 'SearchProjectId') {
      valSearchSummary.title?.length >= 2 && dispatch(TicketActions.getSearch('SearchProjectId', valSearchSummary.title));
    } else if (valueRadio === 'SearchFunnelGenId') {
      valSearchSummary.title?.length >= 2 && dispatch(TicketActions.getSearch('SearchFunnelGenId', valSearchSummary.title));
    } else if (valueRadio === 'SearchSO') {
      valSearchSummary.title?.length >= 2 && dispatch(TicketActions.getSearch('SearchSO', valSearchSummary.title));
    } else if (valueRadio === 'SearchCustomerName') {
      if (valSearchSummary.title?.length >= 5) {
        dispatch(TicketActions.getSearch('SearchCustomer', valSearchSummary.title));
      }
    }
  };

  const onSelectProjSumamary = (data) => {
    setSearchSummary({
      funnelGenId: data.result.funnelGenId,
      so: data.result.so,
      title: data.result.title,
      price: data.result.price,
      isSelect: true,
    });

    if (valueRadio === 'SearchProjectId') {
      dispatch(TicketActions.getSummaryBy('projectId', +data.result.price));
    } else if (valueRadio === 'SearchFunnelGenId') {
      dispatch(TicketActions.getSummaryBy('funnelGenId', +data.result.price));
    } else if (valueRadio === 'SearchSO') {
      dispatch(TicketActions.getSummaryBy('so', +data.result.price));
    } else if (valueRadio === 'SearchCustomerName') {
      dispatch(TicketActions.getSummaryBy('customerName', data.result.price, +data.result.funnelGenId, data.result.so));
    }
  };

  const getAttachment = (pageAttach) => {
    dispatch(WorkListActions.getListWorkAttachment(pageAttach, paginConfig.pageSizeAttach, 5, rowData.ticketUID));
  };

  const getAcitivtyReport = (page) => {
    dispatch(WorkListActions.getWorkActivityReport(page, 5, rowData.ticketUID));
  };

  const fileChange = (e: any) => {
    const fileName = e.target.files[0].name;

    if (listAttacment?.find((e) => e.fileName === fileName)) {
      dispatch(ToastsAction.add('There is already the same!', ToastStatusEnum.Error));
    } else {
      if (type !== 'EDIT') {
        setListAttachment([
          ...listAttacment,
          {
            funnelAttachmentID: !listAttacment.length ? 1 : listAttacment.length + 1,
            funnelGenID: projectSummary.funnelGenId,
            documentTypeID: docTypeId,
            fileName: e.target.files[0].name,
            modul: 5,
            createDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
            createUserID: currentUser.employeeID,

            // file: e.target.files[0],
            // fileDownload: '',
            // docNumber: '',
            uploadByName: currentUser.fullName,
          },
        ]);

        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('domainName', currentUser.userName);
        dispatch(AttachmentActions.postTempGeneric(data));
      } else {
        const newObject = new WorkAttachmentModel({});
        const data = new FormData();
        const getExt = fileName.split('.');
        newObject.Attachment = e.target.files[0];
        newObject.Data = new DataWorkAttachment({});
        newObject.Data.FileName = fileName;
        // newObject.Data.FileName = getExt[getExt.length - 1];
        newObject.Data.FunnelGenID = ticketDetail.funnelGenId;
        newObject.Data.DocNumber = ticketDetail.ticketUID;
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
      }
    }
  };

  const onCancel = () => {
    dispatch(ProjectGundamActions.resetTemplate());
    dispatch(TicketActions.getDrpByEntryKey('taskSubCategory', '-'));
    dispatch(TicketActions.getDrpByEntryKey('taskSubType', '-'));
    resetValue();
  };

  const reloadData = () => {
    reloads(column, 'ascending');
    dispatch(ModalFirstLevelActions.CLOSE());
    resetValue();
  };

  const onSubmitHandler = (values: any) => {
    const newItem = new TicketCreateModel({ data: values, attachments: listAttacment });
    newItem.data.category = taskCategory?.find((e) => e.value === values.category)?.text;
    // newItem.data.subcategory = taskSubCategory?.find((e) => e.value === values.subcategory)?.text;
    newItem.data.issueType = taskIssueType?.find((e) => e.value === values.issueType)?.text;
    newItem.data.issueSubtype = taskSubIssue?.find((e) => e.value === values.issueSubtype)?.text;
    newItem.data.secondaryResources = secondResourceList.map((item: any) => item.value).join(',');
    newItem.data.primaryResources = resourceList.map((item: any) => item.value).join(',');
    newItem.data.slaName = values.slaName ? values.slaName : '';
    newItem.data.slaCustomer =
      taskCategory?.find((e) => e.value === values.category)?.text === 'Change Request' ? (values.slaCustomer ? values.slaCustomer : '') : '';

    newItem.data.estStartDate = moment(values?.estStartDate).format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.data.estEndDate = moment(values?.estEndDate).format('YYYY-MM-DDTHH:mm:ss.SSS');

    newItem.data.serialNumberList = valSNSearchList.map((e) => e.value).join(',');
    newItem.data.funnelGenId = projectSummary.funnelGenId;
    newItem.data.projectId = projectSummary.projectId;
    newItem.data.so = projectSummary.so;

    newItem.data.isSendEmailNotification = sendEmail;
    newItem.data.emailReceiver = getResource(emailReceiverList, 'emailReceiver')
      .map((item: any) => item)
      .join(',');
    newItem.data.emailCc = getResource(emailCcList, 'emailCC')
      .map((item: any) => item)
      .join(',');

    newItem.data.createDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.data.createUserID = currentUser.employeeID;

    if (type !== 'EDIT') {
      dispatch(TicketActions.postTicket(newItem)).then(() => {
        reloadData();
      });
    } else {
      const putItem = new TicketPutModel(newItem.data);
      putItem.funnelGenId = ticketDetail.funnelGenId;
      putItem.projectId = ticketDetail.projectId;
      putItem.so = ticketDetail.so;

      putItem.modifyDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
      putItem.modifyUserID = currentUser.employeeID;

      dispatch(TicketActions.putTicket(putItem)).then(() => {
        reloadData();
      });
    }
  };

  return {
    isRequesting,
    setInitialValues,
    initialValues,
    taskTemplate,
    initValTemplate,
    setInitValTemplate,
    getValueSearchBy,
    isReqSearchBy,
    handleSearchProjSummary,
    onSelectProjSumamary,
    projectSummary,
    valSearchSummary,
    searchSummary,
    taskCategory,
    taskSubCategory,
    ticketStatus,
    sla,
    slaCustomer,
    taskIssueType,
    taskSubIssue,
    drpComplexity,
    drpPriority,
    estDate,
    setEstDate,
    handleSelect,
    handleSearch,
    empHirarcy,
    employeeStoreSearch,
    resourceList,
    setResourceList,
    secondResourceList,
    setSecondResourceList,
    status,
    setStatus,
    fileChange,
    listAttacment,
    setListAttachment,
    valueRadio,
    setValueRadio,
    onSubmitHandler,
    isReqConfigList,
    resSearchSN,
    valSNSearchList,
    setValSNSearchList,
    configList,
    paginConfig,
    setPaginConfig,
    onCancel,

    sendEmail,
    setSendEmail,
    sendEmailValues,
    setEmailValues,
    emailReceiverList,
    setEmailReceiverList,
    employeeSearchValEmail,
    emailCcList,
    setEmailCcList,

    searchInput,
    getList,

    setForValueEndDate,
    forValueEndDate,
    getEndDate,

    listAttachment,
    ticketDetail,
    activePage,
    setActivePage,
    activityHeader,
    activityReport,
    history,
  };
}

export default FormTicketHooks;
