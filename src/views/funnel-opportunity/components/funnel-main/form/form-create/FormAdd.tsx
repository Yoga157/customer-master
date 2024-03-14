import React, { useEffect, Fragment, useState, useCallback } from "react";
import {
  SelectInput,
  TextInput,
  Button,
  SearchInput,
  RichTextEditor,
  Tooltips,
  DateInput,
  InfoInputEnter,
} from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Form,
  Grid,
  Card,
  Divider,
  DropdownProps,
  Dropdown,
} from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { selectCustomerSearchOptions } from "selectors/select-options/CustomerSelector";
import FunnelOpportunityRow from "stores/funnel-opportunity/models/FunnelOpportunityRow";
import * as BrandActions from "stores/brand/BrandAction";
import * as ProductServiceActions from "stores/funnel-product-service/ProductServiceActions";
import * as FunnelActions from "stores/funnel/FunnelActions";
import {
  combineValidators,
  isRequired,
  composeValidators,
  createValidator,
} from "revalidate";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import {
  selectBrandOptions,
  selectSubBrandOptions,
  selectEmployeeOptions,
} from "selectors/select-options";
import { selectUserResult } from "selectors/user/UserSelector";

import {
  selectCustomerName,
  selectSalesName,
  selectDirektorat,
} from "selectors/funnel-opportunity/FunnelOpportunitySelector";
import * as CustomerActions from "stores/customer/CustomerActions";

import * as FunnelOpportunityA from "stores/funnel-opportunity/FunnelActivityActions";
import { format } from "date-fns";
import IOptionsData from "selectors/select-options/models/IOptionsData";
import environtment from "environment";
import axios from "axios";
import * as ToastsAction from "stores/toasts/ToastsAction";
import ToastStatusEnum from "constants/ToastStatusEnum";

import * as EmployeeActions from "stores/employee/EmployeeActions";

interface IProps {
  funnelGenID: any;
  funnelItemsID: string;
  type: string;
}

