import React, { useEffect, useState, useCallback } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownProps, Form, Grid, Icon } from "semantic-ui-react";
import { TextInput, SelectInput, Button, DateInput } from "views/components/UI";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as BrandTypeAction from "stores/brand-model/BrandTypeAction";
import BrandTypeModel from "stores/brand-model/models/BrandTypeModel";
import IStore from "models/IStore";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import {
  selectSubBrandOptions,
  selectBrandOptionsByDate,
} from "selectors/select-options";
import { History } from "history";
import { combineValidators, isRequired } from "revalidate";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import BrandForm from "views/brand-model-page/components/form/form-brand/BrandForm";
import * as BrandActions from "stores/brand/BrandAction";
import * as SubBrandActions from "stores/brand-sub/SubBrandAction";
import EmployeeModel from "stores/employee/models/EmployeeModel";
import * as EmployeeActions from "stores/employee/EmployeeActions";
import SubBrandModel from "stores/brand-sub/models/SubBrandModel";
import RouteEnum from "constants/RouteEnum";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import moment from "moment";

interface IProps {
  history: History;
}

const validate = combineValidators({
  brandID: isRequired("Brand"),
  subBrandID: isRequired("Sub Brand"),
  modelName: isRequired("Model Name"),
});

const BrandModelForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [pmName, setPMName] = useState([]);
  const bRefreshPage: boolean = useSelector(
    (state: IStore) => state.subBrand.refreshPage
  );
  const [brandID, setBrandID] = useState(0);
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const DateNow = moment().format("yyyy-MM-DD");

  const onAddSubBrand = (e: any, data: DropdownProps) => {
    if (brandID > 0) {
      const newItems = new SubBrandModel({});
      newItems.brandID = brandID;
      newItems.subBrandID = 0;
      newItems.subBrandName =
        data.value === undefined ? "" : data.value?.toString();
      newItems.groupID = 0;

      dispatch(SubBrandActions.postSubBrand(newItems));
    }
  };

  if (bRefreshPage) {
    dispatch(SubBrandActions.requestSubBrand(brandID, ""));
  }

  const onClickBrand = useCallback((): void => {
    dispatch(ModalAction.OPEN(<BrandForm />, ModalSizeEnum.Small));
  }, [dispatch]);

  const onCloseHandler = () => {
    dispatch(BrandTypeAction.requestBrandModels(1, 5));
    props.history.replace(RouteEnum.BrandModel);
  };

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployee());
    dispatch(BrandActions.requestBrandDate(DateNow));
  }, [dispatch]);

  const subBrandStore = useSelector((state: IStore) =>
    selectSubBrandOptions(state)
  );
  const BrandDate = useSelector((state: IStore) =>
    selectBrandOptionsByDate(state)
  );
  const employeeStore: EmployeeModel[] = useSelector(
    (state: IStore) => state.employee.data
  );

  const onChangeBrand = (event: any) => {
    setPMName([])
    if (event > 0) {
      const brands = BrandDate.filter((item: any) => {
        return item.value === event;
      });
      
      const myArr = brands[0].text2.split(',');
      if (brands[0].text2 !== "") {
        const value = employeeStore.filter((item: any) => {
          myArr.filter((item2) => {
            if(item.employeeID === Number(item2))
            {
              setPMName(oldArray => [...oldArray,item.employeeName])
            }
          })
          
        });
      }
      
      // console.log('value',value)
      // if (value.length > 0) setPMName(value[0].employeeName);
      // else setPMName("");

      setBrandID(+event);

      dispatch(SubBrandActions.requestSubBrand(event, ""));
    }
  };

  const onSubmitHandler = (values: BrandTypeModel) => {
    values.brandModelGenID = 0;
    values.presales = "";
    values.postsales = "";
    values.maintenanceService = "";
    values.createUserID = currentUser.employeeID;
    values.effectiveDate = values.effectiveDate;
    values.expireDate = values.expireDate;
    const newValues = new BrandTypeModel(values);
    // console.log('newValues',newValues)
    dispatch(BrandTypeAction.postBrandModel(newValues));

    onCloseHandler();
  };

  const submitting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      BrandTypeAction.POST_BRAND_MODEL,
      BrandTypeAction.PUT_BRAND_MODEL,
    ])
  );

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: BrandTypeModel) => onSubmitHandler(values)}
      //initialValues={serviceCatalog}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={submitting}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column className="FullGrid767">
                <Field
                  name="brandID"
                  component={SelectInput}
                  placeholder="e.g.Hawllet Pa.."
                  labelName="Brand"
                  options={BrandDate}
                  onChanged={onChangeBrand}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Button
                  className="mt-2r"
                  type="button"
                  onClick={onClickBrand}
                  color="green"
                >
                  <Icon name="add" />
                  New Brand
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <label>PM Name</label>
                <h3 className="mt-0"> {pmName.join(', ')}</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="subBrandID"
                  labelName="Sub Brand"
                  component={SelectInput}
                  placeholder="e.g.Series Sub .."
                  options={subBrandStore}
                  allowAdditions={true}
                  onAddItems={onAddSubBrand}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="modelName"
                  labelName="Model"
                  component={TextInput}
                  placeholder="e.g.Model Name00.."
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Field
                  name="effectiveDate"
                  component={DateInput}
                  labelName="Effective Date"
                  placeholder="e.g.10/03/2020"
                  date={true}
                  time={false}
                  formated={"MM/dd/yyyy"}
                  // mandatory={mandatory.sStartDate}
                  // onChange={handleChangeStartDate}
                />
              </Grid.Column>
              <Grid.Column>
              <Field
                  name="expireDate"
                  component={DateInput}
                  labelName="Expired Date"
                  placeholder="e.g.10/03/2020"
                  date={true}
                  time={false}
                  formated={"MM/dd/yyyy"}
                  // mandatory={mandatory.sStartDate}
                  // onChange={handleChangeStartDate}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button
                  color="blue"
                  floated="right"
                  content="Submit"
                  disabled={pristine || invalid}
                />
                <Button
                  type="button"
                  floated="right"
                  content="Cancel"
                  onClick={onCloseHandler}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default BrandModelForm;
