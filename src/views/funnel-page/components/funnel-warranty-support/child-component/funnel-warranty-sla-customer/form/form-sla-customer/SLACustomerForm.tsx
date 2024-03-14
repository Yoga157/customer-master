import React, { useEffect, useState, Fragment } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { TextInput, SelectInput, Button } from 'views/components/UI';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as BrandTypeAction from 'stores/brand-model/BrandTypeAction';
import FunnelWarrantySLADetailModel from 'stores/funnel-warranty/models/FunnelWarrantySLADetailModel';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectProductNumberOptions } from 'selectors/select-options';
import { combineValidators } from 'revalidate';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import * as BOQActions from 'stores/boq/BOQActions';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectViewFunnelStatus } from 'selectors/funnel/FunnelSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectWarrantySLADetail } from 'selectors/funnel-warranty-sla-customer/FunnelWarrantySLACustomerSelector';

interface IProps {
  warrantySLADetailID: number;
  warrantySLAGenID: number;
  type: string;
}

const validate = combineValidators({
  //brandID:isRequired('Brand'),
});

const SLACustomerForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage] = useState(1);
  const { warrantySLADetailID, warrantySLAGenID, type } = props;

  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelWarrantySLA.refreshPage);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelStatus(state));

  useEffect(() => {
    dispatch(BOQActions.requestBoqByFunnelGenID(viewFunnelCustomer.funnelGenID, 1, 5000));
    if (warrantySLAGenID > 0) {
      dispatch(FunnelWarrantyActions.requestWarrantySLADetailById(+warrantySLADetailID));
    } else {
      dispatch(FunnelWarrantyActions.requestSLADetailLocal(+warrantySLADetailID));
    }
    dispatch(EmployeeActions.requestEmployee());
  }, [dispatch, warrantySLADetailID]);

  const productNumberStore = useSelector((state: IStore) => selectProductNumberOptions(state));
  const warrantySLADetail = useSelector((state: IStore) => selectWarrantySLADetail(state));
  const cancelClick = () => {
    dispatch(ModalThirdLevelActions.CLOSE());
  };
  const onSubmitHandler = (values: FunnelWarrantySLADetailModel) => {
    values.slaType = 'Customer';
    values.warrantySLADetailID = warrantySLADetailID;
    values.createUserID = currentUser.employeeID;
    values.warrantySLAGenID = warrantySLAGenID;
    values.createDate = new Date();
    const newValues = new FunnelWarrantySLADetailModel(values);

    if (type === 'add') {
      if (warrantySLAGenID > 0) {
        dispatch(FunnelWarrantyActions.postWarrantySLADetail(newValues));
      } else {
        dispatch(FunnelWarrantyActions.postWarrantyDetailLocal(newValues));
      }
    } else {
      if (warrantySLAGenID > 0) {
        dispatch(FunnelWarrantyActions.putWarrantySLADetail(newValues));
      } else {
        dispatch(FunnelWarrantyActions.editWarrantySLADetailLocal(newValues, +warrantySLADetailID));
      }
    }
  };

  if (bRefreshPage) {
    if (warrantySLAGenID > 0) dispatch(FunnelWarrantyActions.requestFunnelWarrantyDetails(warrantySLAGenID, activePage, pageSize));
    else dispatch(FunnelWarrantyActions.requestWarrantyCustomerLocal());

    dispatch(ModalThirdLevelActions.CLOSE());
  }

  const submitting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [BrandTypeAction.POST_BRAND_MODEL, BrandTypeAction.PUT_BRAND_MODEL])
  );

  return (
    <Fragment>
      <Card.Header>Add SLA Data</Card.Header>
      <Divider />
      <FinalForm
        //validate={validate}
        onSubmit={(values: FunnelWarrantySLADetailModel) => onSubmitHandler(values)}
        initialValues={warrantySLADetail}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={submitting}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="productNumber"
                    component={SelectInput}
                    placeholder="e.g.Product Number"
                    labelName="Product Number"
                    options={productNumberStore}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="serviceLocation" labelName="Service Location" component={TextInput} placeholder="e.g.Service Location" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="coverageHour" labelName="Coverage Hour" component={TextInput} placeholder="e.g.Coverage Hour" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="responseTime" labelName="Response Time" component={TextInput} placeholder="e.g.Response Time" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="resolutionTime" labelName="Resolution Time" component={TextInput} placeholder="e.g.Resolution Time" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <br />
            <Button type="submit" color="blue" floated="right">
              Save
            </Button>
            <Button type="button" onClick={cancelClick} floated="right">
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default SLACustomerForm;
