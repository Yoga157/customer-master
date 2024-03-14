import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import "./ViewEditCustomer.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Form as FinalForm, Field } from "react-final-form";
import { Link, useParams } from "react-router-dom";
import {
  Divider,
  Form,
  Label,
  Icon,
  Table,
  Button,
  Checkbox,
  Input,
} from "semantic-ui-react";
import {
  DropdownClearInput,
  CheckBox as CheckboxInvoicing,
  RichTextEditor,
  Pagination,
} from "views/components/UI";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import * as data from "../../data";

import ModalNewInvoicingCondition from "../modal/modal-new-invoicing-condition/ModalNewInvoicingCondition";
import ModalNewRelatedCondition from "../modal/modal-new-related-customer/ModalNewRelatedCustomer";
import ModalNewRelatedFile from "../modal/modal-new-related-file/ModalNewRelatedFile";
import TableNewCustomerSetting from "../table/table-new-customer-setting/TableNewCustomerSetting";
import { DeletePopUp } from "../delete";

import { selectCustomerCategories } from "selectors/select-options/CustomerNameSelector";
import IStore from "models/IStore";
import * as CustomerName from "stores/customer-name/CustomerNameActivityActions";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";
import * as CustomerPIC from "stores/customer-pic/CustomerPICActions";
import * as BrandSummary from "stores/brand-summary/BrandSummaryActivityActions";
import * as ServiceSummary from "stores/service-summary/ServiceSummaryActivityActions";
import * as InvoicingSchedule from "stores/invoicing-schedule/InvoicingScheduleActivityActions";
import * as InvoicingCondition from "stores/invoicing-condition/InvoicingConditionActivityActions";
import * as RelatedCustomer from "stores/related-customer/RelatedCustomerActivityActions";
import * as RelatedFile from "stores/related-file/RelatedFileActivityActions";
import * as SalesAssign from "stores/customer-sales/SalesAssignActivityActions";
import * as ConfigItem from "stores/config-item/ConfigItemActivityActions";
import * as CollectionHistory from "stores/collection-history/CollectionHistoryActivityActions";
import * as ProjectHistory from "stores/project-history/ProjectHistoryActivityActions";
import * as ToastsAction from "stores/toasts/ToastsAction";
import { selectCustomerPIC } from "selectors/customer-pic/CustomerPICSelectors";
import { selectBrandSummary } from "selectors/brand-summary/BrandSummarySelector";
import { selectServiceSummary } from "selectors/service-summary/ServiceSummarySelector";
import { selectInvoicingCondition } from "selectors/invoicing-condition/InvoicingConditionSelector";
import { selectRelatedCustomer } from "selectors/related-customer/RelatedCustomerSelector";
import { selectRelatedFile } from "selectors/related-file/RelatedFileSelector";
import {
  selectAccountOwner,
  selectSalesHistory,
} from "selectors/select-options/SalesAssignSelector";
import InvoicingScheduleModel from "stores/invoicing-schedule/models/InvoicingScheduleModel";
import SalesAssignPostModel from "stores/customer-sales/models/SalesAssignPostModel";
import CustomerSettingById from "stores/customer-setting/models/CustomerSettingById";
import ToastStatusEnum from "constants/ToastStatusEnum";
import { selectConfigItem } from "selectors/config-item/ConfigItemSelector";
import { selectCollectionHistory } from "selectors/collection-history/CollectionHistorySelector";
import { selectInvoicingSchedule } from "selectors/invoicing-schedule/InvoicingScheduleSelector";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectProjectHistory } from "selectors/project-history/ProjectHistorySelector";
import TableProjectHistory from "../table/table-project-history/TableProjectHistory";
import TableCollectionHistory from "../table/table-collection-history/TableCollectionHistory";
import ClaimReleaseButton from "../button/ClaimReleaseButton";
import CustomerSettingPutModel from "stores/customer-setting/models/CustomerSettingPutModel";
import ModalShowRejectReason from "../modal/modal-show-reject-reason/ModalShowRejectReason";

interface IProps {
  customer: {
    accountStatus: string;
    customerSettingID: number;
    customerID: number;
    shareable: boolean;
    named: boolean;
    pmoCustomer: boolean;
    customerCategory: string;
    customerName: string;
    customerAddress: string;
    blacklist: boolean;
    holdshipment: boolean;
    salesName: any;
    avgAR: number;
    shareableApprovalStatus?: any;
  };
  role: string;
}

interface routeParams {
  id: string;
}

