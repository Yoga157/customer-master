import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';
import { Card } from 'semantic-ui-react';

import styles from './EmployeeFreelanceCard.module.scss';
import EmployeeFreelanceForm from './form-create/EmployeeFreelanceForm';
import EmployeeFreelanceMenuAccess from 'stores/employee-freelance/models/EmployeeFreelanceMenuAccess';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';

interface RouteParams {
    id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
    history: History;
    location: any;
}

const EmployeeFreelanceCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const typePage = props.location?.state?.typePage;
    const employeeFreelanceMenuAccess: EmployeeFreelanceMenuAccess = useSelector((state: IStore) => state.employeeFreelance.employeeFreelanceMenuAccess);
    
    return (
        <Fragment>
            {employeeFreelanceMenuAccess.isAllowAccess === true ? (
                <Card centered raised className={styles.Card}>
                  <Card.Content>
                      <Card.Header>{props.match.params.id ? 'View Edit Employee Freelance' : 'Add Employee Freelance'}</Card.Header>
                  </Card.Content>
                  <Card.Content>
                      <EmployeeFreelanceForm history={props.history} />
                  </Card.Content>
                </Card>
            ): (<div>User Not Allowed Access</div>)}
        </Fragment>
    );
};

export default withRouter(EmployeeFreelanceCard);