import React, { Fragment, useState } from 'react';
import { Segment, Grid, Icon, Form } from 'semantic-ui-react';
import ServiceCatalogModel from 'stores/service-catalog/models/ServiceCatalogModel';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput, Button, TextInput, Tooltips } from 'views/components/UI';
import { afterHour, difficultyLevel } from 'constants/manHoursOptions';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Dispatch } from 'redux';
import ServiceCatalogManHourModel from 'stores/service-catalog/models/child-edit/ServiceCatalogManHourModel';
import * as ServiceCatalogAction from 'stores/service-catalog/ServiceCatalogActions';

interface IProps {
  serviceCatalog: ServiceCatalogModel;
}

const ServiceCatalogManHours: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [disableHeader, setDisableHeader] = useState(true);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const dispatch: Dispatch = useDispatch();
  const { serviceCatalog } = props;

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableHeader) {
      setDisableHeader(false);
    }
  };
  const onSubmitHandler = (values: ServiceCatalogModel) => {
    values.employeeID = values.employeeIDLead !== undefined ? values.employeeIDLead.toString() : '1';
    const newValues = new ServiceCatalogManHourModel(values);
    newValues.modifyUserID = currentUser.employeeID;
    console.log(newValues);
    dispatch(ServiceCatalogAction.putServiceCatalogManHour(newValues));
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
                content="Edit Man Hours Details"
                trigger={<Button type="submit" icon="edit" circular onClick={(e: Event) => onHeaderSubmitHandler(e)} floated="right" />}
              />
            )}
            {!disableHeader && (
              <Fragment>
                <Tooltips content="Save Update" trigger={<Button type="submit" circular icon="save" floated="right" />} />
                <Tooltips content="Cancel Update" trigger={<Button type="button" circular icon="cancel" floated="right" onClick={onCancel} />} />
              </Fragment>
            )}
            <h4 className="mt-0">Man Hours</h4>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column className="ViewLabel">
                  <Field
                    name="afterHour"
                    component={SelectInput}
                    placeholder="After Hour"
                    labelName="After Hour"
                    options={afterHour}
                    disabled={disableHeader}
                  />
                  <Field
                    name="difficultyLevel"
                    component={SelectInput}
                    placeholder="Difficulty Level"
                    labelName="Difficulty Level"
                    options={difficultyLevel}
                    disabled={disableHeader}
                  />
                </Grid.Column>
                <Grid.Column className="ViewLabel">
                  <Field name="manHour" component={TextInput} placeholder="Man Hour" labelName="Man Hour" disabled={disableHeader} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      )}
    />
  );
};

export default ServiceCatalogManHours;