const ViewEditCustomer: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { id } = useParams<routeParams>();
  const { customer, role } = props;
  const customerID = Number(id);

  /** Customer data */
  const accountStatus = customer.accountStatus;
  const shareableApprovalStatus = customer?.shareableApprovalStatus;
  const shareableRequestStatus = shareableApprovalStatus?.status?.toUpperCase();

  // get employeeName dari local storage
  // cek apakah employeeName memiliki customer ini
  let userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const employeeName = userLogin?.fullName;
  const salesArray: string[] = customer.salesName?.split(", ");
  const isEmployeeOwnCustomer: boolean = salesArray?.includes(employeeName);
  const isEmployeeRequestShareable: boolean =
    shareableApprovalStatus?.requestedBy == employeeName &&
    shareableRequestStatus == "PENDING";

  // customer category
  const [customerCategory, setCustomerCategory] = useState(
    customer.customerCategory
  );
  const customerCategoryOptions = useSelector((state: IStore) =>
    selectCustomerCategories(state)
  );

  const onSubmitCustCategory = async (e) => {};

  const onChangeCustomerCategory = (data: any) => {
    setCustomerCategory(data);
  };

  /** Handle dropdown data yang di-get */
  const [openPicList, setOpenPicList] = useState(false);
  const [openBrandSummary, setOpenBrandSummary] = useState(false);
  const [openServiceSummary, setOpenServiceSummary] = useState(false);
  const [openSalesHistory, setOpenSalesHistory] = useState(false);
  const [openProjectHistory, setOpenProjectHistory] = useState(false);
  const [openCollectionHistory, setOpenCollectionHistory] = useState(false);
  const [openConfigItem, setOpenConfigItem] = useState(false);

  const picData = useSelector((state: IStore) => selectCustomerPIC(state));
  const brandSummaryData = useSelector((state: IStore) =>
    selectBrandSummary(state)
  );
  const serviceSummaryData = useSelector((state: IStore) =>
    selectServiceSummary(state)
  );
  const salesHistoryData = useSelector((state: IStore) =>
    selectSalesHistory(state)
  );
  const configItemData = useSelector((state: IStore) =>
    selectConfigItem(state)
  );
  const collectionHistoryData = useSelector((state: IStore) =>
    selectCollectionHistory(state)
  );
  const projectHistoryData = useSelector((state: IStore) =>
    selectProjectHistory(state)
  );
  const accountOwnerData = useSelector((state: IStore) =>
    selectAccountOwner(state)
  );

  /** Project History */
  const [allHistoryData, setAllHistoryData] = useState(projectHistoryData);
  const [historyPageSize, setHistoryPageSize] = useState(5);
  const [historyActivePage, setHistoryActivePage] = useState(1);
  const [historyData, setHistoryData] = useState(
    allHistoryData.slice(0, historyPageSize)
  );

  // fungsi mengatur perubahan halaman project history
  const historyChangePage = (e, page) => {
    const startIndex = (page.activePage - 1) * historyPageSize;
    const endIndex = startIndex + historyPageSize;
    const paginatedData = allHistoryData.slice(startIndex, endIndex);

    setHistoryData(paginatedData);
    setHistoryActivePage(page.activePage);
  };

  const [searchText, setSearchText] = useState("");
  const [cancelBtn, setCancelBtn] = useState(false);

  const onChangeSearch = (event: any, data: any) => {
    setSearchText(data.value);
    if (data.value == "") {
      setCancelBtn(false);
    } else {
      setCancelBtn(true);
    }
  };

  // fungsi untuk mengatur pencarian
  const onSearch = () => {
    if (searchText.length === 0) {
      setAllHistoryData(projectHistoryData);
      setSearchText("");
      setCancelBtn(false);
    } else {
      if (searchText.length > 1) {
        setCancelBtn(true);
        const lowerKeyword = searchText.toLowerCase();

        const filteredArray = projectHistoryData.filter((item) =>
          Object.values(item).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(lowerKeyword)
          )
        );

        setAllHistoryData(filteredArray);
      }
    }
  };

  useEffect(() => {
    setHistoryData(allHistoryData.slice(0, historyPageSize));
    setHistoryActivePage(1);
  }, [allHistoryData]);

  const onClickedCancelButton = () => {
    setAllHistoryData(projectHistoryData);
    setSearchText("");
    setCancelBtn(false);
  };

  /** Config Item */
  const [allConfigData, setAllConfigData] = useState(configItemData);
  const [configPageSize, setConfigPageSize] = useState(5);
  const [configActivePage, setConfigActivePage] = useState(1);
  const [configData, setConfigData] = useState(
    allConfigData.slice(0, configPageSize)
  );

  // fungsi mengatur perubahan halaman config item
  const configChangePage = (e, page) => {
    const startIndex = (page.activePage - 1) * historyPageSize;
    const endIndex = startIndex + historyPageSize;
    const paginatedData = allConfigData.slice(startIndex, endIndex);

    setConfigData(paginatedData);
    setConfigActivePage(page.activePage);
  };

  useEffect(() => {
    setConfigData(allConfigData.slice(0, configPageSize));
    setConfigActivePage(1);
  }, [allConfigData]);

  /** Add setting */
  const [pmoCustomer, setPmoCustomer] = useState(
    customer.pmoCustomer ? "TRUE" : "FALSE"
  );

  const handlePmoCustomer = () => {
    if (pmoCustomer == "FALSE") {
      setPmoCustomer("TRUE");
    } else {
      setPmoCustomer("FALSE");
    }
  };

  /** Invoicing schedule */
  const invoicingSchedule = useSelector((state: IStore) =>
    selectInvoicingSchedule(state)
  );

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [daysArray, setDaysArray] = useState(
    invoicingSchedule.scheduleDays?.split(", ") || []
  );

  const checkDay = (day) => {
    const isDaySelected = daysArray.includes(day);

    if (isDaySelected) {
      setDaysArray(daysArray.filter((selectedDay) => selectedDay !== day));
    } else {
      setDaysArray([...daysArray, day]);
    }
  };

  const [minDate, setMinDate] = useState(invoicingSchedule.minDate || 0);
  const [maxDate, setMaxDate] = useState(invoicingSchedule.maxDate || 0);
  const [remark, setRemark] = useState(invoicingSchedule.remark || "");

  const onSubmitCustomerSettingHandler = async (values) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));

    const PutCustomerSetting = new CustomerSettingPutModel({});
    PutCustomerSetting.customerID = customer.customerID;
    PutCustomerSetting.customerCategory = customerCategory;
    PutCustomerSetting.pmoCustomer = pmoCustomer == "TRUE" ? true : false;

    await dispatch(
      CustomerSetting.putCustomerSettingCategoryPmo(
        PutCustomerSetting,
        customer.customerID
      )
    );

    /** post invoicing schedule */
    let remark = values.remark;

    if (Object.keys(invoicingSchedule).length == 0) {
      const NewInvoicingSchedule = new InvoicingScheduleModel({});
      NewInvoicingSchedule.iScheduleID = 0;
      NewInvoicingSchedule.customerID = customer.customerID;
      NewInvoicingSchedule.scheduleDays = daysArray.join(", ");
      NewInvoicingSchedule.remark = remark;
      NewInvoicingSchedule.minDate = minDate;
      NewInvoicingSchedule.maxDate = maxDate;
      NewInvoicingSchedule.createUserID = userLogin?.employeeID || null;
      NewInvoicingSchedule.modifyUserID = userLogin?.employeeID || null;

      await dispatch(
        InvoicingSchedule.postInvoicingSchedule(NewInvoicingSchedule)
      );
    } else {
      const UpdateInvoicingSchedule = new InvoicingScheduleModel({});
      UpdateInvoicingSchedule.iScheduleID = invoicingSchedule.scheduleID;
      UpdateInvoicingSchedule.customerID = customer.customerID;
      UpdateInvoicingSchedule.scheduleDays = daysArray.join(", ");
      UpdateInvoicingSchedule.remark = remark;
      UpdateInvoicingSchedule.minDate = minDate;
      UpdateInvoicingSchedule.maxDate = maxDate;
      UpdateInvoicingSchedule.createUserID = invoicingSchedule.createUserID;
      UpdateInvoicingSchedule.modifyUserID = userLogin?.employeeID || null;

      await dispatch(
        InvoicingSchedule.putInvoicingSchedule(
          UpdateInvoicingSchedule,
          invoicingSchedule.scheduleID
        )
      );
    }

    await dispatch(
      CustomerSetting.requestCustomerDataById(customer.customerID)
    );
    await dispatch(
      InvoicingSchedule.requestInvoicingSchedule(customer.customerID)
    );
    await dispatch(
      ToastsAction.add(
        "Edit customer setting data success!",
        ToastStatusEnum.Success
      )
    );
  };

  /** Invoicing requirement */
  const onAddInvoicingCondition = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewInvoicingCondition customerSettingID={customer.customerID} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  const invoicingConditionData = useSelector((state: IStore) =>
    selectInvoicingCondition(state)
  );

  const deleteInvoicingCondition = useCallback(
    (idToDel: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={InvoicingCondition.deleteInvoicingCondition}
            refreshFunc={InvoicingCondition.requestInvoicingCondition}
            id={idToDel}
            customerSettingID={customer.customerID}
            content="invoicing condition"
          />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch]
  );

  /** Project Type dan Invoicing Condition */
  const [projectType, setProjectType] = useState("");
  const [allDataInvoicingCondition, setAllDataInvoicingCondition] = useState(
    invoicingConditionData || []
  );
  const projectTypeData = [
    {
      text: "Manage Operation",
      value: "Manage Operation",
    },
    {
      text: "Manage Service",
      value: "Manage Service",
    },
    {
      text: "Project Type",
      value: "Project Type",
    },
  ];

  const onChangeProjectType = (data: any): any => {
    setProjectType(data);

    if (data != "") {
      const filteredArray = allDataInvoicingCondition.filter(
        (item) => item.projectType.toLowerCase() == data.toLowerCase()
      );

      setAllDataInvoicingCondition(filteredArray);
    } else {
      setAllDataInvoicingCondition(invoicingConditionData);
    }
  };

  const onSubmitData = (data) => {};

  /** Related customer */
  const onAddRelatedCustomer = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewRelatedCondition customerID={customer.customerID} />,
        ModalSizeEnum.Tiny
      )
    );
  }, [dispatch]);

  const relatedCustomerData = useSelector((state: IStore) =>
    selectRelatedCustomer(state)
  );

  const deleteRelatedCustomer = useCallback(
    (idToDel: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={RelatedCustomer.deleteRelatedCustomer}
            refreshFunc={RelatedCustomer.requestRelatedCustomer}
            id={idToDel}
            customerSettingID={customer.customerID}
            content="related customer"
          />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch]
  );

  /** RelatedFile */
  const onAddRelatedFile = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewRelatedFile customerID={customer.customerID} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  const relatedFileData = useSelector((state: IStore) =>
    selectRelatedFile(state)
  );

  const deleteRelatedFile = useCallback(
    (idToDel: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={RelatedFile.deleteRelatedFile}
            refreshFunc={RelatedFile.requestRelatedFile}
            id={idToDel}
            customerSettingID={customer.customerID}
            content="related file"
          />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch]
  );

  /** data yang perlu di get */
  useEffect(() => {
    if (customer.customerID != undefined) {
      dispatch(CustomerName.requestCustomerCategory());

      dispatch(ConfigItem.requestConfigItem(customer.customerID));
      dispatch(CollectionHistory.requestCollectionHistory(customer.customerID));
      dispatch(CustomerPIC.requestGetCustomerPIC(customer.customerID));
      dispatch(BrandSummary.requestBrandSummary(customer.customerID));
      dispatch(ServiceSummary.requestServiceSummary(customer.customerID));
      dispatch(ProjectHistory.requestProjectHistory(customer.customerID));
      dispatch(SalesAssign.requestAccountOwner(customer.customerID));
      dispatch(SalesAssign.requestSalesHistory(customer.customerID));

      dispatch(InvoicingSchedule.requestInvoicingSchedule(customer.customerID));
      dispatch(
        InvoicingCondition.requestInvoicingCondition(customer.customerID)
      );
      dispatch(RelatedCustomer.requestRelatedCustomer(customer.customerID));
      dispatch(RelatedFile.requestRelatedFile(customer.customerID));
      setPmoCustomer(customer.pmoCustomer ? "TRUE" : "FALSE");
    }
  }, [dispatch, customer]);

  useEffect(() => {
    if (projectHistoryData.length > 0) {
      setAllHistoryData(projectHistoryData);
    }

    if (Object.keys(invoicingConditionData).length != 0) {
      setAllDataInvoicingCondition(invoicingConditionData);
    }

    if (Object.keys(invoicingSchedule).length != 0) {
      if (invoicingSchedule.scheduleDays == "") {
        setDaysArray([]);
      } else {
        setDaysArray(invoicingSchedule.scheduleDays.split(", "));
      }
      setMinDate(invoicingSchedule.minDate);
      setMaxDate(invoicingSchedule.maxDate);
      setRemark(invoicingSchedule.remark);
    }
  }, [invoicingSchedule, invoicingConditionData, projectHistoryData, customer]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      InvoicingCondition.REQUEST_GET_INVOICING_CONDITION,
      RelatedFile.REQUEST_GET_RELATED_FILE,
      SalesAssign.REQUEST_SALES_HISTORY,
      InvoicingSchedule.REQUEST_GET_INVOICING_SCHEDULE,
      CustomerSetting.REQUEST_CUSTOMER_DATA_BY_CUSTOMER_ID,
      ConfigItem.REQUEST_GET_CONFIG_ITEM,
      CollectionHistory.REQUEST_GET_COLLECTION_HISTORY,
      CustomerPIC.REQUEST_GET_CUSTOMER_PIC,
      BrandSummary.REQUEST_GET_BRAND_SUMMARY,
      ServiceSummary.REQUEST_GET_SERVICE_SUMMARY,
      ProjectHistory.REQUEST_GET_PROJECT_HISTORY,
    ])
  );

  /** mengatur style dan fungsionalitas status approval */
  const firstDivRef = useRef(null);
  const secondDivRef = useRef(null);
  const hrRef = useRef(null);

  const statusDivRef = useRef(null);
  const linkRef = useRef(null);

  // state untuk membuka dan menutup status approval
  const [showStatus, setShowStatus] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const firstDivElement = firstDivRef.current;
    const secondDivElement = secondDivRef.current;

    if (firstDivElement && secondDivElement) {
      const firstElementWidth = firstDivElement.offsetWidth;
      const secondElementWidth = secondDivElement.offsetWidth;

      hrRef.current.style.paddingLeft = `calc(${firstElementWidth /
        2}px + 5.5em)`;
      hrRef.current.style.paddingRight = `calc(${secondElementWidth /
        2}px + 5.5em)`;
    }

    const statusDivElement = statusDivRef.current;

    if (statusDivElement) {
      const statusElementHeight = statusDivElement.offsetHeight;
      linkRef.current.style.marginTop = `calc(${statusElementHeight}px + 1em)`;
    }

    const navbarElement = document.querySelector(
      ".DisInlineBlock"
    ) as HTMLElement;

    if (navbarElement) {
      const navbarHeight = navbarElement.offsetHeight;
      setNavbarHeight(navbarHeight);
    }
  }, [setNavbarHeight, showStatus]);

  const openReason = useCallback(
    (desc: string): void => {
      console.log(desc);
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalShowRejectReason description={desc} />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch]
  );

  return (
    <Fragment>
      {shareableApprovalStatus.length != 0 && (
        <div ref={statusDivRef} className="status-approval-container">
          <div
            className="status-container"
            style={{
              opacity: showStatus ? 1 : 0,
              transform: `translateY(${({ showStatus }) =>
                showStatus ? "0" : "-50px"})`,
              display: showStatus ? "block" : "none",
            }}
          >
            <h4>Shareable Account Approval</h4>
            <div className="space-between-container">
              <div ref={firstDivRef} className="information-container">
                <div className="circle-information"></div>
                <p className="margin-0">Request By</p>
                <p className="margin-0" style={{ fontWeight: "bold" }}>
                  {shareableApprovalStatus?.requestedBy}
                </p>
                <span style={{ color: "grey" }}>
                  <Icon name="check circle" style={{ color: "#27D4A5" }} />
                  {shareableApprovalStatus?.requestedDate}
                </span>
              </div>

              <div ref={secondDivRef} className="information-container">
                <div className="circle-information"></div>
                <p className="margin-0">
                  {shareableRequestStatus == "PENDING"
                    ? "Waiting Approval By"
                    : shareableRequestStatus == "APPROVED"
                    ? "Approved By"
                    : "Rejected By"}
                </p>
                <p className="margin-0" style={{ fontWeight: "bold" }}>
                  {shareableApprovalStatus?.approvalBy}
                </p>
                <span style={{ color: "grey" }}>
                  {shareableRequestStatus == "PENDING" ? (
                    <>
                      <Icon
                        name="exclamation circle"
                        style={{ color: "#FFA800" }}
                      />{" "}
                      Waiting Approval{" "}
                    </>
                  ) : shareableRequestStatus == "APPROVED" ? (
                    <>
                      <Icon name="check circle" style={{ color: "#27D4A5" }} />{" "}
                      {shareableApprovalStatus?.approvalDate}
                    </>
                  ) : (
                    <>
                      <Icon name="remove circle" style={{ color: "red" }} />{" "}
                      Rejected,{" "}
                      <span
                        className="reject-text"
                        onClick={() =>
                          openReason(shareableApprovalStatus?.description)
                        }
                      >
                        Click to see the reason
                      </span>
                    </>
                  )}
                </span>
              </div>

              <div ref={hrRef} className="line-container">
                <hr className="line" />
              </div>
            </div>
          </div>
          <div
            className="purple-arrow-container"
            style={{
              marginTop: !showStatus ? `${navbarHeight}px` : `0`,
              cursor: "pointer",
            }}
            onClick={() => setShowStatus(!showStatus)}
          >
            <div className="purple-arrow">
              <span className="purple-arrow-text">
                {!showStatus ? "Approval Status" : ""}
                <Icon name="angle down" style={{ color: "white" }} />
              </span>
            </div>
          </div>
        </div>
      )}

      <div ref={linkRef}>
        <Link to="/customer-setting" className="link">
          {"< Back to Customer Setting List"}
        </Link>

        <div className="form-container">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="page-title grey">VIEW/EDIT CUSTOMER SETTING</p>
            <div className="pmo-toggle">
              <p style={{ margin: "0 1rem 0 0" }}>PMO customer</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p className="margin-0">OFF</p>
                <Checkbox
                  toggle
                  checked={pmoCustomer == "TRUE" ? true : false}
                  onChange={() => handlePmoCustomer()}
                  className="toggle-margin"
                  disabled={role.toUpperCase() == "SALES"}
                ></Checkbox>
                <p className="margin-0">ON</p>
              </div>
            </div>
          </div>

          <Divider></Divider>

          <LoadingIndicator isActive={isRequesting}>
            <div className="padding-horizontal customer-search-container">
              <div className="customer-data-container">
                <label
                  className="address-font-label"
                  style={{ textAlign: "left" }}
                >
                  Account Status
                </label>
                <Label
                  style={{
                    backgroundColor:
                      accountStatus == "Named Account"
                        ? "#656DD1"
                        : accountStatus == "No Name Account"
                        ? "#949AA1"
                        : "#27D4A5",
                    color: "white",
                  }}
                  className="boolean-container"
                >
                  <p>{accountStatus}</p>
                </Label>
              </div>

              <div className="customer-data-container">
                {role.toUpperCase() == "SALES" ? (
                  <>
                    <label className="customer-data-label">
                      Industry Classification
                    </label>
                    <p
                      style={{ fontSize: "24px", fontWeight: "bold" }}
                      className="grey"
                    >
                      {customer.customerCategory}
                    </p>
                  </>
                ) : (
                  <FinalForm
                    onSubmit={(values: any) => onSubmitCustCategory(values)}
                    render={({ handleSubmit, pristine, invalid }) => (
                      <Form onSubmit={handleSubmit}>
                        <Field
                          labelName="Industry Classification"
                          name="customerCategoryName"
                          component={DropdownClearInput}
                          placeholder="Choose category"
                          options={customerCategoryOptions}
                          onChanged={onChangeCustomerCategory}
                          values={customerCategory}
                          mandatory={true}
                        />
                      </Form>
                    )}
                  />
                )}
              </div>

              <div className="customer-data-container">
                <label className="customer-data-label">CustomerID</label>
                <p
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                  className="grey"
                >
                  {customer.customerID}
                </p>
              </div>

              <div className="customer-data-container">
                <label className="customer-data-label">Blacklist</label>
                <Label
                  color={customer.blacklist ? "red" : "teal"}
                  className="boolean-container"
                >
                  <Icon name="address book" />
                  {customer.blacklist ? "Yes" : "No"}
                </Label>
              </div>

              <div className="customer-data-container">
                <label className="customer-data-label">Holdshipment</label>
                <Label
                  color={customer.holdshipment ? "red" : "blue"}
                  className="boolean-container"
                >
                  <Icon name="truck" />
                  {customer.holdshipment ? "Yes" : "No"}
                </Label>
              </div>

              <div className="customer-data-container">
                <label className="customer-data-label">Avg. AR (days)</label>
                <p className="grey avgar-font">{customer.avgAR}</p>
              </div>
            </div>

            <div style={{ margin: "14px 0" }} className="padding-horizontal">
              <label
                className="address-font-label"
                style={{ textAlign: "left" }}
              >
                Customer Name
              </label>
              <p
                style={{ fontSize: "20px", fontWeight: "bold" }}
                className="grey"
              >
                {customer.customerName}
              </p>
            </div>

            <div style={{ margin: "14px 0" }} className="padding-horizontal">
              <label className="address-font-label">Address</label>
              <p style={{ fontSize: "20px" }} className="grey">
                {customer.customerAddress}
              </p>
            </div>

            <Divider></Divider>

            <div className="padding-horizontal title-button-row">
              <p className="grey margin-0 bold text-align-left">
                ACCOUNT OWNER SETTING
              </p>
              <ClaimReleaseButton
                customer={customer}
                accountStatus={accountStatus}
                isEmployeeOwnCustomer={isEmployeeOwnCustomer}
                isEmployeeRequestShareable={isEmployeeRequestShareable}
                role={role}
              />
            </div>

            <Divider></Divider>

            <div style={{}} className="padding-horizontal">
              <TableNewCustomerSetting
                data={accountOwnerData}
                header={data.accOwnerHeader}
                sequenceNum={true}
              />
            </div>
            <Divider></Divider>

            {customer.customerID != undefined && (
              <>
                {/* data get mengenai customer */}
                <div className="padding-horizontal">
                  <div className="grey get-data-container">
                    <div
                      className="accordion-container"
                      onClick={() => setOpenPicList(!openPicList)}
                    >
                      <span className="bold">CUSTOMER PIC LIST</span>
                      {openPicList ? (
                        <Icon name="triangle down" />
                      ) : (
                        <Icon name="triangle right" />
                      )}
                    </div>
                    <Divider className="margin-0"></Divider>

                    {openPicList && (
                      <>
                        <div className="table-container">
                          <TableNewCustomerSetting
                            data={picData}
                            header={data.picHeader}
                            sequenceNum={true}
                          />
                        </div>
                        <Divider className="margin-0"></Divider>
                      </>
                    )}

                    <div
                      className="accordion-container"
                      onClick={() => setOpenBrandSummary(!openBrandSummary)}
                    >
                      <span className="bold">BRAND SUMMARY</span>
                      {openBrandSummary ? (
                        <Icon name="triangle down" />
                      ) : (
                        <Icon name="triangle right" />
                      )}
                    </div>
                    <Divider className="margin-0"></Divider>

                    {openBrandSummary && (
                      <>
                        <div className="table-container">
                          <TableNewCustomerSetting
                            data={brandSummaryData}
                            header={data.brandHeader}
                            sequenceNum={true}
                          />
                        </div>
                        <Divider className="margin-0"></Divider>
                      </>
                    )}

                    <div
                      className="accordion-container"
                      onClick={() => setOpenServiceSummary(!openServiceSummary)}
                    >
                      <span className="bold">SERVICE SUMMARY</span>
                      {openServiceSummary ? (
                        <Icon name="triangle down" />
                      ) : (
                        <Icon name="triangle right" />
                      )}
                    </div>
                    <Divider className="margin-0"></Divider>

                    {openServiceSummary && (
                      <>
                        <div className="table-container">
                          <TableNewCustomerSetting
                            data={serviceSummaryData}
                            header={data.serviceHeader}
                            sequenceNum={true}
                          />
                        </div>
                        <Divider className="margin-0"></Divider>
                      </>
                    )}

                    <div
                      className="accordion-container"
                      onClick={() => setOpenSalesHistory(!openSalesHistory)}
                    >
                      <span className="bold">SALES ASSIGN HISTORY</span>
                      {openSalesHistory ? (
                        <Icon name="triangle down" />
                      ) : (
                        <Icon name="triangle right" />
                      )}
                    </div>
                    <Divider className="margin-0"></Divider>

                    {openSalesHistory && (
                      <>
                        <div className="table-container">
                          <TableNewCustomerSetting
                            data={salesHistoryData}
                            header={data.salesHistoryHeader}
                            sequenceNum={true}
                          />
                        </div>
                        <Divider className="margin-0"></Divider>
                      </>
                    )}

                    <div
                      className="accordion-container"
                      onClick={() => setOpenProjectHistory(!openProjectHistory)}
                    >
                      <span className="bold">PROJECT CUSTOMER HISTORY</span>
                      {openProjectHistory ? (
                        <Icon name="triangle down" />
                      ) : (
                        <Icon name="triangle right" />
                      )}
                    </div>
                    <Divider className="margin-0"></Divider>

                    {openProjectHistory && (
                      <>
                        <div className="table-container">
                          <div style={{ marginBottom: "1rem", width: "35%" }}>
                            <label className="customer-data-label">
                              Filter Search
                            </label>
                            <div className="project-history-search-container">
                              <Input
                                style={{ width: "100%", height: "2.5rem" }}
                                placeholder="Search..."
                                onChange={onChangeSearch}
                                onKeyPress={(event) => {
                                  if (event.charCode == 13) {
                                    onSearch();
                                  }
                                }}
                                value={searchText}
                              />
                              <div className="project-history-search-cancel">
                                {cancelBtn ? (
                                  <Icon
                                    name="cancel"
                                    onClick={onClickedCancelButton}
                                    className="project-history-search-cancel-icon"
                                  />
                                ) : (
                                  <Icon
                                    name="search"
                                    className="project-history-search-cancel-icon"
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <TableProjectHistory
                            data={historyData}
                            customerID={customer.customerID}
                            setOpenCollectionHistory={setOpenCollectionHistory}
                          />

                          <div style={{ marginTop: "1rem" }}>
                            <Pagination
                              activePage={historyActivePage}
                              onPageChange={(e, data) =>
                                historyChangePage(e, data)
                              }
                              totalPage={allHistoryData.length}
                              pageSize={historyPageSize}
                            />
                          </div>
                        </div>
                        <Divider className="margin-0"></Divider>
                      </>
                    )}

                    <div
                      className="accordion-container"
                      onClick={() =>
                        setOpenCollectionHistory(!openCollectionHistory)
                      }
                    >
                      <span className="bold">COLLECTION HISTORY</span>
                      {openCollectionHistory ? (
                        <Icon name="triangle down" />
                      ) : (
                        <Icon name="triangle right" />
                      )}
                    </div>
                    <Divider className="margin-0"></Divider>

                    {openCollectionHistory && (
                      <>
                        <div className="table-container">
                          <TableCollectionHistory
                            data={collectionHistoryData}
                          />
                        </div>
                        <Divider className="margin-0"></Divider>
                      </>
                    )}

                    <div
                      className="accordion-container"
                      onClick={() => setOpenConfigItem(!openConfigItem)}
                    >
                      <span className="bold">CONFIG ITEM</span>
                      {openConfigItem ? (
                        <Icon name="triangle down" />
                      ) : (
                        <Icon name="triangle right" />
                      )}
                    </div>

                    {openConfigItem && (
                      <>
                        <Divider className="margin-0"></Divider>
                        <div className="table-container">
                          <TableNewCustomerSetting
                            data={configData}
                            header={data.configItemHeader}
                            sequenceNum={false}
                          />
                          <div style={{ marginTop: "1rem" }}>
                            <Pagination
                              activePage={configActivePage}
                              onPageChange={(e, data) =>
                                configChangePage(e, data)
                              }
                              totalPage={allConfigData.length}
                              pageSize={configPageSize}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Divider></Divider>

                <p className="padding-horizontal grey margin-0 bold text-align-left">
                  INVOICING SCHEDULE SETTING
                </p>

                <Divider></Divider>

                <FinalForm
                  onSubmit={(values: any) =>
                    onSubmitCustomerSettingHandler(values)
                  }
                  render={({ handleSubmit, pristine, invalid }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="padding-horizontal">
                        <div>
                          <div style={{ marginBottom: "0.5rem" }}>
                            <label style={{ marginRight: "10px" }}>
                              Days
                              <label
                                style={{ color: "red" }}
                                className="mandatory"
                              >
                                {" "}
                                *
                              </label>
                            </label>
                          </div>
                          {role.toUpperCase() == "SALES" ? (
                            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                              {invoicingSchedule?.scheduleDays != null
                                ? invoicingSchedule?.scheduleDays
                                : "No data"}
                            </p>
                          ) : (
                            <div className="days-container">
                              {daysArray.length > 0 &&
                                days.map((day, index) => (
                                  <CheckboxInvoicing
                                    key={index}
                                    label={day}
                                    value={day}
                                    defaultChecked={
                                      daysArray?.find((p: any) =>
                                        p.includes(day)
                                      ) !== undefined ||
                                      daysArray?.find((p: any) =>
                                        p.includes("All days")
                                      ) !== undefined
                                    }
                                    style={{ marginRight: "1rem" }}
                                    onClick={() => checkDay(day)}
                                  />
                                ))}

                              {daysArray.length == 0 &&
                                days.map((day, index) => (
                                  <CheckboxInvoicing
                                    key={index}
                                    label={day}
                                    value={day}
                                    style={{ marginRight: "1rem" }}
                                    onClick={() => checkDay(day)}
                                  />
                                ))}
                            </div>
                          )}
                        </div>

                        <div className="invoicing-schedule-position">
                          <div className="date-range-container">
                            <p className="grey bold">
                              Invoicing Date Range{" "}
                              <span style={{ color: "red" }}>*</span>
                            </p>
                            <div className="date-range-container-input">
                              <div
                                className="date-range-input"
                                style={{ marginRight: "1rem" }}
                              >
                                <label htmlFor="minDate">Min. Date(Day)</label>
                                {role.toUpperCase() == "SALES" ? (
                                  <p
                                    style={{
                                      textAlign: "right",
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {minDate}
                                  </p>
                                ) : (
                                  <input
                                    name="minDate"
                                    type="number"
                                    value={minDate}
                                    onChange={(e) =>
                                      setMinDate(parseInt(e.target.value, 10))
                                    }
                                  />
                                )}
                              </div>
                              <div className="date-range-input">
                                <label htmlFor="maxDate">Max. Date(Day)</label>
                                {role.toUpperCase() == "SALES" ? (
                                  <p
                                    style={{
                                      textAlign: "right",
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {maxDate}
                                  </p>
                                ) : (
                                  <input
                                    name="maxDate"
                                    type="number"
                                    value={maxDate}
                                    onChange={(e) =>
                                      setMaxDate(parseInt(e.target.value, 10))
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div style={{ width: "100%" }}>
                            {role.toUpperCase() == "SALES" ? (
                              <>
                                <label className="customer-data-label">
                                  Remark
                                </label>
                                {remark ? (
                                  <div
                                    dangerouslySetInnerHTML={{ __html: remark }}
                                  />
                                ) : (
                                  <p>No data</p>
                                )}
                              </>
                            ) : (
                              <Field
                                name="remark"
                                component={RichTextEditor}
                                placeholder="e.g. Remark"
                                labelName="Remark"
                                value={remark}
                                defaultValue={remark}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <Divider></Divider>

                      <p className="padding-horizontal grey margin-0 bold text-align-left">
                        INVOICING CONDITION
                      </p>

                      <Divider></Divider>

                      <div className="padding-horizontal">
                        <div className="invoicing-condition-button">
                          <div style={{ width: "30%" }}>
                            <Field
                              name="projectType"
                              component={DropdownClearInput}
                              placeholder="Select project type"
                              labelName="Project Type"
                              options={projectTypeData}
                              values={projectType}
                              onChanged={onChangeProjectType}
                              mandatory={true}
                            />
                          </div>

                          <Button
                            color="yellow"
                            size="small"
                            type="button"
                            onClick={onAddInvoicingCondition}
                            disabled={role.toUpperCase() == "SALES"}
                          >
                            <Icon name="add" />
                            Add Invoicing Condition
                          </Button>
                        </div>

                        <Table striped>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>No</Table.HeaderCell>
                              <Table.HeaderCell>Action</Table.HeaderCell>
                              <Table.HeaderCell>Project Type</Table.HeaderCell>
                              <Table.HeaderCell>
                                Document Requirement
                              </Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {allDataInvoicingCondition.length == 0 ? (
                              <Table.Row>
                                <Table.Cell colSpan={16} textAlign="center">
                                  No data
                                </Table.Cell>
                              </Table.Row>
                            ) : (
                              allDataInvoicingCondition.map((data, index) => (
                                <Table.Row key={index}>
                                  <Table.Cell>{index + 1}</Table.Cell>
                                  <Table.Cell>
                                    <div
                                      className="trash-container"
                                      onClick={() =>
                                        role.toUpperCase() == "SALES"
                                          ? {}
                                          : deleteInvoicingCondition(
                                              data.conditionID
                                            )
                                      }
                                      style={{
                                        backgroundColor:
                                          role.toUpperCase() == "SALES"
                                            ? "#EDAB9A"
                                            : "#F97452",
                                      }}
                                    >
                                      <Icon
                                        className="trash-icon"
                                        name="trash alternate"
                                      />
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>{data.projectType}</Table.Cell>
                                  <Table.Cell>{data.documentName}</Table.Cell>
                                </Table.Row>
                              ))
                            )}
                          </Table.Body>
                        </Table>
                      </div>

                      <Divider></Divider>

                      <div className="padding-horizontal title-button-row">
                        <p className="grey margin-0 bold text-align-left">
                          RELATED CUSTOMER
                        </p>
                        <Button
                          color="yellow"
                          size="small"
                          type="button"
                          onClick={onAddRelatedCustomer}
                          disabled={role.toUpperCase() == "SALES"}
                        >
                          <Icon name="add" />
                          Add Related Customer
                        </Button>
                      </div>

                      <Divider></Divider>

                      <div className="padding-horizontal">
                        <Table striped>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>No</Table.HeaderCell>
                              <Table.HeaderCell>Action</Table.HeaderCell>
                              <Table.HeaderCell>Customer Name</Table.HeaderCell>
                              <Table.HeaderCell>Address</Table.HeaderCell>
                              <Table.HeaderCell>
                                Cust. Category
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                Avg. AR (Days)
                              </Table.HeaderCell>
                              <Table.HeaderCell>Blacklist</Table.HeaderCell>
                              <Table.HeaderCell>Holdshipment</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {relatedCustomerData.length == 0 ? (
                              <Table.Row>
                                <Table.Cell colSpan={16} textAlign="center">
                                  No data
                                </Table.Cell>
                              </Table.Row>
                            ) : (
                              relatedCustomerData.map((data, index) => (
                                <Table.Row key={index}>
                                  <Table.Cell>{index + 1}</Table.Cell>
                                  <Table.Cell>
                                    <div
                                      className="trash-container"
                                      onClick={() =>
                                        role.toUpperCase() == "SALES"
                                          ? {}
                                          : deleteRelatedCustomer(
                                              data.relatedID
                                            )
                                      }
                                      style={{
                                        backgroundColor:
                                          role.toUpperCase() == "SALES"
                                            ? "#EDAB9A"
                                            : "#F97452",
                                      }}
                                    >
                                      <Icon
                                        className="trash-icon"
                                        name="trash alternate"
                                      />
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>{data.customerName}</Table.Cell>
                                  <Table.Cell>{data.address}</Table.Cell>
                                  <Table.Cell>{data.category}</Table.Cell>
                                  <Table.Cell>{data.avgAR}</Table.Cell>
                                  <Table.Cell>
                                    <Label
                                      color={data.blacklist ? "red" : "teal"}
                                      className="boolean-container"
                                    >
                                      <Icon name="address book" />
                                      {data.blacklist ? "Yes" : "No"}
                                    </Label>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Label
                                      color={data.holdshipment ? "red" : "blue"}
                                      className="boolean-container"
                                    >
                                      <Icon name="truck" />
                                      {data.holdshipment ? "Yes" : "No"}
                                    </Label>
                                  </Table.Cell>
                                </Table.Row>
                              ))
                            )}
                          </Table.Body>
                        </Table>
                      </div>

                      <Divider></Divider>

                      <div className="padding-horizontal title-button-row">
                        <p className="grey margin-0 bold text-align-left">
                          UPLOAD RELATED FILE
                        </p>
                        <Button
                          color="yellow"
                          size="small"
                          type="button"
                          onClick={onAddRelatedFile}
                          disabled={role.toUpperCase() == "SALES"}
                        >
                          <Icon name="add" />
                          Add Related File
                        </Button>
                      </div>

                      <Divider></Divider>

                      <div style={{ padding: "0 2rem" }}>
                        <Table striped>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>No</Table.HeaderCell>
                              <Table.HeaderCell>Action</Table.HeaderCell>
                              <Table.HeaderCell>Document Name</Table.HeaderCell>
                              <Table.HeaderCell>Type</Table.HeaderCell>
                              <Table.HeaderCell>Upload Date</Table.HeaderCell>
                              <Table.HeaderCell>Upload By</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {relatedFileData.length == 0 ? (
                              <Table.Row>
                                <Table.Cell colSpan={16} textAlign="center">
                                  No data
                                </Table.Cell>
                              </Table.Row>
                            ) : (
                              relatedFileData.map((data, index) => (
                                <Table.Row key={index}>
                                  <Table.Cell>{index + 1}</Table.Cell>
                                  <Table.Cell>
                                    <div
                                      className="trash-container"
                                      onClick={() =>
                                        role.toUpperCase() == "SALES"
                                          ? {}
                                          : deleteRelatedFile(
                                              data.relatedFileID
                                            )
                                      }
                                      style={{
                                        backgroundColor:
                                          role.toUpperCase() == "SALES"
                                            ? "#EDAB9A"
                                            : "#F97452",
                                      }}
                                    >
                                      <Icon
                                        className="trash-icon"
                                        name="trash alternate"
                                      />
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>{data.documentName}</Table.Cell>
                                  <Table.Cell>{data.documentType}</Table.Cell>
                                  <Table.Cell>{data.uploadDate}</Table.Cell>
                                  <Table.Cell>{data.uploadBy}</Table.Cell>
                                </Table.Row>
                              ))
                            )}
                          </Table.Body>
                        </Table>
                      </div>

                      <Divider style={{ marginBottom: "0px" }}></Divider>
                      {role.toUpperCase() == "ADMIN" && (
                        <div className="button-container">
                          <div className="button-inner-container">
                            <Button
                              style={{ marginRight: "1rem" }}
                              type="button"
                            >
                              Cancel
                            </Button>
                            <Button color="blue" type="submit">
                              Submit
                            </Button>
                          </div>
                        </div>
                      )}
                    </Form>
                  )}
                />
              </>
            )}
          </LoadingIndicator>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewEditCustomer;
