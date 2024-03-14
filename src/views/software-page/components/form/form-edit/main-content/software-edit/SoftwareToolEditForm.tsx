import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Form, Segment } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput, Button, Tooltips } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectSoftware } from 'selectors/software/SoftwareSelector';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import { selectSoftwareTypeOptions, selectSubSoftwareTypeOptions, selectSoftwareToolTypeOptions } from 'selectors/select-options';
import ISoftwareHeaderTableRow from 'selectors/software/models/ISoftwareHeaderTableRow';
import SoftwareUpdateHeaderModel from 'stores/software/models/SoftwareUpdateHeaderModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import RouteEnum from 'constants/RouteEnum';
import { History } from 'history';

interface IProps {
  id: number;
  history: History;
}

const SoftwareToolEditForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [disableComponent, setDisableComponent] = useState(true);
  const [pageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [updateHeader, setUpdateHeader] = useState(0);

  const { id } = props;

  useEffect(() => {
    dispatch(SoftwareActions.requestSoftwareHeader(id));
    dispatch(SoftwareActions.requestSoftwareType());
  }, [dispatch, id]);

  const onSoftwareType = (values: any) => {
    dispatch(SoftwareActions.requestSubSoftwareType(values));
  };

  const softwareTypeStore = useSelector((state: IStore) => selectSoftwareTypeOptions(state));
  const subSoftwareTypeStore = useSelector((state: IStore) => selectSubSoftwareTypeOptions(state));
  const softwareHeader: ISoftwareHeaderTableRow = useSelector((state: IStore) => selectSoftware(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.software.refreshPage);

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onSubmitHandler = (values: any) => {
    const newValues = new SoftwareUpdateHeaderModel(values);
    newValues.updateSoftwareID = values.subSoftwareID;
    newValues.userID = currentUser.employeeID;
    newValues.existingSoftwareID = softwareHeader.subSoftwareID;

    dispatch(SoftwareActions.putSoftwareHeader(newValues));
    setUpdateHeader(1);

    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  if (bRefreshPage) {
    if (updateHeader == 1) props.history.replace(RouteEnum.Software);

    dispatch(SoftwareActions.requestSoftwares(activePage, pageSize));
  }

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(SoftwareActions.requestSoftwareHeader(id));
      dispatch(SoftwareActions.requestSubSoftwareType(softwareHeader.softwareID));
      setDisableComponent(true);
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [SoftwareActions.REQUEST_SOFTWARE_TYPE]));
  useEffect(() => {
    if (softwareHeader.softwareID > 0) dispatch(SoftwareActions.requestSubSoftwareType(softwareHeader.softwareID));
  }, [dispatch, softwareHeader.softwareID]);

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={softwareHeader}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Segment className="LightGreyNotif PadPmoNotif">
            <Grid>
              <Grid.Column>
                <Grid.Row>
                  <Grid.Column className="mt-1r-767">
                    {disableComponent && (
                      <Tooltips
                        content="Edit Brand Details"
                        trigger={<Button basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} floated="right" />}
                      />
                    )}
                    {!disableComponent && (
                      <Fragment>
                        <Tooltips content="Save Update" trigger={<Button basic compact icon="save" floated="right" />} />
                        <Tooltips
                          content="Cancel Update"
                          trigger={<Button type="button" basic compact icon="cancel" floated="right" onClick={onCancel} />}
                        />
                      </Fragment>
                    )}
                  </Grid.Column>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column className="ViewLabel">
                        <Field
                          name="softwareID"
                          component={SelectInput}
                          placeholder="Software Type"
                          labelName="Sub Software Type"
                          disabled={disableComponent}
                          options={softwareTypeStore}
                          onChanged={onSoftwareType}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column className="ViewLabel">
                        <Field
                          name="subSoftwareID"
                          component={SelectInput}
                          placeholder="Sub Software Type"
                          labelName="Sub Software Type"
                          disabled={disableComponent}
                          options={subSoftwareTypeStore}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
      )}
    />
  );
};

export default SoftwareToolEditForm;
