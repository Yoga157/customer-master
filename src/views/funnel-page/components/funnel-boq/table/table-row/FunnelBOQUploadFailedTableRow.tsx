import React, { Fragment } from 'react';
import { Table } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import IBoqFailedTableRow from 'selectors/boq/models/IBoqFailedTableRow';

interface IProps {
  readonly rowData: IBoqFailedTableRow;
}

const FunnelBOQUploadFailedTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  return (
    <Fragment>
      <Table.Row>
        <Table.Cell>{rowData.errorMessage}</Table.Cell>
        <Table.Cell>{rowData.productNumber}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.description)}</Table.Cell>
        <Table.Cell>{rowData.warranty}</Table.Cell>
        <Table.Cell>{rowData.warrantyDurationType}</Table.Cell>
        <Table.Cell>{rowData.qty}</Table.Cell>
        <Table.Cell>{rowData.brandName}</Table.Cell>
        <Table.Cell>{rowData.subBrandName}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelBOQUploadFailedTableRow;
