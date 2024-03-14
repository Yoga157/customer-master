import React, { useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { Pagination } from 'views/components/UI';
import AWSCredentialSplitPerformanceTable from './table/AWSCredentialSplitPerformanceTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import SearchAwsCredit from './search/SearchAwsCredit';
import * as UserActions from 'stores/users/UserActions';
import * as AWSCredentialActions from 'stores/aws-credential/AWSCredentialActions';
import IAWSCredentialTable from 'selectors/aws-credential/models/IAWSCredentialTable';
import { selectAWSCredentials } from 'selectors/aws-credential/AWSCredentialServiceSelector';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import './AWSCredentialPageStyle.scss';
import * as AWSBillingActions from 'stores/aws-billing/AWSBillingActions';

interface IProps {
  
}
const AWSCredentialPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(AWSCredentialActions.requestAWSCredentials(currentUser.employeeID, searchText ? searchText : '',direction,columns, data.activePage, pageSize))
  };

  const [activePage, setActivePage] = useState(1);
  const [pageSize] = useState(15);
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const AwsCredentialTables: IAWSCredentialTable = useSelector((state: IStore) => selectAWSCredentials(state));
  const result: any = useSelector((state: IStore) => state.awsCredentital.resultActions);

  useEffect(() => {
    dispatch(AWSBillingActions.requestAWSBillingPermission())
    dispatch(UserActions.requestCurrentUser())
    dispatch(AWSCredentialActions.requestAWSCredentials(currentUser.employeeID, '','descending','createdDate', activePage, pageSize))
  }, [dispatch])

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AWSCredentialActions.REQUEST_AWS_CREDENTIAL
    ])
  );
  let searchType = '';

  
  useEffect(() => {
    if (result.errorNumber === "0") {
      dispatch(AWSCredentialActions.removeResult())
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
      dispatch(AWSCredentialActions.requestAWSCredentials(currentUser.employeeID,'','descending','createdDate', activePage, pageSize))
    } else if (result.errorNumber === "666") {
      dispatch(AWSCredentialActions.removeResult())
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Warning));
    }
  },[result])

  return (
    <LoadingIndicator isActive={isRequesting}>
      
        <Grid >
          <Grid.Column textAlign="center">
            <SearchAwsCredit setSearchText={setSearchText} searchText={searchText} pageSize={pageSize} page={activePage} searchType={searchType}  />
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} className="title-w-toggle">
          <Header as="h4" className="d-in-flex-w-toggle">
            <Header.Content>
              AWS Credential
            </Header.Content>
          </Header>
          </Grid.Column>
        </Grid>

        <Grid>
          <Grid.Row>
            <Grid.Column>
              <div  className="wrapper-table mb-1r">
                <AWSCredentialSplitPerformanceTable
                activePage={activePage}
                setActivePage={setActivePage}
                columns={columns}
                setColumns={setColumns}
                direction={direction}
                setDirection={setDirection}
                pageSize={pageSize}
                 tableData={AwsCredentialTables}  />
              </div>
              <Pagination
                activePage={activePage}
                onPageChange={(e, data) => handlePaginationChange(e, data)}
                totalPage={AwsCredentialTables.totalRows}
                pageSize={pageSize}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </LoadingIndicator>
  );
};

export default AWSCredentialPage;
