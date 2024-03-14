import React, { useEffect, useState } from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { ButtonExportCSV } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectResultOpp } from 'selectors/funnel-opportunity/FunnelOpportunitySelector';
import FunnelBOQUploadFailedTable from '../../table/FunnelFailedUpload';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';

import TableToExcel from '@linways/table-to-excel';

interface IProps {}
const FunnelBOQUploadFailed: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const resultOpp = useSelector((state: IStore) => selectResultOpp(state));
  const [data, setData] = useState([] as any);
  const [fileName, setFileName] = useState('BOQFailedUpload');

  const handleExportExcel = () => {
    const TableSelect = document.querySelector('body > div:nth-child(7) > div > div > div > div:nth-child(2) > div > table')! as HTMLTableElement;
    const tableHead = document.querySelector(
      'body > div:nth-child(7) > div > div > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(1)'
    )! as HTMLTableElement;
    tableHead.style.display = 'none';
    for (let i = 0; i < TableSelect.rows.length; i++) {
      const firstCol = TableSelect.rows[i].cells[0];
      firstCol.remove();
    }
    TableToExcel.convert(TableSelect, {
      name: 'FunnelOppFailedExport' + '.xlsx',
      sheet: {
        name: 'Sheet 1',
      },
    });
    dispatch(ModalSecondLevelActions.CLOSE());
  };

  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column>
          <Button icon="file excel" disabled={false} floated="left" size="small" content="Export Failed Opportunity" onClick={handleExportExcel} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FunnelBOQUploadFailedTable tableRow={resultOpp} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FunnelBOQUploadFailed;
