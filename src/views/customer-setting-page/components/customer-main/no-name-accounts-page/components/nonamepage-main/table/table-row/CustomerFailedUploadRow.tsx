import React, { Fragment } from 'react';
import { Table } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

interface IProps {
  rowData: any;
}

const FunnelUploadFailedTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  return (
    <Fragment>
      <Table.Row>
        <Table.Cell>{rowData.errorMessage}</Table.Cell>
        <Table.Cell>{rowData.brand}</Table.Cell>
        <Table.Cell>{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.eventName}</Table.Cell>
        <Table.Cell>{rowData.notes}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelUploadFailedTableRow;
