import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider, Segment, Header, Icon, Dropdown } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DateInput, NumberInput, RichTextEditor, SelectInput, TextInput } from 'views/components/UI';
import IStore from 'models/IStore';
import { selectBrandOptions, selectSubBrandOptions } from 'selectors/select-options';
import * as ResponseResolutionAction from 'stores/response-resolution/ResponseResolutionAction';
import * as PreventiveScheduleAction from 'stores/preventive-schedule/PreventiveScheduleAction';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import * as CoverageHourAction from 'stores/coverage-hour/CoverageHourAction';
import * as SubBrandActions from 'stores/brand-sub/SubBrandAction';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as BrandActions from 'stores/brand/BrandAction';
import * as BOQActions from 'stores/boq/BOQActions';
import { durationTypeOptions } from 'constants/durationTypeOptions';
import BoqModel from 'stores/boq/models/BoqModel';
import { selectBoq } from 'selectors/boq/BoqSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectCoverageHourOptions } from 'selectors/select-options/CoverageHourSelector';
import classes from './FunnelBOQForm.module.scss';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import { selectResponseResolutionOptions } from 'selectors/select-options/ResponseResolutionSelector';
import { selectPreventiveScheduleOptions } from 'selectors/select-options/PreventiveScheduleSelector';
import { combineValidators, isRequired } from 'revalidate';
import { selectBrandOptionsByProd } from 'selectors/select-options/BrandSelector';
import { selectSubBrandOptionsByProd } from 'selectors/select-options/BrandSubSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  funnelGenID: number;
  boqGenID: number;
}
const FunnelBOQForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [serialNumber, setSerialNumber] = useState('');
  const [quantity, setQuantity] = useState('0');

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [BOQActions.POST_BOQ, BOQActions.PUT_BOQ, BOQActions.REQUEST_BOQ])
  );
  const responseResolutionOptions = useSelector((state: IStore) => selectResponseResolutionOptions(state));
  const preventiveScheduleOptions = useSelector((state: IStore) => selectPreventiveScheduleOptions(state));
  const subBrandOptionsProd = useSelector((state: IStore) => selectSubBrandOptionsByProd(state));
  const coverageHourOptions = useSelector((state: IStore) => selectCoverageHourOptions(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelBoq.refreshPage);

  const brandOptionsProd = useSelector((state: IStore) => selectBrandOptionsByProd(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const subBrandOptions = useSelector((state: IStore) => selectSubBrandOptions(state));
  const brandOptions = useSelector((state: IStore) => selectBrandOptions(state));
  const boqStore = useSelector((state: IStore) => selectBoq(state));
  const [durationType, setDurationType] = useState('years');
  const [correctiveMaintenance, setCorrectiveMaintenance] = useState({
    bNotWarranty: true,
    sCoverageHour: 'N/A',
    sResolutionTimeType: 'N/A',
    sResponseTimeType: 'N/A',
  });

  const [preventiveMaintenance, setPreventiveMaintenance] = useState({
    bNotWarranty: true,
    sPreventiveSchedule: 'N/A',
  });

  useEffect(() => {
    dispatch(FunnelActions.requestViewFunnelCustomerById(+props.funnelGenID));
    dispatch(CoverageHourAction.requestCoverageHour());
    dispatch(ResponseResolutionAction.requestResponseResolution());
    dispatch(PreventiveScheduleAction.requestPreventiveSchedule());
    dispatch(BrandActions.requestBrandProd(+props.funnelGenID));
    if (props.boqGenID) {
      dispatch(BOQActions.requestBoqByBoqGenID(props.boqGenID));
    }
  }, [dispatch, props.boqGenID]);

  useEffect(() => {
    if (props.boqGenID) {
      setSerialNumber(boqStore.serialNumber);
      setQuantity(`${boqStore.qty}`);
    }
  }, [dispatch, boqStore]);

  if (bRefreshPage) {
    dispatch(BOQActions.requestBoqByFunnelGenID(props.funnelGenID, 1, 10));
    dispatch(ModalSecondLevelActions.CLOSE());
  }

  const onClose = () => {
    dispatch(ModalSecondLevelActions.CLOSE());
  };

  const onBrandChange = useCallback(
    (values: any, funnelGenID: number) => {
      dispatch(SubBrandActions.requestSubBrandProd(funnelGenID, values));
    },
    [dispatch]
  );

  const onSubmitHandler = (values: any) => {
    const newItems = new BoqModel(values);
    newItems.boqGenID = props.boqGenID;
    newItems.funnelGenID = props.funnelGenID;
    newItems.serialNumber = serialNumber;
    newItems.modifyUserID = currentUser.employeeID;
    newItems.createUserID = currentUser.employeeID;
    newItems.warrantyDurationType = durationType;

    newItems.coverageHour = values.coverageHour ? values.coverageHour : correctiveMaintenance.sCoverageHour;
    newItems.responseTimeType = values.responseTimeType ? values.responseTimeType : correctiveMaintenance.sResponseTimeType;
    newItems.resolutionTimeType = values.resolutionTimeType ? values.resolutionTimeType : correctiveMaintenance.sResolutionTimeType;

    if (!preventiveMaintenance.bNotWarranty) {
      newItems.preventiveSchedule = values.preventiveSchedule ? values.preventiveSchedule : preventiveMaintenance.sPreventiveSchedule;
    }

    if (newItems.boqGenID === 0) {
      dispatch(BOQActions.postBoq(newItems));
    } else {
      dispatch(BOQActions.putBoq(newItems));
    }
  };

  const onChangeDurationType = (e: any, data: any) => {
    setDurationType(data.value);
  };

  const onChangeWarranty = (e: any) => {
    let bValue: boolean = true;
    let sValue: string = 'N/A';
    if (e > 0) {
      bValue = false;
    } else {
      sValue = 'N/A';
    }
    setCorrectiveMaintenance({
      ...correctiveMaintenance,
      bNotWarranty: bValue,
      sCoverageHour: sValue,
      sResolutionTimeType: sValue,
      sResponseTimeType: sValue,
    });

    setPreventiveMaintenance({
      ...preventiveMaintenance,
      bNotWarranty: bValue,
      sPreventiveSchedule: sValue,
    });
  };

  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));

  const validate = combineValidators({
    qty: isRequired('Quantity'),
    brandID: isRequired('Brand'),
    subBrandID: isRequired('Sub Brand'),
    warranty: isRequired('Warranty'),
  });

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={props.boqGenID !== 0 && boqStore}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Card.Header>{props.boqGenID === 0 ? 'Add' : 'Update'} BOQ Item</Card.Header>
          <Divider></Divider>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column className="FullGrid767">
                <Segment className="LightGreyNotif">
                  <Grid>
                    <Grid.Row columns="equal">
                      <Grid.Column>
                        <Field name="productNumber" component={TextInput} placeholder="Product Number" labelName="Product Number" />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                      <Grid.Column>
                        <Field
                          name="serialNumber"
                          component={TextInput}
                          placeholder="Serial Number"
                          labelName="Serial Number"
                          onChange={(e) => {
                            setSerialNumber(e);
                            e ? setQuantity('1') : setQuantity(`${boqStore.qty}`);
                          }}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                      <Grid.Column>
                        <Field name="description" component={RichTextEditor} placeholder="Description" labelName="Description" />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                      <Grid.Column className="FullGrid1200">
                        <Field
                          name="brandID"
                          component={SelectInput}
                          placeholder="Brand"
                          labelName="Brand"
                          options={brandOptionsProd}
                          onChanged={(e) => onBrandChange(e, props.funnelGenID)}
                          mandatory={false}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid1200">
                        <Field
                          name="subBrandID"
                          component={SelectInput}
                          placeholder="Sub Brand"
                          labelName="Sub Brand"
                          options={subBrandOptionsProd}
                          mandatory={false}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid1200">
                        <Field
                          name="qty"
                          component={NumberInput}
                          placeholder="Quantity"
                          labelName="Quantity"
                          mandatory={false}
                          values={quantity}
                          onChange={(e) => setQuantity(e)}
                          isAllowed={serialNumber ? ({ floatValue }) => floatValue <= 1 : ({ floatValue }) => floatValue <= Number.MAX_VALUE}
                          allowNegative={false}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Header attached="top" textAlign="center" className={classes.Header}>
                  <Icon name="settings" />
                  <Header.Content>
                    <Header.Subheader className={classes.Subheader}>Corrective Maintenance</Header.Subheader>
                  </Header.Content>
                </Header>
                <Segment attached className={classes.borderless}>
                  <Grid>
                    <Grid.Row columns="equal">
                      <Grid.Column className="FullGrid1200" width={10}>
                        <Field
                          name="warranty"
                          component={TextInput}
                          placeholder="e.g.99"
                          labelName="Warranty"
                          onChange={onChangeWarranty}
                          textAlign="right"
                          type="number"
                          mandatory={false}
                          labeled={
                            <Dropdown
                              options={durationTypeOptions}
                              onChange={onChangeDurationType}
                              value={durationType === '' ? boqStore.warrantyDurationType : durationType}
                            />
                          }
                          labelPosition="right"
                          toolTipPosition="bottom center"
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid1200" width={6}>
                        <Field
                          name="coverageHour"
                          component={SelectInput}
                          placeholder="Coverage Hour"
                          labelName="Coverage Hour"
                          options={coverageHourOptions}
                          values={correctiveMaintenance.sCoverageHour}
                          disabled={correctiveMaintenance.bNotWarranty}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                      <Grid.Column className="FullGrid1200">
                        <Field
                          name="responseTimeType"
                          component={SelectInput}
                          placeholder="Response Time Type"
                          labelName="Response Time Type"
                          options={responseResolutionOptions}
                          values={correctiveMaintenance.sResponseTimeType}
                          disabled={correctiveMaintenance.bNotWarranty}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid1200">
                        <Field
                          name="responseTimeValue"
                          component={NumberInput}
                          placeholder="Response Time"
                          labelName="Response Time (Hours)"
                          disabled={correctiveMaintenance.bNotWarranty}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                      <Grid.Column className="FullGrid1200">
                        <Field
                          name="resolutionTimeType"
                          component={SelectInput}
                          placeholder="Resolution Time Type"
                          labelName="Resolution Time Type"
                          options={responseResolutionOptions}
                          values={correctiveMaintenance.sResolutionTimeType}
                          disabled={correctiveMaintenance.bNotWarranty}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid1200">
                        <Field
                          name="resolutionTimeValue"
                          component={NumberInput}
                          placeholder="Resolution Time"
                          labelName="Resolution Time (Hours)"
                          disabled={correctiveMaintenance.bNotWarranty}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                {viewFunnelCustomer.chkSMODeptID && (
                  <Fragment>
                    <Header attached="top" textAlign="center" className={classes.HeaderPreventive}>
                      <Icon name="settings" />
                      <Header.Content>
                        <Header.Subheader className={classes.Subheader}>Preventive Maintenance</Header.Subheader>
                      </Header.Content>
                    </Header>
                    <Segment attached className={classes.borderless}>
                      <Grid>
                        <Grid.Row columns="equal">
                          <Grid.Column className="FullGrid1200">
                            <Field
                              name="preventiveSchedule"
                              component={SelectInput}
                              placeholder="Preventive Schedule"
                              labelName="Preventive Schedule"
                              options={preventiveScheduleOptions}
                              values={preventiveMaintenance.sPreventiveSchedule}
                              disabled={preventiveMaintenance.bNotWarranty}
                            />
                          </Grid.Column>
                          <Grid.Column className="FullGrid1200">
                            <Field
                              name="preventiveDate"
                              component={DateInput}
                              placeholder="e.g.09/09/2020"
                              labelName="Preventive Date"
                              date={true}
                              disabled={preventiveMaintenance.bNotWarranty}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Fragment>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>{' '}
          <br />
          <Button
            color="blue"
            floated="right"
            content="Submit"
            disabled={
              // pristine ||
              invalid || isRequesting
            }
            loading={isRequesting}
          />
          <Button type="button" floated="right" content="Cancel" onClick={onClose} />
        </Form>
      )}
    />
  );
};

export default FunnelBOQForm;
