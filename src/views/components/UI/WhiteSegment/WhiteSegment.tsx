import RouteEnum from 'constants/RouteEnum';
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { Tooltips, Button } from 'views/components/UI';

interface IProps {
  readonly reportItem: any;
}

const whiteSegment: React.FC<IProps> = ({ reportItem }) => {
  localStorage.setItem('reportManager', JSON.stringify(reportItem));
  return (
    <Grid className="WhiteNotes m-1r">
      <Grid.Row columns={2}>
        {reportItem.map((item: any) => (
          <Grid.Column key={item.udcid}>
            <Link key={item.udcid} to={`/report-page/${item.udcid}`}>
              <Tooltips content={item.text1} trigger={<h4>{item.text1}</h4>} />
            </Link>
            <span>{item.text2}</span>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
};
export default whiteSegment;
