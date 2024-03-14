import React, { useEffect, useState } from 'react';
import { Card, Divider, Form, Grid } from 'semantic-ui-react';
import { Field, Form as FinalForm } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'history';
import { Dispatch } from 'redux';
import moment from 'moment';

import { IConfigItemsProductTableRow } from 'selectors/config-items/models/IConfigItemsTable';
import ConfigItemPutETAByPMOModel from 'stores/config-items/models/ConfigItemPutETAByPMOModel';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { Button, DateInput, LabelName, CheckBoxInput } from 'views/components/UI';
import { selectConfigProduct } from 'selectors/config-items/ConfigItemSelector';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import UpdateETAModel from 'stores/config-items/models/UpdateETAModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './CIProductForm.module.scss';
import IStore from 'models/IStore';
import AlertConfirm from 'views/components/confirm/AlertConfirm';
import ModalSizeEnum from 'constants/ModalSizeEnum';

function CIProductForm({ rowData }: { rowData: IConfigItemsProductTableRow }) {
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [initialValues, setInitalValues] = useState({});
  const [startWarranty, setStartWarranty] = useState(null);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [ConfigItemsActions.PUT_PROJECT_PO, ConfigItemsActions.PUT_ARRIVAL_DATE_PN])
  );
  const search = useSelector((state: IStore) => state.configItems.listDataProjectPO.search);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const selectProjPO = useSelector((state: IStore) => state.configItems.selectProjPO);
  const product: any = useSelector((state: IStore) => selectConfigProduct(state));

  useEffect(() => {
    setInitalValues({
      ...initialValues,
      ...rowData,
      poNumber: selectProjPO,
      productNumber: rowData.productNumber,
      qty: rowData.quantityPO,
      etaByPMO: rowData.expectedArrivalDate,
    });
    setStartWarranty(rowData.startWarranty);
  }, [rowData, selectProjPO]);

  const onSubmitHandler = (values: any) => {
    let mssg = '';
    if (values.isAllProduct && values.isUpdateAllWarranty) {
      mssg = `<span class='bold-2'>This Changes will Update</span> <span class='bold-8'>All Eta & Warranty Date</span>
			<span class='bold-2'> of Config Items In This PO Number</span><br>
			<span class='bold-8'>${selectProjPO}</span>`;
    } else if (values.isAllProduct) {
      mssg = `<span class='bold-2'>This Changes will Update</span> <span class='bold-8'>All Eta</span>
			<span class='bold-2'> of Config Items In This PO Number</span><br>
			<span class='bold-8'>${selectProjPO}</span>`;
    } else if (values.isUpdateAllWarranty) {
      mssg = `<span class='bold-2'>This Changes will Update</span> <span class='bold-8'>All Warranty Date</span>
			<span class='bold-2'> of Config Items In This PO Number</span><br>
			<span class='bold-8'>${selectProjPO}</span>`;
    } else {
      mssg = `<span class='bold-2'>This Changes will Update</span> <span class='bold-8'>All Eta & Warranty Date</span>
      <span class='bold-2'> of Config Items In This Product Number</span><br>
			<span class='bold-8'>${rowData.productNumber}</span>`;
    }

    dispatch(
      ModalSecondLevelActions.OPEN(
        <AlertConfirm
          type={'confirm'}
          handleSave={() => handleUpdate(values)}
          handleCancle={() => dispatch(ModalSecondLevelActions.CLOSE())}
          content={{
            title: 'Are You Sure To Submit This Update?',
            body: mssg,
            // body: `<span class='bold-8'>test</span> <br> <span class='bold-2'>test</span>`,
          }}
        />,
        ModalSizeEnum.Mini
      )
    );
  };

  const handleUpdate = (values: any) => {
    const newItem = new ConfigItemPutETAByPMOModel({
      ...values,
      projectId: +state?.projectId,
      funnelGenId: +state?.funnelGenID,
      poNumber: selectProjPO,
      expectedArrivalDate: values.etaByPMO ? moment(values.etaByPMO).format('YYYY-MM-DDTHH:mm:ss.SSS') : null,
      startWarranty: values.startWarranty ? moment(values.startWarranty).format('YYYY-MM-DDTHH:mm:ss.SSS') : null,
      endWarranty: values.endWarranty ? moment(values.endWarranty).format('YYYY-MM-DDTHH:mm:ss.SSS') : null,
      isUpdateAllExpectedArrivalDate: values.isAllProduct ? true : false,
      isUpdateAllWarranty: values.isUpdateAllWarranty ? true : false,
      modifyDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
      modifyUserID: currentUser.employeeID,
    });

    dispatch(ConfigItemsActions.reqPutEtaBYPmo(newItem)).then(() => reGetData(values));
  };

  const reGetData = (values) => {
    dispatch(
      ConfigItemsActions.reqConfigItemsProduct(
        1,
        10,
        product.column,
        product.sorting,
        currentUser.employeeID,
        state?.projectId,
        state?.funnelGenID,
        selectProjPO
      )
    );

    dispatch(ConfigItemsActions.selectProjectPo(selectProjPO));
    dispatch(ConfigItemsActions.setActivePageProduct(1));

    if (search) {
      dispatch(
        ConfigItemsActions.reqConfigItemsProjectPOSearch(
          1,
          10,
          'poNumber',
          'descending',
          currentUser.employeeID,
          state?.projectId,
          state?.funnelGenID,
          search?.search as any
        )
      );
    } else {
      dispatch(
        ConfigItemsActions.reqConfigItemsProjectPO(1, 10, 'poNumber', 'descending', currentUser.employeeID, state?.projectId, state?.funnelGenID)
      );
    }

    dispatch(ModalSecondLevelActions.CLOSE());
    dispatch(ModalFirstLevelActions.CLOSE());
  };

  const validate = combineValidators({
    etaByPMO: isRequired('Eta By. PMO'),
    startWarranty: isRequired('Cust. Warranty Start Date'),
    endWarranty: isRequired('Cust. Warranty End Date'),
  });

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} className={styles.gundamForm}>
          <Card.Header>EDIT ETA BY PMO</Card.Header>
          <Divider />
          <Grid>
            <Grid.Row>
              <Grid.Column className="FullGrid767">
                <Field name="poNumber" component={LabelName} labelName="Po Number" placeholder="e.g. PO-NX0001/TX.." />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column className="pb-0">
                <Field name="productNumber" component={LabelName} labelName="Product Number" placeholder="e.g. XYZ-00042.." />
              </Grid.Column>
              <Grid.Column className="pb-0">
                <Field name="qty" component={LabelName} labelName="Quantity" placeholder="e.g. 909.." />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column className="pb-0" width={8}>
                <Field
                  name="etaByPMO"
                  component={DateInput}
                  labelName="Eta By. PMO"
                  placeholder="e.g.09/09/2022"
                  mandatory={false}
                  date={true}
                  dropUp={true}
                  // values={startDate}
                  // onChange={(e) => {
                  //   setStartDate(e);
                  //   setEndDate(new Date(moment(e).valueOf() + 24 * 60 * 60 * 1000));
                  // }}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column className="pb-0" width={12}>
                <Field name="isAllProduct" component={CheckBoxInput} label={`Change ETA to all products in this PONumber #${selectProjPO}`} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className="wrap-yellow-no-padding modal-tiny">
              <Grid.Column className="pb-0" width={8}>
                <Field
                  name="startWarranty"
                  component={DateInput}
                  labelName="Cust. Warranty Start Date"
                  placeholder="e.g.09/09/2022"
                  mandatory={false}
                  date={true}
                  dropUp={true}
                  onChange={(e) => setStartWarranty(e)}
                  // disabled={!requirmentClosingProject?.isAllowComplete}
                />
              </Grid.Column>
              <Grid.Column className="pb-0" width={8}>
                <Field
                  name="endWarranty"
                  component={DateInput}
                  labelName="Cust. Warranty End Date"
                  placeholder="e.g.09/09/2022"
                  mandatory={false}
                  date={true}
                  dropUp={true}
                  disabled={!startWarranty}
                  minDate={new Date(moment(startWarranty).valueOf() + 24 * 60 * 60 * 1000)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="wrap-yellow-no-padding modal-tiny">
              <Grid.Column className="pb-0" width={12}>
                <Field name="isUpdateAllWarranty" component={CheckBoxInput} label="Change warranty date to all products" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Column verticalAlign="middle" textAlign="center" className="mt-1r">
              <Button
                className=" mh-5"
                id="cancel"
                content={`Cancel`}
                style={{ color: '#656DD1' }}
                type="button"
                onClick={() => dispatch(ModalFirstLevelActions.CLOSE())}
                // icon="close"
                // loading={isRequesting || requesting}
                // disabled={disable || isRequesting || requesting}
              />

              <Button
                className=" mh-5"
                color="blue"
                // icon="save outline"
                content={`Submit`}
                loading={isRequesting}
                disabled={invalid || isRequesting}
              />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
}

export default CIProductForm;
