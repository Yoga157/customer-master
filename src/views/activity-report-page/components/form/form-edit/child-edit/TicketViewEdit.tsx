import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { combineValidators, isRequired } from "revalidate";
import { Grid, Form, Header, Segment, Label } from "semantic-ui-react";
import { Dispatch } from "redux";

import {
  TextInput,
  TextAreaInput,
  Tooltips,
  Button,
  SearchInput,
  RadioButton,
  DateInput,
  RichTextEditor,
  DropdownInput,
  SearchInputList,
} from "views/components/UI";
import styles from "./TicketViewEdit.module.scss";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import IStore from "models/IStore";
import * as ActivityReportTicketInformationActions from "stores/activity-report-ticket-information/ActivityReportTicketInformationActions";
import {
  selectActivityReportCheckFunnelExist,
  selectActivityReportFunnelGenDetail,
  selectActivityReportFunnelGenId,
  selectViewTicketInformation,
} from "selectors/activity-report/ActivityReportSelector";
import { ActivityReportViewEditTicketInformation } from "stores/activity-report/models/view-edit";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import * as ActivityReportActions from "stores/activity-report/ActivityReportActions";
import { selectActivityReportTicketNumberOptions } from "selectors/select-options/ActivityReportTicketNumberSelector";
import {
  selectActivityReportCheckSOExist,
  selectActivityReportSONumber,
  selectActivityReportTicketNumber,
} from "selectors/activity-report/ActivityReportSelector";
import * as ActivityReportCategoryActions from "stores/activity-report-category/ActivityReportCategoryActions";
import * as ActivityReportActivityInformationActions from "stores/activity-report-activity-information/ActivityReportActivityInformationActions";
import * as ActivityReportNotesActions from "stores/activity-report-notes/ActivityReportNotesActions";
import ActivityReportCategoryCheckAndAddModel from "stores/activity-report-category/models/ActivityReportCategoryCheckAndAddModel";
import { selectActivityReportCategoryOptions } from "selectors/select-options/ActivityReportCategorySelector";
import * as EmployeeFreelancePermanentActions from "stores/employee-freelance-permanent/EmployeeFreelancePermanentActions";
import { selectEmployeeFreelancePermanentSearchOptions } from "selectors/employee-freelance-permanent/EmployeeFreelancePermanentSelector";

interface IProps {
  activityReportGenID: string;
}

