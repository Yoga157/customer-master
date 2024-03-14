import React, { useEffect } from 'react';
import { RouteComponentProps, useLocation, withRouter } from 'react-router-dom';
import { Card, Grid, Header } from 'semantic-ui-react';
import { History, LocationState } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';

import * as FunnelActions from 'stores/funnel/FunnelActions';
import { selectHeaderPss } from 'selectors/pss/PssSelectors';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import BreadCumb from '../components/breadcumb/BreadCumb';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as PssActions from 'stores/pss/PSSActions';
import IndexForm from './IndexForm';
import PMOEditStatusHook from '../pmo-view-detail/components/pmo-edit-status/hooks/PMOEditStatusHook';

interface RouteParams {
  // funnelGenID: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const ProjectScopeStatement: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const result = useSelector((state: IStore) => state.pss.resultActions);
  const pss = useSelector((state: IStore) => selectHeaderPss(state));
  const { getProjectStatus } = PMOEditStatusHook({
    projectId: state.projectId,
  });

  useEffect(() => {
    if (result?.errorNumber === '0') {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
      dispatch(PssActions.removeResult());
    } else if (result?.errorNumber === '666') {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Error));
      dispatch(PssActions.removeResult());
    }
  }, [dispatch, result]);

  useEffect(() => {
    if (+state?.projectId !== 0 && !+state?.projectId) {
      props.history.push(`/pmo`);
    }
    getProjectStatus();
  }, [location]);
  return (
    <>
      {state.page === 'pss-list' ? (
        <BreadCumb link={`/project-scope-list/${state.funnelGenID}`} title={'Back to PSS List'} />
      ) : state.page === 'funnel-view-edit' ? (
        <BreadCumb link={`/funnel-form/${state.funnelGenID}`} title={'Back to View/Edit'} />
      ) : (
        <BreadCumb link={`/pmo-view/${state.funnelGenID}/${state.projectId}`} title={'Back to View/Edit'} />
      )}

      <Header as="h3" className="mt-1n5r mb-1n5r text-gray">
        Create Project Scope Statement - {pss.projectName}
      </Header>
      <Grid stackable columns={2} className=" pb-1" centered>
        <IndexForm />
      </Grid>
    </>
  );
};

export default withRouter(ProjectScopeStatement);
