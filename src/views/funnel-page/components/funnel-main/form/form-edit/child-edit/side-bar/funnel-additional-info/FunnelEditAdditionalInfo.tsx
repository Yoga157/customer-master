import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Form, Icon } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput, TextInput, Button, RichTextEditor, Tooltips, NumberInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectViewFunnelAdditional } from 'selectors/funnel/FunnelSelector';
import FunnelViewEditAdditional from 'stores/funnel/models/view-edit/FunnelViewEditAdditional';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectCompetitorOptions } from 'selectors/select-options/CompetitorSelector';
import { selectCompetitorProductOptions, selectCompetitorServiceOptions } from 'selectors/select-options/CompetitorProductSelector';
import * as CompetitorActions from 'stores/competitor/CompetitorActions';
import * as CompetitorProductActions from 'stores/competitor-product/CompetitorProductActions';
import AccordionAdditionalInfo from './components/accordion/AccordionAdditionalInfo';
import ModalSizeEnum from 'constants/ModalSizeEnum';

interface IProps {
  funnelGenID: string;
}

const FunnelEditAdditionalInfo: React.FC<IProps> = ({ funnelGenID }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [disableComponent, setDisableComponent] = useState(true);
  const [disableForm, setDisableForm] = useState(false);
  const competitorStore = useSelector((state: IStore) => selectCompetitorOptions(state));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };
  const onSubmitHandler = (values: any) => {
    const funnelID = document.querySelector(
      '#root > div.ui.container > div > div.eleven.wide.column > form > div > div.equal.width.row > div.two.wide.column > div > h3'
    )!.textContent;
    const funnelAdditional = new FunnelViewEditAdditional(values);
    funnelAdditional.modifyUserID = currentUser.employeeID;
    funnelAdditional.funnelID = funnelID === null ? '' : funnelID;
    funnelAdditional.funnelGenID = +funnelGenID;

    dispatch(FunnelActions.putViewFunnelAdditional(funnelAdditional));

    if (!isRequesting) {
      if (!disableComponent) {
        setDisableComponent(true);
      }
    }
  };

  const handleCompChange = (value) => {
    const filtered = competitorStore.filter((el) => el.value == value);
    // console.log(filtered);

    if (filtered[0].text == 'Direct Selection') {
      setDisableForm(true);
    } else {
      setDisableForm(false);
    }
  };

  useEffect(() => {
    if (funnelGenID.length > 0) {
      dispatch(CompetitorActions.requestCompetitor());
      dispatch(CompetitorProductActions.requestCompetitorProduct());
      dispatch(CompetitorProductActions.requestCompetitorService());
      dispatch(FunnelActions.requestViewFunnelAdditionalById(+funnelGenID));
    }
  }, [dispatch]);

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(FunnelActions.requestViewFunnelAdditionalById(+funnelGenID));
      setDisableComponent(true);
    }
  };

  const competitorProductStore = useSelector((state: IStore) => selectCompetitorProductOptions(state));
  const competitorServiceStore = useSelector((state: IStore) => selectCompetitorServiceOptions(state));

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelActions.REQUEST_VIEW_FUNNEL_ADDITIONAL]));

  const viewFunnelAditional = useSelector((state: IStore) => selectViewFunnelAdditional(state));
  //const arr = ['Supporter', <br />, '.'];
  // console.log('additional', viewFunnelAditional);
  // console.log('competitorStore', competitorStore);
  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={viewFunnelAditional}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header>
                  <Header.Content>Funnel Additional Info</Header.Content>
                  <Header.Content className="FloatRight">
                    {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && disableComponent && (
                      <>
                        {/* <Tooltips
                          position="top right"
                          content="History Additional Info"
                          trigger={
                            <Button
                              circular
                              basic
                              type="button"
                              compact
                              icon="history"
                              onClick={(e: Event) => dispatch(ModalFirstLevelActions.OPEN(<AccordionAdditionalInfo />, ModalSizeEnum.Small))}
                            />
                          }
                        /> */}
                        <Tooltips
                          position="top right"
                          content="Edit Customer PIC"
                          trigger={<Button circular basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} />}
                        />
                      </>
                    )}
                    {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && !disableComponent && (
                      <Fragment>
                        <Tooltips
                          position="top right"
                          content="Cancel Update"
                          trigger={<Button type="button" basic compact icon="cancel" circular onClick={onCancel} />}
                        />
                        <Tooltips position="top right" content="Save Update" trigger={<Button basic compact icon="save" circular />} />
                      </Fragment>
                    )}
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <div className="ui divider FullHdivider mt-0"></div>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field
                  name="compellingEvent"
                  component={TextInput}
                  placeholder="e.g.Event .."
                  disabled={disableComponent}
                  labelName="Compelling Event"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid>
              <Grid.Column width={8} className="ViewLabel FullGrid1200">
                <Field
                  name="customerBudget"
                  component={TextInput}
                  placeholder="e.g.99.000.0.."
                  disabled={disableComponent}
                  labelName="Customer Budget / Winning Price"
                />
              </Grid.Column>
              <Grid.Column width={8} className="ViewLabel FullGrid1200">
                <Field name="supportiveCoach" component={TextInput} placeholder="e.g. Supporter" disabled={disableComponent} labelName="Supporter" />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={8} className="ViewLabel FullGrid1200">
                <Field name="enemy" component={TextInput} placeholder="e.g. Enemy" disabled={disableComponent} labelName="Enemy" />
              </Grid.Column>
              <Grid.Column width={8} className="ViewLabel FullGrid1200">
                <Field name="fox" component={TextInput} placeholder="e.g. Fox" disabled={disableComponent} labelName="Fox" />
              </Grid.Column>
            </Grid>

            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field
                  name="competitor"
                  component={SelectInput}
                  placeholder="e.g.Competitor .."
                  labelName="Competitor"
                  options={competitorStore}
                  disabled={disableComponent}
                  onChanged={handleCompChange}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field
                  name="competitorProduct"
                  component={SelectInput}
                  placeholder="e.g. Comp Product"
                  labelName="Competitor Product"
                  options={competitorProductStore}
                  disabled={disableComponent || disableForm}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field
                  name="competitorService"
                  component={SelectInput}
                  placeholder="e.g. Comp Service"
                  labelName="Competitor Service"
                  options={competitorServiceStore}
                  disabled={disableComponent || disableForm}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field
                  name="competitorAmount"
                  component={NumberInput}
                  placeholder="e.g.99.000.00.."
                  labelName="Competitor Amount"
                  disabled={disableComponent || disableForm}
                  thousandSeparator={true}
                  options={competitorServiceStore}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field
                  name="customerNeeds"
                  component={RichTextEditor}
                  placeholder="e.g.Customer Needs"
                  labelName="Customer Needs"
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelEditAdditionalInfo;
