import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { History } from 'history';
import { RouteComponentProps, StaticContext, useLocation } from 'react-router';
import { Form, Grid, Segment, Divider, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { NumberInput, SelectInput, TextInput } from 'views/components/UI';
import HierarcyEmpSearch from 'views/components/UI/SearchInputListKpi/SearchInputList';
import ConditionLists from '../../condition-lists/ConditionLists';
import { combineValidators, isRequired } from 'revalidate';
import RouteEnum from 'constants/RouteEnum';
import EmployeeLists from '../../employee-lists/EmployeeLists';
import * as KpiSettingActions from 'stores/kpi/kpi-setting/KpiSettingActions';
// import {  } from "selectors/select-options/KpiSelectors";
import {
  selectKpiStatusOptions,
  selectKpiMeasurementOptions,
  selectKpiDireksiOptions,
  selectDivisionSearchOptions,
  selectDepartmentSearchOptions,
  selectFunctionSearchOptions,
} from 'selectors/kpi/kpi-setting/KpiSettingSelector';
import IOptionsData from 'selectors/select-options/models/IOptionsData';
// import KpiModel from 'stores/kpi/models/KpiModel';
import KpiSettingModel from 'stores/kpi/kpi-setting/models/KpiSettingModel';
// import KpiCondition from 'stores/kpi/models/KpiCondition';
import KpiCondition from 'stores/kpi/kpi-condition/models/KpiConditionModel';
import { format } from 'date-fns';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface LocationState {
  from: {
    pathname: string;
  };
  eventName: string;
  customerName: string;
  kpiID: number;
  eventDate: string;
}

interface IProps {
  history: History;
}

type Props = RouteComponentProps<{}, StaticContext, { from: { pathname: string } }>;

const KpiForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const location = useLocation<LocationState>();

  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [kpiStatus, setKpiStatus] = useState(0);
  const [kpiDireksi, setKpiDireksi] = useState(0);
  const [keyActivity, setKeyActivity] = useState('');
  const [weight, setWeight] = useState(0);
  const [point, setPoint] = useState(0);
  const [measurement, setMeasurement] = useState(0);

  const userId: any = localStorage.getItem('userLogin');

  useEffect(() => {
    if (window.location.pathname === '/data-quality/kpi-setting-add-form') {
      // localStorage.removeItem("employeesInclude");
      // localStorage.removeItem("employeesExclude");
    }
    dispatch(KpiSettingActions.requestKpiStatus());
    dispatch(KpiSettingActions.requestKpiDireksi());
    dispatch(KpiSettingActions.requestKpiMeasurement());
  }, []);

  const kpiStatusOptions: IOptionsData[] = useSelector((state: IStore) => selectKpiStatusOptions(state));
  const kpiDireksiOptions: IOptionsData[] = useSelector((state: IStore) => selectKpiDireksiOptions(state));
  const kpiMeasurementOptions: IOptionsData[] = useSelector((state: IStore) => selectKpiMeasurementOptions(state));
  const divisionList = useSelector((state: IStore) => selectDivisionSearchOptions(state));
  const departmentList = useSelector((state: IStore) => selectDepartmentSearchOptions(state));
  const functionList = useSelector((state: IStore) => selectFunctionSearchOptions(state));
  // const kpiConditions: KpiCondition[] = useSelector((state: IStore) => state.kpiConditionTable.rowTable);
  const kpiConditions: KpiCondition[] = useSelector((state: IStore) => state.kpiSetting.conditionLocal);

  const onChangeStatus = (event: number) => {
    setKpiStatus(event);
  };

  const onChangeDireksi = (event: number) => {
    setKpiDireksi(event);
  };

  const onChangeMeasurement = (event: any) => {
    setMeasurement(event);
  };

  const onChangeKeyActivity = (event: string) => {
    setKeyActivity(event);
  };

  const onChangeWeight = (event: number) => {
    setWeight(event);
  };

  const onChangePoint = (event: number) => {
    setPoint(event);
  };

  const handleSearchDivision = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(KpiSettingActions.requestSearchDivisions(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchDepartment = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(KpiSettingActions.requestSearchDepartments(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchDepartmentByDivisionId = useCallback(
    (e, data, listItemDivision) => {
      if (data.value.length >= 2) {
        const departmentIds: any = [];
        listItemDivision.forEach((department) => {
          if (department.value !== '') {
            departmentIds.push(department.value);
          }
        });

        dispatch(KpiSettingActions.requestSearchDepartmentsByDivisionId(departmentIds));
      }
    },
    [dispatch]
  );

  const handleSearchFunction = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(KpiSettingActions.requestSearchFunctions(data.value));
      }
    },
    [dispatch]
  );

  const [mandatoryInput, setMandatoryInput] = useState({
    sKpiStatus: false,
    sDiv: false,
    sDept: false,
    sFunction: false,
    sKpiDireksi: false,
    sKeyActivity: false,
    sMeasurement: false,
    sWeight: false,
    sPoint: false,
  });

  const onSubmitHandler = (values: any) => {
    // console.log("values onSubmitHandler: ", values);
    const divisionIds: number[] = [];
    const departmentIds: number[] = [];
    const functionIds: number[] = [];

    if (localStorage.getItem('division') !== null) {
      JSON.parse(localStorage.getItem('division')!).map((arrValues: any) => (arrValues.value.length !== 0 ? divisionIds.push(arrValues.value) : ''));
    }

    if (localStorage.getItem('department') !== null) {
      JSON.parse(localStorage.getItem('department')!).map((arrValues: any) =>
        arrValues.value.length !== 0 ? departmentIds.push(arrValues.value) : ''
      );
    }

    if (localStorage.getItem('function') !== null) {
      JSON.parse(localStorage.getItem('function')!).map((arrValues: any) => (arrValues.value.length !== 0 ? functionIds.push(arrValues.value) : ''));
    }

    const employeesInclude: number[] = [];
    const employeesExclude: number[] = [];

    if (localStorage.getItem('kpiEmployeeIncludeExclude') !== null) {
      JSON.parse(localStorage.getItem('kpiEmployeeIncludeExclude')!).map((arrValues: any) =>
        arrValues.type === 'exclude' ? employeesExclude.push(arrValues.employeeKey) : employeesInclude.push(arrValues.employeeKey)
      );
    }

    const date = format(new Date(), 'yyyy-MM-dd');
    // const newKpi = new KpiModel();

    const newKpi = new KpiSettingModel(values);
    newKpi.status = kpiStatus;
    newKpi.kpiDireksi = kpiDireksi;
    newKpi.keyActivity = keyActivity;
    newKpi.measurement = measurement;
    newKpi.weight = weight;
    newKpi.point = Number(point);
    newKpi.divisionList = divisionIds.toString();
    newKpi.departmentList = departmentIds.toString();
    newKpi.functionList = functionIds.toString();
    newKpi.employeeInclude = employeesInclude.toString();
    newKpi.employeeExclude = employeesExclude.toString();
    newKpi.conditionList = kpiConditions;
    newKpi.createUserID = JSON.parse(userId).employeeID;
    newKpi.createDate = date;
    newKpi.modifyUserID = JSON.parse(userId).employeeID;
    newKpi.modifyDate = date;

    console.log('newKpi', newKpi);
    dispatch(KpiSettingActions.postKpiSetting(newKpi));
    dispatch(ToastsAction.add('Success', ToastStatusEnum.Success));
    props.history.push(RouteEnum.Kpi);
  };

  const onCloseHandler = () => {
    props.history.replace(RouteEnum.Kpi);
  };

  const validate = combineValidators({
    status: isRequired('status'),
    kpiDireksi: isRequired('kpiDireksi'),
    keyActivity: isRequired('keyActivity'),
    measurement: isRequired('measurement'),
    weight: isRequired('weight'),
    point: isRequired('point'),
  });

  return (
    <Fragment>
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        validate={validate}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Segment className="LightGreyNotif">
              <Grid>
                <Grid.Row columns="equal">
                  <Grid.Column>
                    <Field
                      name="status"
                      labelName="Status"
                      component={SelectInput}
                      placeholder="Active"
                      options={kpiStatusOptions}
                      onChanged={onChangeStatus}
                      mandatory={mandatoryInput.sKpiStatus}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="equal">
                  <Grid.Column>
                    <Field
                      name="kpiDireksi"
                      labelName="KPI Direksi"
                      component={SelectInput}
                      placeholder="Collection Overdue"
                      options={kpiDireksiOptions}
                      onChanged={onChangeDireksi}
                      mandatory={mandatoryInput.sKpiDireksi}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="keyActivity"
                      labelName="Key Activity"
                      component={TextInput}
                      onChange={onChangeKeyActivity}
                      mandatory={mandatoryInput.sKeyActivity}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="equal">
                  <Grid.Column className="FullGrid767" width={6}>
                    <Field
                      name="measurement"
                      labelName="Measurement"
                      component={SelectInput}
                      placeholder="Quarterly"
                      onChanged={onChangeMeasurement}
                      options={kpiMeasurementOptions}
                      mandatory={mandatoryInput.sMeasurement}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={5}>
                    <Field
                      name="weight"
                      labelName="Weight"
                      component={NumberInput}
                      placeholder="1"
                      onChange={onChangeWeight}
                      mandatory={mandatoryInput.sWeight}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={5}>
                    <Field
                      name="point"
                      labelName="Point"
                      component={NumberInput}
                      placeholder="0.5"
                      onChange={onChangePoint}
                      mandatory={mandatoryInput.sPoint}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>

            <Segment className="LightGreyNotif">
              <Grid>
                <Grid.Row>
                  <Grid className="pad-1rem">
                    <Field
                      name="database1"
                      component={HierarcyEmpSearch}
                      handleSearchDivision={handleSearchDivision}
                      handleSearchDepartment={handleSearchDepartment}
                      handleSearchDepartmentByDivisionId={handleSearchDepartmentByDivisionId}
                      handleSearchFunction={handleSearchFunction}
                      resultDivision={divisionList}
                      resultDepartment={departmentList}
                      resultFunction={functionList}
                    />
                  </Grid>
                </Grid.Row>
              </Grid>
            </Segment>
            <EmployeeLists kpiSettingID={'0'} />
            <Divider />
            <ConditionLists kpiSettingID={'0'} />
            <Divider />
            <Grid>
              <Grid.Row columns="equal" textAlign="center">
                <Grid.Column>
                  <Button floated="right" content="Cancel" type="button" onClick={onCloseHandler} />
                  <Button floated="right" color="blue" content="Submit" disabled={pristine || invalid} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default KpiForm;
