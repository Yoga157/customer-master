import React, { useEffect, useState } from 'react';
import { Grid, Header, Button, Message, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import moment from 'moment';

import PostQuotaTeamModel, { quotaTeams } from 'stores/quota/models/PostQuotaTeamModel';
import * as ReportManagerActions from 'stores/report-manager/ReportManagerActions';
import { selectReportItem } from 'selectors/report-manager/ReportManagerSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectQuotaMasterTeam } from 'selectors/quota/QuotaSelectors';
import RemainderOwnQuota from './components/childs/RemainderOwnQuota';
import QuotaMasterModel from 'stores/quota/models/QuotaMasterModel';
import AccordionRowParent from './components/AccordionRowParent';
import IUserResult from 'selectors/user/models/IUserResult';
import * as QuotaActions from 'stores/quota/QuotaActions';
import { Tooltips } from 'views/components/UI';
import './AccordionListStyle.scss';
import IStore from 'models/IStore';

type Props = {
  currentUser: IUserResult;
  quotaMasterMyOwn: any;
  isSearch: string;
};

const AccordionNested = ({ currentUser, quotaMasterMyOwn, isSearch }: Props) => {
  const dispatch: Dispatch = useDispatch();
  const [mustFullDistributed, setMustFullDistributed] = useState('');
  const [disableComponent, setDisableComponent] = useState(true);
  const [disableBtnSave, setDisableBtnSave] = useState(true);
  const [sortName, setSortName] = useState('descending');
  const [sortGpm, setSortGpm] = useState('descending');
  const [onChangeRow, setOnchangeRow] = useState({});
  const [canceled, setCanceled] = useState(false);
  const [udcid, setUdcid] = useState(0);
  const quotaHeader = useSelector((state: IStore) => state.quota.quotaHeader[0]);

  const quotaMasterMyTeam: QuotaMasterModel[] = useSelector((state: IStore) => selectQuotaMasterTeam(state));
  const reportItem = useSelector((state: IStore) => selectReportItem(state, [ReportManagerActions.REQUEST_REPORT_ITEM]));

  const onHandleSubmit = () => {
    const localData = localStorage.getItem('@myTeamQuota');
    if (localData) {
      const newItem = new PostQuotaTeamModel({});
      newItem.salesID = currentUser.employeeID;
      newItem.salesDomain = currentUser.userName;
      newItem.effectiveDate = new Date();
      newItem.createUserID = currentUser.employeeID;
      newItem.quotaTeams = JSON.parse(localData);

      dispatch(QuotaActions.postQuotaMyTeam(newItem)).then(() => {
        dispatch(QuotaActions.getQuotaMasterMyTeamQuota(currentUser.userName, `${new Date().getFullYear()}`, 'SalesName', 'ascending'));
        dispatch(QuotaActions.getReportSummarySharedQuota(quotaMasterMyOwn?.salesDomain, new Date().getFullYear()));
        setDisableComponent(true);
      });
    }
  };

  const handleSort = (collumn: string, sort: string) => {
    dispatch(QuotaActions.getQuotaMasterMyTeamQuota(currentUser.userName, `${new Date().getFullYear()}`, collumn, sort));
    if (collumn === 'SalesName') {
      setSortName(sort === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortGpm(sort === 'ascending' ? 'descending' : 'ascending');
    }
  };

  const handleEdit = () => {
    setCanceled(false);
    // localStorage.removeItem('@myTeamQuota');
    setDisableComponent(!disableComponent);
  };

  const handleCancel = () => {
    // localStorage.removeItem('@myTeamQuota');
    setCanceled(true);
    setDisableComponent(true);
  };

  const handlerMustValidate = (newItem: quotaTeams) => {
    setOnchangeRow(newItem);

    const mustFull = quotaMasterMyOwn?.mustFullDistributed;
    // let mustFull = 0;

    const localValue = localStorage.getItem('@myTeamQuota');

    if (JSON.parse(localValue)?.length > 0) {
      if (newItem.quotaGPM !== undefined && newItem.quotaSelling !== undefined) {
        const newArr = JSON.parse(localValue).filter((e) => e.salesID !== newItem.salesID);
        localStorage.setItem('@myTeamQuota', JSON.stringify([...newArr, newItem]));

        const itemAll = [...newArr, newItem];
        const sumQuota = itemAll.reduce((a, b) => ({ quotaGPM: a.quotaGPM + b.quotaGPM }));
        const sumSelling = itemAll.reduce((a, b) => ({ quotaSelling: a.quotaSelling + b.quotaSelling }));

        if (mustFull) {
          if (quotaMasterMyOwn?.quotaSelling === 0 && quotaMasterMyOwn?.quotaGPM === 0) {
            setDisableBtnSave(true);
          } else if (quotaMasterMyOwn?.quotaSelling > 0) {
            if (sumQuota.quotaGPM >= quotaMasterMyOwn?.quotaGPM && sumSelling.quotaSelling >= quotaMasterMyOwn?.quotaSelling) {
              setDisableBtnSave(false);
              setMustFullDistributed('');
            } else {
              setDisableBtnSave(true);
              setMustFullDistributed('Must Full Distributed');
            }
          } else {
            if (sumQuota.quotaGPM >= quotaMasterMyOwn?.quotaGPM) {
              setDisableBtnSave(false);
              setMustFullDistributed('');
            } else {
              setDisableBtnSave(true);
              setMustFullDistributed('Must Full Distributed');
            }
          }
        } else {
          const newArr = itemAll.filter((e) => e.salesID !== currentUser.employeeID);

          const sumQuota = newArr.reduce((a, b) => ({ quotaGPM: a.quotaGPM + b.quotaGPM }));
          const sumSelling = newArr.reduce((a, b) => ({ quotaSelling: a.quotaSelling + b.quotaSelling }));

          if (quotaMasterMyOwn?.quotaGPM < sumQuota.quotaGPM || quotaMasterMyOwn?.quotaSelling < sumSelling.quotaSelling) {
            setDisableBtnSave(false);
          } else {
            setDisableBtnSave(false);
          }
        }
      } else {
        setDisableBtnSave(true);
      }
    }
  };

  useEffect(() => {
    dispatch(ReportManagerActions.requestReportItem(0));
    let arr = [];
    if (quotaMasterMyTeam.length > 0) {
      quotaMasterMyTeam.map((e: quotaTeams) => {
        arr = [
          ...arr,
          {
            quotaGPM: e.quotaGPM,
            quotaSelling: e.quotaSelling,
            salesID: e.salesID,
            salesDomain: e.salesDomain,
          },
        ];
      });
    }
    localStorage.setItem('@myTeamQuota', JSON.stringify(arr));
  }, [quotaMasterMyTeam]);

  useEffect(() => {
    localStorage.setItem('reportManager', JSON.stringify(reportItem));
    const udcId = reportItem.find((e: any) => e.text1?.toLowerCase().trim() === 'report quota brand sales')?.udcid;
    if (udcId) {
      setUdcid(udcId);
    }
  }, [reportItem]);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [QuotaActions.REQUEST_POST_QUOTA_MYTEAM]));

  return (
    <>
      {quotaMasterMyTeam?.length >= 1 && (
        <Grid columns="equal" className="item-opsi">
          <Grid.Column width={13} className="pt-2r" verticalAlign="middle">
            <Header as="h4">
              <Header.Content className="ml-1r-767">
                My Team Quota
                <Tooltips
                  content="Sort By Name"
                  trigger={
                    <Icon
                      name={sortName === 'descending' ? 'sort alphabet down' : 'sort alphabet up'}
                      className="ml-px-5 hover-pointer"
                      onClick={() => handleSort('SalesName', sortName)}
                    />
                  }
                />
                <Tooltips
                  content="Sort By Quota GPM"
                  trigger={
                    <Icon
                      name={sortGpm === 'descending' ? 'sort numeric down' : 'sort numeric up'}
                      className="ml-px-5 hover-pointer"
                      onClick={() => handleSort('QuotaGPM', sortGpm)}
                    />
                  }
                />
                <Link to={udcid > 0 ? `/report-page/${udcid}` : '/quota-setting'}>
                  <Tooltips content={`See All My Team Quota`} trigger={<Button color="blue" disabled={false} content="See All My Team Quota" />} />
                </Link>
              </Header.Content>
            </Header>
          </Grid.Column>
          {isSearch.length < 1 && (
            <Grid.Column width={3} className="pt-2r" verticalAlign="middle" textAlign="right">
              {disableComponent && +moment().format('X') < +moment(quotaHeader?.dateTime2 ? quotaHeader?.dateTime2 : 0).format('X') && (
                <Tooltips
                  content="Edit My Team Quota"
                  position="top right"
                  trigger={<Button circular icon="edit" color="google plus" onClick={() => handleEdit()} />}
                />
              )}
              {!disableComponent && (
                <>
                  <Tooltips
                    content="Cancel My Team Quota"
                    position="top right"
                    trigger={
                      <Button
                        circular
                        icon="close"
                        color="google plus"
                        onClick={() => {
                          handleCancel();
                        }}
                      />
                    }
                  />
                  <Tooltips
                    content={'Save My Team Quota'}
                    position="top right"
                    trigger={<Button disabled={disableBtnSave || isRequesting} circular icon="save" color="google plus" onClick={onHandleSubmit} />}
                  />
                </>
              )}
              <Message className="message-must-full" size="mini" compact floating warning hidden={mustFullDistributed === ''}>
                <Message.Header>{'Warning!!'}</Message.Header>
                <Message.Content>
                  <p>{mustFullDistributed}</p>
                </Message.Content>
              </Message>
            </Grid.Column>
          )}
        </Grid>
      )}

      {quotaMasterMyTeam?.length >= 1 && (
        <>
          {quotaMasterMyTeam
            .filter((e) => e.salesID !== currentUser.employeeID)
            .map((model: QuotaMasterModel, k) => {
              return (
                <AccordionRowParent
                  item={model}
                  key={k}
                  setDisableComponent={setDisableComponent}
                  handlerMustValidate={handlerMustValidate}
                  setDisableBtnSave={setDisableBtnSave}
                  disableComponent={disableComponent}
                  canceled={canceled}
                  isSearch={isSearch}
                />
              );
            })}

          {quotaMasterMyTeam
            .filter((e) => e.salesID === currentUser.employeeID)
            .map((model: QuotaMasterModel, k) => {
              return <RemainderOwnQuota model={model} onChangeRow={onChangeRow} />;
            })}
        </>
      )}
    </>
  );
};

export default AccordionNested;
