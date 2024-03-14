import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { CheckBox, Button, Pagination } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import WarrantySLATable from './table/WarrantySLATable';
import { WarrantySLAForm } from './form';
import { selectFunnelWarrantySLAs } from 'selectors/funnel-warranty-sla/FunnelWarrantySLASelector';
import IFunnelWarrantySLATable from 'selectors/funnel-warranty-sla/models/IFunnelWarrantySLATable';
import IStore from 'models/IStore';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import ButtonMicro from 'views/components/UI/Button/ButtonMicro';

interface IProps {
  warrantySupportID: number;
}
const WarrantySLA: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const { warrantySupportID } = props;

  useEffect(() => {
    dispatch(FunnelWarrantyActions.requestFunnelWarrantySLAs(+warrantySupportID, activePage, pageSize));
  }, [dispatch, warrantySupportID, activePage, pageSize]);

  const onShowForm = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalSecondLevelActions.OPEN(content, size));
    },
    [dispatch]
  );

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(FunnelWarrantyActions.requestFunnelWarrantySLAs(+warrantySupportID, activePage, pageSize));
  };

  const warrantySLA: IFunnelWarrantySLATable = useSelector((state: IStore) =>
    selectFunnelWarrantySLAs(state, [FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_SLAS])
  );
  return (
    <Grid padded>
      <Grid.Row columns="equal">
        <Grid.Column>
          <CheckBox label="Select All" />
          <ButtonMicro type="button" icon="trash" color="yellow" size="mini" content="Delete" />
        </Grid.Column>
        <Grid.Column>
          <Button
            disabled={warrantySupportID === 0}
            compact
            color="green"
            floated="right"
            icon="plus"
            content="Add SLA"
            onClick={() => onShowForm(<WarrantySLAForm warrantySupportID={warrantySupportID} warrantySLAGenID={0} />, ModalSizeEnum.Small)}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <WarrantySLATable tableData={warrantySLA} />
          <Pagination
            activePage={activePage}
            onPageChange={(e, data) => handlePaginationChange(e, data)}
            totalPage={warrantySLA.totalRow}
            pageSize={pageSize}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WarrantySLA;
