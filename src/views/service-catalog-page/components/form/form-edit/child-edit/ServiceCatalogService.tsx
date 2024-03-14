import React, { Fragment, useState } from 'react';
import { Segment, Grid, Icon, Form } from 'semantic-ui-react';
import ServiceCatalogModel from 'stores/service-catalog/models/ServiceCatalogModel';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, TextInput, RichTextEditor, Tooltips } from 'views/components/UI';
import ServiceCatalogServicesModel from 'stores/service-catalog/models/child-edit/ServiceCatalogServicesModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Dispatch } from 'redux';
import * as ServiceCatalogAction from 'stores/service-catalog/ServiceCatalogActions';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';

interface IProps {
  serviceCatalog: ServiceCatalogModel;
}

const ServiceCatalogService: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [disableHeader, setDisableHeader] = useState(true);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const dispatch: Dispatch = useDispatch();
  const { serviceCatalog } = props;

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableHeader) {
      setDisableHeader(false);
    }
  };
  const onSubmitHandler = (values: any) => {
    const newValues = new ServiceCatalogServicesModel(values);
    newValues.modifyUserID = currentUser.employeeID;
    dispatch(ServiceCatalogAction.putServiceCatalogServices(newValues));
    if (!disableHeader) {
      setDisableHeader(true);
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
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={serviceCatalog}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Segment className="LightGreyNotif PadPmoNotif">
            {disableHeader && (
              <Tooltips
                content="Edit Service Details"
                trigger={<Button type="submit" icon="edit" circular onClick={(e: Event) => onHeaderSubmitHandler(e)} floated="right" />}
              />
            )}
            {!disableHeader && (
              <Fragment>
                <Tooltips content="Save Update" trigger={<Button type="submit" circular icon="save" floated="right" />} />
                <Tooltips content="Cancel Update" trigger={<Button type="button" circular icon="cancel" floated="right" onClick={onCancel} />} />
              </Fragment>
            )}
            <h4 className="mt-0">Services</h4>
            <Grid padded>
              <Grid.Row>
                <Grid.Column className="ViewLabel">
                  <Field name="svcName" component={TextInput} labelName="Service Name" placeholder="Service Name" disabled={disableHeader} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column className="ViewLabel FullGrid767 HalfGrid1200">
                  <Field
                    name="svcDescription"
                    component={RichTextEditor}
                    labelName="Service Description"
                    placeholder="Service Description"
                    disabled={disableHeader}
                  />
                </Grid.Column>
                <Grid.Column className="ViewLabel FullGrid767 HalfGrid1200">
                  <Field
                    name="svcPrerequisite"
                    component={RichTextEditor}
                    labelName="Service Prerequisite"
                    placeholder="Service Prerequisite"
                    disabled={disableHeader}
                  />
                </Grid.Column>
                <Grid.Column className="ViewLabel FullGrid767 HalfGrid1200">
                  <Field name="notes" component={RichTextEditor} labelName="Notes" placeholder="Notes" disabled={disableHeader} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      )}
    />
  );
};

export default ServiceCatalogService;
