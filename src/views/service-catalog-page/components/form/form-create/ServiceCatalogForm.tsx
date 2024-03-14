import React, { useEffect, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Grid, Segment } from "semantic-ui-react";
import {
  TextInput,
  SelectInput,
  RichTextEditor,
  Button,
  DropdownInput,
  DateInput,
} from "views/components/UI";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ServiceCatalogAction from "stores/service-catalog/ServiceCatalogActions";
import * as BrandTypeAction from "stores/brand-model/BrandTypeAction";
import ServiceCatalogModel from "stores/service-catalog/models/ServiceCatalogModel";
import IStore from "models/IStore";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import {
  selectServiceCatalogCategory,
  selectServiceOwnerOptions,
  selectBrandModelOptions,
} from "selectors/select-options";
import { afterHour, difficultyLevel } from "constants/manHoursOptions";
import { priceTypeOptions, sourcePriceOptions } from "constants/priceOptions";
import { History } from "history";
import { selectServiceCatalog } from "selectors/service-catalog/ServiceCatalogSelector";
import {
  combineValidators,
  isRequired,
  composeValidators,
  isNumeric,
  isAlphaNumeric,
  hasLengthGreaterThan,
  createValidator,
} from "revalidate";
import { selectSubBrandGroupOptions } from "selectors/select-options/BrandSubSelector";
import RouteEnum from "constants/RouteEnum";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import ServiceCatalogModelAdd from "stores/service-catalog/models/ServiceCatalogModelAdd";
import moment from "moment";

interface IProps {
  history: History;
}

const ServiceCatalogForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [priceTypeContent, setPriceTypeContent] = useState("");
  const [priceType, setPriceType] = useState("");
  const [sourcePrice, setSourcePrice] = useState("");
  const [serviceCategoryID, setServiceCategoryID] = useState(0);
  const [pageSize] = useState(10);
  const [effDate, setEffDate] = useState(new Date("12-02-2024"));
  const [expDate, setExpDate] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const bRefreshPage: boolean = useSelector(
    (state: IStore) => state.serviceCatalog.refreshPage
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const isActive: boolean = useSelector(
    (state: IStore) => state.serviceCatalog.isActive
  );

  const onSubmitHandler = (values: any) => {
    values.svcCatGenID = 0;
    values.employeeID =
      values.employeeIDLead !== undefined
        ? values.employeeIDLead.toString()?.split(".")[0]
        : "1";
    const newValues = new ServiceCatalogModelAdd(values);
    newValues.serviceCatalogUDCID = +values.employeeIDLead
      .toString()
      ?.split(".")[1];
    newValues.employeeIDLead = +values.employeeIDLead.toString()?.split(".")[0];
    newValues.brandModelID = values.brandModelIDArr.join(",");
    newValues.flagFunnelGenID = 0;
    newValues.isActive = 1;
    newValues.effectiveDate = moment(new Date(effDate)).format('yyyy-MM-DDT00:00:00');
    newValues.expireDate = moment(new Date(expDate)).format('yyyy-MM-DDT00:00:00');
    if (newValues.svcCatReffID === "DRAFT") {
      dispatch(ServiceCatalogAction.postServiceCatalog(newValues));
    }
  };
  const onChangeCategory = (values: any) => {
    setServiceCategoryID(+values);
  };

  if (bRefreshPage) {
    dispatch(
      ServiceCatalogAction.requestServiceCatalog(
        currentUser.employeeID,
        isActive ? 1 : 0,
        activePage,
        pageSize
      )
    );
    props.history.replace(RouteEnum.ServiceCatalog);
  }
  const onPriceTypeChange = (priceType: string) => {
    setPriceType(priceType);
    if (priceType === "Dynamic Price") {
      setPriceTypeContent(`% of ${sourcePrice}`);
    } else {
      setPriceTypeContent("");
    }
  };

  const onChangeSubBrand = (value: any) => {
    dispatch(BrandTypeAction.requestBrandModelByGroup(value));
  };

  const serviceCatalogCatStore = useSelector((state: IStore) =>
    selectServiceCatalogCategory(state)
  );
  const serviceOwnerStore = useSelector((state: IStore) =>
    selectServiceOwnerOptions(state)
  );
  const brandModelStore = useSelector((state: IStore) =>
    selectBrandModelOptions(state)
  );
  const serviceCatalog = useSelector((state: IStore) =>
    selectServiceCatalog(state)
  );
  const subBrandGroupStore = useSelector((state: IStore) =>
    selectSubBrandGroupOptions(state)
  );

  const submitting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ServiceCatalogAction.POST_SERVICE_CATALOG,
      ServiceCatalogAction.PUT_SERVICE_CATALOG,
    ])
  );

  const onSourcePriceChange = (sourcePrice: string) => {
    setSourcePrice(sourcePrice);
    if (priceType === "Dynamic Price") {
      setPriceTypeContent(`% of ${sourcePrice}`);
    } else {
      setPriceTypeContent("");
    }
  };

  useEffect(() => {
    //dispatch(ServiceCatalogAction.requestServiceCatalogById(0));
  }, [dispatch]);

  const dynamicPricePercent = createValidator(
    (message) => (value) => {
      if (priceType === "Dynamic Price" && +value > 100) {
        return message;
      }
    },
    "Dynamic Price, no more than 100%"
  );
  const validateAdditionalService = combineValidators({
    svcCatID: isRequired("Service Category"),
    employeeIDLead: isRequired("Service Owner"),
    svcName: isRequired("Service Name"),
    svcPrice: composeValidators(
      isRequired,
      isNumeric,
      dynamicPricePercent
    )("Price"),
  });

  const handleChangeEffDate = (e:any)=>{
    setEffDate(e);
  }
  const handleChangeExpDate = (e:any)=>{
    setExpDate(e);
  }
  const validate = combineValidators({
    svcCatID: isRequired("Service Category"),
    employeeIDLead: isRequired("Service Owner"),
    svcName: isRequired("Service Name"),
    subBrandGroupID: isRequired("Sub Brand"),
    brandModelIDArr: hasLengthGreaterThan(0)("Brand Model"),
    svcPrice: composeValidators(
      isRequired,
      isNumeric,
      dynamicPricePercent
    )("Price"),
  });
  return (
    <FinalForm
      validate={serviceCategoryID === 48 ? validateAdditionalService : validate}
      onSubmit={(values: ServiceCatalogModel) => onSubmitHandler(values)}
      initialValues={serviceCatalog}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column
                width={3}
                className="ViewLabel FullGrid767 HalfGrid1200"
              >
                <Field
                  name="svcCatReffID"
                  component={TextInput}
                  labelName="Service Reff ID"
                  placeholder="Service Reff ID"
                  disabled={true}
                  values={serviceCatalog.svcCatReffID}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767 HalfGrid1200">
                <Field
                  name="svcCatID"
                  component={SelectInput}
                  placeholder="Service Category"
                  labelName="Service Category"
                  options={serviceCatalogCatStore}
                  onChanged={onChangeCategory}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767 HalfGrid1200" width={7}>
                <Field
                  name="employeeIDLead"
                  component={SelectInput}
                  placeholder="Service Owner"
                  labelName="Service Owner"
                  options={serviceOwnerStore}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column
                width={3}
                className="ViewLabel FullGrid767 HalfGrid1200"
              >
                <Field
                  name="hidden"
                  component={TextInput}
                  placeholder=""
                  disabled={true}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767 HalfGrid1200">
                <Field
                  name="effectiveDate"
                  component={DateInput}
                  placeholder=""
                  labelName="Effective Date"
                  date={true}
                  readOnlyProps={true}
                  values={effDate}
                  onChange={handleChangeEffDate}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767 HalfGrid1200" width={7}>
                <Field
                  name="expiredDate"
                  component={DateInput}
                  placeholder=""
                  labelName="Expire Date"
                  date={true}
                  values={expDate}
                  onChange={handleChangeExpDate}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column className="FullGrid767">
                <Segment className="LightGreyNotif PadPmoNotif">
                  <h4>Product</h4>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column className="ViewLabel" width={16}>
                        <Field
                          name="subBrandGroupID"
                          component={SelectInput}
                          placeholder="Sub Brand"
                          labelName="Sub Brand"
                          options={subBrandGroupStore}
                          onChanged={onChangeSubBrand}
                        />
                      </Grid.Column>
                      <Grid.Column className="ViewLabel" width={16}>
                        <Field
                          name="brandModelIDArr"
                          component={DropdownInput}
                          placeholder="Brand Model"
                          labelName="Brand Model"
                          options={brandModelStore}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column className="FullGrid767 mt-1r-767">
                <Segment className="LightGreyNotif PadPmoNotif">
                  <h4>Man Hours</h4>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column className="FullGrid1200">
                        <Field
                          name="afterHour"
                          component={SelectInput}
                          placeholder="After Hour"
                          labelName="After Hour"
                          options={afterHour}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid1200">
                        <Field
                          name="difficultyLevel"
                          component={SelectInput}
                          placeholder="Difficulty Level"
                          labelName="Difficulty Level"
                          options={difficultyLevel}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid1200">
                        <Field
                          name="manHour"
                          component={TextInput}
                          placeholder="Man Hour"
                          labelName="Man Hour"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment className="LightGreyNotif PadPmoNotif">
                  <h4>Services</h4>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Field
                          name="svcName"
                          component={TextInput}
                          placeholder="Service Name"
                          labelName="Service Name"
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                      <Grid.Column className="FullGrid767 HalfGrid1200">
                        <Field
                          name="svcDescription"
                          component={RichTextEditor}
                          labelName="Service Description"
                          placeholder="Service Description"
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767 HalfGrid1200">
                        <Field
                          name="svcPrerequisite"
                          component={RichTextEditor}
                          labelName="Service Prerequisite"
                          placeholder="Service Prerequisite"
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767 HalfGrid1200">
                        <Field
                          name="notes"
                          component={RichTextEditor}
                          labelName="Notes"
                          placeholder="Notes"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment className="LightGreyNotif PadPmoNotif">
                  <h4>Price</h4>
                  <Grid>
                    <Grid.Row columns={4}>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="sourcePrice"
                          component={SelectInput}
                          labelName="Source Price"
                          placeholder="Source Price"
                          options={sourcePriceOptions}
                          onChanged={(sourcePrice: string) =>
                            onSourcePriceChange(sourcePrice)
                          }
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="priceType"
                          component={SelectInput}
                          labelName="Price Type"
                          placeholder="Price Type"
                          options={priceTypeOptions}
                          onChanged={(priceType: string) =>
                            onPriceTypeChange(priceType)
                          }
                          values={priceType}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="svcPrice"
                          component={TextInput}
                          labelName="Price"
                          placeholder="Price"
                          labeled={{ tag: true, content: priceTypeContent }}
                          labelPosition="right"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="right" width={3}>
                <Button
                  loading={submitting}
                  floated="right"
                  color="blue"
                  type="submit"
                  content="Submit"
                  disabled={submitting || invalid || pristine}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default ServiceCatalogForm;
