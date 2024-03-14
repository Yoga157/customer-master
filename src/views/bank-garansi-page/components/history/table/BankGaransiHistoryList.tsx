import React, {useEffect, useState } from 'react';
import { Grid,Select, Divider, Input, Item } from 'semantic-ui-react';
import { CheckBox } from 'views/components/UI';
//import FunnelActivitiesItems from './table-row/FunnelActivitiesItems';
import BankGaransiHistoryItems from './table-row/BankGaransiHistoryItems';
import IFunnelActivityItem from 'selectors/funnel-activity/models/IFunnelActivitiesItem';
import { useSelector, useDispatch } from 'react-redux';
import { selectActivityTypeOptions } from 'selectors/select-options/ActivityTypeSelector';
import IStore from 'models/IStore';
import * as ActivityTypeActions from 'stores/activity-type/ActivityTypeActions';
import { Dispatch } from 'redux';
import * as FunnelActivityActions from 'stores/funnel-activity/FunnelActivityActions';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { selectFunnelActivities } from 'selectors/funnel-activity/FunnelActivitySelector';
import { selectHistory } from 'selectors/bank-garansi/BankGaransiSelector';
import FunnelActivitySearch from 'stores/funnel-activity/models/FunnelActivitySearch';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  DocNumber:string;
}

const BankGaransiHistoryList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch:Dispatch = useDispatch();
  const{ DocNumber } = props;
  const [excludeActivity, setExcludeActivity] = useState(true);
  const [activityType, setActivityType] = useState(0);
  const [searchText, setSearchText] = useState('');
  const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(ActivityTypeActions.requestActivityType())
    dispatch(BankGaransiActions.requestHistoryBG(DocNumber));
    onChangeSearch('','');
  }, [dispatch]);

  const onExcludeActivity = (e:any, data:any )=> {
    setExcludeActivity(data.checked)

    var searchObject = new FunnelActivitySearch({});
    searchObject.activityType = activityType;
    searchObject.excludeSystemActivity = (data.checked ? 1 : 0 )
    searchObject.salesID = currentUser.employeeID;
    //searchObject.funnelGenID = funnelGenID;
    searchObject.text = searchText;
    //dispatch(FunnelActivityActions.postFunnelActivitieSearch(searchObject));

  }

  const onChangeActivity = (event:any, data:any) =>{
    if(data.value === "")
    {
      setActivityType(0);
    }else{
      setActivityType(data.value);
    }

    var searchObject = new FunnelActivitySearch({});
    searchObject.activityType = (data.value === "" ? 0 : data.value);
    searchObject.excludeSystemActivity = excludeActivity ? 1 : 0 
    searchObject.salesID = currentUser.employeeID;
    //searchObject.funnelGenID = funnelGenID;
    searchObject.text = searchText;
    //dispatch(FunnelActivityActions.postFunnelActivitieSearch(searchObject));

  }

  const onChangeSearch = (event:any, data:any) => {

      setSearchText(data.value);
       var searchObject = new FunnelActivitySearch({});
       searchObject.activityType = activityType;
       searchObject.excludeSystemActivity = (excludeActivity ? 1 : 0 )
       searchObject.salesID = currentUser.employeeID;
       searchObject.text = (data.value === 'undefined' ? '' : data.value) ;
       //searchObject.funnelGenID = funnelGenID;
       //dispatch(FunnelActivityActions.postFunnelActivitieSearch(searchObject));

}


  const filterOptions = useSelector((state:IStore) => selectActivityTypeOptions(state));
  const tableData = useSelector((state:IStore) =>selectHistory(state,[BankGaransiActions.REQUEST_HISTORY_BG]));                    
      
  return (
    <Grid >
        <Grid.Row className='ContainerMax500 mt-0 p-0'>
            <Grid.Column>
              <Item.Group>
                  {tableData.map((model: any) => (
                        <BankGaransiHistoryItems key={model.docNumber} rowData={model}  />
                  ))}
                    
              </Item.Group>
            </Grid.Column>
        </Grid.Row>
    </Grid>
  );
};

export default BankGaransiHistoryList;
