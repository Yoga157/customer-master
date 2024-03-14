import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Form, Icon } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput, Button, Tooltips } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as ModalFirstLevel from 'stores/modal/first-level/ModalFirstLevelActions';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectFunnel, selectFunnelAuthorization, selectViewFunnelCommissionIndex } from 'selectors/funnel/FunnelSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectCompetitorOptions } from 'selectors/select-options/CompetitorSelector';
import * as CommissionIndexActions from 'stores/commision-index/CommissionIndexActions';
import { FunnelViewEditCommisionIndex } from 'stores/funnel/models/view-edit';
import { selectCommissionIndexOptions } from 'selectors/select-options';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import AccordionCommissionIndex from './accordion/AccordionCommissionIndex';
import ModalSizeEnum from 'constants/ModalSizeEnum';

interface IProps {
  funnelGenID: string;
}

const FunnelEditCommissionIndex: React.FC<IProps> = ({ funnelGenID }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [disableComponent, setDisableComponent] = useState(true);
  const [disableDirectSPVComponent, setDisableDirectSPVComponent] = useState(true);
  const [disableSPVLvl2Component, setDisableSPVLvl2Component] = useState(true);
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);

  const onSubmitHandler = (values: any) => {
    const funnelEditCommissionIndex = new FunnelViewEditCommisionIndex(values);
    funnelEditCommissionIndex.modifiedUserID = currentUser.employeeID;
    funnelEditCommissionIndex.funnelGenID = +funnelGenID;
    if (
      funnelEditCommissionIndex.indexCreator === funnelEditCommissionIndex.indexDirectSuperior ||
      funnelEditCommissionIndex.indexDirectSuperior === funnelEditCommissionIndex.indexSuperiorLevel2 ||
      funnelEditCommissionIndex.indexCreator === funnelEditCommissionIndex.indexSuperiorLevel2
    ) {
      dispatch(ToastsAction.add('index values ??cannot be the same!', ToastStatusEnum.Warning));
    } else {
      /*if (isSalesAnalis) {
        let getLocalEdit = JSON.parse(localStorage.getItem('editViewFunnelCommissionIndexEdit'));
        localStorage.setItem(
          'editViewFunnelCommissionIndexEdit',
          getLocalEdit ? JSON.stringify([...getLocalEdit, funnelEditCommissionIndex]) : JSON.stringify([funnelEditCommissionIndex])
        );
      } else {*/
      dispatch(FunnelActions.putViewFunnelCommissionIndex(funnelEditCommissionIndex));
      /*} */

      if (!isRequesting) {
        if (!disableComponent) {
          setDisableComponent(true);
          setDisableSPVLvl2Component(true);
          setDisableDirectSPVComponent(true);
        }
      }
    }
  };

  useEffect(() => {
    if (funnelGenID.length > 0) {
      dispatch(CommissionIndexActions.requestCommissionIndex());
      dispatch(FunnelActions.requestViewFunneCommissionIndex(+funnelGenID));
      dispatch(FunnelActions.requestFunnelAuthorization(+funnelGenID, currentUser.employeeID, 1));
    }
    localStorage.removeItem('editViewFunnelCommissionIndexEdit');
  }, [dispatch]);

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(FunnelActions.requestViewFunneCommissionIndex(+funnelGenID));
      setDisableComponent(true);
      setDisableDirectSPVComponent(true);
      setDisableSPVLvl2Component(true);
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelActions.REQUEST_VIEW_FUNNEL_STATUS, FunnelActions.REQUEST_VIEW_FUNNEL_COMMISSION_INDEX])
  );

  const viewFunnelCommissionIndex = useSelector((state: IStore) => selectViewFunnelCommissionIndex(state));
  const indexCommissionOptions = useSelector((state: IStore) => selectCommissionIndexOptions(state));
  const funnelAuthentication = useSelector((state: IStore) => selectFunnelAuthorization(state));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
      if (funnelAuthentication.ruleFunnel === 'SuperiorLevel2') {
        setDisableDirectSPVComponent(false);
        setDisableSPVLvl2Component(false);
      } else if (
        funnelAuthentication.ruleFunnel === 'DirectSuperior' ||
        (funnelAuthentication.ruleFunnel === 'Creator' && funnelAuthentication.isEditorIndex === 1)
      ) {
        setDisableDirectSPVComponent(false);
        setDisableSPVLvl2Component(true);
      }
    }
  };

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={viewFunnelCommissionIndex}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header>
                  <Header.Content>Override Commision Index</Header.Content>
                  <Header.Content className="FloatRight">
                    {funnelAuthentication.isEditorIndex === 1 && disableComponent && (
                      <Tooltips
                        position="top right"
                        content="History Override Commision Index"
                        trigger={
                          <Button
                            circular
                            basic
                            type="button"
                            compact
                            icon="history"
                            onClick={(e: Event) =>
                              dispatch(ModalFirstLevel.OPEN(<AccordionCommissionIndex funnelGenID={+funnelGenID} />, ModalSizeEnum.Small))
                            }
                          />
                        }
                      />
                    )}

                    {funnelAuthentication.isEditorIndex === 1 && disableComponent && (
                      <>
                        <Tooltips
                          position="top right"
                          content="Edit Commission Index"
                          trigger={<Button circular basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} />}
                        />
                      </>
                    )}
                    {funnelAuthentication.isEditorIndex === 1 && !disableComponent && (
                      <Fragment>
                        <Tooltips
                          position="top right"
                          content="Cancel Update"
                          trigger={<Button type="button" basic compact icon="cancel" circular onClick={onCancel} />}
                        />
                        <Tooltips position="top right" content="Save Update" trigger={<Button basic compact icon="save" circular />} />
                      </Fragment>
                    )}
                    {JSON.parse(localStorage.getItem('editViewFunnelCommissionIndexEdit')) && (
                      <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning mt-px-4 ml-px-4" />} />
                    )}
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <div className="ui divider FullHdivider mt-0"></div>

            <Grid.Row columns="equal">
              <Grid.Column className="ViewLabel">
                <Field
                  name="indexCreator"
                  component={SelectInput}
                  placeholder="e.g. 0.02 .."
                  labelName="Creator"
                  values={viewFunnelCommissionIndex.indexCreator === 0 ? 0 : ''}
                  options={indexCommissionOptions}
                  disabled={disableComponent}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="indexDirectSuperior"
                  component={SelectInput}
                  placeholder="e.g. 0.02 .."
                  labelName="Direct Superior"
                  options={indexCommissionOptions}
                  values={viewFunnelCommissionIndex.indexDirectSuperior === 0 ? 0 : ''}
                  disabled={disableDirectSPVComponent}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="indexSuperiorLevel2"
                  component={SelectInput}
                  placeholder="e.g. 0.02 .."
                  labelName="Superior Level 2"
                  options={indexCommissionOptions}
                  values={viewFunnelCommissionIndex.indexSuperiorLevel2 === 0 ? 0 : ''}
                  disabled={disableSPVLvl2Component}
                />
              </Grid.Column>
              
            </Grid.Row>
            <span className="mb-1" style={{ color: 'red' }}>* Changed by manager level and above</span>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelEditCommissionIndex;
