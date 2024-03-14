import React, { useEffect, Fragment } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Divider, Card } from 'semantic-ui-react';
import { TextInput, SelectInput, Button } from 'views/components/UI';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as BrandAction from 'stores/brand/BrandAction';
import BrandModel from 'stores/brand/models/BrandModel';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { combineValidators, isRequired } from 'revalidate';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectEmployeeOptions } from 'selectors/select-options';
import * as EmployeeActions from 'stores/employee/EmployeeActions';

interface IProps {}

const BrandForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const bRefreshPage: boolean = useSelector((state: IStore) => state.brand.refreshPage);

  const onSubmitHandler = (values: any) => {
    const brand = new BrandModel(values);
    brand.brandID = 0;
    brand.productManager = values.pmName.toString();
    brand.portfolio = 1;
    dispatch(BrandAction.postBrand(brand));
  };

  if (bRefreshPage) {
    dispatch(BrandAction.requestBrand());
    dispatch(ModalAction.CLOSE());
  }

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployeeByRole(29));
  }, [dispatch]);

  const onCancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };
  const employeeStore = useSelector((state: IStore) => selectEmployeeOptions(state));
  const submitting: boolean = useSelector((state: IStore) => selectRequesting(state, [BrandAction.POST_BRAND]));

  const validate = combineValidators({
    brandName: isRequired('Brand Name'),
    pmName: isRequired('PM Name'),
  });

  return (
    <Fragment>
      <Card.Header>NEW BRAND</Card.Header>
      <Divider></Divider>
      <FinalForm
        validate={validate}
        onSubmit={(values: BrandModel) => onSubmitHandler(values)}
        //initialValues={serviceCatalog}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={submitting}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Field name="brandName" labelName="Brand Name" component={TextInput} placeholder="e.g.Hawllet Pac.." />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="pmName" labelName="PM Name" component={SelectInput} placeholder="e.g.Jhon Doe" options={employeeStore} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button color="blue" floated="right" content="Submit" />
                  <Button type="button" floated="right" content="Cancel" onClick={onCancelClick} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default BrandForm;
