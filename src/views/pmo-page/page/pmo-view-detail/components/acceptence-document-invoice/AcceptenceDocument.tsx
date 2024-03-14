import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Icon } from 'semantic-ui-react';

import AcceptenceDocumentForm from './components/form/AcceptenceDocument/AcceptenceDocumentForm';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import HistoryAcceptenceDocument from './components/history/HistoryAcceptenceDocument';
import { selectAttachmentAndAcceptence } from 'selectors/attachment/AttachmentSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import AcceptenceDocumentTable from './components/table/AcceptenceDocumentTable';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import { Button, Tooltips, Pagination } from 'views/components/UI';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import ToolTips from 'views/components/UI/Tooltip/ToolTip';
import * as ToastAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import IStore from 'models/IStore';
import './AcceptenceDocument.scss';

interface IProps {
  funnelGenID: number;
  projectId: number;
}

const AcceptenceDocument: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { funnelGenID, projectId } = props;
  const dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [AttachmentActions.GET_ATTACHMENT_AND_ACCEPTENCE]));
  const pmoAcceptence = useSelector((state: IStore) => selectAttachmentAndAcceptence(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(AttachmentActions.getAttachmentAndtAcceptence(+funnelGenID, +projectId, activePage, pageSize, true)); // acceptence
  }, [activePage]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
  };

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid padded>
        <Grid.Row columns="equal" className="d-inflex-767 align-items-center">
          <Grid.Column className="FullGrid1200">
            <Header>
              <Header.Content>Acceptence Document Invoice</Header.Content>
              <Header.Content>
                <>
                  <ToolTips
                    position="top right"
                    content="History Acceptence Document Invoice"
                    trigger={
                      <Button
                        circular
                        basic
                        type="button"
                        compact
                        icon="history"
                        onClick={(e: Event) => dispatch(ModalFirstLevelActions.OPEN(<HistoryAcceptenceDocument />, ModalSizeEnum.Small))}
                      />
                    }
                  />

                  {/* <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning ml-px-4" />} /> */}
                </>
              </Header.Content>
            </Header>
          </Grid.Column>

          <Grid.Column className="FullGrid1200 d-inflex-767">
            {/* <Button type="button" icon="plus" color="green" floated="right" size="small" content="Add Service" onClick={(e: Event) => alert('ok')} /> */}

            <Button
              type="button"
              icon="plus"
              color="blue"
              floated="right"
              size="small"
              content="Add Document"
              onClick={(e: Event) =>
                dispatch(ModalFirstLevelActions.OPEN(<AcceptenceDocumentForm type={'ADD NEW'} rowData={{} as any} />, ModalSizeEnum.Small))
              }
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="AcceptenceDocument">
          <AcceptenceDocumentTable tableData={pmoAcceptence.rows} />
          <Pagination
            activePage={activePage}
            onPageChange={(e, data) => handlePaginationChange(e, data)}
            totalPage={pmoAcceptence.totalRow}
            pageSize={pageSize}
          />
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default AcceptenceDocument;
