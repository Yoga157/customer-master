import React, { Fragment } from 'react';
import { format } from 'date-fns';
import { Dropdown, Icon, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import IEmployeeFreelanceTableRow from 'selectors/employee-freelance/models/IEmployeeFreelanceTableRow';
import moment from 'moment';

interface IProps {
    readonly rowData: IEmployeeFreelanceTableRow;
    readonly setActivePage: any;
}

const EmployeeFreelanceTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const { rowData, setActivePage } = props;

    return (
        <Fragment>
            <Table.Row key={rowData.employeeFreelanceGenID}>
                <Table.Cell width="1">
                    <Dropdown pointing="left" icon="ellipsis vertical" key={rowData.employeeFreelanceGenID}>
                        <Dropdown.Menu>
                            <Dropdown.Item 
                                to={`/employee-freelance-form/${rowData.employeeFreelanceGenID}`}
                                as={Link}
                                text="View/Edit" 
                                icon="edit outline" 
                                target={'_blank'}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </Table.Cell>
                <Table.Cell>{rowData.employeeFreelanceGenID}</Table.Cell>
                <Table.Cell>{rowData.superiorEmail}</Table.Cell>
                <Table.Cell>{rowData.email}</Table.Cell>
                <Table.Cell>{rowData.fullname}</Table.Cell>
                <Table.Cell>{rowData.nikktp}</Table.Cell>
                <Table.Cell>{rowData.phone}</Table.Cell>
                <Table.Cell>{rowData.dateOfBirth === null ? '' : `${moment(rowData.dateOfBirth).format('DD MMMM yyyy')}`}</Table.Cell>
                <Table.Cell>{rowData.effectiveDate === null ? '' : `${moment(rowData.effectiveDate).format('DD MMMM yyyy')}`}</Table.Cell>
                <Table.Cell>{rowData.expiredDate === null ? '' : `${moment(rowData.expiredDate).format('DD MMMM yyyy')}`}</Table.Cell>
                <Table.Cell textAlign='center'>{rowData.status ? <Icon name="check circle"/> : <Icon name="times circle"/>}</Table.Cell>
                <Table.Cell textAlign='center'>{rowData.isHaveActivity ? <Icon name="check circle"/> : <Icon name="times circle"/>}</Table.Cell>
            </Table.Row>
        </Fragment>
    );
};

export default EmployeeFreelanceTableRow;