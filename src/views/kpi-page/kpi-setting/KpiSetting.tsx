import React, {Fragment, useCallback, useEffect, useState} from 'react';
import { Accordion, Grid, Header, Icon } from 'semantic-ui-react';
import * as ServiceCatalogActions from '../../../stores/service-catalog/ServiceCatalogActions';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import RouteEnum from 'constants/RouteEnum';
import { Button, Pagination, Tooltips } from 'views/components/UI';
import KpiSettingTable from './components/table/KpiSettingTable';
import * as KpiSettingActions from "stores/kpi/kpi-setting/KpiSettingActions";
import IKpiSettingTable from 'selectors/kpi/kpi-setting/models/IKpiSettingTable';
import IStore from 'models/IStore';
import { selectKpiSettings } from 'selectors/kpi/kpi-setting/KpiSettingSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';

interface IProps {
    history: History;
}

const KpiSetting: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [pageSize] = useState(15)
    const [activePage, setActivePage] = useState(1);

    console.log("History: ", props.history);
    
    useEffect(() => {
        dispatch(KpiSettingActions.requestKpiSettings(activePage, pageSize));
    }, [dispatch, activePage, pageSize]);

    const handlePaginationChange = (e:any,data:any) => {
        setActivePage(data.activePage)
        dispatch(KpiSettingActions.requestKpiSettings(activePage, pageSize));
    };

    let isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [KpiSettingActions.REQUEST_KPI_SETTINGS, KpiSettingActions.REQUEST_KPI_SETTING_SEARCH]));
    const kpiSettingTable: IKpiSettingTable = useSelector((state: IStore) => selectKpiSettings(state, [KpiSettingActions.REQUEST_KPI_SETTINGS]));
    
    // let isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ServiceCatalogActions.REQUEST_SERVICE_CATALOGS]));

    
    const showAddSettingForm = (
        <Grid columns='equal'>
            <Grid.Column width={16}>
                <Link to={RouteEnum.KpiSettingAddForm}>
                    <Tooltips
                        content='Add Setting'
                        trigger={
                            <Button
                                className='m-05r'
                                icon='plus'
                                size='small'
                                color='yellow'
                                floated='right'
                                content='Add Setting'
                            />
                        }
                    />
                </Link>
            </Grid.Column>
        </Grid>
    );

    const [accordionActive, setAccordionActive] = useState(0);
    const handleClickAccordion = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = accordionActive === index ? -1 : index;
        setAccordionActive(newIndex);
    };

    const showTableKpiSetting = (
        <LoadingIndicator isActive={isRequesting}>
            <Grid columns='equal'>
                <Grid.Column>
                    <Accordion basic={true}>
                        <Accordion.Title
                            active={accordionActive === 0}
                            index={0}
                            onClick={handleClickAccordion}
                        >    
                            <Header as='h4'>
                                <Header.Content>{accordionActive === 0 ? <Icon name='angle double up' /> : <Icon name='angle double down' />} Setting List</Header.Content>
                            </Header>
                        </Accordion.Title>
                        <Accordion.Content active={accordionActive === 0}>
                            <KpiSettingTable tableData={kpiSettingTable} />
                            <Pagination
                                activePage={activePage}
                                onPageChange={(e, data) => handlePaginationChange(e,data)}
                                totalPage={kpiSettingTable.totalRow}
                                pageSize={pageSize}
                            />
                        </Accordion.Content>
                    </Accordion>
                </Grid.Column>
            </Grid>
        </LoadingIndicator>
    );

    return (
        <Fragment>
            {showAddSettingForm}
            {showTableKpiSetting}
        </Fragment>
    );
};

export default KpiSetting;