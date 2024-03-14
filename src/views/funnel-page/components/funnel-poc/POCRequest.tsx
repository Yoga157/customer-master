import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Pagination } from 'views/components/UI';
import POCRequestTable from './table/POCRequestTable';
import POCRequestForm from './form/form-create/POCRequestForm';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import IPOCTable from 'selectors/funnel-poc-request/models/IPOCTable';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectPOC } from 'selectors/funnel-poc-request/POCSelector';
import * as POCActions from 'stores/funnel-poc-request/POCActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
  funnelGenID: number;
  popupLevel: number;
}
const POCRequest: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { funnelGenID, popupLevel } = props;
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(POCActions.requestPOCByFunnelGenID(funnelGenID, activePage, pageSize));
  };

  useEffect(() => {
    dispatch(POCActions.requestPOCByFunnelGenID(funnelGenID, 1, 5));
  }, [dispatch, funnelGenID]);

  const onOpenPopupChild = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalSecondLevelActions.OPEN(content, size));
    },
    [dispatch]
  );

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [POCActions.REQUEST_POCS]));
  const pocTable: IPOCTable = useSelector((state: IStore) => selectPOC(state, [POCActions.REQUEST_POCS]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid padded>
        <Grid.Row>
          <Grid.Column>
            {currentUser.role === 'Sales' && (
              <Button
                type="button"
                icon="comment alternate"
                floated="right"
                compact
                primary
                size="small"
                content="POC Request"
                onClick={() => onOpenPopupChild(<POCRequestForm popupLevel={popupLevel} funnelGenID={funnelGenID} />, ModalSizeEnum.Tiny)}
              />
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <POCRequestTable tableData={pocTable} />
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={pocTable.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default POCRequest;
