import React, { Fragment } from 'react';
import IFunnelServiceCatalogTable from 'selectors/funnel-service-catalog/models/IFunnelServiceCatalogTable';
import IFunnelServiceCatalogTableRow from 'selectors/funnel-service-catalog/models/IFunnelServiceCatalogTableRow';
import styles from './FunnelSplitPerformance.module.scss';
import FunnelSplitPerformanceTableRow from './table-row/FunnelSplitPerformanceTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';
import RowFormFunnelSplit from '../form/form-create/RowFormFunnelSplit';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Header, Segment, Icon, Grid, Card, Divider, Button, Table } from 'semantic-ui-react';
import { SelectInput } from 'views/components/UI';
import { selectCustomerName, selectSalesName, selectDirektorat } from 'selectors/funnel-opportunity/FunnelOpportunitySelector';

interface IProps {
  readonly tableData: IFunnelServiceCatalogTable;
}
const FunnelSplitPerformanceTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const Sales = useSelector((state: IStore) => selectSalesName(state));

  const onSubmitHandler = (values) => {
    console.log('test');
  };

  return (
    <Table striped id="servicecatalog">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Sales Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Split Type</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Split Percentage</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <RowFormFunnelSplit enableRow="" rowData="" type={'ADD'} indexItem={1} />
        {props.tableData.rows.map((model: any, index: number) => (
          <FunnelSplitPerformanceTableRow key={index} totalPrice={props.tableData.totalPrice} rowData={model} indexItem={index} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default FunnelSplitPerformanceTable;
