import React, { useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Segment, Form, Grid, Card, Divider } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, SelectInput } from 'views/components/UI';
import WarrantySLACustomerForm from '../../../funnel-warranty-sla-customer/form/form-create/WarrantySLACustomerForm';
import WarrantySLAVendorForm from '../../../funnel-warranty-sla-vendor/form/form-create/WarrantySLAVendorForm';
import * as SubBrandActions from 'stores/brand-sub/SubBrandAction';
import { selectBrandOptions, selectSubBrandOptions } from 'selectors/select-options';
import * as BrandActions from 'stores/brand/BrandAction';
import IStore from 'models/IStore';
import { problemClassOptions } from 'constants/problemClassOptions';
import FunnelWarrantySLAsModel from 'stores/funnel-warranty/models/FunnelWarrantySLAsModel';
import FunnelWarrantySLAModel from 'stores/funnel-warranty/models/FunnelWarrantySLAModel';
import FunnelWarrantySLADetailModel from 'stores/funnel-warranty/models/FunnelWarrantySLADetailModel';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { selectWarrantySLA } from 'selectors/funnel-warranty-sla/FunnelWarrantySLASelector';

interface IProps {
  warrantySupportID: number;
  warrantySLAGenID: number;
}

const WarrantySLAForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelWarrantySLA.refreshPage);
  const { warrantySupportID, warrantySLAGenID } = props;

  const warrantyDetail: FunnelWarrantySLADetailModel[] = useSelector((state: IStore) => state.funnelWarrantySLA.listData.rows);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onSubmitHandler = (values: any) => {
    const warrantySLA = new FunnelWarrantySLAsModel();
    warrantySLA.SalesWarrantySLA = new FunnelWarrantySLAModel(values);
    warrantySLA.SalesWarrantySLA.warrantySLAGenID = 0;
    warrantySLA.SalesWarrantySLA.warrantySupportID = warrantySupportID;
    warrantySLA.SalesWarrantySLA.customerWarranty = values.pCustomer + '/' + values.lCustomer + '/' + values.oCustomer;
    warrantySLA.SalesWarrantySLA.vendorWarranty = values.pVendor + '/' + values.lVendor + '/' + values.oVendor;
    warrantySLA.SalesWarrantySLA.createUserID = currentUser.employeeID;

    warrantySLA.SalesWarrantySLADetail = warrantyDetail;

    dispatch(FunnelWarrantyActions.postWarrantySLA(warrantySLA));

    localStorage.removeItem('warrantySLA');

    dispatch(ModalSecondLevelActions.CLOSE());
  };

  useEffect(() => {
    dispatch(BrandActions.requestBrand());
    dispatch(FunnelWarrantyActions.requestWarrantySLAById(+warrantySLAGenID));
  }, [dispatch]);

  const brandOptions = useSelector((state: IStore) => selectBrandOptions(state));
  const subBrandOptions = useSelector((state: IStore) => selectSubBrandOptions(state));

  const warrantySLA = useSelector((state: IStore) => selectWarrantySLA(state));

  const onChangeBrand = (event: any) => {
    dispatch(SubBrandActions.requestSubBrand(event,''));
  };

  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={warrantySLA}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Card.Header>SLA Detail For Project</Card.Header>
          <Divider />

          <Segment className="LightGreyNotif">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="problemClassID"
                    component={SelectInput}
                    placeholder="Problem Class"
                    labelName="Problem Class"
                    options={problemClassOptions}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field
                    name="brandID"
                    component={SelectInput}
                    options={brandOptions}
                    onChanged={onChangeBrand}
                    placeholder="Brand"
                    labelName="Brand"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field name="subBrandID" component={SelectInput} options={subBrandOptions} placeholder="Sub Brand" labelName="Sub Brand" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment className="LightGreyNotif">
            <Card.Header>To Customer Warranty</Card.Header>
            <Divider />
            <WarrantySLACustomerForm />
          </Segment>
          <Segment className="LightGreyNotif">
            <Card.Header>Principhal/Vendor Warranty</Card.Header>
            <Divider />
            <WarrantySLAVendorForm />
          </Segment>
          <Grid columns="equal" padded>
            <Grid.Column>
              <Button color="blue" floated="right" content="Submit" />
              <Button floated="right" content="Cancel" />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default WarrantySLAForm;
