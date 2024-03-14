import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Header, Icon } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import { selectEntryKey, selectProjDrp } from 'selectors/select-options/PMOTypeSelector';
import { Button, CheckBoxInput, DateInput, DropdownInput } from 'views/components/UI';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import * as PMOActions from 'stores/pmo/PMOActions';
import PMOFilter from 'stores/pmo/models/PMOFilter';
import styles from './AdvanceSearch.module.scss';
import IStore from 'models/IStore';

interface IProps {}

const AdvancedSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const {} = props;

  const [projStatus, setProjStatus] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [warrantyStatus, setWarrantyStatus] = useState([]);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const search: any = useSelector((state: IStore) => state.pmo.data.search);
  const column: any = useSelector((state: IStore) => state.pmo.data.column);

  const projectStatus: any = useSelector((state: IStore) => selectEntryKey(state, 'pmo-project-status'));
  const warrantyStts: any = useSelector((state: IStore) => selectEntryKey(state, 'pmo-warranty-status'));
  const customerDrp: any = useSelector((state: IStore) => selectProjDrp(state, 'customer'));
  const projectDrp: any = useSelector((state: IStore) => selectProjDrp(state, 'project'));
  const assignDrp: any = useSelector((state: IStore) => selectProjDrp(state, 'assign'));
  const salesDrp: any = useSelector((state: IStore) => selectProjDrp(state, 'sales'));

  useEffect(() => {
    if (currentUser.employeeID > 0) {
      dispatch(FunnelActions.reqDataEntyKeyBy('ProjectStatus'));
      dispatch(FunnelActions.reqDataEntyKeyBy('WarrantyStatus'));
      dispatch(PMOActions.reqProjectDrp(`${currentUser.employeeID}`));
      dispatch(PMOActions.reqCustomerDrp(`${currentUser.employeeID}`));
      dispatch(PMOActions.reqAssignDrp(`${currentUser.employeeID}`));
      dispatch(PMOActions.reqSalesDrp(`${currentUser.employeeID}`));
    }
  }, [dispatch, currentUser]);

  const onSubmitHandler = (values: any) => {
    const filterPMO = new PMOFilter(values);
    filterPMO.projectStatusList = projStatus.length === 0 ? '' : projStatus.join(';');
    filterPMO.warrantyStatusList = warrantyStatus.length === 0 ? '' : warrantyStatus.join(';');
    filterPMO.customerIdList = values.filterCostumerName === undefined ? '' : values.filterCostumerName.join(';');
    filterPMO.projectList = values.projectName === undefined ? '' : values.projectName.join(';');
    filterPMO.pmoAssignIdList = values.filterPMOAssign === undefined ? '' : values.filterPMOAssign.join(';');
    filterPMO.salesIdList = values.filterSalesName === undefined ? '' : values.filterSalesName.join(';');

    filterPMO.userLoginId = +currentUser.employeeID;
    filterPMO.column = `projectId`;
    filterPMO.sorting = `descending`;
    filterPMO.page = 1;
    filterPMO.pageSize = 15;

    // console.log('values', values);

    dispatch(PMOActions.postPMOFilter(filterPMO)).then(() => {
      dispatch(PMOActions.setActivePage(1));
    });
  };

  const onCancel = () => {
    setInitialValues({
      ...initialValues,
      ...new PMOFilter({}),
      Void: false,
      OnProgress: false,
      'Handoverto SMO': false,
      Handover3rd: false,
      Completed: false,
      'Handoverto Berca Support': false,
      OnHold: false,
      SMO: false,
      BercaSupport: false,
      ThirdParty: false,
      NotActive: false,
    });

    if (search) {
      dispatch(PMOActions.reqPMOListBySearch(1, 15, column, 'descending', search?.search, currentUser.employeeID));
    } else {
      dispatch(PMOActions.reqPMOList(1, 15, column, 'descending', currentUser.employeeID));
    }
    dispatch(SidebarContainerActions.CLOSE());
    dispatch(PMOActions.setActivePage(1));
  };

  const onChangeProjectStatus = (values: boolean, statusID: string) => {
    if (values) {
      setProjStatus((projStatus) => [...projStatus, statusID]);
    } else {
      const projStatusArr = projStatus.filter((id) => id !== statusID);
      setProjStatus(projStatusArr);
    }
  };

  const onChangeWarrantyStatus = (values: boolean, statusID: string) => {
    if (values) {
      setWarrantyStatus((warrantyStatus) => [...warrantyStatus, statusID]);
    } else {
      const warrantyStatusArr = warrantyStatus.filter((id) => id !== statusID);
      setWarrantyStatus(warrantyStatusArr);
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      PMOActions.POST_PMO_FILTER,
      PMOActions.PROJECT_DROPDOWN,
      PMOActions.CUSTOMER_DROPDOWN,
      PMOActions.ASSIGN_DROPDOWN,
      PMOActions.SALES_DROPDOWN,
      FunnelActions.REQUEST_ENTRY_PROJECT_STATUS,
      FunnelActions.REQUEST_ENTRY_WARRANTY_STATUS,
    ])
  );
  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <Header as="h3" inverted dividing>
                  <Header.Content className={styles.FilterTitle}>Advance Filter</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Project Status</h4>
              </Grid.Column>
              <Grid columns="equal" className="mh-5  mt-05r">
                {projectStatus?.length > 0 &&
                  projectStatus.map((stts: any, k: number) => (
                    <Grid.Column
                      className={
                        stts?.text === 'Not Started'
                          ? 'LabelGrayLight '
                          : stts?.text === 'On Progress'
                          ? 'LabelPurple2'
                          : stts?.text === 'On Hold'
                          ? 'LabelYellow'
                          : stts?.text === 'Handover to SMO'
                          ? 'LabelGreen'
                          : stts?.text === 'Handover to Berca Support'
                          ? 'LabelPurple'
                          : stts?.text === 'Handover 3rd'
                          ? 'LabelBrown'
                          : stts?.text === 'Completed'
                          ? 'LabelBlue'
                          : 'LabelRed'
                      }
                      width={
                        stts?.text === 'Not Started'
                          ? 8
                          : stts?.text === 'On Progress'
                          ? 8
                          : stts?.text === 'On Hold'
                          ? 7
                          : stts?.text === 'Handover to SMO'
                          ? 9
                          : stts?.text === 'Handover to Berca Support'
                          ? 8
                          : stts?.text === 'Handover 3rd'
                          ? 9
                          : stts?.text === 'Completed'
                          ? 7
                          : 5
                      }
                      key={k}
                    >
                      <Field
                        name={stts?.text?.replace(' ', '')}
                        component={CheckBoxInput}
                        label={
                          stts?.text === 'Handover to SMO'
                            ? 'HANDOVER SMO'
                            : stts?.text === 'Handover to Berca Support'
                            ? 'HANDOVER BS'
                            : stts?.text?.toUpperCase()
                        }
                        onChange={(e) => onChangeProjectStatus(e, stts?.value)}
                      />
                    </Grid.Column>
                  ))}
              </Grid>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Warranty Status</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Grid columns="equal" className="mh-5  mt-05r">
                  {warrantyStts?.length > 0 &&
                    warrantyStts.map((stt, k) => (
                      <Grid.Column width={stt?.text === 'Not Active' ? 8 : 5} className={`checkBoxWithIc`} key={k}>
                        <Field
                          name={stt?.text?.replace(' ', '')}
                          component={CheckBoxInput}
                          label={stt.text === 'Third Party' ? '3rd Party' : stt.text}
                          onChange={(val) => onChangeWarrantyStatus(val, stt.value)}
                        />
                        <Icon
                          name={stt?.text === 'Not Active' ? 'close' : 'check'}
                          className={`ic-rounded-18 ${stt?.text === 'Not Active' ? `bg-danger` : `bg-success`} `}
                        />
                      </Grid.Column>
                    ))}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Project Name</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="projectName" component={DropdownInput} options={projectDrp} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Customer Name</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterCostumerName" component={DropdownInput} options={customerDrp} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>PMO Assign</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterPMOAssign" component={DropdownInput} options={assignDrp} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Sales Name</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterSalesName" component={DropdownInput} options={salesDrp} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Estimate Date Range</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="estimationStartDate" labelName="Estimate Start Date" component={DateInput} placeholder="Start Date" date={true} />
                <Field name="estimationEndDate" labelName="Estimate End Date" component={DateInput} placeholder="End Date" date={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Actual Date Range</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="actualStartDate" labelName="Actual Start Date" component={DateInput} placeholder="Start Date" date={true} />
                <Field name="actualEndDate" labelName="Actual End Date" component={DateInput} placeholder="End Date" date={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button fluid color="blue" disabled={isRequesting} loading={isRequesting}>
                  Apply Filter
                </Button>
              </Grid.Column>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button type="button" fluid onClick={onCancel}>
                  Cancel
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    ></FinalForm>
  );
};

export default AdvancedSearch;
