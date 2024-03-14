import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { ButtonExportCSV } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectResultBoq } from 'selectors/boq/BoqSelector';
import FunnelBOQUploadFailedTable from '../table/FunnelBOQUploadFailedTable';
import IBoqFailedTableRow from 'selectors/boq/models/IBoqFailedTableRow';
import IBoqExport from 'selectors/boq/models/IBoqExport';

interface IProps {}
const FunnelBOQUploadFailed: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const resultBoq = useSelector((state: IStore) => selectResultBoq(state));
  const [data, setData] = useState([] as any);
  const [fileName, setFileName] = useState('BOQFailedUpload');

  const _mappingBoqFailedTableRow = (model: IBoqFailedTableRow): IBoqExport => {
    return {
      ProductNumber: model.productNumber === undefined ? '' : model.productNumber,
      Description: model.description === undefined ? '' : model.description,
      Qty: model.qty.toString() === 'NaN' ? 0 : model.qty,
      Brand: model.brandName === undefined ? '' : model.brandName,
      SubBrand: model.subBrandName === undefined ? '' : model.subBrandName,
      Warranty: model.warranty === undefined ? 0 : model.warranty,
      WarrantyDurationType: model.warrantyDurationType === undefined ? '' : model.warrantyDurationType,
    };
  };

  const _selectResultBoq = (models: IBoqFailedTableRow[]): IBoqExport[] => {
    if (models.length > 0) {
      return models.map((model: IBoqFailedTableRow): IBoqExport => _mappingBoqFailedTableRow(model));
    }
    return [];
  };

  const onExportToExcel = () => {
    const exportItems = [];
    if (resultBoq.length > 0) {
      const result = _selectResultBoq(resultBoq);
      setData(result);
      setFileName('BOQFailedUpload.xls');
    }
  };

  useEffect(() => {
    onExportToExcel();
  }, [dispatch]);

  console.log('resultBoq', resultBoq);

  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column>
          <ButtonExportCSV data={data} fileName={fileName} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <FunnelBOQUploadFailedTable tableRow={resultBoq} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FunnelBOQUploadFailed;
