import React, { Fragment, useCallback, useEffect } from 'react';
import { Button, DropdownInput, SearchInputList, SelectInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import IStore from 'models/IStore';
import { selectEmployeeOptionsChangePM } from 'selectors/select-options';
import { combineValidators, isRequired } from 'revalidate';
import { selectBrandModel } from 'selectors/brand-model/BrandModelSelector';

//import actions
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import * as BrandTypeAction from 'stores/brand-model/BrandTypeAction';
import BrandPMModel from 'stores/brand-model/models/BrandPMModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {}

const ChangePM: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const brandType = useSelector((state: IStore) => selectBrandModel(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.brandModel.refreshPage);
  const onSubmitHandler = (values: any) => {
    const request = new BrandPMModel(values);
    request.userLogin = currentUser.employeeID;
    request.brandModelGenID = brandType.brandModelGenID;
    request.assignedTo = values.assignedTo.join(',');
    
    dispatch(BrandTypeAction.putChangePM(request));
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployeeByRole(29));
  }, []);

  const employeeStore = useSelector((state: IStore) => selectEmployeeOptionsChangePM(state));

  const validate = combineValidators({
    assignedTo: isRequired('PM Name'),
  });

  if (bRefreshPage) {
    dispatch(BrandTypeAction.requestBrandModelById(brandType.brandModelGenID));
    cancelClick();
  }
  
  return (
    <Fragment>
      <Card.Header>Change PM For Brand ({brandType.brandName})</Card.Header>
      <Divider></Divider>
      <FinalForm
        validate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Row>
                <Grid.Column>Change PM will affect to all model in this brand ?</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="assignedTo"
                    component={DropdownInput}
                    placeholder="PM Name"
                    labelName="PM Name"
                    options={employeeStore}
                    mandatory={false}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button type="submit" color="blue" disabled={pristine} floated="right">
                    Submit
                  </Button>
                  <Button type="button" onClick={cancelClick} floated="right">
                    Cancel
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ChangePM;
