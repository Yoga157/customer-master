import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Header, Segment, Icon, Grid, Button, Radio } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { SelectInput, RichTextEditor, NumberInput, TextInput } from 'views/components/UI';
import IStore from 'models/IStore';
import IFunnelServiceCatalogTableRow from 'selectors/funnel-service-catalog/models/IFunnelServiceCatalogTableRow';
import { selectTotalPriceFunnelSC } from 'selectors/funnel-service-catalog/FunnelServiceCatalogSelector';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import DiscountServiceModel from 'stores/funnel-service-catalog/models/DiscountServiceModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import roundTo from 'round-to';
import FunnelServiceDiscountModel from 'stores/funnel-product-service/models/FunnelServiceDiscountModel';
import * as ProductServiceAction from 'stores/funnel-product-service/ProductServiceActions';
import { initialValueState } from 'stores/customer-transfer/CustomerTransferReducer';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import axios from 'axios';
import environment from 'environment';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';

interface IProps {
  rowData: any;
}

interface IDiscountView {
  createUserID: number;
  discAmount: number;
  discPercent: number;
  discountStatus: string;
  funnelGenID: number;
  itemID: number;
  notes: string;
}

const ProductServiceDiscountForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [flagAwal, setFlagAwal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discAmount, setDiscAmount] = useState(0);
  const [discPercent, setDiscPercent] = useState(0);
  const [disableComponent, setDisableComponent] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [disabledPctg, setDisabledPctg] = useState(false);
  const [disabledAmount, setDisabledAmount] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [discountStatus, setDiscountStatus] = useState('APPROVED');
  const [discountObject, setDiscountObject] = useState<IDiscountView>({
    createUserID: 0,
    discAmount: 0,
    discPercent: 0,
    discountStatus: '',
    funnelGenID: 0,
    itemID: 0,
    notes: '',
  });
  useEffect(() => {
    console.log('discountprops', props);
    if (currentUser.role === 'Presales') {
      handleFetchDiscountValue();
    }
  }, []);

  const onSubmitHandler = (values: any) => {
    const newDiscount = new FunnelServiceDiscountModel({});
    newDiscount.createUserID = currentUser.employeeID.toString();
    newDiscount.funnelGenID = props.rowData.funnelGenID;
    newDiscount.discPercent = typeof values.discPercent == 'string' ? Number(values.discPercent) : values.discPercent;
    newDiscount.discAmount = typeof values.discAmount == 'string' ? Number(values.discAmount) : values.discAmount;
    newDiscount.itemID = props.rowData.itemID;
    if (currentUser.role == 'Sales') {
      newDiscount.discountStatus = 'NEW';
    } else {
      newDiscount.discountStatus = discountStatus;
    }
    newDiscount.notes = values.notes;
    dispatch(ProductServiceAction.requestDiscountService(newDiscount)).then(() => {
      dispatch(ModalFirstLevelActions.CLOSE());
      dispatch(ProductServiceAction.clearResult());
      dispatch(ProductServiceActions.requestFunnelProductService(+props.rowData.funnelGenID, 1, 5));
    });
  };

  const result = useSelector((state: IStore) => state.funnelProductService.refreshPage);

  if (result) {
    if (currentUser.role == 'Presales') {
      dispatch(ToastsAction.add('Approve Discount Success!', ToastStatusEnum.Success));
    } else {
      dispatch(ToastsAction.add('Request Discount Success!', ToastStatusEnum.Success));
    }
  }

  const onCancelHandler = () => {
    dispatch(ModalFirstLevelActions.CLOSE());
  };

  /* const onChangeDiscAmount = (values:any) => {
        setDiscAmount(values);
        setDiscPercent((values / totalPrice) * 100.00)
    } */

  const onChangeDiscAmount = (values: any) => {
    setDiscAmount(values);
    if (values > 0) {
      if (currentUser.role === 'Presales') {
        if (!flagAwal && disabledAmount === false) setDisabledPctg(true);
        if (disabledPctg) {
          setDiscPercent(Math.abs((values / props.rowData.orderingPrice) * 100));
        }
      } else {
        setDisabledPctg(true);
      }
      // setDisabledPctg(true);
      setTotalAmount(Math.abs(values - props.rowData.orderingPrice));
      // setDiscPercent(Math.abs(values / props.rowData.orderingPrice * 100));
    } else {
      setDisabledPctg(false);
      setTotalAmount(props.rowData.orderingPrice);
    }
    setFlagAwal(0);
  };

  const onChangeDiscPctg = (values: any) => {
    setDiscPercent(values);
    if (values > 0) {
      if (currentUser.role === 'Presales') {
        if (!disabledPctg) setDisabledAmount(true);
        if (disabledAmount) setDiscAmount(Math.abs((values / 100) * props.rowData.orderingPrice));
      } else {
        setDisabledAmount(true);
      }
      setTotalAmount(Math.abs((values / 100) * props.rowData.orderingPrice - props.rowData.orderingPrice));
    } else {
      setDisabledAmount(false);
      setTotalAmount(props.rowData.orderingPrice);
    }
  };

  const onChangeApproval = (e: any, data: any) => {
    //setDiscountStatus(values);
    setDiscountStatus(data.value);
  };

  const handleFetchDiscountValue = () => {
    setFlagAwal(1);
    const controllerName = `FunnelService/GetDiscView=${props.rowData.funnelGenID}?itemID=${props.rowData.itemID}`;
    axios.get(environment.api.funnel.replace(':controller', controllerName)).then((res) => {
      const { createUserID, discAmount, discPercent, discountStatus, funnelGenID, itemID, notes } = res.data.existing;
      setDiscPercent(discPercent);
      setDiscAmount(discAmount);

      setDiscountObject({
        createUserID,
        discAmount,
        discPercent,
        discountStatus,
        funnelGenID,
        itemID,
        notes,
      });
    });
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
              {currentUser.role == 'Sales' ? 'Ask for Discount' : 'Approved Discount'}
            </Header.Content>
          </Header>
          <Segment>
            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field
                    name="itemID"
                    component={TextInput}
                    placeholder="Item Name"
                    labelName="Item Name"
                    defaultValue={props.rowData.itemName}
                    disabled={true}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="totalPrice"
                    component={NumberInput}
                    placeholder="Total Price"
                    labelName="Total Price"
                    defaultValue={props.rowData.orderingPrice}
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
                    // disabled={disableComponent}
                    disabled={disabledPctg}
                    values={discPercent > 100 ? 100 : discPercent}
                  />
                </Grid.Column>
                <Grid.Column width={6}>
                  <Field
                    name="discAmount"
                    component={NumberInput}
                    placeholder="Discount Amount"
                    labelName="Discount Amount"
                    onChange={onChangeDiscAmount}
                    values={discAmount > props.rowData.orderingPrice ? props.rowData.orderingPrice : discAmount}
                    thousandSeparator={true}
                    disabled={disabledAmount}
                    //defaultValue={discountObject.discAmount.toString()}
                  />
                </Grid.Column>
                <Grid.Column width={6}>
                  <Field
                    name="grandTotal"
                    component={NumberInput}
                    placeholder="Grand Total"
                    labelName="Grand Total"
                    values={totalAmount === 0 ? '0' : totalAmount}
                    thousandSeparator={true}
                    disabled={true}
                    // defaultValue={discountObject.discAmount }
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field name="notes" component={RichTextEditor} placeholder="Notes" labelName="Notes" disabled={disableComponent} />
                </Grid.Column>
              </Grid.Row>
              {currentUser.role === 'Presales' && (
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

export default ProductServiceDiscountForm;
