import IStore from 'models/IStore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Grid } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import * as ButtonToggle from 'stores/funnel-sales-analyst/button-toggle/ButtonToggleActions';
import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import RowWorkFlow from './components/RowWorkFlow';
// import { selectFunnelAnalysWorkflow } from 'selectors/funnel-sa/FunnelSalesAnalysWorkflow';
import './ApprovalSteps.scss';

interface IProps {
  funnelGenID: string;
}

const ApprovalSteps: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { funnelGenID } = props;
  const dispatch: Dispatch = useDispatch();

  const btnWorkFlow: boolean = useSelector((state: IStore) => state.buttonToggle.bOpen);

  const commercialWorkflow = useSelector((state: IStore) => state.funnelSalesAnalyst.listWorkFlow?.resultObj?.commercialWorkflow);
  const serviceWorkflow = useSelector((state: IStore) => state.funnelSalesAnalyst.listWorkFlow?.resultObj?.serviceWorkflow);

  useEffect(() => {
    dispatch(FunnelSalesAnalystActions.requestGetFunnelAnalystWorkflow(+funnelGenID));
  }, []);

  return (
    <Grid stackable padded className="container-work-flow">
      <Grid.Row className={!btnWorkFlow ? `content-row hide` : `content-row `}>
        <Grid.Column>
          <RowWorkFlow item="commercial" dataWorflow={commercialWorkflow} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={!btnWorkFlow ? `content-row hide` : `content-row `}>
        <Grid.Column>
          <RowWorkFlow item="Service" dataWorflow={serviceWorkflow} />
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
