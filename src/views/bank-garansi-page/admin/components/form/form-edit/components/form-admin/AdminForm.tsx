import React, { Fragment, useState } from 'react';
import { Grid, Header, Form, Segment, Divider } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { DateInput, TextInput, Button, Tooltips, NumberInput, SelectInput } from 'views/components/UI';
import classes from './AdminForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import {
  selectBGEditAdmin,
  selectBGEditRequester,
  selectCompanyApplicantOptions,
  selectBankCGOptions,
} from 'selectors/bank-garansi/BankGaransiSelector';
import BankGaransiModel from 'stores/bank-garansi/models/BankGaransiModel';
import BankGaransiEditViewAdminModel from 'stores/bank-garansi/models/BankGaransiEditViewAdminModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import './AdminFormStyle.scss';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import FilterSearchModel from 'stores/bank-garansi/models/FilterSearchModel';

interface IProps {
  expireds: boolean;
}

const AdminForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const bankGaransi = useSelector((state: IStore) => selectBGEditAdmin(state));
  const bankGaransiRequester = useSelector((state: IStore) => selectBGEditRequester(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [pageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshAdminPage);
  const companyApplicantStore = useSelector((state: IStore) => selectCompanyApplicantOptions(state));
  const bankCGStore = useSelector((state: IStore) => selectBankCGOptions(state));
  const resultAction = useSelector((state: IStore) => state.bankGaransi.resultActions);
  const filter: FilterSearchModel = useSelector((state: IStore) => state.bankGaransi.listSearch.filter);
  const direction: string = useSelector((state: IStore) => state.bankGaransi.listSearch.sorting);
  const search: any = useSelector((state: IStore) => state.bankGaransi.listSearch.search);
  const columnsorting: string = useSelector((state: IStore) => state.bankGaransi.listSearch.column);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onSubmitHandler = (values: BankGaransiEditViewAdminModel) => {
    if (!disableComponent) {
      setDisableComponent(true);
      const newValues = new BankGaransiEditViewAdminModel(values);

      newValues.modifyDate = new Date();
      newValues.modifyUserID = currentUser.employeeID;
      newValues.increamentNo = +values.increamentNo;
      newValues.claimPeriod = +values.claimPeriod;
      dispatch(BankGaransiActions.putBankGaransiAdmin(newValues));
    }
  };

  if (bRefreshPage) {
    if (resultAction.errorNumber == '666') {
      dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Warning));
    } else {
      if (search !== null && search.searchText != null) {
        dispatch(BankGaransiActions.requestBGSearch(currentUser.userName, search.searchText, activePage, pageSize, 0, columnsorting, direction));
      } else if (filter !== null) {
        const filterNew = new FilterSearchModel(filter);
        filterNew.pageSize = pageSize;
        filterNew.page = activePage;
        filterNew.column = columnsorting;
        filterNew.sorting = direction;
        dispatch(BankGaransiActions.postFilterSearch(filterNew));
      } else {
        dispatch(BankGaransiActions.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, columnsorting, direction));
      }
      //dispatch(BankGaransiActions.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, 'BankGuaranteeGenID', 'descending'));
    }
  }

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(BankGaransiActions.requestBGViewEditAdmin(bankGaransi.bankGuaranteeGenID));
      setDisableComponent(true);
    }
  };

  let form: any;
  if (!isRequesting) {
    form = (
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={bankGaransi}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Segment className="LightGreyNotif p-0 m-0">
              <Grid padded className="pb-0">
                <Grid.Row>
                  <Grid.Column>
                    <Header>
                      <Header.Content>Admin</Header.Content>
                      <Header.Content className="FloatRight">
                        {disableComponent &&
                          currentUser.role === 'Admin' &&
                          !props.expireds &&
                          bankGaransiRequester.stepName === 'Process In Admin' && (
                            <Tooltips
                              position="top right"
                              content="Edit Admin Details"
                              trigger={
                                <Button
                                  circular
                                  basic
                                  type="button"
                                  compact
                                  icon="edit"
                                  onClick={(e: Event) => onHeaderSubmitHandler(e)}
                                  floated="right"
                                />
                              }
                            />
                          )}
                        {!disableComponent && (
                          <Fragment>
                            <Tooltips
                              position="top right"
                              content="Cancel Update"
                              trigger={<Button onClick={onCancel} type="button" basic compact icon="cancel" circular />}
                            />
                            <Tooltips position="top right" content="Save Update" trigger={<Button basic compact icon="save" circular />} />
                          </Fragment>
                        )}
                      </Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Divider className="m-0" />
                <Grid.Row columns="2">
                  <Grid.Column className="ViewLabel">
                    <Field name="bankGuaranteeID" component={TextInput} placeholder="BG No" labelName="BG No" disabled={disableComponent} />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="submitDate"
                      component={DateInput}
                      placeholder="e.g 10/27/2020"
                      labelName="Submit Date"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="adminEffectiveDate"
                      component={DateInput}
                      placeholder="e.g 10/27/2020"
                      labelName="Effective Date"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="adminExpireDate"
                      component={DateInput}
                      placeholder="e.g 10/27/2020"
                      labelName="Expire Date"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="2">
                  <Grid.Column className={!disableComponent ? 'ViewLabel' : 'ViewLabel ReadOnly'}>
                    {bankGaransiRequester.bondIssuer == 'Danamon' && (
                      <Field
                        name="increamentNo"
                        component={NumberInput}
                        placeholder="Increment No"
                        labelName="Increment No"
                        disabled={disableComponent}
                        TextAlign="left"
                      />
                    )}
                    {bankGaransiRequester.bondIssuerType == 'Insurance' && (
                      <Field
                        name="suratPerjanjianNo"
                        component={TextInput}
                        placeholder="Surat Perjanjian No"
                        labelName="Surat Perjanjian No"
                        disabled={disableComponent}
                      />
                    )}
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    {bankGaransiRequester.bondIssuer == 'Danamon' && (
                      <Field
                        name="publishDate"
                        component={DateInput}
                        placeholder="e.g 10/27/2020"
                        labelName="Publish Date"
                        date={true}
                        disabled={disableComponent}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="3">
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="bankCG"
                      options={bankCGStore}
                      disabled={disableComponent}
                      component={SelectInput}
                      placeholder="e.g.BNI.."
                      labelName="Bank CG"
                    />
                  </Grid.Column>
                  <Grid.Column className={!disableComponent ? 'ViewLabel' : 'ViewLabel ReadOnly'}>
                    {bankGaransiRequester.bondIssuer == 'Danamon' && (
                      <Field
                        name="claimPeriod"
                        component={NumberInput}
                        placeholder="Claim Period"
                        labelName="Claim Period"
                        disabled={disableComponent}
                        TextAlign="left"
                      />
                    )}
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    {bankGaransiRequester.bondIssuer === 'Danamon' && bankGaransiRequester.bondType != null && bankGaransiRequester.bondType != '' && (
                      <Grid.Column>
                        <Field
                          name="companyApplicant"
                          options={companyApplicantStore}
                          disabled={disableComponent}
                          component={SelectInput}
                          placeholder="e.g.BHP.."
                          labelName="Company Applicant"
                        />
                      </Grid.Column>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Form>
        )}
      />
    );
  }

  return form;
};

export default AdminForm;
