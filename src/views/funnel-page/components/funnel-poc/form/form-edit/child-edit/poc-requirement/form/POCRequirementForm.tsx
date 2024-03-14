import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, RichTextEditor, SelectInput, NumberInput } from 'views/components/UI';
import IStore from 'models/IStore';
import { selectEmployeeOptions } from 'selectors/select-options';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import * as POCRequirementActions from 'stores/funnel-poc-requirement/POCRequirementActions';
import { sourceTypeOptions } from 'constants/sourceTypeOptions';
import { requirementTypeOptions } from 'constants/requirementTypeOptions';
import POCRequirementDashboard from 'stores/funnel-poc-requirement/models/POCRequirementDashboard';
import { selectPOCRequirementSingle } from 'selectors/funnel-poc-requirement/POCRequirementSelector';
import { selectViewFunnelStatus } from 'selectors/funnel/FunnelSelector';
interface IProps {
  pocGenHID: number;
  popupLevel: number;
  pocGenReqID: number;
}
const POCRequirementForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [customerSuccessFactor, setCustomerSuccessFactor] = useState('' as any);
  const { pocGenHID, popupLevel, pocGenReqID } = props;
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [disableSourceType, setDisableSourceType] = useState(false);
  const [defaultPIC, setDefaultPIC] = useState(0);
  const [disabledPIC, setDisabledPIC] = useState(false);
  const [defaultSourceType, setDefaultSourceType] = useState('');

  const onSourceTypeChange = (type: string) => {
    dispatch(EmployeeActions.requestEmployeeByPOCType(type));
    setDefaultSourceType(type);
  };

  const onRequirementChange = (reqID: number) => {
    if (reqID === 51) {
      /// software
      setDisableSourceType(true);
      dispatch(EmployeeActions.requestEmployeeByRole(29));
      setDefaultSourceType('Internal');
      setDisabledPIC(false);
    } else if (reqID === 57) {
      /// hardware
      setDisableSourceType(true);
      dispatch(EmployeeActions.requestEmployeeByRole(27));
      setDefaultPIC(viewFunnelStatus.salesID);
      setDisabledPIC(true);
      setDefaultSourceType('Internal');
    } else if (reqID === 58) {
      /// Resource
      setDisableSourceType(false);
      setDisabledPIC(false);
    }
  };

  const onChangePIC = (values: any) => {
    setDefaultPIC(values);
  };

  const onCloseHandler = () => {
    if (popupLevel === 1) {
      dispatch(ModalFirstLevelActions.CLOSE());
    } else if (popupLevel === 2) {
      dispatch(ModalSecondLevelActions.CLOSE());
    } else if (popupLevel === 3) {
      dispatch(ModalThirdLevelActions.CLOSE());
    }
  };

  const onSubmitHandler = (values: any) => {
    const newItems = new POCRequirementDashboard(values);
    newItems.pocGenReqID = pocGenReqID;
    newItems.pocGenHID = pocGenHID;
    newItems.createUserID = currentUser.employeeID;
    newItems.pocReqPICID = defaultPIC.toString();
    newItems.sourceType = defaultSourceType;
    newItems.pocReqStatusID = 0;
    newItems.modifyUserID = currentUser.employeeID;
    if (pocGenReqID === 0) {
      dispatch(POCRequirementActions.postPOCRequirement(newItems));
    } else {
    }
  };

  useEffect(() => {
    dispatch(POCRequirementActions.requestPOCReqByPOCGenReqID(pocGenReqID));
  }, [dispatch]);

  const bRefreshPage: boolean = useSelector((state: IStore) => state.pocRequirement.refreshPage);

  if (bRefreshPage) {
    dispatch(POCRequirementActions.requestPOCReqByPOCGenHID(pocGenHID, 1, 5));
    onCloseHandler();
  }

  const employeeOptions = useSelector((state: IStore) => selectEmployeeOptions(state));
  const pocRequirementStore = useSelector((state: IStore) => selectPOCRequirementSingle(state));
  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));
  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={pocRequirementStore}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Card.Header>POC Requirement</Card.Header>
          <Divider />
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="pocReqType"
                  component={SelectInput}
                  labelName="Requirement Type"
                  placeholder="e.g.Hardware.."
                  options={requirementTypeOptions}
                  onChanged={onRequirementChange}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Field
                  name="sourceType"
                  component={SelectInput}
                  labelName="Source Type"
                  placeholder="e.g.Internal"
                  options={sourceTypeOptions}
                  disabled={disableSourceType}
                  onChanged={onSourceTypeChange}
                  values={defaultSourceType}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="pocReqPICID"
                  component={SelectInput}
                  labelName="PIC"
                  placeholder="e.g.Jhon.."
                  options={employeeOptions}
                  disabled={disabledPIC}
                  onChanged={onChangePIC}
                  values={defaultPIC}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field name="itemQty" component={NumberInput} labelName="Qty" placeholder="e.g.100..." />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field name="itemDescription" component={RichTextEditor} labelName="Description" placeholder="e.g.Catatan..." />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns="equal" padded>
            <Grid.Column>
              <Button color="blue" floated="right" content="Submit" />
              <Button type="button" floated="right" content="Cancel" onClick={onCloseHandler} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default POCRequirementForm;
