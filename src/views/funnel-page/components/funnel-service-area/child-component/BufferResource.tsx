import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Grid, Form, Icon } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, NumberInput, Tooltips } from 'views/components/UI';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectServiceAreaBufferResource } from 'selectors/funnel/FunnelSelector';
import { ServiceAreaBufferResource } from 'stores/funnel/models/view-edit';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { Dispatch } from 'redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import FunnelTeamSupportForm from '../../funnel-teams/form/FunnelTeamSupportForm';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
  funnelGenID: number;
}
const BufferResource: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [disableComponent, setDisableComponent] = useState(true);
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };
  const onSubmitHandler = (values: any) => {
    const serviceAreaBufferResource = new ServiceAreaBufferResource(values);
    serviceAreaBufferResource.modifyUserID = currentUser.employeeID;
    dispatch(FunnelActions.putServiceAreaBufferResource(serviceAreaBufferResource));
    console.log(serviceAreaBufferResource);
    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  const onOpenPopupChild = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalSecondLevelActions.OPEN(content, size));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(FunnelActions.requestServiceAreaBufferResourceById(props.funnelGenID));
  }, [dispatch, props.funnelGenID]);

  const serviceAreaBufferResource = useSelector((state: IStore) => selectServiceAreaBufferResource(state));
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelActions.REQUEST_SERVICE_AREA_BUFFER_RESOURCE, FunnelActions.REQUEST_UPDATE_SERVICE_AREA_BUFFER_RESOURCE])
  );

  return (
    <LoadingIndicator isActive={isRequesting}>
      <FinalForm
        //validate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={serviceAreaBufferResource}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Column mobile={15} tablet={15} computer={15}>
                <Grid>
                  <Grid.Column className="NumLabel" mobile={16} tablet={5} computer={5}>
                    <Field
                      name="numOfMaxResource"
                      component={NumberInput}
                      labelName="Number of Max Resource"
                      placeholder="e.g.99"
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                  <Grid.Column className="NumLabel" mobile={16} tablet={5} computer={5}>
                    <Field
                      name="numOfBufferResource"
                      component={NumberInput}
                      labelName="Number of Buffer Resource"
                      placeholder="e.g.99"
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={6} computer={6}>
                    <Link to="#">
                      <Button
                        className="mt-1n5r"
                        type="button"
                        size="small"
                        color="blue"
                        fluid
                        onClick={() =>
                          onOpenPopupChild(
                            <FunnelTeamSupportForm
                              type="PRESALES"
                              page="service-area"
                              supportRoleID={0}
                              funnelGenID={serviceAreaBufferResource.funnelGenID}
                              employeeID={0}
                              funnelSupportID={0}
                            />,
                            ModalSizeEnum.Small
                          )
                        }
                      >
                        <Icon name="random" />
                        Changes or assign presales
                      </Button>
                    </Link>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column mobile={1} tablet={1} computer={1}>
                {disableComponent && (
                  <Tooltips
                    position="top right"
                    content="Edit Customer Details"
                    trigger={<Button circular type="button" icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} floated="right" />}
                  />
                )}
                {!disableComponent && (
                  <Fragment>
                    <Tooltips position="top right" content="Save Update" trigger={<Button icon="save" circular floated="right" />} />
                    <Tooltips
                      position="top right"
                      content="Cancel Update"
                      trigger={<Button type="button" icon="cancel" circular floated="right" />}
                    />
                  </Fragment>
                )}
              </Grid.Column>
            </Grid>
          </Form>
        )}
      />
    </LoadingIndicator>
  );
};

export default BufferResource;
