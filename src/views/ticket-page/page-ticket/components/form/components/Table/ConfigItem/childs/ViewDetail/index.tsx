import React, { Fragment, useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Form, Card, Divider, Grid } from 'semantic-ui-react';

import * as ModalSecondActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { Button, DateInput, TextInput } from 'views/components/UI';

function Index({ rowData }) {
  const dispatch: Dispatch = useDispatch();

  const onSubmitHandler = (values) => {};

  return (
    <Fragment>
      <Card.Header className="bold-8">Detail Config Item #{rowData?.configItemGenID}</Card.Header>
      <Divider />
      <Card.Content>
        <FinalForm
          // validate={validate}
          onSubmit={(values: any) => onSubmitHandler(values)}
          initialValues={rowData}
          render={({ handleSubmit, invalid, submitting, pristine }) => (
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row columns="equal">
                  <Grid.Column className={` ViewLabel FullGrid1200 `}>
                    <Field name="poNumber" component={TextInput} placeholder="e.g. 123456" labelName="PO Number" disabled={true} />
                  </Grid.Column>
                  <Grid.Column className={` ViewLabel FullGrid1200 `}>
                    <Field name="poDate" component={DateInput} labelName="PO Date" placeholder="e.g.09/09/2022" date={true} disabled={true} />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="equal">
                  <Grid.Column className={` ViewLabel FullGrid1200 `}>
                    <Field name="productNumber" component={TextInput} placeholder="e.g. N9K.123456" labelName="Product Number" disabled={true} />
                  </Grid.Column>
                  <Grid.Column className={` ViewLabel FullGrid1200 `}>
                    <Field name="serialNumber" component={TextInput} placeholder="e.g. 123456" labelName="Serial Number" disabled={true} />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="equal">
                  <Grid.Column className={` ViewLabel FullGrid1200 `}>
                    <Field name="vendorName" component={TextInput} placeholder="e.g. Westcon International" labelName="Vendor Name" disabled={true} />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="equal">
                  <Grid.Column className={` ViewLabel FullGrid1200 `}>
                    <Field
                      name="productDescription"
                      component={TextInput}
                      placeholder="e.g. Fan Tray"
                      labelName="Product Description"
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="equal">
                  <Grid.Column className={` ViewLabel FullGrid1200 `}>
                    <Field name="brand" component={TextInput} placeholder="e.g. CIS" labelName="Brand" disabled={true} />
                  </Grid.Column>
                  <Grid.Column className={` ViewLabel FullGrid1200 `}>
                    <Field
                      name="warranty"
                      component={DateInput}
                      labelName="Product Warranty"
                      placeholder="e.g.09/09/2022"
                      date={true}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider className="mb-1r"></Divider>
              <Grid columns="equal" padded>
                <Grid.Column textAlign="center">
                  <Button color="blue" content="Close" type="button" onClick={() => dispatch(ModalSecondActions.CLOSE())} />
                  {/* <Button color="blue" content="Submit" disabled={submitting} loading={isRequesting} /> */}
                </Grid.Column>
              </Grid>
            </Form>
          )}
        />
      </Card.Content>
    </Fragment>
  );
}

export default Index;
