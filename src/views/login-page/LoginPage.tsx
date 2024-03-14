import React, { useEffect } from 'react';
import { Message, Segment, Form, Header, Grid, Image } from 'semantic-ui-react';
import { Button, TextInput } from 'views/components/UI';
import { Form as FinalForm, Field } from 'react-final-form';
import { History } from 'history';
import RouteEnum from 'constants/RouteEnum';
import * as UserActions from 'stores/users/UserActions';
import LoginModel from 'stores/users/models/LoginModel';
import { combineValidators, isRequired } from 'revalidate';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import UserResultModel from 'stores/users/models/UserResultModel';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import './LoginPageStyle.scss';
import EmployeeFreelanceMenuAccessRequest from 'stores/employee-freelance/models/EmployeeFreelanceMenuAccessRequest';
import * as EmployeeFreelanceActions from 'stores/employee-freelance/EmployeeFreelanceActions';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import { useLocation } from 'react-router-dom';

interface IProps {
  history: History;
}

const validate = combineValidators({
  userName: isRequired('Email'),
  password: isRequired('Password'),
});

const LoginPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const bRefreshPage: boolean = useSelector((state: IStore) => state.userLogin.refreshPage);
  const localtion = useLocation();
  const onSubmitHandler = (values: any) => {
    //props.history.push(RouteEnum.Funnel)
    const mappingLogin = new LoginModel(values);
    dispatch(UserActions.postLogin(mappingLogin));
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [UserActions.REQUEST_POST_LOGIN, UserActions.REQUEST_POST_LOGIN_LOCAL])
  );

  useEffect(() => {
    dispatch(UserActions.requestCurrentUser());
  }, [dispatch]);

  const userLogin: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    // 07062022 - Menu EmployeeFreelance
    if (userLogin.email?.length > 0) {
      const menu = new EmployeeFreelanceMenuAccessRequest({});
      menu.email = userLogin.email;
      dispatch(EmployeeFreelanceActions.requestEmployeeFreelanceMenuAccess(menu));
    }
  }, [userLogin]);

  if (userLogin.status === 'success') {
    const newItems = new UserResultModel(userLogin);

    dispatch(UserActions.postLoginLocal(newItems));
    /* if (
      (userLogin.direktoratName === 'SI' || userLogin.direktoratName === 'CS') &&
      (userLogin.role === 'Product Manager' || userLogin.role === 'Sales' || userLogin.role === 'Presales')
    ) {
      props.history.push(RouteEnum.Dashboard);
    } else if (userLogin.role === 'Sales Admin') {
      props.history.push(RouteEnum.Dashboard);
    } else if (userLogin.role === 'Marketing') {
      props.history.push(RouteEnum.FunnelOpportunity);
    } else {
      props.history.push(RouteEnum.GeneratedForm);
    } */

    props.history.push(RouteEnum.AllFeatures);

    //26 Januari 2024
    /*if (userLogin.role === 'Marketing') {
      props.history.push(RouteEnum.FunnelOpportunity);
    } else {
      props.history.push(RouteEnum.Dashboard);
    }*/
    //--------------------------------------------------
  }

  useEffect(() => {
    if (localtion.pathname && localStorage.getItem('@exp')) {
      dispatch(ToastsAction.add('Your session is expired.', ToastStatusEnum.Warning));
      localStorage.removeItem('@exp');
    }
  }, [localtion, localStorage.getItem('@exp')]);

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={props.serviceCatalog}
      validate={validate}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="blue" textAlign="center">
                <Image src="/assets/logo.png" /> Login to Data Quality
              </Header>

              <Field
                className="mb-0"
                name="userName"
                component={TextInput}
                labelName="Username"
                placeholder="e.g.jhon.doe"
                icon="user"
                iconPosition="left"
              />

              <Field
                className="mt-0"
                name="password"
                component={TextInput}
                labelName="Password"
                placeholder="e.g.Your password here.."
                icon="lock"
                iconPosition="left"
                type="password"
              />

              <Button color="blue" fluid size="large" content="Login" disabled={invalid || pristine} />

              {userLogin.status === 'fail' && <Message color="red">{userLogin.message}</Message>}
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default LoginPage;
