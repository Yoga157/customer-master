import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableToExcel from '@linways/table-to-excel';
import { Button, Grid } from 'semantic-ui-react';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';

import ConfigItemUploadFailedTable from './childs/table/ConfigItemUploadFailedTable';
import { selectFailedDataUpload } from 'selectors/config-items/ConfigItemSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectResultBoq } from 'selectors/boq/BoqSelector';
import { ButtonExportCSV } from 'views/components/UI';
import IStore from 'models/IStore';

interface IProps {}
const ConfigItemUploadFailed: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [isGenExcel, setGenExcel] = useState(false);
  const result = useSelector((state: IStore) => state.configItems.resultAction?.resultObj as []);

  const headers = [
    { label: 'ConfigItemGenID', key: 'configItemGenID' },
    { label: 'ProjectId', key: 'projectId' },
    { label: 'FunnelGenId', key: 'funnelGenId' },
    { label: 'PONumber', key: 'poNumber' },
    { label: 'DONumber', key: 'doNumber' },
    { label: 'DODate', key: 'doDate' },
    { label: 'Brand', key: 'brand' },
    { label: 'ProductNumber', key: 'productNumber' },
    { label: 'ProductDescription', key: 'productDescription' },
    { label: 'SerialNumber', key: 'serialNumber' },
  ];

  const handleExport = () => {
    setGenExcel(true);

    setTimeout(() => {
      const tableSelect = document.getElementById('upload-failed') as HTMLTableElement;
      TableToExcel.convert(tableSelect, {
        name: 'ProductDetailFailedUpload ' + format(new Date(), 'dd MMM yyyy') + '.xlsx',
        sheet: {
          name: 'products',
        },
      });
      setGenExcel(false);
    }, 100);
  };

  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column>
          <Button color="blue" onClick={() => handleExport()}>
            Export Excel
          </Button>
          {/* <CSVLink data={selectFailedDataUpload(result)} headers={headers} filename={'ProductDetailFailedUpload.csv'} target="_blank">
            Export
          </CSVLink> */}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <LoadingIndicator isActive={isGenExcel}>
            <ConfigItemUploadFailedTable tableRow={selectFailedDataUpload(result)} isGenExcel={isGenExcel} />
          </LoadingIndicator>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ConfigItemUploadFailed;
