import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DateInput, RichTextEditor, DropdownInput } from 'views/components/UI';
import IStore from 'models/IStore';
import { selectPresalesOptions } from 'selectors/select-options';
import POCMapper from 'stores/funnel-poc-request/models/POCMapper';
import POCRequestModel from 'stores/funnel-poc-request/models/POCRequestModel';
import { serialize } from 'object-to-formdata';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';

import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import * as PresalesSupportActions from 'stores/presales-support/PresalesSupportActions';
import * as POCActions from 'stores/funnel-poc-request/POCActions';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface IProps {
  funnelGenID: number;
  popupLevel: number;
}
const POCRequestForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const [customerSuccessFactor, setCustomerSuccessFactor] = useState('' as any);
  const [presalesDeptIDArr, setPresalesDeptIDArr] = useState(viewFunnelCustomer.preSalesDeptArr);
  const { funnelGenID, popupLevel } = props;
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onCloseHandler = () => {
    if (popupLevel === 1) {
      dispatch(ModalFirstLevelActions.CLOSE());
    } else if (popupLevel === 2) {
      dispatch(ModalSecondLevelActions.CLOSE());
    } else if (popupLevel === 3) {
      dispatch(ModalThirdLevelActions.CLOSE());
    }
  };

  const onFileChange = (e: any) => {
    setCustomerSuccessFactor(e.target.files[0]);
  };

  const onSubmitHandler = (values: any) => {
    const newObject = new POCMapper();
    const data = new FormData();
    newObject.SalesPOC = new POCRequestModel(values);
    newObject.SalesPOC.funnelGenID = funnelGenID;
    newObject.SalesPOC.createUserID = currentUser.employeeID;
    newObject.FileCustomerSuccessFactor = customerSuccessFactor;
    newObject.SalesPOC.pocPresalesDeptID = presalesDeptIDArr.length > 0 ? presalesDeptIDArr.join(',') : '';

    const options = {
      /**
       * include array indices in FormData keys
       * defaults to false
       */
      indices: false,

      /**
       * treat null values like undefined values and ignore them
       * defaults to false
       */
      nullsAsUndefineds: false,

      /**
       * convert true or false to 1 or 0 respectively
       * defaults to false
       */
      booleansAsIntegers: false,

      /**
       * store arrays even if they're empty
       * defaults to false
       */
      allowEmptyArrays: false,
    };

    serialize(
      newObject,
      options, // optional
      data // optional
    );

    //console.log(newObject)
    dispatch(POCActions.postPOC(data));
  };

  useEffect(() => {
    dispatch(PresalesSupportActions.requestPresales());
    setPresalesDeptIDArr(viewFunnelCustomer.preSalesDeptArr);
  }, [dispatch]);

  const bRefreshPage: boolean = useSelector((state: IStore) => state.poc.refreshPage);

  if (bRefreshPage) {
    dispatch(ToastsAction.add(`Data has been saved`, ToastStatusEnum.Success));
    dispatch(POCActions.requestPOCByFunnelGenID(funnelGenID, 1, 5));
    onCloseHandler();
  }

  const onPresalesChange = (values: any) => {
    console.log(values);
    setPresalesDeptIDArr(values);
  };

  const presalesSupportOptions = useSelector((state: IStore) => selectPresalesOptions(state));

  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={serviceCatalog}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Card.Header>POC Request Form</Card.Header>
          <Divider />
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767">
                <Field name="pocExpectedDate" component={DateInput} placeholder="e.g.20" labelName="Expected POC Date" date={true} />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="pocPresalesDeptIDArr"
                  component={DropdownInput}
                  placeholder="e.g.NI,SSS Integration.."
                  labelName="PIC Dept"
                  options={presalesSupportOptions}
                  values={presalesDeptIDArr}
                  onChanged={onPresalesChange}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field name="pocNotes" component={RichTextEditor} placeholder="Requestor Notes" labelName="Requestor Notes" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <label> Customer Success Factor</label>
                <input type="file" name="imageFile" onChange={onFileChange} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns="equal" padded>
            <Grid.Column>
              <Button color="blue" floated="right" content="Submit" disabled={pristine} />
              <Button type="button" floated="right" content="Cancel" onClick={onCloseHandler} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default POCRequestForm;
