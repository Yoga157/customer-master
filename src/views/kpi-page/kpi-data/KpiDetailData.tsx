import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Grid, Header, Divider } from 'semantic-ui-react';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import KpiDetailsDataTable from './components/table/KpiDetailsDataTable';

interface IProps {}

const KpiDetailData: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const kpiDetailData = {
    totalRow: 2,
    rows: [
      {
        id: 'X1',
        noDoc: 'X1',
        docDate: 'X1',
        kpiStatus: 'X1',
      },
      {
        id: 'X2',
        noDoc: 'X2',
        docDate: 'X2',
        kpiStatus: 'X2',
      },
    ],
  };

  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header className="mt-1r-767">Detail Data: Key Activity: XXXXXXXX, Q1</Header>
        </Grid.Column>
      </Grid.Row>
      <Divider />
      <Grid.Row columns="equal">
        <KpiDetailsDataTable tableData={kpiDetailData} />
      </Grid.Row>
    </Grid>
  );
};

export default KpiDetailData;
