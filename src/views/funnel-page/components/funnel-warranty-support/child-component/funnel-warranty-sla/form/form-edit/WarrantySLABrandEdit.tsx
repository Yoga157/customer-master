import React from 'react';
import { Grid } from 'semantic-ui-react';
import WarrantySLAProblemEdit from './WarrantySLAProblemEdit';

interface IProps {}
const WarrantySLABrandEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <WarrantySLAProblemEdit />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default WarrantySLABrandEdit;
