import React, { useEffect } from 'react';
import { Grid, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectFunnelStatus, DateName, LabelName } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectServiceAreaBufferResource, selectViewFunnelCustomer, selectViewFunnelCustomerPO } from 'selectors/funnel/FunnelSelector';
import { reqDedicatedResourceOptions } from 'constants/reqDedicatedResourceOptions';

interface IProps {}

const FunnelDedicatedResourceProject: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const viewFunnelCustomerPO = useSelector((state: IStore) => selectViewFunnelCustomerPO(state));
  const serviceAreaBufferResource = useSelector((state: IStore) => selectServiceAreaBufferResource(state));

  const onSubmitHandler = (values: any) => {
    console.log(values);
  };

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={viewFunnelStatus}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid padded>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Field
                  name="projectName"
                  component={LabelName}
                  placeholder="Project Name"
                  labelName="Project Name"
                  values={viewFunnelCustomer.projectName}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="reqDedicatedResource"
                  component={SelectFunnelStatus}
                  placeholder="Request Dedicated Resource"
                  labelName="Request Dedicated Resource"
                  options={reqDedicatedResourceOptions}
                  disabled={true}
                  values={viewFunnelCustomer.reqDedicatedResource}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Field
                  name="contractStartDate"
                  component={DateName}
                  placeholder="Start Date Contract"
                  labelName="Start Date Contract"
                  disabled={true}
                  date={true}
                  values={viewFunnelCustomerPO.contractStartDate}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="contractEndDate"
                  component={DateName}
                  placeholder="End Date Contract"
                  disabled={true}
                  date={true}
                  values={viewFunnelCustomerPO.contractEndDate}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Field
                  name="maxResource"
                  component={LabelName}
                  placeholder="Max Resource"
                  labelName="Max Resource"
                  values={serviceAreaBufferResource.numOfMaxResource}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="bufferResource"
                  component={LabelName}
                  placeholder="Buffer Resource"
                  labelName="Buffer Resource"
                  values={serviceAreaBufferResource.numOfBufferResource}
                />
              </Grid.Column>
              <Grid.Column>
                <Field name="useResource" component={LabelName} placeholder="Use Resource" labelName="Use Resource" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelDedicatedResourceProject;