const AddOpportunity: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [salesSA, setSalesSA] = useState("");
  const [salesSAID, setSalesSAID] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState(0);
  const [total, setTotal] = useState(0);
  const bRefreshPage: boolean = useSelector(
    (state: IStore) => state.funnelOpportunity.refreshPage
  );
  const currentUser = useSelector((state: IStore) => selectUserResult(state));
  const customerStoreSearch = useSelector((state: IStore) =>
    selectCustomerSearchOptions(state)
  );
  const employeeOptions = useSelector((state: IStore) =>
    selectEmployeeOptions(state)
  );
  const [currentData, setCurrent] = useState({
    brandID: 0,
    createDate: "",
    createUserID: 0,
    customerGenID: 0,
    eventName: "",
    funnelID: 0,
    funnelOpportunityID: 0,
    modifyDate: "",
    modifyUserID: 0,
    notes: "null",
    salesID: 0,
    status: "",
  });
  const [swapDrop, setSwap] = useState(false);
  const [direktorat, setDirektorat] = useState(0);
  const [direktoratString, setDirektoratString] = useState("");
  const result = useSelector(
    (state: IStore) => state.funnelOpportunity.resultActions
  );
  useEffect(() => {
    if (result.message == "Update Success!") {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Success));
    }
  }, [result.message]);

  useEffect(() => {
    dispatch(FunnelOpportunityA.requestDirektorat());
    dispatch(
      BrandActions.requestBrandByUserlogin(
        currentUser.employeeID.toString(),
        currentUser.direktoratID,
        ""
      )
    );
  }, []);

  const handleSearchChangeCust = useCallback(
    (data) => {
      setCustomerName(data);
    },
    [dispatch]
  );

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onChangeCustomer = (event: any) => {
    dispatch(FunnelOpportunityA.requestCustomers(event));
    console.log(event);
  };

  // const onSearch = (event) => {
  //     console.log(event)
  // }

  const onSubmitHandler = async (e) => {
    const userId: any = localStorage.getItem("userLogin");
    const date = format(new Date(), "yyyy-MM-dd");

    const FunnelOpportunity = new FunnelOpportunityRow(e);
    FunnelOpportunity.funnelOpportunityID = 0;
    FunnelOpportunity.funnelID = 0;
    FunnelOpportunity.eventName = e.eventName;
    FunnelOpportunity.brandID = e.brand;
    FunnelOpportunity.salesID =
      currentData.salesID != 0
        ? Number(currentData.salesID)
        : Number(e.salesName);
    FunnelOpportunity.status = "";
    FunnelOpportunity.brand = "";
    FunnelOpportunity.notes = e.notes;
    FunnelOpportunity.customerGenID = Number(customerId);
    FunnelOpportunity.createUserID = JSON.parse(userId).employeeID;
    FunnelOpportunity.createDate = date;

    dispatch(FunnelOpportunityA.postFunnelOpp(FunnelOpportunity)).then(() => {
      dispatch(ModalAction.CLOSE());
      dispatch(
        FunnelOpportunityA.requestFunnelOpp(
          1,
          10,
          "FunnelOpportunityID",
          "ascending"
        )
      );
      dispatch(FunnelOpportunityA.clearResult());
    });
  };

  const checkSA = (customerName, dir) => {
    const endpoint =
      "Employee/GetSalesByLastSA?Direktorat=" +
      dir +
      "&Customer=" +
      customerName;
    axios
      .get(environtment.api.generic.replace(":controller", endpoint))
      .then((res) => {
        console.log(res);
        if (res.data.employeeID !== 0) {
          setCurrent({
            ...currentData,
            salesID: res.data.employeeID.toString(),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onResultSelectCustomer = (data: any) => {
    setCustomerName(data.result.title);
    setCustomerId(data.result.price);
    /*dispatch(FunnelOpportunityA.requestSales(data.result.title, 1070000000)).then(() => {
      setDirektorat(1070000000);
      checkSA(data.result.title, 1070000000);
    });*/
    dispatch(EmployeeActions.requestEmployeeByRole(27));
  };

  const onChangeDirektorat = (val) => {
    /*dispatch(FunnelOpportunityA.requestSales(customerName, val)).then(() => {
      setDirektorat(val);
      checkSA(customerName, val);
    });*/
    dispatch(EmployeeActions.requestEmployeeByRole(27));
    setDirektorat(val);
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE,
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL,
      BrandActions.REQUEST_BRAND,
    ])
  );
  const brandOptions: IOptionsData[] = useSelector((state: IStore) =>
    selectBrandOptions(state)
  );
  const direktoratOption: IOptionsData[] = useSelector((state: IStore) =>
    selectDirektorat(state)
  );

  // const Sales = useSelector((state: IStore) => selectSalesName(state));
  //    const custName: IOptionsData[] = useSelector((state: IStore) => selectCustomerName(state))

  const isValidSalesName = createValidator(
    (message) => (value) => {
      if (value === 0) {
        return message;
      }
    },
    "Invalid Sales Name"
  );

  const isValidDeptID = createValidator(
    (message) => (value) => {
      if (value === 0) {
        return message;
      }
    },
    "Invalid Dept ID"
  );

  const validate = combineValidators({
    eventName: isRequired("Event Name"),
    eventDate: isRequired("Event Date"),
    brand: isRequired("Brand"),
    customerName: isRequired("Customer Name"),
    DeptID: composeValidators(isValidDeptID, isRequired("Dept ID"))(),
    salesName: composeValidators(isValidSalesName, isRequired("Sales Name"))(),
  });

  const currDate: string = format(new Date(), "cccc LLLL d, yyyy");

  return (
    <Fragment>
      <Card.Header>{props.type} Opportunity</Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          onSubmit={(values: any) => onSubmitHandler(values)}
          render={({ handleSubmit, pristine, invalid }) => (
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="eventName"
                      labelName="Event Name"
                      component={TextInput}
                      placeholder="Event Name"
                      mandatory={false}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column className="FullGrid767" width={10}>
                    <Field
                      name="eventDate"
                      component={DateInput}
                      placeholder="e.g.09/09/2020"
                      labelName="Event Date"
                      date={true}
                      mandatory={false}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={6}>
                    <Field
                      name="brand"
                      component={SelectInput}
                      placeholder="Brand"
                      thousandSeparator={true}
                      labelName="Brand"
                      mandatory={false}
                      options={brandOptions}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column className="FullGrid767" width={10}>
                    <Field
                      name="customerName"
                      component={SearchInput}
                      placeholder="e.g.PT. Customer .."
                      // loading={isLoadingCustomer}
                      labelName="Customer Name"
                      handleSearchChange={handleSearchChangeCust}
                      onResultSelect={onResultSelectCustomer}
                      results={customerStoreSearch}
                      values={customerName}
                      mandatory={false}
                      onKeyPress={(event) => {
                        if (event.charCode === 13) {
                          dispatch(
                            CustomerActions.requestCustomerByName(customerName)
                          );
                        }
                      }}
                    />
                    <InfoInputEnter />

                    <Field
                      name="DeptID"
                      component={SelectInput}
                      placeholder="e.g. Dept ID.."
                      // loading={isLoadingCustomer}
                      labelName="Dept ID"
                      options={direktoratOption}
                      defaultValue={direktorat.toString()}
                      onChanged={onChangeDirektorat}
                      disabled={customerName == ""}
                      mandatory={false}
                    />

                    <Field
                      name="salesName"
                      labelName="Sales Name"
                      component={SelectInput}
                      placeholder="Sales Name"
                      options={employeeOptions}
                      onChanged={(e) =>
                        setCurrent({ ...currentData, salesID: e })
                      }
                      defaultValue={currentData.salesID}
                      disabled={customerName == ""}
                      mandatory={false}
                    />
                  </Grid.Column>

                  <Grid.Column className="FullGrid767" width={6}>
                    <Field
                      name="notes"
                      component={RichTextEditor}
                      placeholder="e.g. Notes"
                      labelName="Notes"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>{" "}
              <br />
              <Button
                className="MarBot20"
                floated="right"
                type="submit"
                color="blue"
                disabled={
                  pristine ||
                  invalid ||
                  !customerStoreSearch?.find((e) => e.title === customerName)
                }
              >
                Save
              </Button>
              <Button floated="right" type="button" onClick={cancelClick}>
                Cancel
              </Button>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default AddOpportunity;
