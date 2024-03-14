import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Grid, Header, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { TextInput, Button, RichTextEditor, LabelName, Tooltips } from 'views/components/UI';

import { selectViewFunnelCustomerDetail } from 'selectors/funnel/FunnelSelector';
import IStore from 'models/IStore';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Dispatch } from 'redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import CustomerFormEdit from 'views/customer-page/components/form-edit/CustomerFormEdit';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as CustomerActions from 'stores/customer/CustomerActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import CustomerModel from 'stores/customer/models/CustomerModel';
import fileDownload from 'js-file-download';
import environment from 'environment';
import axios from 'axios';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  page: string;
  funnelGenID: number;
}

const FunnelEditCustomerDetails: React.FC<IProps> = ({ funnelGenID, page }) => {
  const [disableComponent, setDisableComponent] = useState(true);
  const dispatch: Dispatch = useDispatch();

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER, CustomerActions.PUT_CUSTOMER_NPWP])
  );
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(FunnelActions.requestViewFunnelCustomerById(funnelGenID));
      setDisableComponent(true);
    }
  };

  const onSubmitHandler = (values: any) => {
    const customer = new CustomerModel(values);
    customer.modifyUserID = currentUser.employeeID;

    dispatch(CustomerActions.putCustomerNPWP(customer)).then(() => {
      dispatch(FunnelActions.requestViewFunnelCustomerDetailById(funnelGenID));
    });

    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  useEffect(() => {
    if (funnelGenID > 0) {
      dispatch(FunnelActions.requestViewFunnelCustomerDetailById(funnelGenID));
    }
  }, [dispatch]);

  const onShowFormCustomer = useCallback((): void => {
    dispatch(ModalFirstLevelActions.OPEN(<CustomerFormEdit funnelGenID={funnelGenID} />, ModalSizeEnum.Small));
  }, [dispatch]);

  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomerDetail(state));
  /*   let isRequesting: boolean = useSelector((state: IStore) => 
    selectRequesting(state, 
        [
            FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER,
            CustomerActions.PUT_CUSTOMER_NPWP
        ])); */

  const onDownloadFile = () => {
    const controllerName = `FileFunnel/download-file-customer/${viewFunnelCustomer.customerCardID}`;
    const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
    handleDownload(endpoint, viewFunnelCustomer.fileDownload);
  };

  const handleDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={viewFunnelCustomer}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header>
                  <Header.Content>Customer Details</Header.Content>
                  <Header.Content className="FloatRight">
                    {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && disableComponent && page !== 'pmo-view-edit' && (
                      <>
                        {/* <Tooltips
                          position="top right"
                          content="History Customer Details"
                          trigger={
                            <Button
                              basic
                              compact
                              icon="history"
                              circular
                              onClick={(e: Event) => dispatch(ModalFirstLevelActions.OPEN(<AccordionCustomerDetail />, ModalSizeEnum.Small))}
                            />
                          }
                        /> */}
                        <Tooltips
                          position="top right"
                          content="Edit Customer Details"
                          trigger={<Button circular basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} />}
                        />
                      </>
                    )}
                    {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && !disableComponent && (
                      <Fragment>
                        <Tooltips
                          position="top right"
                          content="Cancel Update"
                          trigger={<Button type="button" basic compact icon="cancel" circular onClick={onCancel} />}
                        />
                        <Tooltips position="top right" content="Save Update" trigger={<Button basic compact icon="save" circular />} />
                      </Fragment>
                    )}
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <div className="ui divider FullHdivider mt-0"></div>
            <Grid.Row>
              <Grid.Column className="ViewLabel ReadOnly EmailText">
                <Field name="customerName" component={LabelName} placeholder="e.g.PT.Inc.." labelName="Customer Name" />
                {viewFunnelCustomer.flagCustomerBlacklist === '1' && <p className="BlackListText">Black List Customer</p>}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field
                  name="addr1"
                  component={RichTextEditor}
                  placeholder="e.g.Jl. Sudirman.."
                  labelName="Customer Address"
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field name="phoneNumber" component={TextInput} placeholder="e.g.088112233.." labelName="Phone" disabled={disableComponent} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field name="npwpNumber" component={TextInput} placeholder="e.g.012345.." labelName="NPWP" disabled={disableComponent} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className="FullGrid1200">
                <Button
                  type="button"
                  color="blue"
                  content="Business Card"
                  size="mini"
                  disabled={viewFunnelCustomer.customerCardID.length === 0}
                  onClick={onDownloadFile}
                  icon="download"
                  labelPosition="right"
                />
              </Grid.Column>
              <Grid.Column className="FullGrid1200 mt-1r-1200">
                <Button
                  type="button"
                  color="yellow"
                  content="More Details"
                  size="mini"
                  onClick={onShowFormCustomer}
                  icon="angle right"
                  labelPosition="right"
                />
              </Grid.Column>
            </Grid.Row>
            <div className="ui divider FullHdivider mt-0"></div>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelEditCustomerDetails;
