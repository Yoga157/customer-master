import React, { useEffect, useState } from 'react';

import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import { Grid, Form, Divider, Card } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import { selectPMOActualDate, selectPMOProjectViewEditStatus, selectPMORequirementClosingProject } from 'selectors/pmo/PMOSelector';
import IPMORequirementCloseProject from 'selectors/pmo/models/IPMORequirementCloseProject';
import { selectViewFunnelCustomerByProjectId } from 'selectors/funnel/FunnelSelector';
import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectEntryKeyValNumber } from 'selectors/select-options/PMOTypeSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IPMOViewEditStatus from 'selectors/pmo/models/IPMOViewEditStatus';
import IOptionsData from 'selectors/select-options/models/IOptionsData';
import { Button, DateInput, SelectInput } from 'views/components/UI';
import NotifSelectStatusTable from './table/NotifSelectStatusTable';
import PMOHandOverModel from 'stores/pmo/models/PMOHandOverModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './NotifSelectStatus.module.scss';
import * as PMOActions from 'stores/pmo/PMOActions';
import IStore from 'models/IStore';

interface IProps {
  page: string;
  status: string;
  funnelGenID: string;
  projectId: string;
  projectStatusId: number;
}

const NotifSelectStatus: React.FC<IProps> = ({ page, status, funnelGenID, projectId, projectStatusId }) => {
  const dispatch: Dispatch = useDispatch();
  const [startContract, setStartContract] = useState(null);
  const [endContract, setEndContract] = useState(null);

  const [startWarranty, setStartWarranty] = useState(null);
  const [endWarranty, setEndWarranty] = useState(null);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [PMOActions.REQUIREMENT_CLOSING_PROJECT, PMOActions.PUT_WARRANTY_DATE_PROJECT, PMOActions.PUT_HANDOVER])
  );
  const requirmentClosingProject: IPMORequirementCloseProject = useSelector((state: IStore) => selectPMORequirementClosingProject(state));
  const projectStatus: IOptionsData[] = useSelector((state: IStore) => selectEntryKeyValNumber(state, 'pmo-project-status'));
  const pmoViewEditStatus: IPMOViewEditStatus = useSelector((state: IStore) => selectPMOProjectViewEditStatus(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const actualDate = useSelector((state: IStore) => selectPMOActualDate(state));

  useEffect(() => {
    page === 'pmo-list' && dispatch(PMOActions.reqRequirementClosingProject(+projectId, +funnelGenID, pmoViewEditStatus.projectStatus));
    page === 'pmo-list' && dispatch(FunnelActions.reqDataEntyKeyBy('ProjectStatus'));
    dispatch(PMOActions.reqGetActualDate(+projectId));
  }, []);

  useEffect(() => {
    onLoadData();
  }, [projectStatus]);

  useEffect(() => {
    setStartContract(requirmentClosingProject.startContract);
    setStartWarranty(requirmentClosingProject.startWarranty);
  }, [requirmentClosingProject]);

  useEffect(() => {
    const projStatusText = projectStatus.find((e) => e.value === +projectStatusId).text;

    if (moment().diff(requirmentClosingProject.actualStartByPmo, 'minutes') !== moment().diff(actualDate.actualStartDate, 'minutes')) {
      if (moment(actualDate.actualStartDate).format('YYYY-MM-DDTHH:mm:ss.SSS') !== 'Invalid date')
        updateUpdateActual('actualStart', +projectId, moment(actualDate.actualStartDate).format('YYYY-MM-DDTHH:mm:ss.SSS'), currentUser.employeeID);
    }

    if (moment().diff(requirmentClosingProject.actualEndByPmo, 'minutes') !== moment().diff(actualDate.actualEndDate, 'minutes')) {
      if (moment(actualDate.actualEndDate).format('YYYY-MM-DDTHH:mm:ss.SSS') !== 'Invalid date') {
        updateUpdateActual(
          'actualEnd',
          +projectId,
          moment(actualDate.actualEndDate).format('YYYY-MM-DDTHH:mm:ss.SSS'),
          currentUser.employeeID,
          projStatusText === 'Handover SMO' ? 'Handover to SMO' : projStatusText === 'Handover BS' ? 'Handover to Berca Support' : projStatusText
        );
      }
    }
  }, [requirmentClosingProject]);

  const updateUpdateActual = (actual: string, projectId: number, actualDate: string, modifyUserId: number, projectStatus?: string) => {
    dispatch(PMOActions.putActual(actual, projectId, actualDate, modifyUserId, projectStatus)).then(() => {
      dispatch(FunnelActions.reqPMOPCustomerBy(+projectId));
      onLoadData();
    });
  };

  const onLoadData = () => {
    const projStatusText = projectStatus.find((e) => e.value === +projectStatusId).text;
    dispatch(
      PMOActions.reqRequirementClosingProject(
        +projectId,
        +funnelGenID,
        projStatusText === 'Handover SMO' ? 'Handover to SMO' : projStatusText === 'Handover BS' ? 'Handover to Berca Support' : projStatusText
      )
    );
  };

  const onSubmitHandler = (values) => {
    const projStatusText = projectStatus.find((e) => e.value === +projectStatusId).text;

    const newItem = new PMOHandOverModel({});

    newItem.projectId = +projectId;
    newItem.funnelGenId = +funnelGenID;
    newItem.projectStatus =
      projStatusText === 'Handover SMO' ? 'Handover to SMO' : projStatusText === 'Handover BS' ? 'Handover to Berca Support' : projStatusText;
    newItem.startContract = moment(values.startContract).format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.endContract = moment(values.endContract).format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.startWarranty = values.startWarranty ? moment(values.startWarranty).format('YYYY-MM-DDTHH:mm:ss.SSS') : null;
    newItem.endWarranty = values.endWarranty ? moment(values.endWarranty).format('YYYY-MM-DDTHH:mm:ss.SSS') : null;
    newItem.modifyDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.modifyUserID = currentUser.employeeID;

    dispatch(PMOActions.putHandover(newItem)).then(() => {
      dispatch(PMOActions.reqViewEditProjectStatus(+projectId));
      dispatch(FunnelActions.reqPMOPCustomerBy(+projectId));
      dispatch(ModalFirstActions.CLOSE());
    });
  };

  const isValidStartWarranty = createValidator(
    (message) => (value) => {
      setStartWarranty(value);
      if (value && moment(endWarranty).diff(moment(startWarranty), 'hours') < 0) {
        return 'Customer Warranty Start Date must be less than Customer Warranty End Date';
      } else if (!value && status !== 'completed') {
        return message;
      }
    },
    'Warranty Start Date is required!'
  );

  const isValidEndWarranty = createValidator(
    (message) => (value) => {
      setEndWarranty(value);
      if (value && moment(endWarranty).diff(moment(startWarranty), 'hours') < 0) {
        return 'Customer Warranty End Date must be more than Customer Warranty Start Date';
      } else if (!value && status !== 'completed') {
        return message;
      }
    },
    'Warranty End Date is required!'
  );

  const isValidContractStart = createValidator(
    (message) => (value) => {
      setStartContract(value);
      if (value && moment(endContract).diff(moment(startContract), 'hours') < 0) {
        return 'Start Contract Date must be less than End Contract Date';
      }
    },
    'Start Contract Date is required!'
  );

  const isValidContractEnd = createValidator(
    (message) => (value) => {
      setEndContract(value);
      if (value && moment(endContract).diff(moment(startContract), 'hours') < 0) {
        return 'End Contract Date must be more than Start Contract Date';
      }
    },
    'End Contract Date is required!'
  );

  const validate = combineValidators({
    startContract: composeValidators(isValidContractStart, isRequired('Start Contract Date'))(),
    endContract: composeValidators(isValidContractEnd, isRequired('End Contract Date'))(),
    startWarranty: composeValidators(isValidStartWarranty)(),
    endWarranty: composeValidators(isValidEndWarranty)(),
  });

  console.log('requirmentClosingProject', requirmentClosingProject);

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={validate}
      initialValues={requirmentClosingProject}
      render={({ handleSubmit, pristine, invalid, submitting }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Card.Header>
            {' '}
            {page === 'pmo-list'
              ? 'PROJECT STATUS CHANGE'
              : status === 'ho-to-smo'
              ? 'PROJECT HAND OVER REQUIREMENT'
              : 'PROJECT REQUEST REQUIREMENT'}{' '}
          </Card.Header>
          <Divider />

          <Grid>
            {page === 'pmo-list' && (
              <Grid.Row>
                <Grid.Column className=" ViewLabel FullGrid1200 " width="8">
                  <Field
                    name="projectStatusId"
                    component={SelectInput}
                    placeholder="e.g.On Hold"
                    labelName="Project Status"
                    options={projectStatus}
                    mandatory={false}
                    // onChanged={(e) => setStatus(e)}
                    // disabled={type !== 'EDIT'}
                    // defaultValue={type === 'EDIT' ? '' : 'New'}
                  />
                </Grid.Column>
              </Grid.Row>
            )}

            <Grid.Row>
              <NotifSelectStatusTable tableData={requirmentClosingProject?.requirements} />
            </Grid.Row>

            {/* {status === 'ho-to-smo' && (
              <> */}
            <Grid.Row columns={2} className={`pb-0 ${styles.sectionYellow}`}>
              <Grid.Column className=" ViewLabel FullGrid1200 pb-0">
                <Field
                  name="startContract"
                  component={DateInput}
                  labelName="Start Contract Date"
                  placeholder="e.g.09/09/2022"
                  mandatory={false}
                  date={true}
                  dropUp={false}
                  disabled={!requirmentClosingProject?.isAllowComplete}
                  onChange={(e) => setStartContract(e)}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 pb-0">
                <Field
                  name="endContract"
                  component={DateInput}
                  labelName="End Contract Date"
                  placeholder="e.g.09/09/2022"
                  mandatory={false}
                  date={true}
                  dropUp={false}
                  disabled={!startContract || !requirmentClosingProject?.isAllowComplete}
                  minDate={new Date(moment(startContract).valueOf() + 24 * 60 * 60 * 1000)}
                  // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} className={`pb-0 ${styles.sectionYellow}`}>
              <Grid.Column className=" ViewLabel FullGrid1200 pb-0">
                <Field
                  name="startWarranty"
                  component={DateInput}
                  labelName="Cust. Warranty Start Date"
                  placeholder="e.g.09/09/2022"
                  mandatory={status === 'completed'}
                  date={true}
                  dropUp={false}
                  disabled={!requirmentClosingProject?.isAllowComplete}
                  onChange={(e) => setStartWarranty(e)}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 pb-0">
                <Field
                  name="endWarranty"
                  component={DateInput}
                  labelName="Cust. Warranty End Date"
                  placeholder="e.g.09/09/2022"
                  mandatory={status === 'completed'}
                  date={true}
                  dropUp={false}
                  disabled={!startWarranty || !requirmentClosingProject?.isAllowComplete}
                  minDate={new Date(moment(startWarranty).valueOf() + 24 * 60 * 60 * 1000)}
                  // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                />
              </Grid.Column>
            </Grid.Row>
            {/* </>
            )} */}

            <div className="ui divider FullHdivider"></div>
            <Grid.Row columns={2}>
              <Grid.Column className=" ViewLabel FullGrid1200">
                <Field
                  name="actualStartByPmo"
                  component={DateInput}
                  placeholder="e.g.09/09/2020"
                  labelName="Act. Start Project"
                  date={true}
                  disabled={true}
                  mandatory={true}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="actualEndByPmo"
                  component={DateInput}
                  placeholder="e.g.09/09/2020"
                  labelName="Act.End Project"
                  date={true}
                  disabled={true}
                  mandatory={true}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Grid className="ph-1-5r mt-1">
            <Grid.Row columns={1} centered className="pb-0">
              <Grid.Column textAlign="center" className="pb-0">
                <Button type="button" className="mr-1" size="small" onClick={() => dispatch(ModalFirstActions.CLOSE())}>
                  Cancel
                </Button>
                <Button className="" color="blue" size="small" disabled={submitting || isRequesting || !requirmentClosingProject?.isAllowComplete}>
                  Submit
                </Button>
                {/* {status === 'ho-to-smo' ? (
                  <>
                    <Button type="button" className="mr-1" size="small" onClick={() => dispatch(ModalFirstActions.CLOSE())}>
                      Cancel
                    </Button>
                    <Button className="" color="blue" size="small" disabled={invalid || isRequesting}>
                      Handover
                    </Button>
                  </>
                ) : (
                  <Button type="button" color="blue" size="small" onClick={() => dispatch(ModalFirstActions.CLOSE())}>
                    Cancel
                  </Button>
                )} */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default NotifSelectStatus;
