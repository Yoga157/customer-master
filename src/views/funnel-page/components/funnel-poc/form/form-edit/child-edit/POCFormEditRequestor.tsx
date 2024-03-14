import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Header, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { DateInput, Button, RichTextEditor, DropdownInput, Tooltips } from 'views/components/UI';
import IStore from 'models/IStore';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as PresalesSupportActions from 'stores/presales-support/PresalesSupportActions';
import * as POCActions from 'stores/funnel-poc-request/POCActions';
import { selectPresalesOptions } from 'selectors/select-options';
import { selectPOCRequest } from 'selectors/funnel-poc-request/POCSelector';
import POCRequestModel from 'stores/funnel-poc-request/models/POCRequestModel';

interface IProps {
  pocGenHID: number;
}

const POCFormEditRequestor: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [customerSuccessFactor, setCustomerSuccessFactor] = useState('' as any);
  const [disableComponent, setDisableComponent] = useState(true);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const { pocGenHID } = props;

  useEffect(() => {
    dispatch(PresalesSupportActions.requestPresales());
    dispatch(POCActions.requestPOCByPOCGenHID(pocGenHID));
  }, [dispatch, pocGenHID]);

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onSubmitHandler = (values: any) => {
    const newItem = new POCRequestModel(values);
    newItem.pocGenHID = pocGenHID;
    console.log(newItem);

    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  const onFileChange = (e: any) => {
    setCustomerSuccessFactor(e.target.files[0]);
  };

  const presalesSupportOptions = useSelector((state: IStore) => selectPresalesOptions(state));
  const pocRequest = useSelector((state: IStore) => selectPOCRequest(state));

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={pocRequest}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header>
                  <Header.Content>Requestor</Header.Content>
                  <Header.Content className="FloatRight">
                    {currentUser.role === 'Sales' && disableComponent && (
                      <Tooltips
                        content="Edit POC Requestor"
                        trigger={
                          <Button basic type="button" circular compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} floated="right" />
                        }
                      />
                    )}
                    {currentUser.role === 'Sales' && !disableComponent && (
                      <Fragment>
                        <Tooltips
                          position="top right"
                          content="Cancel Update"
                          trigger={<Button type="button" basic circular compact icon="cancel" />}
                        />
                        <Tooltips position="top right" content="Save Update" trigger={<Button basic compact circular icon="save" />} />
                      </Fragment>
                    )}
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid className="mt-0 ViewLabel">
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="pocExpectedDate"
                  component={DateInput}
                  labelName="Expected POC Date"
                  placeholder="e.g.09/09/2020"
                  date={true}
                  disabled={disableComponent}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="pocPresalesDeptIDArr"
                  component={DropdownInput}
                  labelName="PIC Dept"
                  placeholder="e.g.NI,CSI,.."
                  options={presalesSupportOptions}
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="pocNotes"
                  component={RichTextEditor}
                  labelName="Requestor Notes"
                  placeholder="e.g.Requestor Notes"
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <label> Customer Success Factor</label>
                <input type="file" name="imageFile" onChange={onFileChange} disabled={disableComponent} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default POCFormEditRequestor;
