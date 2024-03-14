import React, {useEffect, useState } from 'react';
import { Grid, Item } from 'semantic-ui-react';
import UserListItems from './UserListItems';
import IFunnelActivityItem from 'selectors/funnel-activity/models/IFunnelActivitiesItem';
import { useSelector, useDispatch } from 'react-redux';
import { selectActivityTypeOptions } from 'selectors/select-options/ActivityTypeSelector';
import IStore from 'models/IStore';
import * as ActivityTypeActions from 'stores/activity-type/ActivityTypeActions';
import { Dispatch } from 'redux';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { selectFunnelActivities } from 'selectors/funnel-activity/FunnelActivitySelector';
import { selectActivity } from 'selectors/customer-credit-service/CustomerCreditServiceSelector';
import FunnelActivitySearch from 'stores/funnel-activity/models/FunnelActivitySearch';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as CustomerCreditActions from 'stores/customer-credit-service/CustomerCreditActions';

interface IProps {
  salesID:number;
}

const UserList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch:Dispatch = useDispatch();
  const{ salesID } = props;
  const [excludeActivity, setExcludeActivity] = useState(true);
  const [activityType, setActivityType] = useState(0);
  const [searchText, setSearchText] = useState('');
  const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(ActivityTypeActions.requestActivityType())
    dispatch(CustomerCreditActions.requestActivity(salesID));
    onChangeSearch('','');
  }, [dispatch]);

  const onExcludeActivity = (e:any, data:any )=> {
    setExcludeActivity(data.checked)

    var searchObject = new FunnelActivitySearch({});
    searchObject.activityType = activityType;
    searchObject.excludeSystemActivity = (data.checked ? 1 : 0 )
    searchObject.salesID = currentUser.employeeID;
    searchObject.text = searchText;
  }

  const onChangeSearch = (event:any, data:any) => {

      setSearchText(data.value);
       var searchObject = new FunnelActivitySearch({});
       searchObject.activityType = activityType;
       searchObject.excludeSystemActivity = (excludeActivity ? 1 : 0 )
       searchObject.salesID = currentUser.employeeID;
       searchObject.text = (data.value === 'undefined' ? '' : data.value) ;

}

  const filterOptions = useSelector((state:IStore) => selectActivityTypeOptions(state));
  const tableData = useSelector((state:IStore) =>selectActivity(state,[CustomerCreditActions.REQUEST_ACTIVITIES]));                    
      
  return (
    <Grid >
        <Grid.Row className='ContainerMax500 mt-0 p-0'>
            <Grid.Column>
              <Item.Group>
                  {tableData.map((model: any) => (
                      <UserListItems key={model.funnelActivityID} rowData={model}  />
                  ))}
                    
              </Item.Group>
            </Grid.Column>
        </Grid.Row>
    </Grid>
  );
};

export default UserList;
