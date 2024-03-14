import React, { useEffect, useState,Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Dispatch } from 'redux';
import {Button,Pagination, Tooltips} from '../../components/UI';
import { Grid, Header} from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { format } from 'date-fns';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import IMasterInsuranceTable from 'selectors/bank-garansi/models/IMasterInsuranceTable';
import { selectMasterInsurance } from 'selectors/bank-garansi/BankGaransiSelector';
import MasterInsuranceTable from './components/table/MasterInsuranceTable';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import MasterInsuranceForm from 'views/bank-garansi-page/admin/components/form/insurance-form-create/MasterInsuranceForm';

interface IProps {
  //history:History
}

const MasterInsurancePage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);
  const activePage: number = useSelector((state: IStore) => state.bankGaransi.activePage);

  useEffect(() => {
    dispatch(BankGaransiActions.requestMasterInsurance(activePage,pageSize,""))
  }, [dispatch, activePage, pageSize]);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(BankGaransiActions.setActivePage(data.activePage));
    dispatch(BankGaransiActions.requestMasterInsurance(data.activePage, pageSize, ''));
    dispatch(SoftwareActions.requestSoftwares(activePage, pageSize));
  };

  const onAddNew = useCallback(
    (): void => {
       
      dispatch(ModalFirstLevelActions.OPEN(
          <MasterInsuranceForm />,ModalSizeEnum.Small));
    },
    [dispatch]
  );  

  let isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [SoftwareActions.REQUEST_SOFTWARES]));
  const insuranceTables: IMasterInsuranceTable = useSelector((state: IStore) => selectMasterInsurance(state,[BankGaransiActions.REQUEST_MASTER_INSURANCE]));

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
      <Grid columns='equal'>
        <Grid.Column  width={4}>
          <Header as='h4'>
            <Header.Content>
                Master Bond Issuer
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column>
            <Tooltips 
                content='Add New'
                trigger={
                  <Button 
                      className='m-05r'
                      icon='plus' 
                      color='yellow' 
                      disabled={false} 
                      floated="right" 
                      size='small' 
                      content='Add New'
                      onClick={onAddNew}
                  />
                }
            />
        </Grid.Column> 
      </Grid>
 
      <Grid columns='equal'>
        <Grid.Column>
            <MasterInsuranceTable tableData={insuranceTables}/> 
           
            <Pagination
                activePage={activePage}
                onPageChange={(e,data) => handlePaginationChange(e,data)}
                totalPage={insuranceTables.totalRow}
                pageSize={pageSize}
            />
        </Grid.Column>
      </Grid>
      </LoadingIndicator>
 
    </Fragment>
  );
};

export default MasterInsurancePage;
