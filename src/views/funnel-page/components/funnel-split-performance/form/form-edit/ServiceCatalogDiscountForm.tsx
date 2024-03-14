import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Header, Segment, Icon, Grid, Button, Radio } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { SelectInput, RichTextEditor, NumberInput } from 'views/components/UI';
import IStore from 'models/IStore';
import IFunnelServiceCatalogTableRow from 'selectors/funnel-service-catalog/models/IFunnelServiceCatalogTableRow';
import { selectFunnelServiceCatalog, selectTotalPriceFunnelSC } from 'selectors/funnel-service-catalog/FunnelServiceCatalogSelector';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import DiscountServiceModel from 'stores/funnel-service-catalog/models/DiscountServiceModel';
import * as FunnelServiceCatalogActions from 'stores/funnel-service-catalog/FunnelServiceCatalogActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import roundTo from 'round-to';

interface IProps {
  model: IFunnelServiceCatalogTableRow;
  type: string;
  grandTotalPrice: number;
}
const ServiceCatalogDiscountForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [svcCatGenID, setSvcCatGenID] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discAmount, setDiscAmount] = useState(0);
  const [discPercent, setDiscPercent] = useState(0);
  const [disableComponent, setDisableComponent] = useState(false);
  const [discountStatus, setDiscountStatus] = useState('APPROVED');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [disabledPctg, setDisabledPctg] = useState(false);
  const [disabledAmount, setDisabledAmount] = useState(false);

  const { model, type, grandTotalPrice } = props;

  const serviceReffOptions = [
    { key: 0, text: 'All', value: 0 },
    { key: 1, text: model.svcCatReffID, value: model.svcCatGenID },
  ];

  useEffect(() => {
    if (type === 'Approval') {
      setSvcCatGenID(model.svcCatGenID);
      setTotalPrice(model.totalPrice);
      setDisableComponent(true);
      setDiscPercent(model.discountPctg);
      setDiscAmount(model.discountAmount);
      setDisabledAmount(false);
    } else {
      setTotalPrice(model.totalPrice);
      setSvcCatGenID(model.svcCatGenID);
    }
  }, [type, model.totalPrice, model.discountPctg, model.discountAmount, model.svcCatGenID]);

  //const funnelServiceCatalog = useSelector((state:IStore) => selectFunnelServiceCatalog(state,[FunnelServiceCatalogActions.REQUEST_FUNNEL_SERVICE_CATALOG]));

  const onChangeServiceReff = (values: any) => {
    setSvcCatGenID(values);
    if (values !== 0) {
      setTotalPrice(model.totalPrice);
      if (type === 'Approval') {
        setDiscAmount((model.totalPrice * model.discountPctg) / 100.0);
      }
    } else {
      setTotalPrice(grandTotalPrice);
      if (type === 'Approval') {
        setDiscAmount((grandTotalPrice * model.discountPctg) / 100.0);
      }
    }
  };

  const onSubmitHandler = (values: any) => {
    const newItems = new DiscountServiceModel(values);

    newItems.funnelSvcCatGenID = model.funnelSvcCatGenID;
    newItems.svcCatGenID = svcCatGenID;
    //newItems.discPercent = (+discPercent > 0 ? +discPercent : ((newItems.discAmount / totalPrice) * 100.00)) ;
    newItems.funnelGenID = model.funnelGenID;
    newItems.createUserID = currentUser.employeeID.toString();

    //Hendz 05 Februari 2021 discPercent dan discAmount diinput salah satu
    if (type === 'Approval') {
      newItems.discountStatus = discountStatus;
      newItems.discPercent = roundTo((discAmount / totalPrice) * 100.0, 2);
      newItems.discAmount = +discAmount;
    } else {
      newItems.discountStatus = 'NEW';
      newItems.discPercent = +discPercent > 0 ? +discPercent : roundTo((discAmount / totalPrice) * 100.0, 2);
      newItems.discAmount = +discAmount > 0 ? +discAmount : roundTo((discPercent / 100.0) * totalPrice, 2);
    }

    dispatch(FunnelServiceCatalogActions.postRequestDiscount(newItems));
  };

  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelServiceCatalog.refreshPage);

  if (bRefreshPage) {
    dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalog(model.funnelGenID, 1, 10));
    dispatch(ModalSecondLevelActions.CLOSE());
  }

  const onCancelHandler = () => {
    dispatch(ModalSecondLevelActions.CLOSE());
  };

  /* const onChangeDiscAmount = (values:any) => {
        setDiscAmount(values);
        setDiscPercent((values / totalPrice) * 100.00)
    } */

  const onChangeDiscAmount = (values: any) => {
    setDiscAmount(values);
    if (type === 'Approval') {
      setDiscPercent((values / totalPrice) * 100.0);
    }

    if (values > 0) {
      setDisabledPctg(true);
    } else {
      setDisabledPctg(false);
    }
  };

  const onChangeDiscPctg = (values: any) => {
    setDiscPercent(values);
    if (type !== 'Approval') {
      if (values > 0) {
        setDisabledAmount(true);
      } else {
        setDisabledAmount(false);
      }
    }
  };

  /* const onChangeDiscPctg = (values:any) => {
        setDiscPercent(values);
        setDiscAmount((values * totalPrice) / 100)
    } */

  const onChangeApproval = (e: any, data: any) => {
    //setDiscountStatus(values);
    setDiscountStatus(data.value);
  };

  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={model}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Header>
            <Header.Content>
              <Icon name="talk" />
              {model.discountStatus === 'NEW' ? 'Approve' : 'Ask'} for discount service
            </Header.Content>
          </Header>
          <Segment>
            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field
                    name="svcCatGenID"
                    component={SelectInput}
                    placeholder="Service Reff"
                    labelName="Service Reff"
                    options={serviceReffOptions}
                    onChanged={onChangeServiceReff}
                    //disabled={disableComponent}
                    values={svcCatGenID}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="totalPrice"
                    component={NumberInput}
                    placeholder="Total Price"
                    labelName="Total Price"
                    values={props.type === 'AskDiscount' && svcCatGenID !== 0 ? 0 : totalPrice}
                    thousandSeparator={true}
                    disabled={true}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column width={4}>
                  <Field
                    name="discPercent"
                    component={NumberInput}
                    placeholder="Discount (%)"
                    labelName="Discount (%)"
                    onChange={onChangeDiscPctg}
                    values={props.type === 'AskDiscount' && svcCatGenID !== 0 ? 0 : discPercent}
                    // disabled={disableComponent}
                    disabled={disabledPctg}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="discAmount"
                    component={NumberInput}
                    placeholder="Discount Amount"
                    labelName="Discount Amount"
                    onChange={onChangeDiscAmount}
                    values={discAmount}
                    thousandSeparator={true}
                    disabled={type === 'Approval' ? false : disabledAmount}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field name="notes" component={RichTextEditor} placeholder="Notes" labelName="Notes" disabled={disableComponent} />
                </Grid.Column>
              </Grid.Row>
              {model.discountStatus === 'NEW' && (
                <Grid.Row columns="equal">
                  <Grid.Column>
                    <Radio name="approval" label="Approve" value="APPROVED" checked={discountStatus === 'APPROVED'} onChange={onChangeApproval} />
                  </Grid.Column>
                  <Grid.Column>
                    <Radio name="approval" label="Reject" value="REJECTED" checked={discountStatus === 'REJECTED'} onChange={onChangeApproval} />
                  </Grid.Column>
                </Grid.Row>
              )}
            </Grid>
          </Segment>
          <Grid columns="equal">
            <Grid.Column>
              <Button color="blue" floated="right" content="Submit" />
              <Button type="button" floated="right" content="Cancel" onClick={onCancelHandler} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default ServiceCatalogDiscountForm;
