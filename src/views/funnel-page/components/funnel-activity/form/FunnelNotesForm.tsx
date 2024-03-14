import React, { Fragment } from 'react';
import { Grid, Form, Divider, Card } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { RichTextEditor, Button } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as FunnelActivityActions from 'stores/funnel-activity/FunnelActivityActions';
import { Dispatch } from 'redux';
import FunnelNotesModel from 'stores/funnel-activity/models/FunnelNotesModel';
import { combineValidators, isRequired } from 'revalidate';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelSearch from 'stores/funnel/models/FunnelSearch';

interface IProps {
  funnelGenID: string;
  fromForm: string;
}

const FunnelNotesForm: React.FC<IProps> = ({ funnelGenID, fromForm }) => {
  const dispatch: Dispatch = useDispatch();

  const bRefreshActivity: boolean = useSelector((state: IStore) => state.funnelActivity.refreshPage);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshFunnel: boolean = useSelector((state: IStore) => state.funnel.refreshPage);
  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);
  const search: FunnelSearch = useSelector((state: IStore) => state.funnel.data.search);

  const onSubmitHandler = (values: any) => {
    const funnelNotes = new FunnelNotesModel(values);
    funnelNotes.funnelGenID = +funnelGenID;
    funnelNotes.createUserID = currentUser.employeeID;
    dispatch(FunnelActivityActions.postFunnelNotes(funnelNotes));
  };

  const validate = combineValidators({
    notes: isRequired('Notes'),
  });

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelActivityActions.REQUEST_POST_FUNNEL_NOTES]));

  if (bRefreshActivity) {
    dispatch(FunnelActivityActions.requestFunnelActivities(+funnelGenID));
    if (fromForm === 'FormCancel') {
      dispatch(FunnelActions.delFunnel(+funnelGenID, currentUser.employeeID));
    }
  }

  if (bRefreshFunnel) {
    if (fromForm === 'FormCancel') {
      if (search !== null) {
        dispatch(FunnelActions.requestSearchFunnel(currentUser.employeeID, search.text, 1, 15, 'funnel', 'funnelGenID', 'descending'));
      } else if (filter !== null) {
        const filterNew = new FunnelFilter(filter);
        filterNew.pageSize = 15;
        filterNew.page = 1;
        filterNew.column = 'funnelGenID';
        filterNew.sorting = 'descending';
        filterNew.type = 'funnel';
        dispatch(FunnelActions.postFunnelFilter(filterNew));
      } else {
        dispatch(FunnelActions.requestFunnel(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', 'funnel', 1, 15));
      }

      dispatch(FunnelActions.requestViewFunnelStatusById(+funnelGenID));
      dispatch(ModalFirstLevelActions.CLOSE());
    }
  }

  return (
    <Fragment>
      {fromForm === 'FormCancel' && (
        <Fragment>
          <Card.Header>Reason</Card.Header>
          <Divider></Divider>
        </Fragment>
      )}

      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        validate={validate}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid padded>
              <Grid.Row columns={1} className="pb-0">
                <Grid.Column className="pb-0">
                  <Field name="notes" component={RichTextEditor} placeholder="Notes" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button className="mt-1  mb-2r mr-1" floated="right" color="blue" size="small" disabled={invalid || pristine || isRequesting}>
              Submit
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default FunnelNotesForm;
