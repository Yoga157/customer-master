import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

interface IProps {
  readonly category: any;
  readonly onClick?: any;
  readonly onSearch?: any;
}
const horizonScroll: React.FC<IProps> = ({ category, onClick, onSearch }) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column className="HorizScroll">
          <Button icon="search" size="small" color="blue" onClick={() => onSearch()} />
          {category.map((item: any) => (
            <Button key={item.udcid} onClick={() => onClick(item.udcid)} size="small">
              {item.text1}
            </Button>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default horizonScroll;
