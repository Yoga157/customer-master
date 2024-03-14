import React, { useState } from 'react';
import AWSCredentialSplitPerformanceTableRow from './table-row/AWSCredentialSplitPerformanceTableRow';
import RowFormAWSCredentialSplit from '../form/form-create/RowFormAWSCredentialSplit';
import { Table, Label } from 'semantic-ui-react';
import IAWSCredentialTable from 'selectors/aws-credential/models/IAWSCredentialTable';
import IAWSCredentialTableRow from 'selectors/aws-credential/models/IAWSCredentialTableRow';
import * as AWSCredentialActions from 'stores/aws-credential/AWSCredentialActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';

interface IProps {
  readonly tableData: IAWSCredentialTable;
  activePage: number;
  setActivePage:any;
  columns: string;
  setColumns: any;
  direction: any;
  setDirection: any;
  pageSize: number;
}
const AWSCredentialSplitPerformanceTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData, activePage, setActivePage,pageSize, columns, setColumns, direction, setDirection } = props 
  const dispatch: Dispatch = useDispatch();
  const [data, setData] = useState({})
  const [getAwsId, setGetAwsId] = useState('')
  const [type, setType] = useState('')
  const GetData = (item) => {
    setGetAwsId(item.awsid)
    setType('edit')
    setData(item)
  }
 
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state))
  // const [pageSize] = useState(15);
  // const [activePage, setActivePage] = useState(1);
  
  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    dispatch(AWSCredentialActions.requestAWSCredentials(currentUser.employeeID,'',direction === 'ascending' ? 'descending' : 'ascending',columns,activePage,pageSize));
  };
 
  return (
    <Table sortable striped id="servicecatalog">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'awsid' ? direction : null} onClick={() => reloads('awsid')} textAlign="center">AWS ID <Label style={{color:'red', backgroundColor:"#9d9aef", padding: 0}}>*</Label></Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'accessKey' ? direction : null} onClick={() => reloads('accessKey')} textAlign="center">Access Key <Label style={{color:'red', backgroundColor:"#9d9aef", padding: 0}}>*</Label></Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'secretKey' ? direction : null} onClick={() => reloads('secretKey')} textAlign="center">Secret Key <Label style={{color:'red', backgroundColor:"#9d9aef", padding: 0}}>*</Label></Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'notes' ? direction : null} onClick={() => reloads('notes')} textAlign="center">Note</Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'createdDate' ? direction : null} onClick={() => reloads('createdDate')} textAlign="center">Created Date</Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'createdBy' ? direction : null} onClick={() => reloads('createdBy')} textAlign="center">Created By</Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'modifiedDate' ? direction : null} onClick={() => reloads('modifiedDate')} textAlign="center">Modified Date</Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'modifiedBy' ? direction : null} onClick={() => reloads('modifiedBy')} textAlign="center">Modified By</Table.HeaderCell>
          <Table.HeaderCell textAlign="center"></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <RowFormAWSCredentialSplit enableRow="" rowData={data} type={type} indexItem={1} />

        {tableData.rows && tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {
          tableData.rows && tableData.rows.map((model: IAWSCredentialTableRow, index: number) => (
            <AWSCredentialSplitPerformanceTableRow rowData={model} />
          ))
        }
      </Table.Body>
    </Table>
  );
};

export default AWSCredentialSplitPerformanceTable;
