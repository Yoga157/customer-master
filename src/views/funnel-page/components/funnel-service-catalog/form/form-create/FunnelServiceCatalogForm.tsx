import React, { useCallback, useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Header, Segment, Icon, Grid, Card, Divider, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { TextInput, SelectInput, RichTextEditor, LabelInput, NumberInput, RadioButton } from 'views/components/UI';
import IStore from 'models/IStore';
import { selectServiceCatalogReffOptions } from 'selectors/select-options';
import * as ServiceCatalogActions from 'stores/service-catalog/ServiceCatalogActions';
import * as FunnelServiceCatalogActions from 'stores/funnel-service-catalog/FunnelServiceCatalogActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import { selectServiceCatalogBrandModel } from 'selectors/select-options/ServiceCatalogSelector';
import FunnelServiceCatalogModel from 'stores/funnel-service-catalog/models/FunnelServiceCatalogModel';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { selectServiceCatalog } from 'selectors/service-catalog/ServiceCatalogSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';
import { selectFunnelServiceCatalog, selectFunnelServiceCatalogFirst } from 'selectors/funnel-service-catalog/FunnelServiceCatalogSelector';

interface IProps {
  funnelGenID: number;
}
const FunnelServiceCatalogForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [brandModelGenID, setBrandModelGenID] = useState(0);
  const { funnelGenID } = props;

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onSubmitHandler = (values: any) => {
    const newItems = new FunnelServiceCatalogModel(values);
    newItems.createUserID = currentUser.employeeID;
    newItems.funnelSvcCatGenID = 0;
    newItems.funnelGenID = funnelGenID;
    newItems.unitPrice = serviceCatalog.svcPrice;
    newItems.brandModelGenID = brandModelGenID;
    dispatch(FunnelServiceCatalogActions.postFunnelServiceCatalog(newItems));
  };

  const onChangeQty = (values: any) => {
    if (values === '' || values === '0') values = 0;

    setQty(+values);
    setTotalPrice(+values * +serviceCatalog.svcPrice);
  };

  const onChangeServiceCatalog = (values: any) => {
    dispatch(ServiceCatalogActions.requestServiceCatalogBrandModel(values));
    dispatch(ServiceCatalogActions.requestServiceCatalogById(values));
  };

  useEffect(() => {
    dispatch(ServiceCatalogActions.requestServiceCatalogByFunnel(funnelGenID));
    dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalogFirst(0));
  }, [dispatch]);

  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelServiceCatalog.refreshPage);
  const serviceCatalogOptions = useSelector((state: IStore) => selectServiceCatalogReffOptions(state));
  const selectSCBrandModelOptions = useSelector((state: IStore) => selectServiceCatalogBrandModel(state));
  const funnelServiceCatalog = useSelector((state: IStore) => selectFunnelServiceCatalogFirst(state));
  const serviceCatalog = useSelector((state: IStore) => selectServiceCatalog(state));
  if (bRefreshPage) {
    dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalog(props.funnelGenID, 1, 10));
    dispatch(FunnelActions.requestViewFunnelSellingById(funnelGenID));
    dispatch(ProductServiceActions.requestFunnelProductService(funnelGenID, 1, 10));
    dispatch(ModalSecondLevelActions.CLOSE());
  }

  const validate = combineValidators({
    svcCatGenID: composeValidators(hasLengthGreaterThan(0)('Service'), isRequired('Service'))(),
    brandModelGenID: composeValidators(hasLengthGreaterThan(0)('Brand Model'), isRequired('Brand Model'))(),
    qty: composeValidators(hasLengthGreaterThan(0)('Qty'), isRequired('Qty'))(),
  });

  const validateAdditionalService = combineValidators({
    svcCatGenID: composeValidators(hasLengthGreaterThan(0)('Service'), isRequired('Service'))(),
    qty: composeValidators(hasLengthGreaterThan(0)('Qty'), isRequired('Qty'))(),
  });

  const onClose = () => {
    dispatch(ModalSecondLevelActions.CLOSE());
  };

  const onChangeBrandModel = (values: any) => {
    setBrandModelGenID(values);
  };

  return (
    <FinalForm
      validate={serviceCatalog.svcCatID === 48 ? validateAdditionalService : validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={funnelServiceCatalog}
      render={({ handleSubmit, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Card.Header>Service Catalog</Card.Header>
          <Divider />

          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="svcCatGenID"
                  component={SelectInput}
                  options={serviceCatalogOptions}
                  placeholder="Service Reff"
                  labelName="Service Reff"
                  onChanged={onChangeServiceCatalog}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="brandModelGenID"
                  component={SelectInput}
                  placeholder="Brand Model"
                  labelName="Brand Model"
                  values={brandModelGenID}
                  onChanged={onChangeBrandModel}
                  options={selectSCBrandModelOptions}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767" width={3}>
                <Field name="qty" component={NumberInput} placeholder="Qty" labelName="Qty" onChange={onChangeQty} />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="unitPrice"
                  component={NumberInput}
                  placeholder="Unit Price"
                  labelName="Unit Price"
                  thousandSeparator={true}
                  disabled={true}
                  values={serviceCatalog.svcPrice}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="totalPrice"
                  component={NumberInput}
                  placeholder="Total Price"
                  labelName="Total Price"
                  disabled={true}
                  values={totalPrice}
                  thousandSeparator={true}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field name="notes" component={RichTextEditor} placeholder="Notes" />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns="equal">
            <Grid.Column>
              <Button
                color="blue"
                floated="right"
                content="Submit"
                disabled={pristine || (serviceCatalog.svcCatID !== 48 && brandModelGenID === 0) || qty === 0}
              />
              <Button type="button" floated="right" content="Cancel" onClick={onClose} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelServiceCatalogForm;
