import React, { useEffect, useState } from 'react';
import { Grid, Select, Divider, Input, Item } from 'semantic-ui-react';
import { CheckBox, InfoInputEnter } from 'views/components/UI';
import FunnelActivitiesItems from './table-row/FunnelActivitiesItems';
import IFunnelActivityItem from 'selectors/funnel-activity/models/IFunnelActivitiesItem';
import { useSelector, useDispatch } from 'react-redux';
import { selectActivityTypeOptions } from 'selectors/select-options/ActivityTypeSelector';
import IStore from 'models/IStore';
import * as ActivityTypeActions from 'stores/activity-type/ActivityTypeActions';
import { Dispatch } from 'redux';
import * as FunnelActivityActions from 'stores/funnel-activity/FunnelActivityActions';
import { selectFunnelActivities } from 'selectors/funnel-activity/FunnelActivitySelector';
import FunnelActivitySearch from 'stores/funnel-activity/models/FunnelActivitySearch';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  funnelGenID: number;
}

const FunnelActivitiesList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { funnelGenID } = props;
  const [excludeActivity, setExcludeActivity] = useState(true);
  const [activityType, setActivityType] = useState(0);
  const [searchText, setSearchText] = useState('');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(ActivityTypeActions.requestActivityTypeAll());
    //dispatch(FunnelActivityActions.requestFunnelActivities(funnelGenID));
  }, [dispatch]);

  const onExcludeActivity = (e: any, data: any) => {
    setExcludeActivity(data.checked);

    const searchObject = new FunnelActivitySearch({});
    searchObject.activityType = activityType;
    searchObject.excludeSystemActivity = data.checked ? 1 : 0;
    searchObject.salesID = currentUser.employeeID;
    searchObject.funnelGenID = funnelGenID;
    searchObject.text = searchText;
    dispatch(FunnelActivityActions.postFunnelActivitieSearch(searchObject));
  };

  const onChangeActivity = (event: any, data: any) => {
    if (data.value === '') {
      setActivityType(0);
    } else {
      setActivityType(data.value);
    }

    const searchObject = new FunnelActivitySearch({});
    searchObject.activityType = data.value === '' ? 0 : data.value;
    searchObject.excludeSystemActivity = excludeActivity ? 1 : 0;
    searchObject.salesID = currentUser.employeeID;
    searchObject.funnelGenID = funnelGenID;
    searchObject.text = searchText;
    dispatch(FunnelActivityActions.postFunnelActivitieSearch(searchObject));
  };

  const onChangeSearch = (data: any) => {
    setSearchText(data.value.trim());
  };

  const filterOptions = useSelector((state: IStore) => selectActivityTypeOptions(state));
  const tableData = useSelector((state: IStore) =>
    selectFunnelActivities(state, [FunnelActivityActions.REQUEST_FUNNEL_ACTIVITIES, FunnelActivityActions.REQUEST_POST_FUNNEL_NOTES])
  );

  return (
    <Grid>
      <Grid.Row columns={3}>
        <Grid.Column className="FullGrid1200" width={8}>
          <Input
            className="darkerBorder"
            fluid
            icon="search"
            placeholder="Search..."
            onChange={(e, data) => {
              onChangeSearch(data);
            }}
            onKeyPress={(event) => {
              if (event.charCode === 13) {
                const searchObject = new FunnelActivitySearch({});
                searchObject.activityType = activityType;
                searchObject.excludeSystemActivity = excludeActivity ? 1 : 0;
                searchObject.salesID = currentUser.employeeID;
                searchObject.text = searchText === 'undefined' ? '' : searchText;
                searchObject.funnelGenID = funnelGenID;
                dispatch(FunnelActivityActions.postFunnelActivitieSearch(searchObject));
              }
            }}
          />
          {searchText.length === 0 && (
            <div style={{ marginTop: 13 }}>
              <InfoInputEnter />
            </div>
          )}
        </Grid.Column>
        <Grid.Column className="HalfGrid1200 FullGrid767 mt-1r-1200" width={4}>
          <Select placeholder="Show by activity type" options={filterOptions} onChange={onChangeActivity} clearable />
        </Grid.Column>
        <Grid.Column className="HalfGrid1200 FullGrid767 mt-1r-1200" width={4}>
          <CheckBox label="Exclude System Activity" onChange={onExcludeActivity} defaultChecked={excludeActivity} />
        </Grid.Column>
      </Grid.Row>
      {/* <Divider horizontal/> */}
      <Grid.Row className="ContainerMax500 mt-0 p-0">
        <Grid.Column>
          <Item.Group>
            {tableData.map((model: IFunnelActivityItem) => (
              <FunnelActivitiesItems key={model.funnelActivityID} rowData={model} />
            ))}
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FunnelActivitiesList;
