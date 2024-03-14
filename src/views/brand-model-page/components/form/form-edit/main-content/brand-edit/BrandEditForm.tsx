import React, { useState, useEffect, Fragment } from "react";
import { Grid, Form, Segment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  SelectInput,
  TextInput,
  Button,
  Tooltips,
  DateInput,
} from "views/components/UI";
import { useSelector, useDispatch } from "react-redux";
import IStore from "models/IStore";
import { Dispatch } from "redux";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as BrandActions from "stores/brand/BrandAction";
import * as SubBrandActions from "stores/brand-sub/SubBrandAction";
import {
  selectBrandOptions,
  selectBrandOptionsByDate,
  selectSubBrandOptions,
} from "selectors/select-options";
import BrandTypeModel from "stores/brand-model/models/BrandTypeModel";
import { selectSubBrand } from "selectors/brand-sub/SubBrandSelector";
import * as BrandTypeAction from "stores/brand-model/BrandTypeAction";
import moment from "moment";
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  brandType: BrandTypeModel;
}

const BrandEditForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();

  const [disableComponent, setDisableComponent] = useState(true);
  const [createDate, setCreateDate] = useState("");
  const subBrand = useSelector((state: IStore) => selectSubBrand(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const DateNow = moment().format("yyyy-MM-DD");
  const [effDate, setEffDate] = useState(null);
  const [expDate, setExpDate] = useState(null);
  const { brandType } = props;

  useEffect(() => {
    if (brandType?.createDate) {
      const CovertString = brandType.createDate.toString();
      setCreateDate(moment(CovertString).format("yyyy-MM-DD"));
    }
  }, [brandType.createDate]);

  useEffect(()=>{
    if(brandType?.effectiveDate !== ""){
      setEffDate(new Date(brandType?.effectiveDate));
    }
    if(brandType?.expireDate !== ""){
      setExpDate(new Date(brandType?.expireDate));
    }
  }, [brandType])

  useEffect(() => {
    if (createDate !== "Invalid date") {
      dispatch(BrandActions.requestBrandDate(createDate));
    }
    if (brandType.brandID.toString() !== "NaN") {
      dispatch(SubBrandActions.requestSubBrand(brandType.brandID, ""));
    }
  }, [dispatch, brandType.brandID, createDate]);

  const brandStore = useSelector((state: IStore) => selectBrandOptions(state));
  const BrandDate = useSelector((state: IStore) =>
    selectBrandOptionsByDate(state)
  );

  const subBrandStore = useSelector((state: IStore) =>
    selectSubBrandOptions(state)
  );

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onChangeBrand = (event: any) => {
    if (event > 0) {
      dispatch(SubBrandActions.requestSubBrand(event, ""));
    }
  };

  const handleChangeEffDate = (e:any)=>{
    setEffDate(e);
  }
  const handleChangeExpDate = (e:any)=>{
    setExpDate(e);
  }

  const onSubmitHandler = (values: any) => {
    const newValues = new BrandTypeModel(values);

    newValues.brandModelGenID = Number(brandType.brandModelGenID);
    newValues.modelName = values.modelName;
    newValues.subBrandID = values.subBrandID;
    newValues.effectiveDate = moment(values.effectiveDate).format('yyyy-MM-DD');
    newValues.expireDate = moment(values.expireDate).format('yyyy-MM-DD');
    newValues.modifyUserID = currentUser.employeeID;
    newValues.modifyDate = new Date();
    dispatch(BrandTypeAction.putBrandModel(newValues));
    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      SubBrandActions.REQUEST_SUB_BRAND_BY_ID,
      BrandActions.REQUEST_BRAND,
    ])
  );

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(
        BrandTypeAction.requestBrandModelById(brandType.brandModelGenID)
      );
      setDisableComponent(true);
    }
  };

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={brandType}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Segment className="LightGreyNotif PadPmoNotif">
            <Grid className="p-1r">
              <Grid.Row>
                <Grid.Column>
                  {/* <Grid>
                    <Grid.Row className="pb-0">
                      <Grid.Column className="FullGrid767">
                        {disableComponent && (
                          <Tooltips
                            content="Edit Brand Details"
                            trigger={
                              <Button
                                basic
                                type="button"
                                compact
                                icon="edit"
                                onClick={(e: Event) => onHeaderSubmitHandler(e)}
                                floated="right"
                              />
                            }
                          />
                        )}
                        {!disableComponent && (
                          <Fragment>
                            <Tooltips
                              content="Save Update"
                              trigger={
                                <Button
                                  basic
                                  compact
                                  icon="save"
                                  floated="right"
                                />
                              }
                            />
                            <Tooltips
                              content="Cancel Update"
                              trigger={
                                <Button
                                  type="button"
                                  basic
                                  compact
                                  icon="cancel"
                                  floated="right"
                                  onClick={onCancel}
                                />
                              }
                            />
                          </Fragment>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid> */}
                  <Grid>
                    <Grid.Row columns={4}>
                      <Grid.Column className="ViewLabel FullGrid767">
                        <Field
                          name="brandID"
                          component={SelectInput}
                          placeholder="Brand Name"
                          labelName="Brand Name"
                          disabled={disableComponent}
                          options={BrandDate}
                          onChanged={onChangeBrand}
                        />
                      </Grid.Column>
                      <Grid.Column className="ViewLabel FullGrid767">
                        <Field
                          name="subBrandID"
                          component={SelectInput}
                          placeholder="Sub Brand"
                          labelName="Sub Brand"
                          disabled={disableComponent}
                          options={subBrandStore}
                        />
                      </Grid.Column>
                      <Grid.Column className="ViewLabel FullGrid767">
                        <Field
                          name="modelName"
                          component={TextInput}
                          placeholder="Model Name"
                          labelName="Model Name"
                          disabled={disableComponent}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767">
                        {disableComponent && (
                          <Tooltips
                            content="Edit Brand Details"
                            trigger={
                              <Button
                                basic
                                type="button"
                                compact
                                icon="edit"
                                onClick={(e: Event) => onHeaderSubmitHandler(e)}
                                floated="right"
                              />
                            }
                          />
                        )}
                        {!disableComponent && (
                          <Fragment>
                            <Tooltips
                              content="Save Update"
                              trigger={
                                <Button
                                  basic
                                  compact
                                  icon="save"
                                  floated="right"
                                />
                              }
                            />
                            <Tooltips
                              content="Cancel Update"
                              trigger={
                                <Button
                                  type="button"
                                  basic
                                  compact
                                  icon="cancel"
                                  floated="right"
                                  onClick={onCancel}
                                />
                              }
                            />
                          </Fragment>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                      <Grid.Column className="ViewLabel FullGrid767">
                        <Field
                          name="effectiveDate"
                          component={DateInput}
                          labelName="Effective Date"
                          placeholder="e.g.10/03/2020"
                          date={true}
                          time={false}
                          formated={"MM/dd/yyyy"}
                          disabled={disableComponent}
                          values={effDate}
                          onChange={(e:any)=>handleChangeEffDate(e)}
                        />
                      </Grid.Column>
                      <Grid.Column className="ViewLabel FullGrid767">
                        <Field
                          name="expireDate"
                          component={DateInput}
                          labelName="Expired Date"
                          placeholder="e.g.10/03/2020"
                          date={true}
                          time={false}
                          formated={"MM/dd/yyyy"}
                          disabled={disableComponent}
                          values={expDate}
                          onChange={(e:any)=>handleChangeExpDate(e)}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      )}
    />
  );
};

export default BrandEditForm;
