import React, { Fragment, useEffect, useState } from "react";
import { Grid, Icon, Form } from "semantic-ui-react";
import { ServiceCatalogHeaderModel } from "stores/service-catalog/models/child-edit";
import ServiceCatalogModel from "stores/service-catalog/models/ServiceCatalogModel";
import { Form as FinalForm, Field } from "react-final-form";
import {
  SelectInput,
  Button,
  LabelSubLabel,
  Tooltips,
  DateInput,
} from "views/components/UI";
import { useSelector, useDispatch } from "react-redux";
import {
  selectServiceCatalogCategory,
  selectServiceOwnerOptions,
} from "selectors/select-options";
import { statusServiceCatalog } from "constants/statusServiceCatalog";
import IStore from "models/IStore";
import { selectServiceCatalog } from "selectors/service-catalog/ServiceCatalogSelector";
import { Dispatch } from "redux";
import * as ServiceCatalogAction from "stores/service-catalog/ServiceCatalogActions";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import moment from "moment";
interface IProps {
  serviceCatalog: ServiceCatalogModel;
}

const ServiceCatalogHeader: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [disableHeader, setDisableHeader] = useState(true);
  const [effDate, setEffDate] = useState(null);
  const [expDate, setExpDate] = useState(null);
  const serviceCatalogCatStore = useSelector((state: IStore) =>
    selectServiceCatalogCategory(state)
  );
  const serviceOwnerStore = useSelector((state: IStore) =>
    selectServiceOwnerOptions(state)
  );
  const serviceCatalog = useSelector((state: IStore) =>
    selectServiceCatalog(state)
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableHeader) {
      setDisableHeader(false);
    }
  };

  const onSubmitHandler = (values: ServiceCatalogHeaderModel) => {
    values.employeeID =
      values.employeeIDLead !== undefined
        ? values.employeeIDLead.toString()?.split(".")[0]
        : "1";
    const newValues = new ServiceCatalogHeaderModel(values);
    newValues.serviceCatalogUDCID = +values.employeeIDLead
      .toString()
      ?.split(".")[1];
    newValues.modifyUserID = currentUser.employeeID;
    newValues.subBrandGroupID = props.serviceCatalog.subBrandGroupID;
    newValues.isActive = values.isActive !== 1 ? 1 : 0;
    newValues.effectiveDate = moment(values.effectiveDate).format('yyyy-MM-DDT00:00:00');
    newValues.expireDate = moment(values.expireDate).format('yyyy-MM-DDT00:00:00');
    dispatch(ServiceCatalogAction.putServiceCatalogHeader(newValues));
    if (!disableHeader) {
      setDisableHeader(true);
    }
  };

  const handleChangeEffDate = (e:any)=>{
    setEffDate(e);
  }
  const handleChangeExpDate = (e:any)=>{
    setExpDate(e);
  }
  const onCancel = () => {
    if (!disableHeader) {
      dispatch(
        ServiceCatalogAction.requestServiceCatalogById(
          +serviceCatalog.svcCatGenID
        )
      );
      setDisableHeader(true);
    }
  };
  useEffect(()=>{
    if(serviceCatalog?.effectiveDate !== ""){
      setEffDate(new Date(serviceCatalog?.effectiveDate));
    }
    if(serviceCatalog?.expireDate !== ""){
      setExpDate(new Date(serviceCatalog?.expireDate));
    }
  }, [serviceCatalog])
  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={serviceCatalog}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid padded>
            <Grid.Row columns={16}>
              <Grid.Column className="FullGrid767 HalfGrid1200" width={3}>
                <Field
                  name="svcCatReffID"
                  component={LabelSubLabel}
                  labelName="Service Reff ID"
                  values={serviceCatalog.svcCatReffID}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel ServOwner FullGrid767 HalfGrid1200" width={3}>
                <Field
                  name="svcCatID"
                  component={SelectInput}
                  labelName="Service Category"
                  disabled={disableHeader}
                  options={serviceCatalogCatStore}
                />
              </Grid.Column>
              <Grid.Column
                width={5}
                className="ViewLabel ServOwner FullGrid767 HalfGrid1200"
              >
                <Field
                  name="employeeIDLead"
                  component={SelectInput}
                  labelName="Service Owner"
                  disabled={disableHeader}
                  options={serviceOwnerStore}
                />
              </Grid.Column>
              <Grid.Column
                className="ViewLabel ServOwner FullGrid767 HalfGrid1200"
                width={3}
              >
                <Field
                  name="isActive"
                  component={SelectInput}
                  labelName="Status"
                  disabled={disableHeader}
                  options={statusServiceCatalog}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabelWhite ViewLabel FullGrid767 HalfGrid1200" width={4}>
                <Field
                  name="effectiveDate"
                  component={DateInput}
                  labelName="Effective Date"
                  placeholder=""
                  date={true}
                  disabled={disableHeader}
                  values={effDate}
                  readOnlyProps={true}
                  onChange={(e:any)=>handleChangeEffDate(e)}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabelWhite ViewLabel ServOwner FullGrid767 HalfGrid1200" width={4}>
                <Field
                  name="expireDate"
                  component={DateInput}
                  labelName="Expire Date"
                  placeholder=""
                  date={true}
                  disabled={disableHeader}
                  values={expDate}
                  style={{color:'white'}}
                  onChange={(e:any)=>handleChangeExpDate(e)}
                />
              </Grid.Column>
              {/* <Grid.Column className="FullGrid767 HalfGrid1200" width={2}> */}
                {disableHeader && (
                  <Tooltips
                    position="top right"
                    content="Edit Header Details"
                    trigger={
                      <Button
                        floated="right"
                        basic
                        type="submit"
                        compact
                        icon="edit"
                        onClick={(e: Event) => onHeaderSubmitHandler(e)}
                        className="button-absolute"
                        inverted
                      />
                    }
                  />
                )}
                {!disableHeader && (
                  <Fragment>
                    <Tooltips
                      position="top right"
                      content="Save Update"
                      trigger={
                        <Button
                          type="submit"
                          floated="right"
                          basic
                          compact
                          icon="save"
                          circular
                          inverted
                          className="button-absolute"
                        />
                      }
                    />
                    <Tooltips
                      position="top right"
                      content="Cancel Update"
                      trigger={
                        <Button
                          type="button"
                          floated="right"
                          basic
                          compact
                          icon="cancel"
                          circular
                          inverted
                          onClick={onCancel}
                          className="button-absolute"
                          style={{marginRight: '3.5%'}}
                        />
                      }
                    />
                  </Fragment>
                )}
              {/* </Grid.Column> */}
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default ServiceCatalogHeader;
