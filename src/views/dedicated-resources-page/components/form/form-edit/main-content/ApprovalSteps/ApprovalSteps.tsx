import IStore from 'models/IStore';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Grid } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import * as ButtonToggle from 'stores/funnel-sales-analyst/button-toggle/ButtonToggleActions';
import './ApprovalSteps.scss';
import RowWorkFlowDedicatedResources from './components/RowWorkFlowDedicatedResources';
import WorkFlowHeaderModel from 'stores/dedicated-resources/models/WorkFlowHeaderModel';

interface IProps {
  WorkFlowHeader: any;
}

const ApprovalSteps: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { WorkFlowHeader } = props;
  const dispatch: Dispatch = useDispatch();

  const btnWorkFlow: boolean = useSelector((state: IStore) => state.buttonToggle.bOpen);

  return (
    <Grid stackable padded className="container-work-flow">
      {/* <Grid.Row className={!btnWorkFlow ? `content-row hide` : `content-row `}>
        <Grid.Column>
            <RowWorkFlowDedicatedResources item="commercial" dataWorflow={commercialWorkflow} />
          <RowWorkFlow item="commercial" dataWorflow={commercialWorkflow} />
        </Grid.Column>
      </Grid.Row> */}
      <Grid.Row className={!btnWorkFlow ? `content-row hide` : `content-row `}>
        <Grid.Column>
            <RowWorkFlowDedicatedResources item="Service" dataWorflow={WorkFlowHeader} />
        </Grid.Column>
      </Grid.Row>
      <div className="toggle-wrap">
        <Button
          className="button-toggle"
          color="blue"
          onClick={() => {
            btnWorkFlow ? dispatch(ButtonToggle.CLOSE()) : dispatch(ButtonToggle.OPEN());
          }}
        >
          {btnWorkFlow ? (
            <Icon name="chevron up" />
          ) : (
            <>
              Approval Steps <Icon name="chevron down" />
            </>
          )}
        </Button>
      </div>
    </Grid>
  );
};

export default ApprovalSteps;