const TicketViewEdit: React.FC<IProps> = ({ activityReportGenID }) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const viewActivityReportTicketInformation = useSelector((state: IStore) =>
    selectViewTicketInformation(state)
  );
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ActivityReportTicketInformationActions.REQUEST_VIEW_TICKET_INFORMATION,
      ActivityReportActions.REQUEST_ACTIVITY_REPORT_TICKET_NUMBER,
      ActivityReportActions.REQUEST_VIEW_ACTIVITY_REPORT_TICKET_NUMBER,
      ActivityReportActions.REQUEST_CHECK_SO_EXIST,
      ActivityReportActions.REQUEST_ACTIVITY_REPORT_SO_NUMBER,
      ActivityReportActions.REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_DETAIL,
    ])
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
  const activityReportTicketNumberOptions = useSelector((state: IStore) =>
    selectActivityReportTicketNumberOptions(state)
  );
  const activityReportCategoryOptions: any[] = useSelector((state: IStore) =>
    selectActivityReportCategoryOptions(state)
  );
  const activityReportCheckSOExist: any = useSelector((state: IStore) =>
    selectActivityReportCheckSOExist(state)
  );
  const activityReportTicketNumber = useSelector((state: IStore) =>
    selectActivityReportTicketNumber(state)
  );
  const activityReportSONumber = useSelector((state: IStore) =>
    selectActivityReportSONumber(state)
  );

  const employeeFreelancePermanentSearch = useSelector((state: IStore) =>
    selectEmployeeFreelancePermanentSearchOptions(state)
  );
  const activityReportFunnelGenId: any[] = useSelector((state: IStore) =>
    selectActivityReportFunnelGenId(state)
  );

  const activityReportFunnelDetail = useSelector((state: IStore) =>
    selectActivityReportFunnelGenDetail(state)
  );

  const activityReportCheckFunnelExist: any = useSelector((state: IStore) =>
  selectActivityReportCheckFunnelExist(state)
);

  const isShowField: boolean = false; // hidden field to prevent edit by user only edit by system
  const typeNumberOption = {
    ticketTaskNumber: "ticketTaskNumber",
    soNumber: "soNumber",
    funnelGenId: "funnelGenId",
  };
  const soTeamProduct: string = "10001040";
  const [typeNumberRadioBtn, setTypeNumberRadioBtn] = useState(
    typeNumberOption.ticketTaskNumber
  );
  const [soNumber, setSONumber] = useState("");
  const [funnelGenId, setFunnelGenId] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketTitle, setTicketTitle] = useState("");
  const [disableTicketOrTaskField, setDisableTicketOrTaskField] = useState(
    false
  );
  const [FunnelGenIdExist, setFunnelGenIdExist] = useState(false);
  const [FunnelGenIdValidateMsg, setFunnelGenIdValidateMsg] = useState("");
  const [disableSOField, setDisableSOField] = useState(false);
  const [disableFunnelGenIdField, setDisableFunnelGenIdField] = useState(false);
  const [soNumberExist, setSONumberExist] = useState(false);
  const [soNumberValidateMsg, setSONumberValidateMsg] = useState("");
  const [engineerState, setEngineerState] = useState([]);
  const [initialValues, setInitialValues] = useState({
    sonumber: "",
    ticketnumber: "",
    funnelgenid: "",
    customerName: "",
    address: "",
    projectName: "",
    contactName: "",
    phone: "",
    engineerList: "",
    activityCategory: undefined,
    symptom: "",
    sonumberView: "",
    ticketnumberView: "",
  });

  const resetSOInitialValues = () => {
    setInitialValues((prevState) => ({
      ...prevState,
      // sonumber: '',
      ticketnumber: "",
      customerName: "",
      address: "",
      projectName: "",
      contactName: "",
      phone: "",
      engineerList: "",
      activityCategory: undefined,
      symptom: "",
      sonumberView: "",
      ticketnumberView: "",
    }));
  };

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
        setDisableFunnelGenIdField(true);
        setDisableTicketOrTaskField(false);
      }

      if (data.length === 0) {
        setDisableSOField(false);
        setDisableTicketOrTaskField(false);
        setDisableFunnelGenIdField(false);
      }
    },
    [dispatch]
  );

  const handleSearchChangeFunnedGenId = useCallback(
    (data) => {
      if (data) {
        setFunnelGenId(data);
        setDisableSOField(true);
        setDisableTicketOrTaskField(true);
        setDisableFunnelGenIdField(false);
       
        dispatch(ActivityReportActions.checkFunnelGenIdExist(data));
      }

      if (data === "") {
        setDisableSOField(false);
        setDisableTicketOrTaskField(false);
        setDisableFunnelGenIdField(false)
      }
    },
    [dispatch]
  );

  const handleSearchChangeSONumber = useCallback(
    (data) => {
      if (data.length > 0 && data !== 0) {
        if (data.length === 8 && data === soTeamProduct) {
          setDisableSOField(false);
          setDisableTicketOrTaskField(true);
          setSONumber(data);

          // resetSOInitialValues();
          setSONumberValidateMsg("");
        }

        if (data.length > 0 && data !== soTeamProduct) {
          setDisableSOField(false);
          setDisableTicketOrTaskField(true);
          setSONumber(data);

          dispatch(ActivityReportActions.checkSOExist(data));
        }
      }

      if (data.length === 0) {
        setDisableSOField(false);
        setDisableTicketOrTaskField(false);
        setDisableFunnelGenIdField(false);
      }
    },
    [dispatch]
  );

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

  const onResultSelectFunnelGenId = (data: any) => {
    if (data !== null || data !== undefined) {
      dispatch(
        ActivityReportActions.requestActivityReportFunnelGenDetail(
          Number(data.result.title)
        )
      );

      setFunnelGenId(data.result.title);
      // setTicketNumber(data.result.price);
      // setTicketTitle(data.result.title)
      setInitialValues((prevState) => ({
        ...prevState,
        funnelgenid: data.result.price,
      }));
      // dispatch(ActivityReportActions.requestViewActivityReportTicketNumber(currentUser.email, data.result.price));
    }
  };
  console.log("initialValues", initialValues);

  useEffect(() => {
    //Ketika memilih FunnelGenID
    if (viewActivityReportTicketInformation.funnelGenId > 0) {
      setInitialValues((prevState) => ({
        ...prevState,
        funnelgenid: funnelGenId,
        contactName:
          activityReportFunnelDetail.contactName === ""
            ? viewActivityReportTicketInformation.contactName
            : activityReportFunnelDetail.contactName,

        customerName:
          activityReportFunnelDetail.accountName === ""
            ? viewActivityReportTicketInformation.customerName
            : activityReportFunnelDetail.accountName,
        address:
          activityReportFunnelDetail.accountAddress === ""
            ? viewActivityReportTicketInformation.address
            : activityReportFunnelDetail.accountAddress,
        projectName:
          activityReportFunnelDetail.projectName === ""
            ? viewActivityReportTicketInformation.projectName
            : activityReportFunnelDetail.projectName,
        phone:
          activityReportFunnelDetail.accountPhone === ""
            ? viewActivityReportTicketInformation.phone
            : activityReportFunnelDetail.accountPhone,

        // contactName: activityReportFunnelDetail.contactName,
        // customerName: activityReportFunnelDetail.accountName,
        // address: activityReportFunnelDetail.accountAddress,
        // projectName: activityReportFunnelDetail.projectName,
        // phone: activityReportFunnelDetail.accountPhone,
        //
      }));
    }
  }, [
    activityReportFunnelDetail.accountAddress ||
      activityReportFunnelDetail.accountName ||
      activityReportFunnelDetail.accountPhone ||
      activityReportFunnelDetail.contactName ||
      activityReportFunnelDetail.projectName,
  ]);
  console.log("activityReportFunnelDetail", activityReportFunnelDetail);
  useEffect(() => {
    // Get value from existing
    setInitialValues((prevState) => ({
      ...prevState,
      sonumber:
        `${viewActivityReportTicketInformation.so}` === "0"
          ? ""
          : `${viewActivityReportTicketInformation.so}`,
      ticketnumber: viewActivityReportTicketInformation.ticketId,
      funnelgenid:
        `${viewActivityReportTicketInformation.funnelGenId}` === "0"
          ? ""
          : `${viewActivityReportTicketInformation.funnelGenId}`,
      sonumberView:
        `${viewActivityReportTicketInformation.so}` === "0"
          ? ""
          : `${viewActivityReportTicketInformation.so}`,
      ticketnumberView: viewActivityReportTicketInformation.ticketId,
      customerName: viewActivityReportTicketInformation.customerName,
      contactName: viewActivityReportTicketInformation.contactName,
      phone: viewActivityReportTicketInformation.phone,
      address: viewActivityReportTicketInformation.address,
      projectName: viewActivityReportTicketInformation.projectName,
      engineerList: viewActivityReportTicketInformation.engineerList,
      activityCategory: viewActivityReportTicketInformation.activityCategoryArr,
      symptom: viewActivityReportTicketInformation.symptom,
    }));

    // Set default radio button based on ticket/taskNumber or SONumber existing
    if (
      viewActivityReportTicketInformation.so === 0 &&
      viewActivityReportTicketInformation.ticketId.length !== 0 &&
      viewActivityReportTicketInformation.funnelGenId === 0
    ) {
      setTypeNumberRadioBtn(typeNumberOption.ticketTaskNumber);
      setDisableSOField(true);
      setDisableTicketOrTaskField(false);
      setDisableFunnelGenIdField(true);
    } else if (
      viewActivityReportTicketInformation.so !== 0 &&
      viewActivityReportTicketInformation.ticketId.length === 0 &&
      viewActivityReportTicketInformation.funnelGenId === 0
    ) {
      setTypeNumberRadioBtn(typeNumberOption.soNumber);
      setDisableSOField(false);
      setDisableTicketOrTaskField(true);
      setDisableFunnelGenIdField(true);
    } else if (
      viewActivityReportTicketInformation.so === 0 &&
      viewActivityReportTicketInformation.ticketId.length === 0 &&
      viewActivityReportTicketInformation.funnelGenId !== 0
    ) {
      setTypeNumberRadioBtn(typeNumberOption.funnelGenId);
      setDisableSOField(true);
      setDisableTicketOrTaskField(true);
      setDisableFunnelGenIdField(false);
    } else {
      setTypeNumberRadioBtn(typeNumberOption.ticketTaskNumber);
    }
  }, [viewActivityReportTicketInformation]);

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
    if (activityReportGenID.length > 0) {
      dispatch(
        ActivityReportTicketInformationActions.requestViewTicketInformationById(
          +activityReportGenID,
          +currentUser.employeeID
        )
      );
    }
  }, [dispatch, activityReportGenID]);

  useEffect(() => {
    if (typeNumberRadioBtn === typeNumberOption.ticketTaskNumber) {
      setMandatory((prevState) => ({
        ...prevState,
        sTicketNumber: false,
      }));
    } else if (typeNumberRadioBtn === typeNumberOption.soNumber) {
      setMandatory((prevState) => ({
        ...prevState,
        sSONumber: false,
      }));
    } else if (typeNumberRadioBtn === typeNumberOption.funnelGenId) {
      setMandatory((prevState) => ({
        ...prevState,
        sFunnelGenId: false,
      }));
    }
  }, [typeNumberRadioBtn]);

  useEffect(() => {
    if (activityReportTicketNumber.ticketOrTaskNumber === ticketNumber) {
      setInitialValues((prevState) => ({
        ...prevState,
        ticketnumber: ticketNumber,
        ticketnumberView: ticketNumber,
        sonumber: "",
        sonumberView: "",
        customerName:
          activityReportTicketNumber.accountName.trim().length === 0
            ? viewActivityReportTicketInformation.customerName
            : activityReportTicketNumber.accountName,
        contactName:
          activityReportTicketNumber.contactName.trim().length === 0
            ? viewActivityReportTicketInformation.contactName
            : activityReportTicketNumber.contactName,
        phone:
          activityReportTicketNumber.accountPhone.trim().length === 0
            ? viewActivityReportTicketInformation.phone
            : activityReportTicketNumber.accountPhone,
        address:
          activityReportTicketNumber.accountAddress.trim().length === 0
            ? viewActivityReportTicketInformation.address
            : activityReportTicketNumber.accountAddress,
        projectName:
          activityReportTicketNumber.projectName.trim().length === 0
            ? viewActivityReportTicketInformation.projectName
            : activityReportTicketNumber.projectName,
        engineerList:
          activityReportTicketNumber.engineerList.trim().length === 0
            ? viewActivityReportTicketInformation.engineerList
            : activityReportTicketNumber.engineerList,
        activityCategory:
          activityReportTicketNumber.activityCategoryArr.length === 0
            ? viewActivityReportTicketInformation.activityCategoryArr
            : activityReportTicketNumber.activityCategoryArr,
        symptom:
          activityReportTicketNumber.description.trim().length === 0
            ? viewActivityReportTicketInformation.symptom
            : activityReportTicketNumber.description,
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
        ticketnumber: "",
        ticketnumberView: "",
        sonumber: soNumber,
        sonumberView: soNumber,
        customerName:
          activityReportSONumber.accountName.trim().length === 0
            ? viewActivityReportTicketInformation.customerName
            : activityReportSONumber.accountName,
        contactName: viewActivityReportTicketInformation.contactName,
        phone: viewActivityReportTicketInformation.phone,
        address:
          activityReportSONumber.accountAddress.trim().length === 0
            ? viewActivityReportTicketInformation.address
            : activityReportSONumber.accountAddress,
        projectName:
          activityReportSONumber.projectName.trim().length === 0
            ? viewActivityReportTicketInformation.projectName
            : activityReportSONumber.projectName,
        engineerList: engineerList,
        activityCategory:
          viewActivityReportTicketInformation.activityCategoryArr,
        symptom: viewActivityReportTicketInformation.symptom,
      }));
    }
  }, [activityReportSONumber]);

  useEffect(() => {
    //Lock SONumber
    if (soNumber.toString().length > 0 && soNumber != "") {
      if (activityReportCheckSOExist.isExist === false) {
        setSONumber(soNumber);
        setSONumberExist(false);
        setSONumberValidateMsg(`SONumber ${soNumber} not exist`);
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

  let engineerArr: string[] = [];
  const onSubmitHandler = (values: any) => {
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

    const updateItem = new ActivityReportViewEditTicketInformation({});
    updateItem.activityReportGenID = +activityReportGenID;

    updateItem.ticketId = "";
    if (typeNumberRadioBtn === typeNumberOption.ticketTaskNumber) {
      updateItem.ticketId = values.ticketnumber;
    }

    updateItem.so = 0;
    if (typeNumberRadioBtn === typeNumberOption.soNumber) {
      updateItem.so = +values.sonumber;
    }

    updateItem.funnelGenId = 0;
    if (typeNumberRadioBtn === typeNumberOption.funnelGenId) {
      updateItem.funnelGenId = +values.funnelGenId;
    }

    if (engineerArr.indexOf(currentUser.email) === -1) {
      engineerArr.push(currentUser.email);
    }

    updateItem.projectName = values.projectName;
    updateItem.customerName = values.customerName;
    updateItem.contactName = values.contactName;
    updateItem.phone = values.phone;
    updateItem.address = values.address;
    updateItem.activityCategory =
      values.activityCategory === undefined
        ? ""
        : values.activityCategory.join(";");
    updateItem.engineerList =
      values.engineerList === undefined
        ? ""
        : engineerArr.join(";").toLowerCase();
    updateItem.symptom = values.symptom === undefined ? "" : values.symptom;
    updateItem.modifyUserID = Number(currentUser.employeeID);

    dispatch(
      ActivityReportTicketInformationActions.putViewTicketInformation(
        updateItem
      )
    ).then(() => {
      dispatch(
        ActivityReportTicketInformationActions.requestViewTicketInformationById(
          +activityReportGenID,
          +currentUser.employeeID
        )
      ).then(() => {
        dispatch(
          ActivityReportActivityInformationActions.requestViewActivityInformationById(
            +activityReportGenID,
            +currentUser.employeeID
          )
        ).then(() => {
          dispatch(
            ActivityReportNotesActions.requestViewNotesById(
              +activityReportGenID,
              +currentUser.employeeID
            )
          );
        });
      });
    });

    if (!isRequesting) {
      if (!disableComponent) {
        setDisableComponent(true);
      }
    }
  };

  const validate = combineValidators({
    customerName: isRequired("Company is required"),
    phone: isRequired("Phone is required"),
    contactName: isRequired("Contact Name is required"),
    address: isRequired("Address is required"),
  });

  const onEditHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onCancelHandler = () => {
    if (!disableComponent) {
      dispatch(
        ActivityReportTicketInformationActions.requestViewTicketInformationById(
          +activityReportGenID,
          +currentUser.employeeID
        )
      );
      setDisableComponent(true);
    }
  };

  const [mandatory, setMandatory] = useState({
    sSONumber: false,
    sTicketNumber: false,
    sFunnelGenId: false,
    sCompany: false,
    sPhone: false,
    sContactName: false,
    sAddress: false,
  });

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

  function stripHTML(str){
    var strippedText = $("<div/>").html(str).text();
    return strippedText;
  }


  return (
    <Fragment>
      {viewActivityReportTicketInformation.isAllowAccess ? (
        <Segment className="LightGreyNotif">
          <FinalForm
            onSubmit={(values: any) => onSubmitHandler(values)}
            validate={validate}
            initialValues={initialValues}
            key={1}
            render={({ handleSubmit }) => (
              <Form key={1} onSubmit={handleSubmit} loading={isRequesting}>
                <Grid>
                  <Grid.Row columns="equal">
                    <Grid.Column>
                      <Header>
                        <Header.Content className="FloatLeft">
                          {viewActivityReportTicketInformation.isDraft && (
                            <Label color="yellow">DRAFT</Label>
                          )}
                          {/* {viewActivityReportTicketInformation.so === 0 && viewActivityReportTicketInformation.ticketId.length !== 0 && (<Label color='yellow'>Ticket/Task</Label>)}
                                                    {viewActivityReportTicketInformation.so !== 0 && viewActivityReportTicketInformation.ticketId.length === 0 && (<Label color='yellow'>SO</Label>)} */}
                        </Header.Content>
                        {/* {viewActivityReportTicketInformation.isAllowEdit && ( */}
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
                                      onClick={(e: Event) => onEditHandler(e)}
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
                                      onClick={onCancelHandler}
                                    />
                                  }
                                />
                              </Fragment>
                            )}
                          </Header.Content>
                        {/* )} */}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>

                  {disableComponent ? (
                    ""
                  ) : (
                    <Fragment>
                      <Grid.Row columns="equal">
                        <Grid.Column className="FullGrid767">
                          <Grid>
                            <Header
                              size="tiny"
                              className={styles.typeNumberTitle}
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
                                  name="funnelGenId"
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
                              disabled={disableFunnelGenIdField}
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
                                Type 2 letters or more
                              </p>
                              <br />
                            </div>
                          </Grid.Column>
                        ) : (
                          ""
                        )}
                      </Grid.Row>
                    </Fragment>
                  )}

                  {disableComponent ? (
                    <Fragment>
                      {initialValues.ticketnumberView.length === 0 &&
                      initialValues.sonumberView.length !== 0 ? (
                        <Grid.Row columns="equal">
                          <Grid.Column className="ViewLabel">
                            <Field
                              name="sonumberView"
                              component={TextInput}
                              placeholder="e.g. SO number.."
                              labelName="SO Number"
                              mandatory={false}
                              disabled={true}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      ) : (
                        ""
                      )}

                      {initialValues.ticketnumberView.length !== 0 &&
                      initialValues.sonumberView.length === 0 ? (
                        <Grid.Row columns="equal">
                          <Grid.Column className="ViewLabel">
                            <Field
                              name="ticketnumberView"
                              component={TextInput}
                              placeholder="e.g. ticket number.."
                              labelName="Ticket Number"
                              mandatory={false}
                              disabled={true}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      ) : (
                        ""
                      )}
                    </Fragment>
                  ) : (
                    ""
                  )}

                  {initialValues.funnelgenid && disableComponent && (
                    <Grid.Row columns="equal">
                      <Grid.Column className="ViewLabel">
                        <Field
                          name="funnelgenid"
                          component={TextInput}
                          placeholder="e.g. project.."
                          labelName="FunnelGenId"
                          disabled={disableComponent}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  )}

                  <Grid.Row columns="equal">
                    <Grid.Column className="ViewLabel">
                      <Field
                        name="projectName"
                        component={TextInput}
                        placeholder="e.g. project.."
                        labelName="Project"
                        disabled={disableComponent}
                      />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns="equal">
                    <Grid.Column className="ViewLabel">
                      <Field
                        name="customerName"
                        component={TextInput}
                        placeholder="e.g. company.."
                        labelName="Company"
                        disabled={disableComponent}
                        mandatory={false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns="equal">
                    <Grid.Column className="ViewLabel">
                      <Field
                        name="phone"
                        component={TextInput}
                        placeholder="e.g. 620000000000.."
                        labelName="Phone"
                        disabled={disableComponent}
                        mandatory={false}
                        type="number"
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns="equal">
                    <Grid.Column className="ViewLabel">
                      <Field
                        name="contactName"
                        component={TextInput}
                        placeholder="e.g. contact.."
                        labelName="Contact Name"
                        disabled={disableComponent}
                        mandatory={false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns="equal">
                    <Grid.Column className="ViewLabel">
                      <Field
                        name="address"
                        component={TextAreaInput}
                        placeholder="Address*"
                        labelName={"Address"}
                        disabled={disableComponent}
                        mandatory={false}
                        values={stripHTML(initialValues.address)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  {isShowField && (
                    <Fragment>
                      <Grid.Row columns="equal">
                        <Grid.Column className="FullGrid767">
                          <Field
                            name="activityCategory"
                            component={DropdownInput}
                            placeholder="e.g activity category.."
                            labelName="Activity Category"
                            allowAdditions={true}
                            options={activityReportCategoryOptions}
                            disabled={true}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns="equal">
                        <Grid.Column className="FullGrid767">
                          <Field
                            name="engineerList"
                            component={SearchInputList}
                            placeholder="e.g.Employee Name"
                            labelName="Engineer List"
                            handleSearchChange={handleSearchChangeEmployee}
                            results={employeeFreelancePermanentSearch}
                            listSoftware={engineerState}
                            disabled={true}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns="equal">
                        <Grid.Column className="FullGrid767">
                          <Field
                            name="symptom"
                            component={RichTextEditor}
                            placeholder=""
                            labelName="Symptom/Error Possibility"
                            disabled={true}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Fragment>
                  )}
                </Grid>
              </Form>
            )}
          />
        </Segment>
      ) : (
        <div>User Not Allowed Access</div>
      )}
    </Fragment>
  );
};

export default TicketViewEdit;