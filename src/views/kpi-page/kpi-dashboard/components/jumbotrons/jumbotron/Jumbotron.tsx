import React, { useState } from 'react';
import { Grid, Icon, Menu, Segment, Statistic } from 'semantic-ui-react';
import './Jumbotron.scss';

interface IProps {
    title: string,
    count: string,
    color: string,
    iconName: any,
}

const Jumbotron:React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const { title, count, color, iconName } = props;

    return (
        <Grid className="jumbotron" style={{ backgroundColor: color }}>
            <Grid.Row columns="equal">
                <Grid.Column className="FullGrid1200">
                    <h5><Icon size="big" name={iconName}/>{title}</h5>
                </Grid.Column>
                <Grid.Column className="FullGrid1200">
                    <h2>{count}</h2>
                </Grid.Column>
            </Grid.Row>
        </Grid>

            // <Statistic size="large">
            //     <Statistic.Label>{title}</Statistic.Label>
            //     <Statistic.Value>{count}</Statistic.Value>
            // </Statistic>
        
    );
};

export default Jumbotron;