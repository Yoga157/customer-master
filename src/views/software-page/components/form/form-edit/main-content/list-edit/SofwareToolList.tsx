import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import { selectSoftwares, selectSoftwareTools, selectSoftware, selectSoftwareMain } from 'selectors/software/SoftwareSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import SoftwareToolTable from './table/SoftwareToolTable';
import { Dispatch } from 'redux';
import ISoftwareTable from 'selectors/software/models/ISoftwareTable';
import ISoftwareToolTable from 'selectors/software/models/ISoftwareToolTable';
import { Button, Pagination } from 'views/components/UI/';
import { Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import RouteEnum from 'constants/RouteEnum';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import SoftwareForm from 'views/software-page/components/form/form-create/SoftwareForm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import SoftwareHeaderModel from 'stores/software/models/SoftwareHeaderModel';
import SoftwareMainModel from 'stores/software/models/SoftwareMainModel';

interface IProps {
  //history:History
  id: number;
}

const SoftwareToolList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { id } = props;

  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(SoftwareActions.requestSoftwareTools(activePage, pageSize, id));
    dispatch(SoftwareActions.requestSoftwareHeader(id));
  }, [dispatch, activePage, pageSize, id]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(SoftwareActions.requestSoftwareTools(activePage, pageSize, id));
  };
  const onAddNewSoftware = useCallback((): void => {
    dispatch(ModalFirstLevelActions.OPEN(<SoftwareForm id={id} type={'addedit'} />, ModalSizeEnum.Small));
  }, [dispatch]);
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [SoftwareActions.REQUEST_SOFTWARE_TOOLS]));
  const softwareToolTables: ISoftwareToolTable = useSelector((state: IStore) => selectSoftwareTools(state, [SoftwareActions.REQUEST_SOFTWARE_TOOLS]));

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content>Software Tools</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Button icon="plus" color="yellow" disabled={false} floated="right" onClick={onAddNewSoftware} content="Add" />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <SoftwareToolTable id={props.id} tableData={softwareToolTables} />
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={softwareToolTables.totalRows}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default SoftwareToolList;
