import React from 'react';
import { Table } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import IUsageDashboardDetailRow from 'selectors/aws-billing/models/UsageDashboardTable/IUsageDashboardTableRow';

interface IProps {
  readonly rowData: IUsageDashboardDetailRow;
}

const UsageTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;
 
  return (
    <>
    <Table.Row  >
        <Table.Cell></Table.Cell>
        <Table.Cell>
            {rowData.so}
        </Table.Cell>
        <Table.Cell>{rowData.oiNo}</Table.Cell>
        <Table.Cell>{rowData.lprNumber}</Table.Cell>
        <Table.Cell>{rowData.cbvNumber}</Table.Cell>
        <Table.Cell>{rowData.usageAmount?.toLocaleString()}</Table.Cell>
        <Table.Cell>{rowData.necessity}</Table.Cell>
        <Table.Cell> {ReactHtmlParser(rowData.resources)} </Table.Cell>
        <Table.Cell> {ReactHtmlParser(rowData.notes)} </Table.Cell>
        <Table.Cell> {rowData.createdDate} </Table.Cell>
        <Table.Cell> {rowData.createdBy} </Table.Cell>
    </Table.Row>
    </>
  );
};

export default UsageTableRow;
