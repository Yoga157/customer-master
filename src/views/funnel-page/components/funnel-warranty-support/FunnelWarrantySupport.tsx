import React, { useState, useEffect, Fragment } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Segment, Grid, Header } from 'semantic-ui-react';
import { Button, RichTextEditor, DateInput, Tooltips } from 'views/components/UI';
import WarrantySla from './child-component/funnel-warranty-sla/WarrantySLA';
import FunnelWarrantySupportModel from 'stores/funnel-warranty/models/FunnelWarrantySupportModel';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectWarrantySupport } from 'selectors/funnel-warranty-support/FunnelWarrantySupportSelector';

interface IProps {
  funnelGenID: number;
}
const FunnelWarrantySupport: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const { funnelGenID } = props;

  const onEditHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };
  const onSubmitHandler = (values: FunnelWarrantySupportModel) => {
    if (!disableComponent) {
      setDisableComponent(true);
      const createDate = new Date();

      values.createDate = createDate;
      values.funnelGenID = funnelGenID;
      values.warrantySupportID = +warrantySupport.warrantySupportID > 0 ? +warrantySupport.warrantySupportID : 0;
      values.serviceLocation = 'serviceLocation';

      const newValues = new FunnelWarrantySupportModel(values);

      dispatch(FunnelWarrantyActions.postWarrantySupport(newValues));
    }
  };

  useEffect(() => {
    dispatch(FunnelWarrantyActions.requestWarrantySupportById(+funnelGenID));
  }, [dispatch, funnelGenID]);

  const resultObj = useSelector((state: IStore) => state.funnelWarrantySLA.resultActions.resultObj);

  const warrantySupport = useSelector((state: IStore) => selectWarrantySupport(state));

  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={warrantySupport}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Segment className="LightGreyNotif">
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column>
                  {disableComponent && (
                    <Tooltips
                      position="top right"
                      content="Edit Warranty Support Details"
                      trigger={<Button circular type="button" icon="edit" onClick={(e: Event) => onEditHandler(e)} floated="right" />}
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
              </Grid.Row>
            </Grid>
            <Header className="mt-0">
              <Header.Content>Warranty Support </Header.Content>
              <Header.Subheader>End Warranty On xx.xx.xx</Header.Subheader>
            </Header>
            <Grid>
              <Grid.Row columns="2">
                <Grid.Column className="ViewLabel">
                  <Field
                    name="preventivePolicy"
                    component={RichTextEditor}
                    labelName="Preventive Maintenance Policy"
                    placeholder="Preventive Maintenance Policy"
                    disabled={disableComponent}
                  />
                </Grid.Column>
                <Grid.Column className="ViewLabel">
                  <Field
                    name="correctivePolicy"
                    component={RichTextEditor}
                    labelName="Corrective Maintenance Policy"
                    placeholder="Corrective Maintenance Policy"
                    disabled={disableComponent}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="2">
                <Grid.Column className="ViewLabel">
                  <Field
                    name="startDateWarranty"
                    component={DateInput}
                    labelName="Start Warranty"
                    placeholder="Start Warranty"
                    date={true}
                    disabled={disableComponent}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <WarrantySla
              warrantySupportID={
                +warrantySupport.warrantySupportID > 0
                  ? +warrantySupport.warrantySupportID
                  : resultObj.warrantySupportID == undefined
                  ? 0
                  : resultObj.warrantySupportID
              }
            />
          </Segment>
        </Form>
      )}
    />
  );
};

export default FunnelWarrantySupport;
