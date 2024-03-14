import React, {  useEffect } from 'react'
import { Grid, Header,Divider } from 'semantic-ui-react'
import BankGaransiHistoryList from './table/BankGaransiHistoryList'
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Dispatch } from 'redux';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';

interface IProps {
    DocNumber:string
}


const BankGaransiHistory: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch:Dispatch = useDispatch();
    const { DocNumber } = props;
    
   /*  useEffect(() => {
        dispatch(FunnelActivityActions.requestFunnelActivities(+funnelGenID));
      }, [dispatch, funnelGenID]); */


    let isRequesting: boolean = useSelector((state: IStore) => 
    selectRequesting(state, 
        [
            /* FunnelActivityActions.REQUEST_POST_FUNNEL_NOTES,
            FunnelActivityActions.REQUEST_FUNNEL_ACTIVITIES */
        ])); 

    return(
            <LoadingIndicator isActive={isRequesting}>
                <Grid padded>
                        <Grid.Row className='pb-0'>
                            <Grid.Column>
                                <Divider/>
                                <Header className='ml-m-1r' as='h4'>
                                    <Header.Content>
                                        History
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                     
                        <Grid.Row>
                            <Grid.Column className='pt-0'>
                                <BankGaransiHistoryList DocNumber={DocNumber}/>
                            </Grid.Column>
                        </Grid.Row>
                </Grid>
            </LoadingIndicator>
           
    );
}

export default BankGaransiHistory
