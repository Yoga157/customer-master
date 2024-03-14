import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { Card, Form, Grid } from 'semantic-ui-react';

import { Button, DateInput, LabelName, TextInput } from 'views/components/UI';

function Ordering() {
  const onSubmitHandler = (values: any) => {};
  return (
    <>
      <Card.Header>Add New Ordering</Card.Header>
      <div className="ui divider FullHdivider"></div>
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        // validate={validate}
        // initialValues={initialValues}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} className="">
            <Grid>
              <Grid.Row>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="productNumber"
                    component={LabelName}
                    labelName="Product Number"
                    disabled={true}
                    labelColor="white"
                    values="XYZ-00456"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column width={8} className="FullGrid767">
                  <Field
                    name="orderingQty"
                    component={TextInput}
                    type="number"
                    min={true}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    // values={}
                    placeholder="e.g.90.."
                    labelName="Ordering QTY"
                    note="Can’t more than Remaining Qty"
                    // labeled={}
                  />
                </Grid.Column>
                <Grid.Column width={8} className="FullGrid767">
                  <Field name="remainingQTY" component={LabelName} labelName="Remaining QTY" disabled={true} labelColor="white" values="10001" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8} className="FullGrid767">
                  <Field
                    name="expectedDelveryDate"
                    component={DateInput}
                    labelName="Expected Delvery Date"
                    placeholder="e.g.09/09/2022"
                    mandatory={false}
                    date={true}
                    dropUp={false}
                    // disabled={!startDate}
                    // values={endDate}
                    // onChange={(e) => {
                    //   setEndDate(e);
                    // }}
                    // minDate={new Date(moment(startDate).valueOf() + 24 * 60 * 60 * 1000)}
                    // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
      <div className="ui divider FullHdivider"></div>

      <Grid className="ph-1-5r mt-1">
        <Grid.Row columns={1} centered className="pb-0">
          <Grid.Column textAlign="center" className="pb-0">
            <Button type="button" className="mr-1r " size="small" onClick={() => alert('Oke')}>
              Cancel
            </Button>
            <Button className="ph-2r " color="blue" size="small" onClick={() => alert('Oke')}>
              Make Oredering
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Ordering;
