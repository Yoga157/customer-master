import React, {useEffect, useState} from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { History } from 'history';
import classes from './FunnelCard.module.scss';
import GeneratedForm from './form-create-nomodal';

interface RouteParams{
    id: string
}

interface IProps extends RouteComponentProps<RouteParams> {
    history:History
}

interface LocationState{
    from: {
        pathname: string;
    };
    eventName: string;
    customerName: string;
    funnelOpportunityID: number;
    eventDate: string;
    type: string;
  projectName: string;
  formID: string;
}

const FunnelCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    console.log(props.history)
    const location = useLocation<LocationState>()
    const [type, setType] = useState((location.state && location.state.type) ?? 'ADD')
    useEffect(() => {
        if (location.state && location.state.type !== undefined) {
            // props.history.push('/Generated');
            // return;
        }
    }, [])

    return (
        <Card centered raised className={(props.match.params.id) ? classes.CardEdit :classes.Card} >
            <Card.Content>
                <Card.Header>{type} Generated Form</Card.Header>
            </Card.Content>
            <Card.Content>
                <GeneratedForm history={props.history}  />
            </Card.Content>
        </Card>
      )
}

export default withRouter(FunnelCard);
