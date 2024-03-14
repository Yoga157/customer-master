import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  createRef,
} from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { History } from "history";
import {
  Form,
  Grid,
  Segment,
  Dropdown,
  Divider,
  Confirm,
  DropdownProps,
  Header,
  List,
} from "semantic-ui-react";
import {
  SelectInputOpportunity,
  SelectInput,
  DateInput,
  Button,
  TextInput,
  CheckBoxInput,
  RichTextEditor,
  DropdownInput,
  NumberInput,
  SearchInput,
  SearchInputList,
  TextInputWithFocus,
} from "views/components/UI";
import { durationTypeOptions } from "constants/durationTypeOptions";
import { reqDedicatedResourceOptions } from "constants/reqDedicatedResourceOptions";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, RouteComponentProps, useHistory } from "react-router-dom";
import { StaticContext } from "react-router";
import CustomerForm from "views/customer-page/components/form-create/CustomerForm";
import ModalSizeEnum from "constants/ModalSizeEnum";
import {
  selectCustomerOptions,
  selectCustomerPICOptions,
  selectEmployeeOptions,
  selectPresalesOptions,
} from "selectors/select-options";
import IStore from "models/IStore";
import FunnelModel from "stores/funnel/models/FunnelModel";
import FunnelsModel from "stores/funnel/models/FunnelsModel";
import ProductServiceModel from "stores/funnel-product-service/models/ProductServiceModel";
import AttachmentModel from "stores/attachment/models/AttachmentModel";
import CustomerToFunnelModel from "stores/customer/models/CustomerToFunnelModel";
import { selectFunnel } from "selectors/funnel/FunnelSelector";
import EmployeeModel from "stores/employee/models/EmployeeModel";
import {
  combineValidators,
  composeValidators,
  createValidator,
  hasLengthGreaterThan,
  isRequired,
} from "revalidate";
import ProductService from "views/funnel-page/components/product-service/ProductService";
import Attachment from "views/attachment-page/Attachment";
import { selectCustomerPIC } from "selectors/customer-pic/CustomerPICSelector";
import axios from "axios";
import environment from "environment";

import moment from "moment";
// import ConfirmSubmit from './ConfirmSubmit';
import FunnelHeaderNameModel from "stores/funnel/models/FunnelHeaderNameModel";
import styles from "./FunnelCard.module.scss";
import RouteEnum from "constants/RouteEnum";
// selectors
import { selectFunnelStatusOptions } from "selectors/select-options/FunnelStatusSelector";
import { selectObjectFunnelSA } from "selectors/generated-form/GenerateFormSelector";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import { selectCustomerGenerated } from "selectors/select-options/CustomerSelector";
import {
  selectEmployeeSearchOptions,
  selectSingleSearchCustomerSearch,
} from "selectors/select-options/EmployeeSelector";
import {
  selectFormType,
  selectFunnelSAOutside,
  selectFunnelSA,
} from "selectors/generated-form/GenerateFormSelector";
import CustomerPICModel from "stores/customer-pic/models/CustomerPICModel";

// actions redux
import * as EmployeeActions from "stores/employee/EmployeeActions";
import * as CompetitorActions from "stores/competitor/CompetitorActions";
import * as CustomerActions from "stores/customer/CustomerActions";
import * as CustomerPICActions from "stores/customer-pic/CustomerPICActions";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as PresalesSupportActions from "stores/presales-support/PresalesSupportActions";
import * as GeneratedFormAction from "stores/generated-form/GenerateFormActions";
import * as ToastsAction from "stores/toasts/ToastsAction";

import FunnelSATable from "../../../FunnelSATable";
import GeneratedFormModel from "stores/generated-form/models/GeneratedFormModel";
import ToastStatusEnum from "constants/ToastStatusEnum";
import GenerateFormEnvelope from "stores/generated-form/models/GeneratedFormEnvelope";
import FunnelSASearchModel from "stores/generated-form/models/FunnelSASearchModel";
import FunnelSARowModel from "stores/generated-form/models/FunnelSARowModel";

