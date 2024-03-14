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
import { selectFunnelServiceCatalogFirst } from 'selectors/funnel-service-catalog/FunnelServiceCatalogSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IFunnelServiceCatalogTableRow from 'selectors/funnel-service-catalog/models/IFunnelServiceCatalogTableRow';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface IProps {
  model: IFunnelServiceCatalogTableRow;
}
const FunnelServiceCatalogFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const { model } = props;

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onSubmitHandler = (values: any) => {
    const newItems = new FunnelServiceCatalogModel(values);
    newItems.createUserID = currentUser.employeeID;
    newItems.funnelSvcCatGenID = model.funnelSvcCatGenID;
    newItems.funnelGenID = model.funnelGenID;
    newItems.unitPrice = serviceCatalog.svcPrice;
    dispatch(FunnelServiceCatalogActions.putFunnelServiceCatalog(newItems));
  };

  const onChangeQty = (values: any) => {
    setQty(values);
    setTotalPrice(values * serviceCatalog.svcPrice);
  };

  const onChangeServiceCatalog = (values: any) => {
    dispatch(ServiceCatalogActions.requestServiceCatalogBrandModel(values));
    dispatch(ServiceCatalogActions.requestServiceCatalogById(values));
  };

  useEffect(() => {
    dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalogFirst(model.funnelSvcCatGenID));
    dispatch(ServiceCatalogActions.requestServiceCatalogByFunnel(model.funnelGenID));
    onChangeServiceCatalog(model.svcCatGenID);
  }, [dispatch]);

  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelServiceCatalog.refreshPage);
  const serviceCatalogOptions = useSelector((state: IStore) => selectServiceCatalogReffOptions(state));
  const selectSCBrandModelOptions = useSelector((state: IStore) => selectServiceCatalogBrandModel(state));
  const serviceCatalog = useSelector((state: IStore) => selectServiceCatalog(state));
  const funnelServiceCatalog = useSelector((state: IStore) => selectFunnelServiceCatalogFirst(state));

  if (bRefreshPage) {
    dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalog(model.funnelGenID, 1, 10));
    dispatch(FunnelActions.requestViewFunnelSellingById(model.funnelGenID));
    dispatch(ProductServiceActions.requestFunnelProductService(model.funnelGenID, 1, 10));
  }

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelServiceCatalogActions.REQUEST_FUNNEL_SERVICE_CATALOG, ServiceCatalogActions.REQUEST_SERVICE_CATALOGS])
  );

  const result = useSelector((state: IStore) => state.funnelSplit.ResultActions);
  useEffect(() => {
    if (result.bSuccess) {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Success));
      dispatch(ModalSecondLevelActions.CLOSE());
    } else {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Warning));
    }
  }, [result.bSuccess]);

  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={funnelServiceCatalog}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
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
                  options={selectSCBrandModelOptions}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column width={3}>
                <Field name="qty" component={NumberInput} placeholder="Qty" labelName="Qty" onChange={onChangeQty} />
              </Grid.Column>
              <Grid.Column>
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
              <Grid.Column>
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
              <Button color="blue" floated="right" content="Submit" />
              <Button type="button" floated="right" content="Cancel" />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelServiceCatalogFormEdit;
