
import React, { useEffect, Fragment } from 'react'
import { Grid, Divider, Header} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions'
import IStore from 'models/IStore';
import {
    AdminForm,
    RequesterForm,CustInfoForm
} from './components'
import Attachment from 'views/attachment-page/Attachment';
import { selectBankGaransi } from 'selectors/bank-garansi/BankGaransiSelector';
import moment from 'moment';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import BankGaransiHistory from 'views/bank-garansi-page/components/history/BankGaransiHistory'

interface IProps {
    bankGuaranteeGenID:number
}

const BankGaransiFormEdit:React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch:Dispatch = useDispatch();
    const bRefreshPage: boolean = useSelector((state: IStore) => state.serviceCatalog.refreshPage);
    
    useEffect(() => {
        dispatch(BankGaransiActions.requestBankGaransiById(props.bankGuaranteeGenID))
    }, [dispatch]); 

    const bankGaransi = useSelector((state:IStore) => selectBankGaransi(state));
    const viewFunnelCustomer = useSelector((state:IStore) =>selectViewFunnelCustomer(state));

    return(
        <Fragment>
            <Header>
                <Grid >
                    <Grid.Row columns={1}>
                        <Grid.Column width={16} >
                            <Header>
                                <Header.Content>
                                BG#{bankGaransi.bankGuaranteeNo} for Project Name {viewFunnelCustomer.projectName}
                                    <Header.Subheader>
                                    Status: {bankGaransi.status},Last Update on {moment(bankGaransi.modifyDate).format('DD-MM-yyyy')} by {bankGaransi.modifyUserID}
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Header>
            <Divider/>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <AdminForm />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <RequesterForm />
                    </Grid.Column>               
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <CustInfoForm />
                    </Grid.Column>               
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Attachment modul={2} isLocalFirst={false} funnelGenID={viewFunnelCustomer.funnelGenID.toString()} popupLevel={3} />              
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <BankGaransiHistory DocNumber={bankGaransi.bankGuaranteeNo}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        
        </Fragment>
        
    );
}

export default BankGaransiFormEdit