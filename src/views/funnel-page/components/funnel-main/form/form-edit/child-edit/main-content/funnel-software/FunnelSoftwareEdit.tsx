import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Grid, Header, Form, List, Icon } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { TextInput, Button, RichTextEditor, Tooltips, SoftwareList } from 'views/components/UI';
import SearchInputList from './components/ListSoftware';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectViewFunnelAdditional } from 'selectors/funnel/FunnelSelector';
import FunnelSoftware from 'stores/funnel/models/view-edit/FunnelSoftware';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectCompetitorOptions } from 'selectors/select-options/CompetitorSelector';
import * as CompetitorActions from 'stores/competitor/CompetitorActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import {
  selectSoftwaresOptions,
  selectSoftwareOsE,
  selectSoftwareProgE,
  selectSoftwaresBusinessE,
  selectSoftwaresDBE,
  selectSoftwaresInfraE,
} from 'selectors/select-options/SoftwareSelector';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import { selectFunnel } from 'selectors/funnel/FunnelSelector';
import {
  selectSoftwareSearchOptions,
  selectSoftwareBusiness,
  selectSoftwareDB,
  selectSoftwareInfra,
  selectSoftwareOS,
  selectSoftwareProgramming,
} from 'selectors/select-options/SoftwareSelector';

import './FunnelSoftwareEditStyle.scss';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import AccordianSoftware from './components/AccordianSoftware';

interface IProps {
  funnelGenID: string;
}

declare global {
  interface Window {
    jQuery: any;
  }
}

