import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { Button, RichTextEditor, RadioButton } from 'views/components/UI';
import { Grid, Card, Divider, Form } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate';

interface IProps {
  title: string;
}
const RequestProjectOpen: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { title } = props;
  const [valueRadio, setValueRadio] = useState('');

  const handleChange = (e) => setValueRadio(e);

  const dispatch: Dispatch = useDispatch();
  const onCloseHandler = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitHandler = (values: any) => {
    dispatch(ModalAction.CLOSE());
  };

  const validate = combineValidators({
    reasson: isRequired('Reasson'),
  });

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={serviceCatalog}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Card.Header className="bold-8">{`${title === 'op' ? 'Request Project Open' : 'Sales Director Approval'}`}</Card.Header>
          <Divider />
          <Grid className="mb-0">
            {title !== 'op' && (
              <>
                <Grid.Row columns="equal">
                  <Grid.Column textAlign="center" className="FullGrid767">
                    <Field
                      name="approve"
                      component={RadioButton}
                      label="Approve"
                      checked={valueRadio === 'approve'}
                      onChange={() => handleChange('approve')}
                    />
                  </Grid.Column>
                  <Grid.Column textAlign="center" className="FullGrid767">
                    <Field
                      name="reject"
                      component={RadioButton}
                      label="Reject"
                      checked={valueRadio === 'reject'}
                      onChange={() => handleChange('reject')}
                    />
                  </Grid.Column>
                </Grid.Row>
              </>
            )}

            <Grid.Row>
              <Grid.Column>
                <Field name="reasson" component={RichTextEditor} placeholder="" labelName="Reasson" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button className="mr-3r " color="blue" floated="right" content="Submit" disabled={false} />
          <Button className="ml-3r " floated="left" type="button" content="Cancel" onClick={onCloseHandler} />
        </Form>
      )}
    />
  );
};

export default RequestProjectOpen;
