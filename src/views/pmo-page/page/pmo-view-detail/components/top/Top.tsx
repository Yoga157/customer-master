import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import AccordionTop from 'views/funnel-page/components/funnel-top/accordion/AccordionTop';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectPMOTopList } from 'selectors/pmo/PMOSelector';
import ToolTips from 'views/components/UI/Tooltip/ToolTip';
import { Button, Pagination } from 'views/components/UI';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as PMOActions from 'stores/pmo/PMOActions';
import TopTable from './components/table/TopTable';
import styles from './Top.module.scss';
import IStore from 'models/IStore';

interface IProps {
  funnelGenID: number;
}

const Top: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [PMOActions.PMO_TOP]));
  const topList = useSelector((state: IStore) => selectPMOTopList(state));

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
  };

  useEffect(() => {
    dispatch(PMOActions.reqPMOTop(+props.funnelGenID, activePage, pageSize));
  }, [dispatch, activePage]);

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid padded>
        <Grid.Row columns="equal" className="d-inflex-767 align-items-center">
          <Grid.Column className="FullGrid1200">
            <Header>
              <Header.Content>Top</Header.Content>
              <Header.Content>
                <>
                  <ToolTips
                    position="top right"
                    content="History TOP"
                    trigger={
                      <Button
                        circular
                        basic
                        type="button"
                        compact
                        icon="history"
                        onClick={(e: Event) =>
                          dispatch(
                            ModalFirstLevelActions.OPEN(<AccordionTop funnelGenID={+props.funnelGenID} page="view-edit-pmo" />, ModalSizeEnum.Small)
                          )
                        }
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

            {/* <Button type="button" icon="plus" color="blue" floated="right" size="small" content="Add Document" onClick={(e: Event) => alert('ok')} /> */}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className={styles.PMOTop}>
          <Grid.Column className="ph-0r">
            <div className="md-scroll-horizontal mb-1r">
              <TopTable tableData={topList.rows} />
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={topList.totalRows}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default Top;
