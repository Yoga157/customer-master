import React, { useState, useEffect } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import styles from './InputSearchDedicatedResources.module.scss';
import { Button, CheckBox, DateInput, DropdownInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { combineValidators, isRequired } from 'revalidate';
import FilterRenewalContractModel from 'stores/dedicated-resources/models/FilterRenewalContractModel';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import { selectDropDownContractStatus, selectDropDownDepartment, selectDropDownSupervisor } from 'selectors/dedicated-resources/DedicatedResourcesServiceSelector';


interface IProps {
  searchType?: string;
  page: number;
  pageSize: number;
}
const AdvancedSearchDedicatedResources: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { searchType, page, pageSize } = props;
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const DropdownContractStatus = useSelector((state: IStore) => selectDropDownContractStatus(state))
  const DropdownDepartment = useSelector((state: IStore) => selectDropDownDepartment(state))
  const DropdownSupervisor = useSelector((state: IStore) => selectDropDownSupervisor(state))


  useEffect(() => {
    dispatch(DedicatedResourcesActions.requestDropdownContractStatusFilter())
    
    setTimeout(() => {
      dispatch(DedicatedResourcesActions.requestDropdownSupervisor(currentUser.employeeID))
    },500)
  
    setTimeout(() => {
      dispatch(DedicatedResourcesActions.requestDropdownDepartment(currentUser.employeeID))
    }, 1000)
  }, [])

  const onSubmitHandler = (values: any) => {

    const filter = new FilterRenewalContractModel(values)

    filter.userLoginID = currentUser.employeeID;
    filter.contractStatus = values.contractStatus?.length > 0 ? values?.contractStatus.join(',') : '';
    filter.department = values.department?.length > 0 ? values?.department.join(',') : '';
    filter.supervisor = values.supervisor?.length > 0 ? values?.supervisor.join(',') : '';
    filter.beginDate = values?.beginDate;
    filter.endDate = values?.endDate;
    filter.returnDoc = values?.returnDoc;
    filter.column = 'ContractID';
    filter.sorting = 'descending';
    filter.page = 1;
    filter.pageSize = 15;
    dispatch(DedicatedResourcesActions.RequestFilterRenewalContract(filter))
  };

  const validate = combineValidators({
    customer: isRequired('customer'),
  });


  const onCancel = () => {
    dispatch(DedicatedResourcesActions.requestRenewalContract(currentUser.employeeID, page, pageSize, 'ContractID', 'descending', ''))
  };

  const [returnDoc, setReturnDoc] = useState("")

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
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
            <Grid.Column>
              <Field
                name="contractStatus"
                component={DropdownInput}
                placeholder="e.g. CI,NI .."
                labelName="Contract Status"
                // disabled={isSalesAnalis ? true : disableComponent}
                options={DropdownContractStatus}
                toolTipPosition="bottom center"

              />
            </Grid.Column>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Column>
              <Field
                name="department"
                component={DropdownInput}
                placeholder="e.g. CI,NI .."
                labelName="Department"
                // disabled={isSalesAnalis ? true : disableComponent}
                options={DropdownDepartment}
                toolTipPosition="bottom center"

              />
            </Grid.Column>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Column>
              <Field
                name="supervisor"
                component={DropdownInput}
                placeholder="e.g. CI,NI .."
                labelName="Supervisor"
                // disabled={isSalesAnalis ? true : disableComponent}
                options={DropdownSupervisor}
                toolTipPosition="bottom center"

              />
            </Grid.Column>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <h4 className={styles.FilterSubtitle}>Current Contract</h4>
            <Grid.Row columns={1}>
              <Grid.Column width={8}>
                <Field name="beginDate" labelName={"Begin Date"} component={DateInput} placeholder="Start Date" date={true} />
              </Grid.Column>
              <Grid.Column width={8}>

                <Field name="endDate" labelName={"End Date"} component={DateInput} placeholder="End Date" date={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <h4 className={styles.FilterSubtitle}>Return Document</h4>
            <Grid.Row columns={2}>
              <Grid.Column textAlign="left" className="FullGrid767">
                <Field
                  className="text-primary"
                  name="returnDoc"
                  component={CheckBox}
                  label="Yes"
                  mandatory={false}
                  thousandSeparator={true}
                  checked={returnDoc === 'Yes'}
                  onChange={() => {
                    setReturnDoc('Yes')
                    // setAlertPress(false)
                  }}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  className="text-primary"
                  name="returnDoc"
                  component={CheckBox}
                  label="No"
                  mandatory={false}
                  thousandSeparator={true}
                  checked={returnDoc === 'No'}
                  onChange={() => {
                    setReturnDoc('No')
                    // setAlertPress(false)
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button fluid color="blue">
                  Apply Filter
                </Button>
              </Grid.Column>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button type="button" fluid onClick={onCancel}>
                  Reset Filter
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default AdvancedSearchDedicatedResources;
