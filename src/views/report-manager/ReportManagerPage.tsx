import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import InputSearch from './components/search/InputSearch';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import * as ReportManagerActions from 'stores/report-manager/ReportManagerActions';
import { WhiteSegment, HorizonScroll } from 'views/components/UI';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectReportCategory, selectReportItem } from 'selectors/report-manager/ReportManagerSelector';

interface IProps {}

const ReportManagerPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(ReportManagerActions.requestReportCategory());
    dispatch(ReportManagerActions.requestReportItem(0));
  }, []);
  const reportCategory = useSelector((state: IStore) => selectReportCategory(state, [ReportManagerActions.REQUEST_REPORT_CATEGORY]));
  const reportItem = useSelector((state: IStore) => selectReportItem(state, [ReportManagerActions.REQUEST_REPORT_ITEM]));
  const reportCategorys = reportCategory.filter((reportCategory) => {
    return reportCategory.text1 != 'Finance';
  });
  const onCategory = (id: number) => {
    dispatch(ReportManagerActions.requestReportItem(id));
  };
  const onSearch = () => {
    dispatch(ReportManagerActions.requestReportItem(0));
  };
  return (
    <Fragment>
      {/* <Grid columns="equal">
        <Grid.Column textAlign="center">
          <InputSearch />
        </Grid.Column>
      </Grid> */}
      <Grid columns="equal">
        <Grid.Column width={4}>
          <Header as="h4">
            <Header.Content className="ml-1r-767">Data Quality Report</Header.Content>
          </Header>
        </Grid.Column>
      </Grid>
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
      </Grid>
      <HorizonScroll category={reportCategorys} onClick={onCategory} onSearch={onSearch} />
      <WhiteSegment reportItem={reportItem} />
    </Fragment>
  );
};

export default ReportManagerPage;