interface LocationState {
  from: {
    pathname: string;
  };
  eventName: string;
  customerName: string;
  funnelOpportunityID: number;
  eventDate: string;
  type: string;
  projectName: string;
  formID: string;
  formType: string;
  saNo: string;
  funnelGenID: number;
  customerPICName: string;
}

interface IProps {
  history: History;
}

//type Props = RouteComponentProps<{}, StaticContext, { from: { pathname: string } }>;

const FunnelForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const dispatch: Dispatch = useDispatch();
  const [mandatory, setMandatory] = useState({
    sFunnelStatus: false,
    sDealCloseDate: false,
    sEndUser: false,
    sCustomerName: false,
    sTotalSelling: false,
    sProjectName: false,
    sCustomerNeeds: true,
    sCompetitor: true,
    sNotes: true,
    sGPM: true,
    sGPMPctg: true,
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [submitConfirm, setSubmitConfirm] = useState(false);
  const [customer, setCustomer] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPICName, setCustomerPICName] = useState("");
  const [customerPICID, setCustomerPICID] = useState(0);
  const [defaultCust, setDefaultCust] = useState(0);
  const [picJobTitle, setPICJobTitle] = useState("");
  const [picEmailAddr, setPICEmailAddr] = useState("");
  const [picMobilePhone, setPICMobilePhone] = useState("");
  const [projectName, setProjectName] = useState("");
  const [hideSelectFunnel, setHideSelectFunnel] = useState(false);
  const [selectedSA, setSelectedSA] = useState("");
  const [selectedSO, setSelectedSO] = useState("");
  const [selectedFunnel, setSelectedFunnel] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [editValue, setEditValue] = useState({
    createDate: "",
    createUserID: 0,
    customerID: 0,
    customerPICID: 0,
    engineerPMName: "",
    formDate: "",
    formID: "",
    formType: 0,
    funnelGenID: 0,
    notes: "",
    saNo: "",
    salesID: 0,
  });
  const [formType, setFormType] = useState(0);
  const [formTypeText, setFormTypeText] = useState("");
  const [count, setCount] = useState(0);
  const [flagSearch, setFlagSearch] = useState("");
  const [salesID, setSalesID] = useState(0);

  // let bRefreshCustomerPIC: boolean = useSelector(
  //   (state: IStore) => state.customerPIC.refreshPage
  // );
  const isLoadingCustomer: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [CustomerActions.REQUEST_CUSTOMERS_BY_NAME])
  );
  const customerStoreSearch = useSelector((state: IStore) =>
    selectCustomerGenerated(state)
  );
  // let FunnelSATable = useSelector((state:IStore) => selectFunnelSA(state))
  const FunnelSAStoreSearch = useSelector((state: IStore) =>
    selectFunnelSAOutside(state)
  );

  const employeeStoreSearch = useSelector((state: IStore) =>
    selectSingleSearchCustomerSearch(state)
  );
  const selectSingleCustomer = useSelector(
    (state: IStore) => state.customer.customer
  );
  const formTypeOptions = useSelector((state: IStore) => selectFormType(state));

  const customerPICStore = useSelector((state: IStore) =>
    selectCustomerPICOptions(state)
  );
  const customerPIC = useSelector((state: IStore) => selectCustomerPIC(state));
  const onCloseHandler = () => {
    props.history.replace(RouteEnum.GeneratedForm);
  };

  // const okConfirm = () => {
  //   setOpenConfirm(false);
  //   dispatch(CustomerPICActions.requestCustomerPIC(+customer, currentUser.employeeID));
  // };

  const resultRenderer = ({
    image,
    price,
    title,
    description,
    flag,
    id,
    so,
    funnelGenID,
    saNo,
  }) => {
    return (
      <div key={id} className="content">
        <div className="price">
          {flagSearch === "SA"
            ? saNo
            : flagSearch === "SO"
            ? "SO#" + so
            : funnelGenID}
        </div>
        <div className="title"> {title}</div>
        <div className="description">{description}</div>
      </div>
    );
  };

  const onChangeCustomerDefault = (
    customerGenID: number,
    customerName: string,
    customerPICID: number,
    customerPICName: string,
    jobTitlePIC: string,
    emailPIC: string,
    phonePIC: string
  ) => {
    handleSearchChangeCust(customerName);
    setCustomer(customerGenID);
    dispatch(
      CustomerPICActions.requestCustomerPIC(
        +customerGenID,
        currentUser.employeeID
      )
    );
    setCustomerPICName(customerPICName);
    setCustomerPICID(customerPICID);
    onChangeCustomerPIC(customerPICID);
    setDefaultCust(1);
    setPICJobTitle(jobTitlePIC);
    setPICEmailAddr(emailPIC);
    setPICMobilePhone(phonePIC);
  };

  const onResultSelectCustomer = (data: any) => {
    setCustomer(data.result.descriptions);
    setCustomerName(data.result.title);
    dispatch(
      CustomerPICActions.requestCustomerPIC(
        +data.result.descriptions,
        currentUser.employeeID
      )
    );
  };

  const onResultSelectFunnelSA = (data: any) => {
    const {
      projectName,
      funnelDate,
      customerName,
      customerGenID,
      funnelGenID,
      saDate,
      saNo,
      salesName,
      so,
      salesID,
    } = data.result;
    const selectedFunnelSA = new FunnelSARowModel({});
    selectedFunnelSA.customerName = customerName;
    selectedFunnelSA.funnelDate = funnelDate;
    selectedFunnelSA.projectName = projectName;
    selectedFunnelSA.saDate = saDate;
    selectedFunnelSA.saNo = saNo;
    selectedFunnelSA.salesName = salesName;
    selectedFunnelSA.customerGenID = customerGenID;
    selectedFunnelSA.funnelGenID = funnelGenID;
    selectedFunnelSA.so = so;
    selectedFunnelSA.salesID = salesID;
    dispatch(GeneratedFormAction.insertFunnelSAObject(selectedFunnelSA));
    setCustomerName(customerName);
    setCustomer(customerGenID);
    setProjectName(projectName);
    setSelectedFunnel(String(funnelGenID));
    setPICMobilePhone("");
    setPICEmailAddr("");
    setPICJobTitle("");
  };

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const selectedFunnelSA: FunnelSARowModel = useSelector((state: IStore) =>
    selectObjectFunnelSA(state)
  );

  const result = useSelector(
    (state: IStore) => state.generatedForm.resultActions
  );

  useEffect(() => {
    if (result.message == "Insert Success!") {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Success));
      history.push("/generated");
      dispatch(GeneratedFormAction.clearResult());
    }

    if (result.message == "Update Success!") {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Success));
      history.push("/generated");
      dispatch(GeneratedFormAction.clearResult());
    }
  }, [result.message]);

  useEffect(() => {
    if (selectedFunnelSA.projectName != "undefined") {
      setProjectName(selectedFunnelSA.projectName);
      setSelectedFunnel(String(selectedFunnelSA.funnelGenID));
      setCustomerName(selectedFunnelSA.customerName);
      setCustomer(+selectedFunnelSA.customerGenID);
      setSelectedSA(selectedFunnelSA.saNo);
      setSelectedSO(selectedFunnelSA.so);
      setSalesID(selectedFunnelSA.salesID);
      setPICMobilePhone("");
      setPICEmailAddr("");
      setPICJobTitle("");

      dispatch(
        CustomerActions.requestCustomerByName(selectedFunnelSA.customerName)
      ).then(() => {
        dispatch(
          CustomerPICActions.requestCustomerPIC(
            Number(selectedFunnelSA.customerGenID),
            currentUser.employeeID
          )
        );
      });
    }
  }, [selectedFunnelSA]);

  useEffect(() => {
    if (location.state && location.state.type === "EDIT") {
      GetByFormID(location.state.formID);
      setProjectName(location.state.projectName);
      setCustomerPICName(location.state.customerPICName);
      setCustomerName(location.state.customerName);
      GetCustomerPICbyEDIT();
      if (
        location.state.formType === "BAST" ||
        location.state.formType === "Contract"
      ) {
        setHideSelectFunnel(true);
      } else {
        setHideSelectFunnel(false);
        setFormTypeText("Letter");
      }
    } else {
      dispatch(GeneratedFormAction.clearFunnelSAObject());
      setPICMobilePhone("");
      setPICEmailAddr("");
      setPICJobTitle("");
      setCustomerName("");
      setSelectedFunnel("");
      setProjectName("");
      setSelectedSA("");
      setSelectedSO("");
    }
  }, []);

  const GetCustomerPICbyEDIT = () => {
    // console.log
    dispatch(
      CustomerActions.requestCustomerByName(location.state.customerName)
    );
  };

  const GetByFormID = (formID: string) => {
    const controllerName = `GenerateForm/GetByFormID?FormID=${formID}`;
    axios
      .get(environment.api.generic.replace(":controller", controllerName))
      .then((res) => {
        const {
          createDate,
          createUserID,
          customerID,
          customerPICID,
          engineerPMName,
          formDate,
          formID,
          formType,
          funnelGenID,
          notes,
          saNo,
          salesID,
          so,
        } = res.data;
        dispatch(
          CustomerPICActions.requestCustomerPIC(
            customerID,
            currentUser.employeeID
          )
        );
        dispatch(CustomerPICActions.requestCustomerPICBYID(customerPICID)).then(
          () => {
            setCustomerPICID(customerPICID);
          }
        );
        setSelectedSO(so);
        setSelectedSA(saNo);
        setSelectedFunnel(String(funnelGenID));
        setCustomer(customerID);
        setFormType(formType);
        // const value = formTypeOptions.filter((el) => el.value == editValue.formType);
        setSalesID(salesID);
        setEditValue({
          ...editValue,
          createDate,
          createUserID,
          customerID,
          customerPICID,
          engineerPMName,
          formDate,
          formID,
          formType,
          funnelGenID,
          notes,
          saNo,
          salesID,
        });
      });
  };

  const onSubmitHandler = (values: any) => {
    const data = new GenerateFormEnvelope({});
    data.generateForm = new GeneratedFormModel(values);
    data.customerPIC = new CustomerPICModel({});
    // Generate Form
    data.generateForm.createUserID = currentUser.employeeID;
    data.generateForm.formType = Number(values.formType);
    data.generateForm.formID =
      location.state && location.state.type === "ADD"
        ? ""
        : editValue.formID ?? "";
    data.generateForm.notes = values.notes;

    data.generateForm.createDate = new Date();
    data.generateForm.customerID = +customer;
    data.generateForm.funnelGenID = +selectedFunnel;
    data.generateForm.formDate =
      values.formDate === undefined ? new Date() : values.formDate;

    // Customer PIC
    data.customerPIC.customerGenID = +customer;
    data.customerPIC.picEmailAddr = picEmailAddr;
    data.customerPIC.picJobTitle = picJobTitle;
    data.customerPIC.picMobilePhone = picMobilePhone;
    data.customerPIC.customerPICID = +customerPICID;
    data.customerPIC.picName = customerPICName;

    if (formTypeText === "Letter") {
      data.generateForm.salesID = currentUser.employeeID;
      data.generateForm.saNo = "";
      data.generateForm.funnelGenID = 0;
      data.generateForm.so = location.state.type === "ADD" ? "0" : 0;
      data.generateForm.engineerPMName = "";
    } else {
      data.generateForm.salesID = salesID;
      data.generateForm.saNo = selectedSA;
      data.generateForm.funnelGenID = +selectedFunnel;
      data.generateForm.so =
        location.state.type === "ADD" ? `${selectedSO}` : +selectedSO;
      data.generateForm.engineerPMName = values.engineerPMName;
    }

    if ((location.state && location.state.type === "ADD") ?? true) {
      dispatch(GeneratedFormAction.requestPostGeneratedForm(data));
    } else {
      dispatch(GeneratedFormAction.requestPutGeneratedForm(data));
    }
  };

  const onAddNewCustomer = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <CustomerForm onCustomerChange={onChangeCustomerDefault} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  const onAddCustomerPIC = (e: any, data: DropdownProps) => {
    if (customer > 0) {
      const newItems = new CustomerPICModel({});
      newItems.customerGenID = +customer;
      newItems.picName = data.value === undefined ? "" : data.value.toString();
      newItems.customerPICID = 0;
      newItems.salesID = currentUser.employeeID;

      dispatch(CustomerPICActions.postCustomerPIC(newItems));
    }
  };

  const onEmail = (event: any) => {
    setPICEmailAddr(event);
  };

  const onMobilePhone = (event: any) => {
    setPICMobilePhone(event);
  };

  const onJobTitle = (event: any) => {
    setPICJobTitle(event);
  };

  const onFormType = (event: any) => {
    setFormType(+event);
    const value = formTypeOptions.filter((el) => el.value == event);
    setFormTypeText(value[0].text);
    if (value[0].text === "BAST" || value[0].text === "Contract") {
      setHideSelectFunnel(true);
    } else {
      setHideSelectFunnel(false);
    }
  };

  useEffect(() => {
    dispatch(GeneratedFormAction.requestFormType());
  }, []);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerActions.REQUEST_CUSTOMERS,
      EmployeeActions.REQUEST_EMPLOYEES_ENGINEER_BY_NAME,
      GeneratedFormAction.REQUEST_SEARCH_FUNNEL_SA_TABLE,
      GeneratedFormAction.REQUEST_POST_GENERATED_FORM,
      GeneratedFormAction.REQUEST_PUT_GENERATED_FORM,
    ])
  );

  const validateLetter = combineValidators({
    formType: isRequired("Form Type"),
    // formDate: isRequired("Form Date"),
    customerName: isRequired("Customer Name"),
    customerPICID: (val) => (val === 0 ? "Customer PIC is required" : false),
    // projectName: isRequired("Project Name"),
    // engineerPMName: isRequired('Engineer PM Name'),
    //competitor: isRequired('Competitor'),
    //customerNeeds: isRequired('Customer Needs'),
  });

  const validate = combineValidators({
    formType: isRequired("Form Type"),
    // formDate: isRequired("Form Date"),
    customerName: isRequired("Customer Name"),
    customerPICID: (val) => (val === 0 ? "Customer PIC is required" : false),
    projectName: isRequired("Project Name"),
    engineerPMName: isRequired("Engineer PM Name"),
    //competitor: isRequired('Competitor'),
    //customerNeeds: isRequired('Customer Needs'),
  });
  const bRefreshCustomerPIC: boolean = useSelector(
    (state: IStore) => state.customerPIC.refreshPage
  );

  const handleSearchChangeCust = (data) => {
    if (location.state.type == "EDIT" && !confirmClear) {
      setOpenConfirm(true);
    } else {
      setOpenConfirm(false);
    }

    setCustomerName(data);

    if (data.length >= 2) {
      //change to onkeypres (enter)
      // dispatch(CustomerActions.requestCustomerByName(data));
    }
  };

  const handleSearchChangeEmployee = useCallback(
    (data) => {
      if (data.length >= 2) {
        dispatch(EmployeeActions.requestEmployeeEngineerByName(data, ""));
      }
    },
    [dispatch]
  );

  const onChangeCustomerPIC = (value: any) => {
    setDefaultCust(0);
    const data = customerPICStore.filter((item: any) => {
      return item.value === value;
    });

    if (data.length > 0) {
      setCustomerPICName(data[0].text);
      dispatch(CustomerPICActions.requestCustomerPICBYID(+value)).then(() => {
        setCustomerPICID(value);
      });
    }
  };

  useEffect(() => {
    if (location.state.type === "EDIT") {
      if (customerPICStore.length > 0) {
        setCustomerPICID(customerPICStore[0].value);
      }
    }
  }, [customerPICStore]);

  useEffect(() => {
    if (count == 0) {
      setCount(1);
    } else {
      setPICMobilePhone(customerPIC.picMobilePhone);
      setPICEmailAddr(customerPIC.picEmailAddr);
      setPICJobTitle(customerPIC.picJobTitle);
    }
  }, [customerPICID]);

  const cancelClick = () => {
    dispatch(ModalFirstLevelActions.CLOSE());
  };

  const handleSearchFunnelSA = (data) => {
    const number = /^[0-9]+$/;
    const searchModel = new FunnelSASearchModel({});
    searchModel.page = 1;
    searchModel.pageSize = 20;
    searchModel.formType = formType;
    searchModel.projectName = "";
    searchModel.saDate = "";
    searchModel.salesName = "";
    searchModel.funnelDate = "";
    searchModel.customerName = "";
    searchModel.so = "";
    searchModel.funnelGenID = "";
    searchModel.saNo = "";

    if (data.length > 4) {
      if (data.slice(0, 2) == "SA") {
        searchModel.saNo = data;
        dispatch(GeneratedFormAction.requestSearchFunnelSA(searchModel));
        setFlagSearch("SA");
      } else if (data.slice(0, 3) == "SO#") {
        searchModel.so = data.substring(3, data.length);
        dispatch(GeneratedFormAction.requestSearchFunnelSA(searchModel));
        setFlagSearch("SO");
      } else if (data.match(number)) {
        searchModel.funnelGenID = data;
        dispatch(GeneratedFormAction.requestSearchFunnelSA(searchModel));
        setFlagSearch("FUNNEL");
      }
    }
  };

  const onFocusFunnelSA = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <FunnelSATable history={props.history} formType={formType} />,
        ModalSizeEnum.Large
      )
    );
  };

  const onSelectPM = (data) => {
    console.log(data.result);
  };

  if (bRefreshCustomerPIC) {
    dispatch(
      CustomerPICActions.requestCustomerPIC(
        Number(customer),
        currentUser.employeeID
      )
    );
  }

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const okConfirm = () => {
    setCustomerName("");
    setDefaultCust(0);
    // setCustomerPICID(0);
    setPICJobTitle("");
    setPICMobilePhone("");
    setPICEmailAddr("");
    setProjectName("");
    setSelectedFunnel("");
    setSelectedSA("");
    setSelectedSO("");
    dispatch(CustomerPICActions.removeCustomerPIC());
    dispatch(GeneratedFormAction.clearFunnelSAObject());
    setOpenConfirm(false);
    setConfirmClear(true);
  };

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={formTypeText === "Letter" ? validateLetter : validate}
      // initialValues={editValue}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Confirm
            open={openConfirm}
            content="Are you sure want to clear the form?"
            onCancel={closeConfirm}
            onConfirm={okConfirm}
            cancelButton="No"
            confirmButton="Yes"
            size="mini"
          />
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767">
                <Field
                  name="formType"
                  component={SelectInputOpportunity}
                  placeholder="e.g.Letter.."
                  labelName="Form Type "
                  mandatory={mandatory.sFunnelStatus}
                  options={formTypeOptions}
                  onChanged={onFormType}
                  defaultValue={String(editValue.formType)}
                  disabled={location.state && location.state.type === "EDIT"}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="formDate"
                  component={DateInput}
                  labelName="Form Date"
                  placeholder="e.g.09/09/2020"
                  mandatory={mandatory.sDealCloseDate}
                  values={new Date()}
                  date={true}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              {hideSelectFunnel && (
                <Grid.Column className="FullGrid767">
                  <Field
                    name="saNo"
                    component={TextInputWithFocus}
                    placeholder="e.g. Funnel/SA/SO.."
                    onFocus={() => onFocusFunnelSA()}
                    labelName="Funnel/SA/SO"
                    defaultValue={
                      location.state && location.state.type === "EDIT"
                        ? selectedSA !== ""
                          ? selectedSA
                          : selectedFunnel
                        : flagSearch === "SA"
                        ? selectedSA
                        : flagSearch === "SO"
                        ? "SO#" + selectedSO
                        : selectedFunnel
                    }
                    handleSearchChange={handleSearchFunnelSA}
                    results={FunnelSAStoreSearch}
                    onResultSelect={onResultSelectFunnelSA}
                    resultRenderer={resultRenderer}
                    disabled={true}
                  />
                </Grid.Column>
              )}
              <Grid.Column className="FullGrid767">
                <Field
                  name="customerName"
                  component={SearchInput}
                  placeholder="e.g.PT. Customer .."
                  loading={isLoadingCustomer}
                  labelName="Customer Name"
                  handleSearchChange={handleSearchChangeCust}
                  onResultSelect={onResultSelectCustomer}
                  results={customerStoreSearch}
                  mandatory={mandatory.sCustomerName}
                  values={customerName}
                  disabled={hideSelectFunnel}
                  defaultValue={
                    location.state && location.state.type == "EDIT"
                      ? customerName
                      : customerName
                  }
                  onKeyPress={(event) => {
                    if (event.charCode == 13) {
                      dispatch(
                        CustomerActions.requestCustomerByName(customerName)
                      );
                    }
                  }}
                />
                <p className="BtmFormNote">Press enter to see the results</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Button
                  type="button"
                  icon="plus"
                  color="green"
                  disabled={false}
                  floated="right"
                  size="small"
                  content="New Customer"
                  onClick={onAddNewCustomer}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment className="LightGreyNotif">
                  <Grid>
                    <Grid.Row columns="equal">
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="customerPICID"
                          component={SelectInputOpportunity}
                          onChanged={onChangeCustomerPIC}
                          placeholder="e.g.Jhon Doe.."
                          labelName="Customer PIC"
                          allowAdditions={true}
                          onAddItems={onAddCustomerPIC}
                          mandatory={false}
                          options={customerPICStore}
                          values={customerPICID}
                          defaultValue={editValue.customerPICID}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="PICJobTitle"
                          component={TextInput}
                          placeholder="e.g.Manager .."
                          labelName="Job Title"
                          defaultValue={picJobTitle}
                          onChange={onJobTitle}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="PICEmailAddr"
                          component={TextInput}
                          placeholder="e.g.email@mail.com.."
                          labelName="Email"
                          defaultValue={picEmailAddr}
                          onChange={onEmail}
                          mandatory={false}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="PICMobilePhone"
                          component={TextInput}
                          placeholder="e.g.0812345.."
                          labelName="Phone"
                          defaultValue={picMobilePhone}
                          onChange={onMobilePhone}
                          mandatory={false}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Divider></Divider>
            {hideSelectFunnel && (
              <>
                {" "}
                <Divider></Divider>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Field
                      name="projectName"
                      component={TextInput}
                      placeholder="e.g.Instalation Project.."
                      mandatory={mandatory.sProjectName}
                      labelName="Project Name"
                      values={projectName}
                      defaultValue={
                        location.state && location.state.type === "EDIT"
                          ? projectName
                          : projectName
                      }
                      onChange={(value) => setProjectName(value)}
                      disabled={
                        location.state && location.state.type === "EDIT"
                          ? false
                          : true
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
                <Divider></Divider>{" "}
              </>
            )}

            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767">
                <Field
                  name="notes"
                  component={RichTextEditor}
                  placeholder="e.g.Information Notes.."
                  labelName="Notes"
                  defaultValue={editValue.notes}
                />
              </Grid.Column>
              {hideSelectFunnel && (
                <Grid.Column className="FullGrid767">
                  <Field
                    name="engineerPMName"
                    component={SearchInput}
                    placeholder="Engineer / PM Name"
                    labelName="Engineer / PM Name"
                    onResultSelect={onSelectPM}
                    handleSearchChange={handleSearchChangeEmployee}
                    results={employeeStoreSearch}
                    defaultValue={editValue.engineerPMName}
                  />
                </Grid.Column>
              )}
            </Grid.Row>
            <Divider />
            <Grid.Row>
              <Grid.Column>
                <Button
                  color="blue"
                  floated="right"
                  content="Submit"
                  disabled={pristine || invalid}
                />
                <Button
                  floated="right"
                  content="Cancel"
                  type="button"
                  onClick={onCloseHandler}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelForm;
