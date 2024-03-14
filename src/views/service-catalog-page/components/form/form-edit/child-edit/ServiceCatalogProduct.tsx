import React, { Fragment, useEffect, useState } from 'react';
import { Segment, Grid, Icon, Form } from 'semantic-ui-react';
import ServiceCatalogModel from 'stores/service-catalog/models/ServiceCatalogModel';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput, Button, DropdownInput, Tooltips } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { selectBrandModelOptions } from 'selectors/select-options';
import { Dispatch } from 'redux';
import { selectSubBrandGroupOptions } from 'selectors/select-options/BrandSubSelector';
import * as ServiceCatalogAction from 'stores/service-catalog/ServiceCatalogActions';
import * as BrandTypeAction from 'stores/brand-model/BrandTypeAction';
import ServiceCatalogProductModel from 'stores/service-catalog/models/child-edit/ServiceCatalogProductModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
  serviceCatalog: ServiceCatalogModel;
}

const ServiceCatalogProduct: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [disableHeader, setDisableHeader] = useState(true);
  const dispatch: Dispatch = useDispatch();
  const [brandModelID, setBrandModelID] = useState([0]);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const { serviceCatalog } = props;

  useEffect(() => {
    dispatch(BrandTypeAction.requestBrandModelByGroup(serviceCatalog.subBrandGroupID));
  }, [dispatch, serviceCatalog.subBrandGroupID]);

  const brandModelStore = useSelector((state: IStore) => selectBrandModelOptions(state));
  const subBrandGroupStore = useSelector((state: IStore) => selectSubBrandGroupOptions(state));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableHeader) {
      setDisableHeader(false);
    }
  };

  const onSubmitHandler = (values: any) => {
    values.employeeID = values.employeeIDLead !== undefined ? values.employeeIDLead.toString() : '1';
    const newValues = new ServiceCatalogProductModel(values);
    newValues.modifyUserID = currentUser.employeeID;
    newValues.brandModelID = newValues.brandModelID = values?.brandModelIDArr?.join(",");

    dispatch(ServiceCatalogAction.putServiceCatalogProduct(newValues));
    if (!disableHeader) {
      setDisableHeader(true);
    }
  };

  const onChangeSubBrand = (value: any) => {
    serviceCatalog.brandModelIDArr = undefined;
    console.log(serviceCatalog);
    dispatch(BrandTypeAction.requestBrandModelByGroup(value));
  };

  const onChangedBrandModel = (value: any) => {
    console.log(value);
    setBrandModelID(value);
  };

  const onCancel = () => {
    if (!disableHeader) {
      dispatch(ServiceCatalogAction.requestServiceCatalogById(+serviceCatalog.svcCatGenID));
      setDisableHeader(true);
    }
  };
  return (
    <FinalForm
      onSubmit={(values: ServiceCatalogModel) => onSubmitHandler(values)}
      initialValues={serviceCatalog}
      mutators={{
        // expect (field, value) args from the mutator
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Segment className="LightGreyNotif PadPmoNotif">
            {disableHeader && (
              <Tooltips
                content="Edit Service Catalog Product Details"
                trigger={<Button type="submit" icon="edit" circular onClick={(e: Event) => onHeaderSubmitHandler(e)} floated="right" />}
              />
            )}
            {!disableHeader && (
              <Fragment>
                <Tooltips content="Save Update" trigger={<Button type="submit" circular icon="save" floated="right" />} />
                <Tooltips content="Cancel Update" trigger={<Button type="button" circular icon="cancel" floated="right" onClick={onCancel} />} />
              </Fragment>
            )}
            <h4 className="mt-0">Product</h4>
            <Grid>
              <Grid.Row>
                <Grid.Column className="ViewLabel">
                  <Field
                    name="subBrandGroupID"
                    component={SelectInput}
                    placeholder="Sub Brand"
                    labelName="Sub Brand"
                    options={subBrandGroupStore}
                    onChanged={onChangeSubBrand}
                    disabled={disableHeader}
                  />
                  <Field
                    name="brandModelIDArr"
                    component={DropdownInput}
                    placeholder="Brand Model"
                    labelName="Brand Model"
                    disabled={disableHeader}
                    options={brandModelStore}
                    onChanged={onChangedBrandModel}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      )}
    />
  );
};

export default ServiceCatalogProduct;
