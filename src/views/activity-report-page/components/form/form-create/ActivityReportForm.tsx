import React, { useEffect, Fragment, useState, useCallback } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Form,
  Grid,
  Divider,
  Segment,
  Search,
  Header,
} from "semantic-ui-react";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
  isRequiredIf,
  matchesField,
} from "revalidate";
import { History } from "history";
import moment from "moment";

import classes from "./ActivityReportForm.module.scss";
import {
  SelectInput,
  Button,
  TextInput,
  TextAreaInput,
  DateInput,
  RichTextEditor,
  SearchInputList,
  SearchInput,
  RadioButton,
  NumberInput,
} from "views/components/UI";
import RouteEnum from "constants/RouteEnum";
import DropdownInput from "views/components/UI/Dropdown/Dropdown";
import ActivityReportProductTableForm from "../../table/ActivityReportProductTableForm";
import IStore from "models/IStore";
import * as ActivityReportProductActions from "stores/activity-report-product/ActivityReportProductActions";
import { selectRows } from "selectors/activity-report-product/ActivityReportProductSelector";
import { selectActivityReportCategoryOptions } from "selectors/select-options/ActivityReportCategorySelector";
import * as EmployeeActions from "stores/employee/EmployeeActions";
// import { selectEmployeeSearchOptions, selectEmployeeSemantic } from 'selectors/select-options/EmployeeSelector';

import { selectEmployeeFreelancePermanentSearchOptions } from "selectors/employee-freelance-permanent/EmployeeFreelancePermanentSelector";

import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import ActivityReportsModel from "stores/activity-report/models/ActivityReportsModel";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as ActivityReportCategoryActions from "stores/activity-report-category/ActivityReportCategoryActions";
import * as ToastsAction from "stores/toasts/ToastsAction";
import ToastStatusEnum from "constants/ToastStatusEnum";
import { activityReportStatusOptions } from "constants/actvityReportStatusOptions";
import * as ActivityReportActions from "stores/activity-report/ActivityReportActions";
import { selectActivityReportTicketNumberOptions } from "selectors/select-options/ActivityReportTicketNumberSelector";
import {
  selectActivityReportCheckFunnelExist,
  selectActivityReportCheckSOExist,
  selectActivityReportFunnelGenDetail,
  selectActivityReportFunnelGenId,
  selectActivityReportSONumber,
  selectActivityReportTicketNumber,
} from "selectors/activity-report/ActivityReportSelector";
import * as UserActions from "stores/users/UserActions";
import ActivityReportCategoryCheckAndAddModel from "stores/activity-report-category/models/ActivityReportCategoryCheckAndAddModel";
import * as EmployeeFreelancePermanentActions from "stores/employee-freelance-permanent/EmployeeFreelancePermanentActions";

interface IProps {
  history: History;
}

const ActivityReportForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { history } = props;

  const typeNumberOption = {
    ticketTaskNumber: "ticketTaskNumber",
    soNumber: "soNumber",
    funnelGenId: "funnelGenId",
  };
  const detailProductARInLocalStorage: string = "detailProductAR";
  const soTeamProduct: string = "10001040";
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const activityReportItem: any[] = useSelector((state: IStore) =>
    selectRows(state)
  );
  const activityReportCategoryOptions: any[] = useSelector((state: IStore) =>
    selectActivityReportCategoryOptions(state)
  );
  const activityReportFunnelGenId: any[] = useSelector((state: IStore) =>
    selectActivityReportFunnelGenId(state)
  );
  const resultActionActivityReportCategory: any = useSelector(
    (state: IStore) => state.activityReportCategory.resultActions
  );
  const bRefreshPage: boolean = useSelector(
    (state: IStore) => state.activityReport.refreshPage
  );
  const resultAction = useSelector(
    (state: IStore) => state.activityReport.resultActions
  );
  // const employeeStoreSearch = useSelector((state: IStore) => selectEmployeeSearchOptions(state));
  const employeeFreelancePermanentSearch = useSelector((state: IStore) =>
    selectEmployeeFreelancePermanentSearchOptions(state)
  );

  const activityReportProductRowData: any = useSelector((state: IStore) =>
    selectRows(state)
  );
  const activityReportTicketNumber = useSelector((state: IStore) =>
    selectActivityReportTicketNumber(state)
  );
  const activityReportTicketNumberOptions = useSelector((state: IStore) =>
    selectActivityReportTicketNumberOptions(state)
  );
  const activityReportFunnelDetail = useSelector((state: IStore) =>
    selectActivityReportFunnelGenDetail(state)
  );
  const isLoadingTicketNumber: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ActivityReportActions.REQUEST_ACTIVITY_REPORT_TICKET_NUMBER,
    ])
  );
  const isLoadingFunnelGenId: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ActivityReportActions.REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_ID,
    ])
  );
  const activityReportCheckSOExist: any = useSelector((state: IStore) =>
    selectActivityReportCheckSOExist(state)
  );
  const activityReportSONumber = useSelector((state: IStore) =>
    selectActivityReportSONumber(state)
  );
  const activityReportCheckFunnelExist: any = useSelector((state: IStore) =>
    selectActivityReportCheckFunnelExist(state)
  );

  const [status, setStatus] = useState("0");
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketTitle, setTicketTitle] = useState("");
  const [engineerState, setEngineerState] = useState([]);
  const [mandatory, setMandatory] = useState({
    sSONumber: false,
    sTicketNumber: false,
    sFunnelGenId: false,
    sCompany: false,
    sPhone: false,
    sContactName: false,
    sAddress: false,
    sStartDate: false,
    sEndDate: false,
    sDepartureDate: false,
    sArrivalDate: false,
    sStatus: false,
    sEngineerList: false,
    sNote: false,
    sNoteDescription: false,
    sNoteActionTaken: false,
  });
  const [disableTicketOrTaskField, setDisableTicketOrTaskField] = useState(
    false
  );
  const [disableSOField, setDisableSOField] = useState(false);
  const [disableProjectField, setDisableProjectField] = useState(false);
  const [disableFunnelField, setDisableFunnelField] = useState(false);
  const [disableCompanyField, setDisableCompanyField] = useState(false);
  const [disablePhoneField, setDisablePhoneField] = useState(false);
  const [disableContactNameField, setDisableContactNameField] = useState(false);
  const [disableAddressField, setDisableAddressField] = useState(false);
  const [soNumber, setSONumber] = useState("");
  const [soNumberExist, setSONumberExist] = useState(false);
  const [soNumberValidateMsg, setSONumberValidateMsg] = useState("");
  const [typeNumberRadioBtn, setTypeNumberRadioBtn] = useState(
    typeNumberOption.ticketTaskNumber
  );
  const [funnelGenId, setFunnelGenId] = useState("");

  const [initialValues, setInitialValues] = useState({
    sonumber: "",
    ticketnumber: "",
    funnelgenid: "",
    company: "",
    phone: "",
    contactName: "",
    address: "",
    engineerList: "",
    activityCategory: undefined,
    noteSymthom: "",
    startDateTime: undefined,
    endDateTime: undefined,
    projectName: "",
  });
  const [selectedStartDate, setSelectedStartDate] = useState(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState(undefined);
  const [startEndValidateMsg, setStartEndValidateMsg] = useState("");
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(undefined);
  const [selectedArrivalDate, setSelectedArrivalDate] = useState(undefined);
  const [
    departureArrivalValidateMsg,
    setDepartureArrivalValidateMsg,
  ] = useState("");

  const onResultSelectTicketNumber = (data: any) => {
    if (data !== null || data !== undefined) {
      setTicketNumber(data.result.price);
      setTicketTitle(data.result.title);
      setInitialValues((prevState) => ({
        ...prevState,
        ticketnumber: data.result.price,
      }));
      dispatch(
        ActivityReportActions.requestViewActivityReportTicketNumber(
          currentUser.email,
          data.result.price
        )
      );
    }
  };

  const resetInitialValues = () => {
    setInitialValues((prevState) => ({
      ...prevState,
      sonumber: "",
      ticketnumber: "",
      funnelGenId: "",
      company: "",
      contactName: "",
      phone: "",
      address: "",
      engineerList: "",
      activityCategory: undefined,
      noteSymthom: "",
      startDateTime: undefined,
      endDateTime: undefined,
      projectName: "",
    }));

    setEngineerState([]);
  };

  const resetTicketOrTaskInitialValues = () => {
    setInitialValues((prevState) => ({
      ...prevState,
      ticketnumber: "",
      company: "",
      contactName: "",
      phone: "",
      address: "",
      engineerList: "",
      activityCategory: [],
      noteSymthom: "",
      startDateTime: undefined,
      endDateTime: undefined,
      projectName: "",
    }));

    setEngineerState([]);
  };

  const resetSOInitialValues = () => {
    setInitialValues((prevState) => ({
      ...prevState,
      sonumber: "",
      company: "",
      address: "",
      projectName: "",
    }));

    setSONumber("");
    setSONumberExist(false);
    setSONumberValidateMsg("");
    setEngineerState([]);
    setDisableCompanyField(false);
    setDisableAddressField(false);
  };

  const resetFunnelGenIdInitialValues = () => {
    setInitialValues((prevState) => ({
      ...prevState,
      funnelgenid: "",
      company: "",
      address: "",
      projectName: "",
    }));

    setFunnelGenId("");
    setFunnelGenIdExist(false);
    setFunnelGenIdValidateMsg("");
    setDisableCompanyField(false);
    setDisableAddressField(false);
  };

  const resetFunnelGenIdInitialValuesWhenSearchText = () => {
    setInitialValues((prevState) => ({
      ...prevState,
      funnelgenid: funnelGenId,
      company: "",
      address: "",
      projectName: "",
      engineerList: "",
    }));

    setDisableCompanyField(false);
    setDisableAddressField(false);
  };

  const resetSOInitialValuesWhenSearchText = () => {
    setInitialValues((prevState) => ({
      ...prevState,
      sonumber: soNumber,
      company: "",
      address: "",
      projectName: "",
      engineerList: "",
    }));

    setEngineerState([]);

    setDisableCompanyField(false);
    setDisableAddressField(false);
  };

  const resetInitialInput = () => {
    setDisableProjectField(false);
    setDisableCompanyField(false);
    setDisablePhoneField(false);
    setDisableContactNameField(false);
    setDisableAddressField(false);
  };

  useEffect(() => {
    localStorage.removeItem(detailProductARInLocalStorage);
    dispatch(ActivityReportCategoryActions.requestActivityReportCategory());
    dispatch(UserActions.requestCurrentUser());
    setDisableCompanyField(false);
    setDisableAddressField(false);
  }, []);

  useEffect(() => {
    if (typeNumberRadioBtn === typeNumberOption.ticketTaskNumber) {
      setMandatory((prevState) => ({
        ...prevState,
        sTicketNumber: false,
      }));

      resetInitialValues();
      setDisableSOField(true);
      setDisableFunnelField(true);
      setDisableTicketOrTaskField(false);
      resetInitialInput();
      setSONumberValidateMsg("");
      resetSOInitialValues();
    } else if (typeNumberRadioBtn === typeNumberOption.soNumber) {
      setMandatory((prevState) => ({
        ...prevState,
        sSONumber: false,
      }));

      resetInitialValues();
      setDisableSOField(false);
      setDisableFunnelField(true);
      setDisableTicketOrTaskField(true);
      resetInitialInput();
      setSONumberValidateMsg("");
      resetTicketOrTaskInitialValues();
    } else if (typeNumberRadioBtn === typeNumberOption.funnelGenId) {
      setMandatory((prevState) => ({
        ...prevState,
        sFunnelGenId: false,
      }));

      resetInitialValues();
      setDisableSOField(true);
      setDisableFunnelField(false);
      setDisableTicketOrTaskField(true);
      resetInitialInput();
      setSONumberValidateMsg("");
      resetTicketOrTaskInitialValues();
    }
  }, [typeNumberRadioBtn]);

  useEffect(() => {
    if (activityReportTicketNumber.ticketOrTaskNumber === ticketNumber) {
      setInitialValues((prevState) => ({
        ...prevState,
        ticketnumber: ticketNumber,
        company: activityReportTicketNumber.accountName,
        contactName: activityReportTicketNumber.contactName,
        phone: activityReportTicketNumber.accountPhone,
        address: activityReportTicketNumber.accountAddress,
        engineerList: activityReportTicketNumber.engineerList,
        activityCategory: activityReportTicketNumber.activityCategoryArr,
        noteSymthom: activityReportTicketNumber.description,
        startDateTime:
          activityReportTicketNumber.startDate === ""
            ? undefined
            : activityReportTicketNumber.dStartDate,
        endDateTime:
          activityReportTicketNumber.endDate === ""
            ? undefined
            : activityReportTicketNumber.dEndDate,
        projectName: activityReportTicketNumber.projectName,
      }));

      // ActivityReportCategory dari DQ-Autotask belum ada di UDC, maka ditambahkan
      if (activityReportTicketNumber.activityCategory !== "") {
        const checkAndAdd = new ActivityReportCategoryCheckAndAddModel({});
        checkAndAdd.activityCategories =
          activityReportTicketNumber.activityCategory;
        dispatch(
          ActivityReportCategoryActions.requestPostActivityReportCategoryCheckAndAdd(
            checkAndAdd
          )
        );
      }
    }
  }, [activityReportTicketNumber]);

  useEffect(() => {
    //True SoNumber Exist
    if (soNumberExist) {
      let engineerList = "";
      if (
        activityReportSONumber.engineerList.length > 0 &&
        activityReportSONumber.engineerList.includes(";") === true
      )
        engineerList =
          activityReportSONumber.engineerList + `;${currentUser.email}`;
      else if (
        activityReportSONumber.engineerList.length > 0 &&
        activityReportSONumber.engineerList.includes(";") === false
      )
        engineerList =
          activityReportSONumber.engineerList + `;${currentUser.email}`;
      else engineerList = `${currentUser.email}`;

      setInitialValues((prevState) => ({
        ...prevState,
        sonumber: activityReportSONumber.soNumber,
        company: activityReportSONumber.accountName,
        address: activityReportSONumber.accountAddress,
        projectName: activityReportSONumber.projectName,
        engineerList: engineerList,
      }));

      setDisableCompanyField(true);
      setDisableAddressField(true);
    }

    //True FunnelGenId Exist
    if (FunnelGenIdExist) {
      setInitialValues((prevState) => ({
        ...prevState,
        funnelgenid: funnelGenId,
        contactName:
          activityReportFunnelDetail.contactName !== "undefined"
            ? activityReportFunnelDetail.contactName
            : "",
        company:
          activityReportFunnelDetail.accountName !== "undefined"
            ? activityReportFunnelDetail.accountName
            : "",
        address:
          activityReportFunnelDetail.accountAddress !== "undefined"
            ? activityReportFunnelDetail.accountAddress
            : "",
        projectName:
          activityReportFunnelDetail.projectName !== "undefined"
            ? activityReportFunnelDetail.projectName
            : "",
        phone:
          activityReportFunnelDetail.accountPhone !== "undefined"
            ? activityReportFunnelDetail.accountPhone
            : "",
      }));

      setDisableCompanyField(true);
      setDisableAddressField(true);
    }
  }, [activityReportSONumber, activityReportFunnelDetail]);
  const [FunnelGenIdExist, setFunnelGenIdExist] = useState(false);
  const [FunnelGenIdValidateMsg, setFunnelGenIdValidateMsg] = useState("");

  useEffect(() => {
    //Lock SONumber
    if (soNumber.toString().length > 0 && soNumber != "") {
      if (activityReportCheckSOExist.isExist === false) {
        setSONumber(soNumber);
        setSONumberExist(false);
        setSONumberValidateMsg(`SONumber ${soNumber} not exist`);

        resetSOInitialValuesWhenSearchText();
      } else if (activityReportCheckSOExist.isExist === true) {
        dispatch(
          ActivityReportActions.requestViewActivityReportSONumber(soNumber)
        );
        setSONumber(soNumber);
        setSONumberExist(true);
      }
    }

    //LockFunnelGenId
    if (funnelGenId.toString().length > 0 && funnelGenId != "") {
      if (activityReportCheckFunnelExist.isExist === false) {
        setFunnelGenId(funnelGenId);
        setFunnelGenIdExist(false);
        setFunnelGenIdValidateMsg(`FunnelGenId ${funnelGenId} not exist`);

        resetFunnelGenIdInitialValuesWhenSearchText();
      } else if (activityReportCheckFunnelExist.isExist === true) {
        dispatch(
          ActivityReportActions.requestActivityReportFunnelGenDetail(
            Number(funnelGenId)
          )
        );
        setFunnelGenId(funnelGenId);
        setFunnelGenIdExist(true);
      }
    }
  }, [activityReportCheckSOExist, activityReportCheckFunnelExist]);

  useEffect(() => {
    if (initialValues.engineerList.length > 0) {
      setEngineerState([]);
      if (initialValues.engineerList !== null) {
        if (initialValues.engineerList.length > 0) {
          const temp = initialValues.engineerList.split(";");
          for (let item of temp) {
            if (item !== "") {
              const newItem = {
                value: item,
                text: item,
              };
              setEngineerState((engineerState) => [...engineerState, newItem]);
            }
          }
        }
      }
    }
  }, [initialValues]);

  useEffect(() => {
    dispatch(ActivityReportCategoryActions.requestActivityReportCategory());
  }, [resultActionActivityReportCategory]);

  useEffect(() => {
    dispatch(ActivityReportProductActions.getActivityReportProductLocal());
  }, [dispatch]);

  useEffect(() => {
    if (bRefreshPage) {
      if (resultAction.errorNumber === "666") {
        dispatch(
          ToastsAction.add(resultAction.message, ToastStatusEnum.Warning)
        );
      } else {
        if (resultAction.resultObj.activityReport.activityReportGenID !== 0) {
          localStorage.removeItem(detailProductARInLocalStorage);
          history.replace(RouteEnum.ActivityReport);
          dispatch(
            ToastsAction.add(
              `Submit Activity Report Success`,
              ToastStatusEnum.Success
            )
          );
        }
      }
    }
  }, [bRefreshPage]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ActivityReportCategoryActions.REQUEST_POST_ACTIVITY_REPORT_CATEGORY,
      ActivityReportActions.REQUEST_VIEW_ACTIVITY_REPORT_TICKET_NUMBER,
      ActivityReportCategoryActions.REQUEST_POST_ACTIVITY_REPORT_CATEGORY_CHECK_AND_ADD,
      ActivityReportActions.REQUEST_ACTIVITY_REPORT_SO_NUMBER,
      ActivityReportActions.REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_ID,
      ActivityReportActions.REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_DETAIL,
    ])
  );


  const handleSearchChangeFunnedGenId = useCallback(
    (data) => {
      if (data) {
        setFunnelGenId(data);
        setDisableSOField(true);
        setDisableTicketOrTaskField(true);
        setDisableFunnelField(false);

        setDisableProjectField(true);
        setDisableCompanyField(true);
        setDisablePhoneField(false);
        setDisableContactNameField(false);
        setDisableAddressField(false);
        setInitialValues((prevState) => ({
          ...prevState,
          funnelgenid: data,
        }));
        dispatch(ActivityReportActions.checkFunnelGenIdExist(data));
      }

      if (data === "") {
        resetFunnelGenIdInitialValues();
        setDisableSOField(false);
        setDisableTicketOrTaskField(false);
        resetInitialInput();
      }
    },
    [dispatch]
  );

  const handleSearchChangeTicketNumber = useCallback(
    (data) => {
      if (data.length >= 2) {
        dispatch(
          ActivityReportActions.requestActivityReportTicketNumber(
            currentUser.email,
            data
          )
        );
        setDisableSOField(true);
        setDisableTicketOrTaskField(false);
        setDisableProjectField(true);
      }

      if (data.length === 0) {
        resetTicketOrTaskInitialValues();
        setDisableSOField(false);
        setDisableTicketOrTaskField(false);
        resetInitialInput();
      }
    },
    [dispatch]
  );

  const handleSearchChangeSONumber = useCallback(
    (data) => {
      if (data.length > 0 && data !== "0") {
        if (data.length === 8 && data === soTeamProduct) {
          setDisableSOField(false);
          setDisableTicketOrTaskField(true);
          setSONumber(data);
          resetInitialInput();
          setSONumberValidateMsg("");

          let engineerList = "";
          engineerList = `${currentUser.email}`;

          setInitialValues((prevState) => ({
            ...prevState,
            sonumber: data,
            engineerList: engineerList,
          }));
        }

        if (data.length > 0 && data !== soTeamProduct) {
          setDisableSOField(false);
          setDisableTicketOrTaskField(true);
          setSONumber(data);
          setDisableProjectField(true);
          setDisableCompanyField(true);
          setDisablePhoneField(false);
          setDisableContactNameField(false);
          setDisableAddressField(false);

          dispatch(ActivityReportActions.checkSOExist(data));
        }
      }

      if (data.length === 0) {
        resetSOInitialValues();
        setDisableSOField(false);
        setDisableTicketOrTaskField(false);
        resetInitialInput();
      }
    },
    [dispatch]
  );

  const onChangeActivityReportStatus = (event: any) => {
    setStatus(event);
    setMandatory((prevState) => ({
      ...prevState,
      sNote: false,
    }));
    if (event === "Pending") {
      setMandatory((prevState) => ({
        ...prevState,
        sNote: true,
      }));
    }
  };

  const handleSearchChangeEmployee = useCallback(
    (e, data) => {
      if (data.value.trim().length >= 2) {
        dispatch(
          EmployeeFreelancePermanentActions.requestEmployeeFreelancePermanent(
            data.value.trim()
          )
        );
      }
    },
    [dispatch]
  );

  const validate = combineValidators({
    company: isRequired("Company"),
    phone: isRequired("Phone"),
    contactName: isRequired("Contact Name"),
    address: isRequired("Address"),
    startDateTime: isRequired("Start Date Time"),
    endDateTime: isRequired("Finish Date Time"),
    departureDateTime: isRequired("Departure Date Time"),
    arrivalDateTime: isRequired("Arrival Date Time"),
    engineerList: isRequired("Engineer List"),
    noteDescription: isRequired("Description/Error Message"),
    noteActionTaken: isRequired("Action Taken"),
  });

  const validateDependOnPendingStatus = combineValidators({
    company: isRequired("Company"),
    phone: isRequired("Phone"),
    contactName: isRequired("Contact Name"),
    address: isRequired("Address"),
    startDateTime: isRequired("Start Date Time"),
    endDateTime: isRequired("Finish Date Time"),
    departureDateTime: isRequired("Departure Date Time"),
    arrivalDateTime: isRequired("Arrival Date Time"),
    engineerList: isRequired("Engineer List"),
    noteStatus: isRequired("Note"),
    noteDescription: isRequired("Description/Error Message"),
    noteActionTaken: isRequired("Action Taken"),
  });

  const onSubmitHandler = (values: any) => {
    let engineerArr: string[] = [];
    if (values.engineerList !== undefined) {
      if (Array.isArray(values.engineerList)) {
        for (let item of values.engineerList) {
          if (item.value !== "") {
            engineerArr.push(item.value);
          }
        }
      } else {
        if (values.engineerList.length > 0) {
          const temp = values.engineerList.split(";");
          for (let item of temp) {
            if (item !== "") {
              engineerArr.push(item);
            }
          }
        }
      }
    }

    const newItem = new ActivityReportsModel();
    newItem.ActivityReport.activityReportGenID = 0;

    newItem.ActivityReport.funnelGenId = 0;
    if (typeNumberRadioBtn === typeNumberOption.funnelGenId) {
      newItem.ActivityReport.funnelGenId = +funnelGenId;
    }

    newItem.ActivityReport.ticketId = "";
    if (typeNumberRadioBtn === typeNumberOption.ticketTaskNumber) {
      newItem.ActivityReport.ticketId = ticketNumber;
    }

    newItem.ActivityReport.so = 0;
    if (typeNumberRadioBtn === typeNumberOption.soNumber) {
      newItem.ActivityReport.so = +soNumber;
    }

    if (engineerArr.indexOf(currentUser.email) === -1) {
      engineerArr.push(currentUser.email);
    }

    newItem.ActivityReport.projectName = values.projectName;
    newItem.ActivityReport.customerName =
      values.company === undefined ? "" : values.company;
    newItem.ActivityReport.contactName =
      values.contactName === undefined ? "" : values.contactName;
    newItem.ActivityReport.phone =
      values.phone === undefined ? "" : values.phone;
    newItem.ActivityReport.address =
      values.address === undefined ? "" : values.address;
    newItem.ActivityReport.activityCategory =
      values.activityCategory === undefined
        ? ""
        : values.activityCategory.join(";");
    newItem.ActivityReport.startDate =
      values.startDateTime === undefined
        ? ""
        : moment(values.startDateTime).format();
    newItem.ActivityReport.endDate =
      values.endDateTime === undefined
        ? ""
        : moment(values.endDateTime).format();
    newItem.ActivityReport.departureDate =
      values.departureDateTime === undefined
        ? ""
        : moment(values.departureDateTime).format();
    newItem.ActivityReport.arrivalDate =
      values.arrivalDateTime === null
        ? ""
        : moment(values.arrivalDateTime).format();
    newItem.ActivityReport.engineerList =
      values.engineerList === undefined ? "" : engineerArr.join(";");
    newItem.ActivityReport.status = status;
    newItem.ActivityReport.notes =
      values.noteStatus === undefined ? "" : values.noteStatus;
    newItem.ActivityReport.description =
      values.noteDescription === undefined ? "" : values.noteDescription;
    newItem.ActivityReport.symptom =
      values.noteSymthom === undefined ? "" : values.noteSymthom;
    newItem.ActivityReport.actionTaken =
      values.noteActionTaken === undefined ? "" : values.noteActionTaken;
    // newItem.ActivityReport.totalCustomerExperience = '0';
    newItem.ActivityReport.createUserID = Number(currentUser.employeeID);
    newItem.ActivityReportItem = activityReportItem;

    // console.log("Submit Data");
    // console.log(newItem);

    let isValidSubmit = true;
    if (
      newItem.ActivityReport.status === "0" ||
      newItem.ActivityReport.status.length === 0
    ) {
      isValidSubmit = false;
      dispatch(ToastsAction.add(`Status is required`, ToastStatusEnum.Warning));
    }

    if (typeNumberRadioBtn === typeNumberOption.funnelGenId) {
      if (newItem.ActivityReport.funnelGenId === 0) {
        isValidSubmit = false;
        dispatch(
          ToastsAction.add(
            `FunnelGenId Number is required`,
            ToastStatusEnum.Warning
          )
        );
      }
    }

    if (typeNumberRadioBtn === typeNumberOption.ticketTaskNumber) {
      if (newItem.ActivityReport.ticketId.length === 0) {
        isValidSubmit = false;
        dispatch(
          ToastsAction.add(
            `Ticket/Task Number is required`,
            ToastStatusEnum.Warning
          )
        );
      }
    }

    if (typeNumberRadioBtn === typeNumberOption.soNumber) {
      if (newItem.ActivityReport.so === 0) {
        isValidSubmit = false;
        dispatch(
          ToastsAction.add(`SO Number is required`, ToastStatusEnum.Warning)
        );
      }
    }

    if (newItem.ActivityReport.description.length < 15) {
      isValidSubmit = false;
      dispatch(
        ToastsAction.add(
          `Description minimal 15 characters`,
          ToastStatusEnum.Warning
        )
      );
    }

    if (newItem.ActivityReport.actionTaken.length < 15) {
      isValidSubmit = false;
      dispatch(
        ToastsAction.add(
          `Action Taken minimal 15 characters`,
          ToastStatusEnum.Warning
        )
      );
    }

    if (
      typeof selectedStartDate != "undefined" &&
      typeof selectedEndDate != "undefined"
    ) {
      if (selectedStartDate > selectedEndDate) {
        isValidSubmit = false;
        dispatch(
          ToastsAction.add(
            `End Date must more than Start Date`,
            ToastStatusEnum.Warning
          )
        );
      }
    }

    if (
      typeof selectedDepartureDate != "undefined" &&
      typeof selectedArrivalDate != "undefined"
    ) {
      if (selectedDepartureDate > selectedArrivalDate) {
        isValidSubmit = false;
        dispatch(
          ToastsAction.add(
            `Arrival Date must more than Departure Date`,
            ToastStatusEnum.Warning
          )
        );
      }
    }

    if (isValidSubmit) {
      // console.log(newItem)
      dispatch(ActivityReportActions.requestPostActivityReport(newItem));
    }
  };

  const [countCharacterDescription, setCountCharacterDescription] = useState(0);
  const [noteDescription, setNoteDescription] = useState("");
  const onChangeDescription = (e: any) => {
    setNoteDescription(e.level.content.replace(/<\/?[^>]+(>|$)/g, ""));
    setCountCharacterDescription(
      e.level.content.replace(/<\/?[^>]+(>|$)/g, "").length
    );
  };
  const onKeyDescription = (e: any) => {
    setNoteDescription(e.target.textContent);
    setCountCharacterDescription(e.target.textContent.length);
  };

  const [countCharacterActionTaken, setCountCharacterActionTaken] = useState(0);
  const [noteActionTaken, setNoteActionTaken] = useState("");
  const onChangeActionTaken = (e: any) => {
    setNoteActionTaken(e.level.content.replace(/<\/?[^>]+(>|$)/g, ""));
    setCountCharacterActionTaken(
      e.level.content.replace(/<\/?[^>]+(>|$)/g, "").length
    );
  };
  const onKeyActionTaken = (e: any) => {
    setNoteActionTaken(e.target.textContent);
    setCountCharacterActionTaken(e.target.textContent.length);
  };

  const handleChangeStartDate = useCallback(
    (data) => {
      setSelectedStartDate(data);
    },
    [dispatch]
  );

  const handleChangeEndDate = useCallback(
    (data) => {
      setSelectedEndDate(data);
    },
    [dispatch]
  );

  const handleChangeDepartureDate = useCallback(
    (data) => {
      setSelectedDepartureDate(data);
    },
    [dispatch]
  );

  const handleChangeArrivalDate = useCallback(
    (data) => {
      setSelectedArrivalDate(data);
    },
    [dispatch]
  );

  useEffect(() => {
    compareStartAndFinishDate(selectedStartDate, selectedEndDate);
  }, [selectedStartDate]);

  useEffect(() => {
    compareStartAndFinishDate(selectedStartDate, selectedEndDate);
  }, [selectedEndDate]);

  useEffect(() => {
    compareDepartureAndArrivalDate(selectedDepartureDate, selectedArrivalDate);
  }, [selectedDepartureDate]);

  useEffect(() => {
    compareDepartureAndArrivalDate(selectedDepartureDate, selectedArrivalDate);
  }, [selectedArrivalDate]);

  const compareStartAndFinishDate = (
    selectedStartDate: any,
    selectedEndDate: any
  ) => {
    if (
      typeof selectedStartDate != "undefined" &&
      typeof selectedEndDate != "undefined"
    ) {
      if (selectedStartDate > selectedEndDate) {
        setStartEndValidateMsg("End Date must more than Start Date");
      } else if (selectedStartDate < selectedEndDate) {
        setStartEndValidateMsg("");
      }
    }
  };

  const compareDepartureAndArrivalDate = (
    selectedDepartureDate: any,
    selectedArrivalDate: any
  ) => {
    if (
      typeof selectedDepartureDate != "undefined" &&
      typeof selectedArrivalDate != "undefined"
    ) {
      if (selectedDepartureDate > selectedArrivalDate) {
        setDepartureArrivalValidateMsg(
          "Arrival Date must more than Departure Date"
        );
      } else if (selectedDepartureDate < selectedArrivalDate) {
        setDepartureArrivalValidateMsg("");
      }
    }
  };

  function stripHTML(str){
    var strippedText = $("<div/>").html(str).text();
    return strippedText;
  }

  return (
    <Fragment>
      <FinalForm
        validate={
          status === "Pending" ? validateDependOnPendingStatus : validate
        }
        onSubmit={onSubmitHandler}
        initialValues={initialValues}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Segment className="LightGreyNotif">
                    <Grid>
                      <Grid.Row columns="equal">
                        <Grid.Column className="FullGrid767">
                          <Grid>
                            <Header
                              size="tiny"
                              className={classes.typeNumberTitle}
                            >
                              Choose Type Number*
                            </Header>
                            <Grid.Row columns="equal">
                              <Grid.Column width={5}>
                                <Field
                                  name="typeNumber"
                                  component={RadioButton}
                                  label="Ticket/Task Number"
                                  checked={
                                    typeNumberRadioBtn ===
                                    typeNumberOption.ticketTaskNumber
                                  }
                                  onChange={() =>
                                    setTypeNumberRadioBtn(
                                      typeNumberOption.ticketTaskNumber
                                    )
                                  }
                                />
                              </Grid.Column>
                              <Grid.Column width={5}>
                                <Field
                                  name="typeNumber"
                                  component={RadioButton}
                                  label="SO Number"
                                  checked={
                                    typeNumberRadioBtn ===
                                    typeNumberOption.soNumber
                                  }
                                  onChange={() =>
                                    setTypeNumberRadioBtn(
                                      typeNumberOption.soNumber
                                    )
                                  }
                                />
                              </Grid.Column>
                              <Grid.Column width={5}>
                                <Field
                                  name="typeNumber"
                                  component={RadioButton}
                                  label="FunnelGenId"
                                  checked={
                                    typeNumberRadioBtn ===
                                    typeNumberOption.funnelGenId
                                  }
                                  onChange={() =>
                                    setTypeNumberRadioBtn(
                                      typeNumberOption.funnelGenId
                                    )
                                  }
                                />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns="equal">
                        {typeNumberRadioBtn ===
                        typeNumberOption.ticketTaskNumber ? (
                          <Grid.Column className="FullGrid767">
                            <Field
                              name="ticketnumber"
                              component={SearchInput}
                              placeholder="e.g. ticket number.."
                              loading={isLoadingTicketNumber}
                              labelName="Ticket/Task Number"
                              handleSearchChange={
                                handleSearchChangeTicketNumber
                              }
                              onResultSelect={onResultSelectTicketNumber}
                              results={activityReportTicketNumberOptions}
                              mandatory={mandatory.sTicketNumber}
                              disabled={disableTicketOrTaskField}
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p className="BtmFormNote">
                                Type 2 letters or more
                              </p>
                              <br />
                            </div>
                          </Grid.Column>
                        ) : (
                          ""
                        )}

                        {typeNumberRadioBtn === typeNumberOption.soNumber ? (
                          <Grid.Column className="FullGrid767">
                            <Field
                              name="sonumber"
                              component={TextInput}
                              placeholder="e.g. SO number.."
                              labelName="SO Number"
                              disabled={disableSOField}
                              mandatory={mandatory.sSONumber}
                              onChange={handleSearchChangeSONumber}
                            />
                            {soNumberExist === false &&
                            soNumberValidateMsg.length > 0 ? (
                              <React.Fragment>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <p
                                    className="BtmFormNote"
                                    style={{ color: "red", fontWeight: "bold" }}
                                  >
                                    {soNumberValidateMsg}
                                  </p>
                                </div>
                                <br />
                              </React.Fragment>
                            ) : (
                              ""
                            )}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p className="BtmFormNote">
                                Type 1 letters or more
                              </p>{" "}
                              <br />
                            </div>
                          </Grid.Column>
                        ) : (
                          ""
                        )}

                        {typeNumberRadioBtn === typeNumberOption.funnelGenId ? (
                          <Grid.Column className="FullGrid767">
                            <Field
                              name="funnelgenid"
                              component={TextInput}
                              placeholder="e.g. FunnelGenId.."
                              disabled={disableFunnelField}
                              labelName="FunnelGenId"
                              onChange={handleSearchChangeFunnedGenId}
                              mandatory={mandatory.sFunnelGenId}
                            />
                            {FunnelGenIdExist === false &&
                            FunnelGenIdValidateMsg.length > 0 ? (
                              <React.Fragment>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <p
                                    className="BtmFormNote"
                                    style={{ color: "red", fontWeight: "bold" }}
                                  >
                                    {FunnelGenIdValidateMsg}
                                  </p>
                                </div>
                                <br />
                              </React.Fragment>
                            ) : (
                              ""
                            )}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p className="BtmFormNote">
                                Type 1 letters or more
                              </p>{" "}
                              <br />
                            </div>
                          </Grid.Column>
                        ) : (
                          ""
                        )}
                      </Grid.Row>
                      <Grid.Row columns="equal">
                        <Grid.Column className="FullGrid767">
                          <Field
                            name="projectName"
                            component={TextInput}
                            labelName="Project"
                            placeholder="e.g. project.."
                            disabled={disableProjectField}
                          />
                          <Field
                            name="company"
                            component={TextInput}
                            labelName="Company"
                            placeholder="e.g. company.."
                            mandatory={mandatory.sCompany}
                            disabled={disableCompanyField}
                          />
                          <Field
                            name="phone"
                            component={TextInput}
                            labelName="Phone"
                            placeholder="e.g. 620000000000.."
                            mandatory={mandatory.sPhone}
                            disabled={disablePhoneField}
                            // type="number"
                          />
                          <Field
                            name="contactName"
                            component={TextInput}
                            labelName="Contact Name"
                            placeholder="e.g. contact.."
                            mandatory={mandatory.sContactName}
                            disabled={disableContactNameField}
                          />
                          <Field
                            name="address"
                            component={TextAreaInput}
                            labelName="Address"
                            placeholder="Address*"
                            mandatory={mandatory.sAddress}
                            disabled={disableAddressField}
                            values={stripHTML(initialValues.address)}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment className="LightGreyNotif">
                    <Grid>
                      <Grid.Row columns="equal">
                        <Grid.Column className="FullGrid767">
                          <Field
                            name="activityCategory"
                            component={DropdownInput}
                            placeholder="e.g activity category.."
                            labelName="Activity Category"
                            allowAdditions={true}
                            // mandatory={true}
                            options={activityReportCategoryOptions}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns="equal">
                        <Grid.Column className="TimeTrue FullGrid767">
                          <Field
                            name="startDateTime"
                            component={DateInput}
                            labelName="Start Date"
                            placeholder="e.g.10/03/2020"
                            date={true}
                            time={true}
                            formated={"MM/dd/yyyy HH:mm"}
                            mandatory={mandatory.sStartDate}
                            onChange={handleChangeStartDate}
                          />
                        </Grid.Column>
                        <Grid.Column className="TimeTrue FullGrid767">
                          <Field
                            name="endDateTime"
                            component={DateInput}
                            labelName="Finish Date"
                            placeholder="e.g.10/03/2020"
                            date={true}
                            time={true}
                            formated={"MM/dd/yyyy HH:mm"}
                            mandatory={mandatory.sEndDate}
                            onChange={handleChangeEndDate}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      {typeof selectedStartDate != "undefined" &&
                        typeof selectedEndDate != "undefined" &&
                        startEndValidateMsg.length > 0 && (
                          <Grid.Row>
                            <Grid.Column>
                              <React.Fragment>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <p
                                    className="BtmFormNote"
                                    style={{ color: "red", fontWeight: "bold" }}
                                  >
                                    {startEndValidateMsg}
                                  </p>
                                </div>
                                <br />
                              </React.Fragment>
                            </Grid.Column>
                          </Grid.Row>
                        )}
                      <Grid.Row columns="equal">
                        <Grid.Column className="TimeTrue FullGrid767">
                          <Field
                            name="departureDateTime"
                            component={DateInput}
                            labelName="Departure Date"
                            placeholder="e.g.10/03/2020"
                            date={true}
                            time={true}
                            formated={"MM/dd/yyyy HH:mm"}
                            mandatory={mandatory.sDepartureDate}
                            onChange={handleChangeDepartureDate}
                          />
                        </Grid.Column>
                        <Grid.Column className="TimeTrue FullGrid767">
                          <Field
                            name="arrivalDateTime"
                            component={DateInput}
                            labelName="Arrival Date"
                            placeholder="e.g.10/03/2020"
                            date={true}
                            time={true}
                            formated={"MM/dd/yyyy HH:mm"}
                            mandatory={mandatory.sArrivalDate}
                            onChange={handleChangeArrivalDate}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      {typeof selectedDepartureDate != "undefined" &&
                        typeof selectedArrivalDate != "undefined" &&
                        departureArrivalValidateMsg.length > 0 && (
                          <Grid.Row>
                            <Grid.Column>
                              <React.Fragment>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <p
                                    className="BtmFormNote"
                                    style={{ color: "red", fontWeight: "bold" }}
                                  >
                                    {departureArrivalValidateMsg}
                                  </p>
                                </div>
                                <br />
                              </React.Fragment>
                            </Grid.Column>
                          </Grid.Row>
                        )}
                      <Grid.Row columns="equal">
                        <Grid.Column className="FullGrid767">
                          <Field
                            name="engineerList"
                            component={SearchInputList}
                            placeholder="e.g.Employee Name"
                            labelName="Engineer/Team List"
                            handleSearchChange={handleSearchChangeEmployee}
                            results={employeeFreelancePermanentSearch}
                            listSoftware={engineerState}
                            mandatory={mandatory.sEngineerList}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns="equal">
                        <Grid.Column className="FullGrid767">
                          <Field
                            name="status"
                            component={SelectInput}
                            placeholder="E.g. Status.."
                            labelName="Status"
                            options={activityReportStatusOptions}
                            values={status}
                            onChanged={onChangeActivityReportStatus}
                            mandatory={mandatory.sStatus}
                            // defaultValue={defaultStatusAR}
                          />
                        </Grid.Column>
                        <Grid.Column className="FullGrid767">
                          <Field
                            name="noteStatus"
                            component={TextAreaInput}
                            labelName={"Note"}
                            placeholder={`Note${
                              mandatory.sNote === true ? `*` : ""
                            }`}
                            mandatory={mandatory.sNote}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal">
                <Grid.Column>
                  <ActivityReportProductTableForm
                    tableData={activityReportProductRowData}
                    activityReportGenID={0}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal">
                <Grid.Column>
                  <Segment className="LightGreyNotif">
                    <Field
                      id="noteDescription"
                      name="noteDescription"
                      component={RichTextEditor}
                      placeholder=""
                      labelName={`Description/Error Message`}
                      mandatorys={mandatory.sNoteDescription}
                      onChange={(e) => onChangeDescription(e)}
                      onKeyDown={(e) => onKeyDescription(e)}
                      onKeyUp={(e) => onKeyDescription(e)}
                    />
                    <React.Fragment>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {noteDescription !== "" &&
                        countCharacterDescription < 15 ? (
                          <p
                            className="BtmFormNote"
                            style={{ color: "red", fontWeight: "bold" }}
                          >
                            Minimal must 15 characters
                          </p>
                        ) : (
                          <p></p>
                        )}
                        <p
                          className="BtmFormNote"
                          style={{ fontWeight: "bold" }}
                        >{`Current characters: ${countCharacterDescription}`}</p>
                      </div>
                      <br />
                    </React.Fragment>
                    <Field
                      name="noteSymthom"
                      component={RichTextEditor}
                      placeholder=""
                      labelName="Symthom/Error Possibility"
                      disabled={true}
                    />

                    <Field
                      name="noteActionTaken"
                      component={RichTextEditor}
                      placeholder=""
                      labelName="Action Taken"
                      mandatorys={mandatory.sNoteActionTaken}
                      onChange={(e) => onChangeActionTaken(e)}
                      onKeyDown={(e) => onKeyActionTaken(e)}
                      onKeyUp={(e) => onKeyActionTaken(e)}
                    />
                    <React.Fragment>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {noteActionTaken !== "" &&
                        countCharacterActionTaken < 15 ? (
                          <p
                            className="BtmFormNote"
                            style={{ color: "red", fontWeight: "bold" }}
                          >
                            Minimal must 15 characters
                          </p>
                        ) : (
                          <p></p>
                        )}
                        <p
                          className="BtmFormNote"
                          style={{ fontWeight: "bold" }}
                        >{`Current characters: ${countCharacterActionTaken}`}</p>
                      </div>
                      <br />
                    </React.Fragment>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              <Divider />
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Button
                    floated="right"
                    color="blue"
                    content="Submit"
                    disabled={pristine || invalid}
                  />
                  <Button
                    floated="right"
                    content="Cancel"
                    onClick={() => {
                      props.history.replace(RouteEnum.ActivityReport);
                    }}
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

export default ActivityReportForm;
