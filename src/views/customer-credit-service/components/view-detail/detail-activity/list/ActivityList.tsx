import React, {  useEffect } from 'react'
import { Grid, Header,Divider } from 'semantic-ui-react'
import UserList from './UserList'
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Dispatch } from 'redux';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import * as CustomerCreditActions from 'stores/customer-credit-service/CustomerCreditActions';

interface IProps {
    salesID:number
}

const ActivityList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch:Dispatch = useDispatch();
    const { salesID } = props;
    
    let isRequesting: boolean = useSelector((state: IStore) => 
    selectRequesting(state, 
        [
          CustomerCreditActions.REQUEST_INSERT_ACTIVITY,
          CustomerCreditActions.REQUEST_ACTIVITIES 
        ])); 

    return(
      <LoadingIndicator isActive={isRequesting}>
          <Grid padded>
                  <Grid.Row>
                      <Grid.Column className='pt-0'>
                          <UserList salesID={+salesID}/>
                      </Grid.Column>
                  </Grid.Row>
          </Grid>
      </LoadingIndicator>
           
    );
}

export default ActivityList
