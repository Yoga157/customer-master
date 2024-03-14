import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { History } from 'history';
import classes from './KpiCard.module.scss';
// import FunnelForm from '../../../funnel-page/components/funnel-main/form/form-create/FunnelForm';
import KpiSettingForm from './form-create/KpiSettingForm';

interface RouteParams {
    id: string;
};

interface IProps extends RouteComponentProps<RouteParams> {
    history: History;
};

const KpiCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    return (
        <Card centered raised className={(props.match.params.id) ? classes.CardEdit :classes.Card} >
            <Card.Content>
                <Card.Header>{(props.match.params.id) ? 'View Edit KPI Setting' : 'Add New KPI Setting'}</Card.Header>
            </Card.Content>
            <Card.Content>
                <KpiSettingForm history={props.history} />
            </Card.Content>
        </Card>
    );
};

export default withRouter(KpiCard);
