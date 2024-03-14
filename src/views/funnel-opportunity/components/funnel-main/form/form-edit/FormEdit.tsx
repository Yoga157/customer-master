import React, { useEffect, Fragment, useState, useCallback } from 'react';
import { SelectInput, TextInput, Button, SearchInput, RichTextEditor, Tooltips, DateInput, DateName } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider, DropdownProps, Dropdown } from 'semantic-ui-react';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectCustomerSearchOptions } from 'selectors/select-options/CustomerSelector';
import FunnelOpportunityRow from 'stores/funnel-opportunity/models/FunnelOpportunityRow';
import * as BrandActions from 'stores/brand/BrandAction';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { combineValidators, isRequired, composeValidators, createValidator } from 'revalidate';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectBrandOptions, selectSubBrandOptions, selectEmployeeOptions } from 'selectors/select-options';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { selectCustomerName, selectSalesName, selectDirektorat } from 'selectors/funnel-opportunity/FunnelOpportunitySelector';
import * as CustomerActions from 'stores/customer/CustomerActions';

import * as FunnelOpportunityA from 'stores/funnel-opportunity/FunnelActivityActions';
import { format } from 'date-fns';
import IOptionsData from 'selectors/select-options/models/IOptionsData';
import environtment from 'environment';
import axios from 'axios';

import * as EmployeeActions from 'stores/employee/EmployeeActions';

interface IProps {
  rowData: any;
}

const ProductForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [currentData, setCurrent] = useState({
    brandID: 0,
    createDate: '',
    createUserID: 0,
    customerGenID: 0,
    eventName: '',
    funnelID: 0,
    funnelOpportunityID: 0,
    modifyDate: '',
    modifyUserID: 0,
    notes: 'null',
    salesID: 0,
    status: '',
    eventDate: '' as any,
    direktorat: '',
  });
  const [customerName, setCustomerName] = useState(props.rowData.customerName);
  const [customerId, setCustomerId] = useState(0);
  const [eventName, setEvent] = useState(props.rowData.eventName);
  const [salesID, setSales] = useState('');
  const currentUser = useSelector((state: IStore) => selectUserResult(state));
  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchOptions(state));
  const result = useSelector((state: IStore) => state.funnelOpportunity.resultActions);
  const [direktorat, setDirektorat] = useState(0);
  
  const employeeOptions = useSelector((state: IStore) => selectEmployeeOptions(state));

  useEffect(() => {
    getCurrentData(props.rowData.funnelOpportunityID);
    dispatch(FunnelOpportunityA.requestDirektorat());
    dispatch(BrandActions.requestBrandByUserlogin(currentUser.employeeID.toString(), currentUser.direktoratID, ''));

    console.log(props);
    const brandName = document.querySelector(
      'body > div.ui.page.modals.dimmer.transition.visible.active > div > div > div:nth-child(3) > form > div > div:nth-child(2) > div.six.wide.column > div > div.ui.search.selection.dropdown > div.default.text'
    )! as HTMLInputElement;

    brandName.style.color = '#55637A';
    brandName.textContent = props.rowData.brand;
  }, []);

  useEffect(() => {
    if (result.message == 'Update Success!') {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Success));
    }
  }, [result.message]);

  const getCurrentData = (funnelOpportunityID: number) => {
    const endpoint = 'FunnelOpportunity/GetByOpportunityID?FunnelOpportunityID=' + funnelOpportunityID;
    axios
      .get(environtment.api.funnel.replace(':controller', endpoint))
      .then((res) => {
        setCurrent({
          brandID: res.data.brandID,
          createDate: res.data.createDate,
          createUserID: res.data.createUserID,
          customerGenID: res.data.customerGenID,
          eventName: res.data.eventName,
          funnelID: res.data.funnelID,
          funnelOpportunityID: res.data.funnelOpportunityID,
          modifyDate: res.data.modifyDate,
          modifyUserID: res.data.modifyUserID,
          notes: res.data.notes,
          salesID: res.data.salesID.toString(),
          status: res.data.status,
          eventDate: new Date(res.data.eventDate == null ? new Date() : res.data.eventDate),
          direktorat: res.data.direktorat,
        });
        dispatch(EmployeeActions.requestEmployeeByRole(27));
        //dispatch(FunnelOpportunityA.requestSales(props.rowData.customerName, Number(res.data.direktorat)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkSA = (customerName, dir) => {
    const endpoint = 'Employee/GetSalesByLastSA?Direktorat=' + dir + '&Customer=' + customerName;
    axios
      .get(environtment.api.generic.replace(':controller', endpoint))
      .then((res) => {
        console.log(res);
        if (res.data.employeeID !== 0) {
          setCurrent({ ...currentData, salesID: res.data.employeeID.toString() });
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

  const handleSearchChangeCust = useCallback(
    (data) => {
      setCustomerName(data);

      if (data.length >= 2) {
        dispatch(CustomerActions.requestCustomerByName(data));
      }
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
    const userId: any = localStorage.getItem('userLogin');
    const date = format(new Date(), 'MM-dd-yyyy');

    const FunnelOpportunity = new FunnelOpportunityRow({});
    FunnelOpportunity.funnelOpportunityID = props.rowData.funnelOpportunityID;
    FunnelOpportunity.funnelID = 0;
    FunnelOpportunity.eventName = e.eventName ?? props.rowData.eventName;
    FunnelOpportunity.brandID = e.brand == undefined ? Number(currentData.brandID) : Number(e.brand);
    FunnelOpportunity.salesID = e.salesID == undefined ? Number(currentData.salesID) : Number(e.salesID);
    FunnelOpportunity.status = '';
    FunnelOpportunity.brand = '';
    FunnelOpportunity.notes = e.notes == undefined ? currentData.notes : e.notes;
    FunnelOpportunity.customerGenID = Number(customerId) === 0 ? currentData.customerGenID : Number(customerId);
    FunnelOpportunity.createUserID = JSON.parse(userId).employeeID;
    FunnelOpportunity.createDate = date;
    FunnelOpportunity.eventDate = e.eventDate;

    dispatch(FunnelOpportunityA.putFunnelOpp(FunnelOpportunity)).then(() => {
      dispatch(ModalAction.CLOSE());
      dispatch(FunnelOpportunityA.requestFunnelOpp(1, 10, 'FunnelOpportunityID', 'ascending'));
      dispatch(FunnelOpportunityA.clearResult());
    });
  };

  // const validate = combineValidators({
  //     costType:isRequired('Item Name/Brand'),
  //     Amount: isRequired('Amount'),
  // })

  ///check if ExpenseSelected on local/server
  const onChangeDirektorat = (val) => {
    /*dispatch(FunnelOpportunityA.requestSales(customerName, val)).then(() => {
      setDirektorat(val);
      checkSA(customerName, val);
    });*/
    dispatch(EmployeeActions.requestEmployeeByRole(27));
    setDirektorat(val);
  };
  const direktoratOption: IOptionsData[] = useSelector((state: IStore) => selectDirektorat(state));

  const validate = combineValidators({
    eventName: isRequired('Event Name'),
    eventDate: isRequired('Event Date'),
  });
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE,
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL,
      BrandActions.REQUEST_BRAND,
    ])
  );
  const brandOptions = useSelector((state: IStore) => selectBrandOptions(state));
  // const result = useSelector((state:IStore) => state.funnelOpportunity.resultActions)
  // console.log(result.message)
  const custName: IOptionsData[] = useSelector((state: IStore) => selectCustomerName(state));
  //const Sales = useSelector((state: IStore) => selectSalesName(state));
  return (
    <Fragment>
      <Card.Header>Edit Opportunity</Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          initialValues={currentData}
          onSubmit={(values: any) => onSubmitHandler(values)}
          render={({ handleSubmit, pristine, invalid }) => (
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Field name="eventName" labelName="Event Name *" component={TextInput} placeholder="Event Name" />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column className="FullGrid767" width={10}>
                    <Field name="eventDate" component={DateName} placeholder="e.g.09/09/2020" labelName="Event Date *" date={true} />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={6}>
                    <Field
                      name="brand"
                      component={SelectInput}
                      placeholder="Brand *"
                      thousandSeparator={true}
                      labelName="Brand"
                      mandatory={false}
                      // onChange={onChangePrice}
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
                      labelName="Customer Name *"
                      handleSearchChange={handleSearchChangeCust}
                      onResultSelect={onResultSelectCustomer}
                      results={customerStoreSearch}
                      values={customerName}
                    />

                    <Field
                      name="direktorat"
                      component={SelectInput}
                      placeholder="e.g. Dept ID.."
                      // loading={isLoadingCustomer}
                      labelName="Dept ID *"
                      options={direktoratOption}
                      // defaultValue={currentData.direktorat}
                      onChanged={onChangeDirektorat}
                    />

                    <Field
                      name="salesID"
                      labelName="Sales Name *"
                      component={SelectInput}
                      placeholder="Sales Name"
                      options={employeeOptions}
                      defaultValue={currentData.salesID}
                    />
                  </Grid.Column>

                  <Grid.Column className="FullGrid767" width={6}>
                    <Field name="notes" component={RichTextEditor} placeholder="e.g. Notes" labelName="Notes" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>{' '}
              <br />
              <Button className="MarBot20" floated="right" type="submit" color="blue">
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

export default ProductForm;