const FunnelSoftwareEdit: React.FC<IProps> = ({ funnelGenID }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [disableComponent, setDisableComponent] = useState(true);
  const softwareBusiness = useSelector((state: IStore) => selectSoftwareBusiness(state));
  const softwareInfra = useSelector((state: IStore) => selectSoftwareInfra(state));
  const softwareDB = useSelector((state: IStore) => selectSoftwareDB(state));
  const softwareProgramming = useSelector((state: IStore) => selectSoftwareProgramming(state));
  const softwareOS = useSelector((state: IStore) => selectSoftwareOS(state));
  const listOS = useSelector((state: IStore) => selectSoftwareOsE(state));
  const listDB = useSelector((state: IStore) => selectSoftwaresDBE(state));
  const listBuss = useSelector((state: IStore) => selectSoftwaresBusinessE(state));
  const listInfra = useSelector((state: IStore) => selectSoftwaresInfraE(state));
  const listProg = useSelector((state: IStore) => selectSoftwareProgE(state));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };
  const onSubmitHandler = (values: any) => {
    const softwareValue = '';
    let businessSoftware = '';
    let programmingSoftware = '';
    let infrastructureSoftware = '';
    let operatingSystem = '';
    let database = '';

    //software
    // console.log('candavalues', values);

    const funnelSoftware = new FunnelSoftware(values);
    funnelSoftware.funnelGenID = +funnelGenID;

    if (JSON.parse(localStorage.getItem('businessSoftware')!) != undefined) {
      JSON.parse(localStorage.getItem('businessSoftware')!).map(
        (arrValues: any) => (businessSoftware = businessSoftware.length > 0 ? businessSoftware + ',' + arrValues.value : arrValues.value)
      );
    }

    if (JSON.parse(localStorage.getItem('infrastructureSoftware')!) != undefined) {
      JSON.parse(localStorage.getItem('infrastructureSoftware')!).map(
        (arrValues: any) =>
          (infrastructureSoftware = infrastructureSoftware.length > 0 ? infrastructureSoftware + ',' + arrValues.value : arrValues.value)
      );
    }

    if (JSON.parse(localStorage.getItem('programmingSoftware')!) != undefined) {
      JSON.parse(localStorage.getItem('programmingSoftware')!).map(
        (arrValues: any) => (programmingSoftware = programmingSoftware.length > 0 ? programmingSoftware + ',' + arrValues.value : arrValues.value)
      );
    }

    if (JSON.parse(localStorage.getItem('operatingSystem')!) != undefined) {
      JSON.parse(localStorage.getItem('operatingSystem')!).map(
        (arrValues: any) => (operatingSystem = operatingSystem.length > 0 ? operatingSystem + ',' + arrValues.value : arrValues.value)
      );
    }

    if (JSON.parse(localStorage.getItem('database')!) != undefined) {
      JSON.parse(localStorage.getItem('database')!).map(
        (arrValues: any) => (database = database.length > 0 ? database + ',' + arrValues.value : arrValues.value)
      );
    }

    funnelSoftware.businessSoftware = businessSoftware;
    funnelSoftware.programmingSoftware = programmingSoftware;
    funnelSoftware.infrastructureSoftware = infrastructureSoftware;
    funnelSoftware.operatingSystem = operatingSystem;
    funnelSoftware.database = database;
    funnelSoftware.userLoginID = currentUser.employeeID;

    dispatch(FunnelActions.putSoftware(funnelSoftware)).then(() => {
      dispatch(SoftwareActions.requestSoftwareEditBusinessByGenId(+funnelGenID));
      dispatch(SoftwareActions.requestSoftwareEditProgrammingByGenId(+funnelGenID));
      dispatch(SoftwareActions.requestSoftwareEditDBByGenId(+funnelGenID));
      dispatch(SoftwareActions.requestSoftwareEditInfraByGenId(+funnelGenID));
      dispatch(SoftwareActions.requestSoftwareEditOsByGenId(+funnelGenID));
    });

    if (!isRequesting) {
      if (!disableComponent) {
        setDisableComponent(true);
      }
    }
  };

  const handleSearchChangeSoftware = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByName(data.value));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (funnelGenID.length > 0) {
      dispatch(SoftwareActions.requestSoftwareByGenId(+funnelGenID));
      dispatch(SoftwareActions.requestSoftwareEditBusinessByGenId(+funnelGenID));
      dispatch(SoftwareActions.requestSoftwareEditProgrammingByGenId(+funnelGenID));
      dispatch(SoftwareActions.requestSoftwareEditDBByGenId(+funnelGenID));
      dispatch(SoftwareActions.requestSoftwareEditInfraByGenId(+funnelGenID));
      dispatch(SoftwareActions.requestSoftwareEditOsByGenId(+funnelGenID));
    }
  }, [dispatch, +funnelGenID]);

  const softwareState = useSelector((state: IStore) => selectSoftwaresOptions(state));
  // console.log(softwareState);
  const onCancel = () => {
    if (!disableComponent) {
      dispatch(SoftwareActions.requestSoftwareByGenId(+funnelGenID));
      setDisableComponent(true);
    }
  };

  const softwareStoreSearch = useSelector((state: IStore) => selectSoftwareSearchOptions(state));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelActions.REQUEST_VIEW_FUNNEL_ADDITIONAL]));

  const viewFunnelAditional = useSelector((state: IStore) => selectViewFunnelAdditional(state));
  // console.log(viewFunnelAditional);

  const handleSearchBusinessSoftware = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByBusiness(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchDatabaseSoftware = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByDB(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchProgrammingSoftware = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByProgramming(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchInfrastructureSoftware = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByInfra(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchOS = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByOS(data.value));
      }
    },
    [dispatch]
  );

  // console.log('onchange ->', softwareDB, 'viewFunnelAditional', 'list ->', listDB);

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={viewFunnelAditional}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="ui divider FullHdivider mt-0"></div>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header>
                  <Header.Content className="ml-1r">Software is Being Used</Header.Content>
                  <Header.Content className="FloatRight">
                    {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && disableComponent && (
                      <>
                        {/* <Tooltips
                          position="top right"
                          content="History Additional Info"
                          trigger={
                            <Button
                              circular
                              basic
                              type="button"
                              compact
                              icon="history"
                              onClick={(e: Event) => dispatch(ModalFirstLevelActions.OPEN(<AccordianSoftware />, ModalSizeEnum.Small))}
                            />
                          }
                        /> */}
                        <Tooltips
                          position="top right"
                          content="Edit Software"
                          trigger={<Button circular basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} />}
                        />
                      </>
                    )}
                    {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && !disableComponent && (
                      <Fragment>
                        <Tooltips
                          position="top right"
                          content="Cancel Update"
                          trigger={<Button type="button" basic compact icon="cancel" circular onClick={onCancel} />}
                        />
                        <Tooltips position="top right" content="Save Update" trigger={<Button basic compact icon="save" circular />} />
                      </Fragment>
                    )}
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Field
              name="database1"
              component={SoftwareList}
              placeholder="e.g.Database"
              labelName="Database"
              handleSearchBusinessSoftware={handleSearchBusinessSoftware}
              handleSearchProgrammingSoftware={handleSearchProgrammingSoftware}
              handleSearchDatabaseSoftware={handleSearchDatabaseSoftware}
              handleSearchInfrastructureSoftware={handleSearchInfrastructureSoftware}
              handleSearchOperatingSystem={handleSearchOS}
              resultDB={softwareDB}
              resultOS={softwareOS}
              resultInfra={softwareInfra}
              resultProg={softwareProgramming}
              resultBuss={softwareBusiness}
              listSoftware={listDB}
              listBuss={listBuss}
              listDB={listDB}
              listInfra={listInfra}
              listProg={listProg}
              listOS={listOS}
              disabled={disableComponent}
            />
          </Grid>
          <div className="ui divider FullHdivider mt-2r"></div>
        </Form>
      )}
    />
  );
};

export default FunnelSoftwareEdit;
