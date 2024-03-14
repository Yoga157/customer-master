import React, { useEffect, useState } from 'react';
import { Card, Divider, Form, Grid, Header } from 'semantic-ui-react';
import { Field, Form as FinalForm } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import {
  Button,
  DateInput,
  DropdownInput,
  InfoInputEnter,
  LabelName,
  RichTextEditor,
  SearchInputList,
  SelectInput,
  TextInput,
} from 'views/components/UI';
import { selectDrpActivityCategory, selectViewActivityReport } from 'selectors/work-list/WorklistSelector';
import ActivityReportModel, { activityReport } from 'stores/work-list/models/ActivityReportModel';
import * as ModalSecoundActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { selectEmployeeEmailFixAll, selectEmployeeSearchEmail } from 'selectors/select-options/EmployeeSelector';
import ValidateActivityFormInput from './childs/Hooks/ValidateActivityFormInput';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './ActivityReportFormInput.module.scss';
import { activityStatus } from 'constants/activityStatus';
import { ProductListTable } from './childs';
import IStore from 'models/IStore';

interface IProps {
  type: string;
  rowData: any;
  activePage: any;
  setActivePage: any;
}
const ActivityReportFormInput: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { type, rowData, activePage, setActivePage } = props;
  const dispatch: Dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({} as any);

  const [engineerList, setEngineerList] = useState([] as any);
  const [departureDate, setDepartureDate] = useState(null);
  const [searchEngineer, onSearchEngineer] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [status, setStatus] = useState(null);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      WorkListActions.POST_ACTIVITY_REPORT,
      WorkListActions.GET_ACTIVITY_REPORT_BY_GENID,
      WorkListActions.GET_LIST_PRODUCT_ACTIVITY_REPORT,
    ])
  );

  const activityReportView = useSelector((state: IStore) => selectViewActivityReport(state));
  const activityCategory = useSelector((state: IStore) => selectDrpActivityCategory(state));
  const engineerResults = useSelector((state: IStore) => selectEmployeeSearchEmail(state));
  const productListState = useSelector((state: IStore) => state.workList.productListState);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const employeeFixAll = useSelector((state: IStore) => selectEmployeeEmailFixAll(state));
  const productList = useSelector((state: IStore) => state.workList.productList);

  useEffect(() => {
    if (type !== 'ViewDetail') {
      setInitialValues(rowData);
    } else {
      dispatch(WorkListActions.getListActivityReportProduct(rowData.activityReportGenID));
      dispatch(WorkListActions.getActivityReportBy(rowData.activityReportGenID));
    }

    dispatch(WorkListActions.getDropdownActivityCategory());
  }, [rowData]);

  useEffect(() => {
    if (type === 'ViewDetail') {
      let tempCategory = [];
      if (activityReportView.activityCategory) {
        activityReportView.activityCategory.split(';').map((category) =>
          activityCategory.map((e) => {
            if (e.value === category) {
              tempCategory = [...tempCategory, e.value];
            }
          })
        );
      }

      setInitialValues({
        ...activityReportView,
        taskUID: activityReportView.ticketId,
        activityCategory: tempCategory,
      });
      setDepartureDate(activityReportView.departureDate);
      setStartDate(activityReportView.startDate);
    }
  }, [activityReportView, activityCategory]);

  const getListEngineer = (engineerList) => {
    let tempListEngineer = [];
    engineerList.split(';').map((item) => {
      employeeFixAll.map((e) => {
        if (e.title.toLowerCase() === item.toLowerCase()) {
          tempListEngineer = [...tempListEngineer, { value: e.price, text: e.title }];
        }
      });
      return 1;
    });

    setEngineerList(tempListEngineer);
  };

  useEffect(() => {
    if (type === 'ViewDetail') {
      if (activityReportView?.engineerList) {
        getListEngineer(activityReportView.engineerList);
      }
    } else if (type === 'ADD NEW' && rowData.engineerList) {
      getListEngineer(rowData.engineerList);
    }
  }, [activityReportView, rowData]);

  const handleSearchEngineer = (e: any, data: any) => {
    if (data.value.length >= 2) {
      onSearchEngineer($.trim(data.value));
    }
  };

  //ticket rowData.so
  //worklist rowData.so
  const onSubmitHandler = (values) => {
    const newItem = new ActivityReportModel({});
    newItem.activityReport = new activityReport(values);
    newItem.activityReport.ticketId = values.taskUID;
    newItem.activityReport.so = 0; //kalo ticket ada SOnya dilempar 0
    newItem.activityReport.arrivalDate = moment(values.arrivalDate).format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.activityReport.departureDate = moment(values.departureDate).format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.activityReport.activityCategory = values.activityCategory ? values.activityCategory?.map((i) => i).join(';') : '';
    newItem.activityReport.engineerList = engineerList
      ?.filter((item: any) => item.value !== '')
      .map((item: any) => item.text)
      .join(';');

    newItem.activityReport.startDate = moment(values.startDate).format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.activityReport.endDate = moment(values.endDate).format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.activityReport.createDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.activityReport.createUserID = currentUser.employeeID;
    newItem.activityReport.modifyDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.activityReport.modifyUserID = currentUser.employeeID;

    newItem.activityReportItem = productListState;

    dispatch(WorkListActions.postActivityReport(newItem)).then(() => {
      rowData.taskUID && dispatch(WorkListActions.getWorkActivityReport(1, 5, rowData.taskUID));
      dispatch(ModalSecoundActions.CLOSE());
      setActivePage({
        ...activePage,
        activityReport: 1,
      });
    });
  };

  const [validate] = ValidateActivityFormInput({
    status,
  });

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, invalid, pristine }) => (
        <Form loading={isRequesting}>
          <Card.Header>{type === 'ViewDetail' ? 'View' : type} ACTIVITY REPORT</Card.Header>
          <Divider />

          <Grid className="wrap-yellow-modal-lg-00">
            <Grid.Row columns={2} className="pb-0">
              <Grid.Column className="pb-0" width={6}>
                <Field name="taskUID" component={LabelName} labelName="Ticket or Task Number" placeholder="e.g.T0001." />
              </Grid.Column>
              <Grid.Column className="pb0" width={6}>
                <Field name="so" component={LabelName} labelName="SO Number" placeholder="e.g.543210.." />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className="pb-0">
              <Grid.Column className="pb0">
                <Field name="projectName" component={LabelName} labelName="Project Name" placeholder="e.g.Project Gundam OO Riser.." />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column className="pb0">
                <Field name="customerName" component={LabelName} labelName="Customer Name" placeholder="e.g.After Earth Koalition.." />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {/* <Grid className="wrap-grey-modal-lg-00">
            <Grid.Row>
              <Grid.Column className={`${styles.colSymthom} pb0`} textAlign="center">
                <Header as="h5" className="text-gray">
                  Symthom/Error XXXXXXXXXXXX
                </Header>
                <span>
                  <Icon name="circle" size="mini" /> test
                </span>
              </Grid.Column>
            </Grid.Row>
          </Grid> */}

          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="contactName"
                  component={TextInput}
                  labelName="Contact Name"
                  placeholder="e.g. Eddy Giorte."
                  mandatory={false}
                  disabled={type === 'ViewDetail'}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="phone"
                  labelName="Contact Number"
                  component={TextInput}
                  type="number"
                  min={true}
                  placeholder="e.g. 08123456789"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  mandatory={false}
                  disabled={type === 'ViewDetail'}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="address"
                  component={RichTextEditor}
                  labelName="Address"
                  mandatorys={false}
                  editorId="address"
                  disabled={type === 'ViewDetail'}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="activityCategory"
                  component={DropdownInput}
                  placeholder="e.g.Add On (Software, License, Features).."
                  labelName="Activity Category"
                  options={activityCategory}
                  allowAdditions={true}
                  mandatory={false}
                  disabled={type === 'ViewDetail'}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="departureDate"
                  component={DateInput}
                  labelName="Departure Date"
                  placeholder="e.g.11/05/2023, 09:00 AM"
                  mandatory={false}
                  time={true}
                  date={true}
                  formated="MM/dd/yyyy, hh:mm a"
                  onChange={(e) => setDepartureDate(e)}
                  disabled={type === 'ViewDetail'}
                  // minDate={currentDate}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="startDate"
                  component={DateInput}
                  labelName="Start Date"
                  placeholder="e.g.11/05/2023, 09:00 AM"
                  mandatory={false}
                  time={true}
                  date={true}
                  formated="MM/dd/yyyy, hh:mm a"
                  onChange={(e) => setStartDate(e)}
                  disabled={type === 'ViewDetail'}
                  // minDate={currentDate}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="status"
                  component={SelectInput}
                  placeholder="e.g. Work On Progress .."
                  labelName="Status"
                  options={activityStatus}
                  mandatory={false}
                  onChanged={(e) => setStatus(e)}
                  disabled={type === 'ViewDetail'}
                  // values={'Hardware'}
                  // defaultValue={}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column
                className={`ViewLabel FullGrid1200 ${styles.MaxHSearch} ${styles.searchInputList} ${
                  type === 'ViewDetail' ? styles.hideInputSearch : ''
                }`}
              >
                <Field
                  name="engineerList"
                  component={SearchInputList}
                  placeholder="e.g.. Jhon Doe"
                  labelName="Engineer List"
                  handleSearchChange={handleSearchEngineer}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      searchEngineer && dispatch(EmployeeActions.requestEmployeeByName($.trim(searchEngineer), ''));
                    }
                  }}
                  results={searchEngineer.length >= 2 ? engineerResults : []}
                  listSoftware={engineerList}
                  setListSoftware={setEngineerList}
                  mandatory={false}
                  disabled={type === 'ViewDetail'}
                  disableDelete={type === 'ViewDetail'}
                  // loading={isRequestingEmp}
                />
                {searchEngineer.length === 0 && <InfoInputEnter />}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column className="FullGrid767">
                <Field
                  name="notes"
                  editorId="notes"
                  component={RichTextEditor}
                  labelName="Note"
                  mandatorys={status !== 'Pending'}
                  disabled={type === 'ViewDetail'}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <div className="ui divider FullHdivider" />
          <Grid>
            <Grid.Row>
              <Grid.Column width={16} verticalAlign="middle">
                <Header as="h5" className="">
                  <Header.Content>PRODUCT LIST</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="ui divider FullHdivider" />

          <Grid>
            <Grid.Row className="hozontal-scroll">
              <Grid.Column className="FullGrid767">
                <ProductListTable tableData={type === 'ViewDetail' ? productList : productListState} type={type} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column className="FullGrid767">
                <Field
                  name="description"
                  editorId="description"
                  component={RichTextEditor}
                  labelName="Description/Error Message"
                  mandatorys={false}
                  disabled={type === 'ViewDetail'}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column className="FullGrid767">
                <Field
                  name="actionTaken"
                  editorId="actionTaken"
                  component={RichTextEditor}
                  labelName="Action Taken"
                  mandatorys={false}
                  disabled={type === 'ViewDetail'}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="endDate"
                  component={DateInput}
                  labelName="Finish Date"
                  placeholder="e.g.11/05/2023, 09:00 AM"
                  mandatory={false}
                  time={true}
                  date={true}
                  formated="MM/dd/yyyy, hh:mm a"
                  minDate={new Date(moment(startDate).valueOf() + 60 * 60 * 1000)}
                  disabled={!startDate || type === 'ViewDetail'}
                  // minDate={currentDate}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="arrivalDate"
                  component={DateInput}
                  labelName="Arrival Date"
                  placeholder="e.g.11/05/2023, 09:00 AM"
                  mandatory={false}
                  time={true}
                  date={true}
                  formated="MM/dd/yyyy, hh:mm a"
                  minDate={new Date(moment(departureDate).valueOf() + 60 * 60 * 1000)}
                  disabled={!departureDate || type === 'ViewDetail'}
                  // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="ui divider FullHdivider" />
          <Grid>
            {type !== 'ViewDetail' && (
              <Grid.Column verticalAlign="middle" textAlign="center" className="mt-1r">
                <Button
                  className=" mh-5"
                  content={`Cancel`}
                  style={{ color: '#656DD1' }}
                  type="button"
                  onClick={() => dispatch(ModalSecoundActions.CLOSE())}
                  disabled={isRequesting}
                />

                <Button
                  className=" mh-5"
                  color="blue"
                  content={`Submit AR`}
                  type="button"
                  onClick={handleSubmit}
                  loading={isRequesting}
                  disabled={submitting || isRequesting}
                />
              </Grid.Column>
            )}

            {type === 'ViewDetail' && (
              <Grid.Column verticalAlign="middle" textAlign="right" className="mt-1r">
                <Button
                  className=" mh-5"
                  content={`Close`}
                  style={{ color: '#656DD1' }}
                  type="button"
                  onClick={() => dispatch(ModalSecoundActions.CLOSE())}
                  disabled={isRequesting}
                />
              </Grid.Column>
            )}
          </Grid>
        </Form>
      )}
    />
  );
};

export default ActivityReportFormInput;
