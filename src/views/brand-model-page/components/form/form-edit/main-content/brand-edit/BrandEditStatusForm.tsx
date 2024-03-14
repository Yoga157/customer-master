import React, { Fragment, useState, useEffect } from "react";
import { Grid, Form, Divider } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  TextInput,
  Button,
  SelectFunnelStatus,
  DateName,
  Tooltips,
} from "views/components/UI";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { statusOptions } from "constants/statusOptions";
import BrandTypeModel from "stores/brand-model/models/BrandTypeModel";

import * as SubBrandActions from "stores/brand-sub/SubBrandAction";
import IStore from "models/IStore";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as BrandTypeAction from "stores/brand-model/BrandTypeAction";

interface IProps {
  brandType: BrandTypeModel;
}

const BrandEditStatusForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const { brandType } = props;

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onSubmitHandler = (values: BrandTypeModel) => {
    const newValues = new BrandTypeModel(brandType);
    newValues.status = values.status;
    dispatch(BrandTypeAction.putBrandModel(newValues));
    console.log(values);
    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  /*   useEffect(() => {
    if (brandType.brandModelGenID.toString() !== 'NaN') {
      dispatch(BrandTypeAction.requestBrandModelById(brandType.brandModelGenID));
    }
  }, [dispatch]); */

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(
        BrandTypeAction.requestBrandModelById(brandType.brandModelGenID)
      );
      setDisableComponent(true);
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [BrandTypeAction.REQUEST_BRAND_MODEL_BY_ID])
  );

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={brandType}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={8}>
                <h4>Brand Details</h4>
              </Grid.Column>
              <Grid.Column width={8}>
                {disableComponent && (
                  <Tooltips
                    content="Edit Brand Status Details"
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
                        <Button basic compact icon="save" floated="right" />
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

            <Grid.Row columns={4}>
              <Grid.Column width={4} className="ViewLabel FullGrid767">
                <Field
                  name="createDate"
                  component={DateName}
                  date={true}
                  labelName="Create Date"
                  placeholder="Create Date"
                  disabled={true}
                />
              </Grid.Column>
              <Grid.Column width={4} className="ViewLabel FullGrid767">
                <Field
                  name="modifyDate"
                  disabled={true}
                  component={DateName}
                  labelName="Last Modified Date"
                  placeholder="Last Modified Date"
                  date={true}
                />
              </Grid.Column>
              <Grid.Column width={4} className="FullGrid767">
                <Field
                  name="status"
                  component={SelectFunnelStatus}
                  placeholder="Active/Non Active"
                  labelName="Brand Status"
                  options={statusOptions}
                  disabled={disableComponent}
                />
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel FullGrid767">
                <Field
                  name="productManager"
                  component={TextInput}
                  disabled
                  placeholder="PM Name"
                  labelName="PM Name"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default BrandEditStatusForm;
