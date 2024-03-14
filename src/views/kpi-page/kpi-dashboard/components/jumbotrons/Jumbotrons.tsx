import React from 'react';
import { Grid, Header, Statistic, Image } from 'semantic-ui-react';
import Jumbotron from './jumbotron/Jumbotron';

interface IProps {}

const Jumbotrons:React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    return (
        <Grid columns={3} className="mb-1">
            <Grid.Row>
                <Grid.Column className="FullGrid767">
                    <Jumbotron iconName="users" title="TOTAL PIC" count="345" color="#5C62AD" />
                </Grid.Column>
                <Grid.Column className="FullGrid767 mt-3r-767">
                    <Jumbotron iconName="check circle outline" title="SUCCESS KPI" count="233" color="#27D4A5" />
                </Grid.Column>
                <Grid.Column className="FullGrid767 mt-3r-767">
                    <Jumbotron iconName="times circle outline" title="FAILED KPI" count="113" color="#F97452" />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Jumbotrons;