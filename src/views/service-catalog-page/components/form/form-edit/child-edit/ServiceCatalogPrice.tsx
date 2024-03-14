import React, { Fragment, useEffect, useState } from 'react';
import { Segment, Grid, Icon, Form, Divider } from 'semantic-ui-react';
import ServiceCatalogModel from '../../../../../../stores/service-catalog/models/ServiceCatalogModel';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, TextInput, SelectInput, Tooltips } from 'views/components/UI';
import { priceTypeOptions, sourcePriceOptions } from 'constants/priceOptions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import ServiceCatalogPriceModel from 'stores/service-catalog/models/child-edit/ServiceCatalogPriceModel';
import { Dispatch } from 'redux';
import * as ServiceCatalogAction from 'stores/service-catalog/ServiceCatalogActions';

interface IProps {
  serviceCatalog: ServiceCatalogModel;
}

const ServiceCatalogPrice: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [disableHeader, setDisableHeader] = useState(true);
  const [priceTypeContent, setPriceTypeContent] = useState('');
  const [disablePriceType, setDisablePriceType] = useState(false);
  const [priceType, setPriceType] = useState('');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const dispatch: Dispatch = useDispatch();
  const { serviceCatalog } = props;

  useEffect(() => {
    if (serviceCatalog.priceType === 'Dynamic Price') {
      setPriceTypeContent('% of ordering');
    } else {
      setPriceTypeContent('');
    }

    if (serviceCatalog.sourcePrice === 'Ordering') {
      setDisablePriceType(true);
      setPriceType('Fix Price');
    } else {
      setDisablePriceType(false);
      setPriceType('');
    }
  }, [dispatch]);

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableHeader) {
      setDisableHeader(false);
      if (serviceCatalog.sourcePrice === 'Ordering') {
        setDisablePriceType(true);
      } else {
        setDisablePriceType(false);
      }
    }
  };
  const onSubmitHandler = (values: ServiceCatalogModel) => {
    values.employeeID = values.employeeIDLead !== undefined ? values.employeeIDLead.toString() : '1';
    const newValues = new ServiceCatalogPriceModel(values);
    newValues.modifyUserID = currentUser.employeeID;

    dispatch(ServiceCatalogAction.putServiceCatalogPrice(newValues));
    if (!disableHeader) {
      setDisableHeader(true);
    }
  };

  const onPriceTypeChange = (priceType: string) => {
    if (priceType === 'Dynamic Price') {
      setPriceTypeContent('% of ordering / selling price');
    } else {
      setPriceTypeContent('');
    }
  };

  const onSourcePriceChange = (sourcePrice: string) => {
    if (sourcePrice === 'Ordering') {
      setDisablePriceType(true);
      setPriceType('Fix Price');
    } else {
      setDisablePriceType(false);
      setPriceType('');
    }
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
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Segment className="LightGreyNotif PadPmoNotif">
            {disableHeader && (
              <Tooltips
                content="Edit Catalogue Price Details"
                trigger={<Button type="submit" icon="edit" circular onClick={(e: Event) => onHeaderSubmitHandler(e)} floated="right" />}
              />
            )}
            {!disableHeader && (
              <Fragment>
                <Tooltips content="Save Update" trigger={<Button type="submit" circular icon="save" floated="right" />} />
                <Tooltips content="Cancel Update" trigger={<Button type="button" circular icon="cancel" floated="right" onClick={onCancel} />} />
              </Fragment>
            )}
            <h4 className="mt-0">Price</h4>
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column className="ViewLabel FullGrid767 HalfGrid1200">
                  <Field
                    name="sourcePrice"
                    component={SelectInput}
                    labelName="Source Price"
                    placeholder="Source Price"
                    options={sourcePriceOptions}
                    disabled={disableHeader}
                    onChanged={(sourcePrice: string) => onSourcePriceChange(sourcePrice)}
                  />
                </Grid.Column>
                <Grid.Column className="ViewLabel FullGrid767 HalfGrid1200">
                  <Field
                    name="priceType"
                    component={SelectInput}
                    labelName="Price Type"
                    placeholder="Price Type"
                    options={priceTypeOptions}
                    onChanged={(priceType: string) => onPriceTypeChange(priceType)}
                    disabled={disablePriceType}
                  />
                </Grid.Column>

                <Grid.Column className="ViewLabel FullGrid767 HalfGrid1200">
                  <Field
                    name="svcPrice"
                    component={TextInput}
                    labelName="Price"
                    placeholder="Price"
                    labeled={{ tag: true, content: priceTypeContent }}
                    labelPosition="right"
                    disabled={disableHeader}
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

export default ServiceCatalogPrice;
