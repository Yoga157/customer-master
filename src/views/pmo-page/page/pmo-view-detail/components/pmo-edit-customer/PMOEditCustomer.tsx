import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Form, Icon, Label, Dropdown } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import FunnelViewEditCustomerByProjectId from 'stores/funnel/models/view-edit/FunnelViewEditCustomerByProjectId';
import { selectViewFunnelCustomer, selectViewFunnelCustomerByProjectId } from 'selectors/funnel/FunnelSelector';
import { DateInput, TextInput, Button, Tooltips, RichTextEditor } from 'views/components/UI';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectPMOProjectViewEditStatus } from 'selectors/pmo/PMOSelector';
import PMOEditStatusHook from '../pmo-edit-status/hooks/PMOEditStatusHook';
import IPMOViewEditStatus from 'selectors/pmo/models/IPMOViewEditStatus';
import PMOEditCustomerValidateHook from './PMOEditCustomerValidateHook';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as PMOActions from 'stores/pmo/PMOActions';
import './PMOEditCustomerStyle.scss';
import IStore from 'models/IStore';

interface IProps {
  page: string;
  funnelGenID: string;
  projectId: string;
}

const PMOEditCustomer: React.FC<IProps> = ({ page, funnelGenID, projectId }) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const [projectAliasVal, setProjectAliasVal] = useState('');
  const [projectAlias, setProjectAlias] = useState([]);

  const pmoViewEditStatus: IPMOViewEditStatus = useSelector((state: IStore) => selectPMOProjectViewEditStatus(state));
  const customerByProjectId = useSelector((state: IStore) => selectViewFunnelCustomerByProjectId(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const { statusProject } = PMOEditStatusHook({
    projectId: +projectId,
  });

  useEffect(() => {
    if (funnelGenID.length > 0) {
      page === 'pmo-view-edit' && dispatch(FunnelActions.reqPMOPCustomerBy(+projectId));
    }
  }, [dispatch, funnelGenID]);

  useEffect(() => {
    let tempData = [];
    if (funnelGenID.length > 0) {
      if (customerByProjectId?.projectAlias) {
        customerByProjectId.projectAlias.split(',').map((e, i) => {
          tempData = [...tempData, { id: i + 1, name: e }];
        });
      }
    }

    setProjectAlias(tempData);
  }, [dispatch, customerByProjectId]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER, FunnelActions.VIEW_CUSTOMER_BY_PROJECTID])
  );

  const onEditHandler = (e: Event) => {
    setDisableComponent(false);
  };

  const onCancel = () => {
    if (!disableComponent) {
      page === 'pmo-view-edit' && dispatch(FunnelActions.reqPMOPCustomerBy(+projectId));
      setDisableComponent(true);
      setProjectAliasVal(' ');
    }
  };

  const onSubmitHandler = (values: any) => {
    if (page === 'pmo-view-edit') {
      const newItem = {
        projectId: +projectId,
        funnelGenId: +funnelGenID,
        projectAlias: projectAlias.length > 0 ? projectAlias.map((e) => e.name.trim()).join(',') : '',
        warrantyStart: values.warrantyStart && moment(values.warrantyStart).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        warrantyEnd: values.warrantyEnd && moment(values.warrantyEnd).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        contractStart: values.contractStart && moment(values.contractStart).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        contractEnd: values.contractEnd && moment(values.contractEnd).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        estStartBypmo: values.estStartByPmo && moment(values.estStartByPmo).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        estEndBypmo: values.estEndByPmo && moment(values.estEndByPmo).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        thirdPartyName: values.thirdPartyName,
        thirdPartyPicName: values.thirdPartyPicName,
        thirdPartyPhoneNumber: values.thirdPartyPhoneNumber,
        serviceLocation: values.serviceLocation,
        serviceDescription: values.serviceDescription,
        projectStatus: pmoViewEditStatus?.projectStatus,
        modifyDate: new Date(),
        modifyUserID: currentUser.employeeID,
      };

      dispatch(FunnelActions.putEstimationByPmo(newItem)).then(() => {
        dispatch(FunnelActions.reqPMOPCustomerBy(+projectId));
        dispatch(PMOActions.reqRequirementClosingProject(+projectId, +funnelGenID, pmoViewEditStatus.projectStatus));
        setDisableComponent(true);
      });
    }

    setProjectAliasVal(' ');
  };

  const resultMessage = useSelector((state: IStore) => state.funnel.resultActions);
  useEffect(() => {
    if (resultMessage?.message === 'Update Success') {
      dispatch(ToastAction.add('Update Success!', ToastStatusEnum.Success));
      dispatch(FunnelActions.removeResult());
    } else if (resultMessage?.errorNumber === '666') {
      dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Error));
      dispatch(FunnelActions.removeResult());
    }
  }, [resultMessage]);

  const { validate } = PMOEditCustomerValidateHook({ pmoViewEditStatus });

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={customerByProjectId}
      validate={validate}
      render={({ handleSubmit, submitting }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column width={16} className="FloatRight">
                {disableComponent && (
                  <>
                    {JSON.parse(localStorage.getItem('editViewFunnelCustomerEdit')) && (
                      <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning float-r mt-px-4 ml-px-4" />} />
                    )}

                    {true && (
                      <Tooltips
                        content="Edit Customer Details"
                        trigger={
                          <Button
                            basic
                            type="button"
                            compact
                            icon="edit"
                            disabled={statusProject === 'void'}
                            onClick={(e: Event) => onEditHandler(e)}
                            floated="right"
                          />
                        }
                      />
                    )}

                    {/* <Tooltips
                      content="History Customer Details"
                      trigger={
                        <Button
                          basic
                          type="button"
                          compact
                          icon="history"
                          floated="right"
                          onClick={(e: Event) =>
                            // dispatch(ModalFirstLevel.OPEN(<AccordianCutomer funnelGenID={viewFunnelCustomer.funnelGenID} />, ModalSizeEnum.Small))
                            alert('history')
                          }
                        />
                      }
                    /> */}
                  </>
                )}
                {!disableComponent && (
                  <Fragment>
                    <Tooltips content="Save Update" trigger={<Button basic compact icon="save" floated="right" disable={submitting} />} />
                    <Tooltips
                      content="Cancel Update"
                      trigger={
                        <Button
                          type="button"
                          basic
                          compact
                          icon="cancel"
                          floated="right"
                          onClick={() => {
                            onCancel();
                          }}
                        />
                      }
                    />
                  </Fragment>
                )}
              </Grid.Column>
              <Grid.Column className="ViewLabel projectAliass">
                <Field
                  name="projectAliass"
                  component={TextInput}
                  placeholder={disableComponent ? 'e.g.Your Project Alias' : ''}
                  disabled={disableComponent}
                  labelName="Project Alias"
                  values={projectAliasVal}
                  onChange={(e) => setProjectAliasVal(e)}
                  // meta={{
                  //   touched: projectAliasVal.trim().length === 0 ? 'Project Alias is Required' : false,
                  //   error: projectAliasVal.trim().length === 0 ? 'Project Alias is Required' : false,
                  // }}
                  icon={
                    <Icon
                      inverted
                      name="plus"
                      color="blue"
                      circular
                      link
                      disabled={(projectAliasVal.trim().length === 0 ? true : false) || disableComponent}
                      onClick={() => {
                        setProjectAlias([...projectAlias, { id: projectAlias.length + 1, name: projectAliasVal }]);
                        setProjectAliasVal(' ');
                        // dispatch(
                        //   FunnelActions.updateProjectAlias(
                        //     `${
                        //       projectAlias.length > 0
                        //         ? `${projectAlias?.map((e) => e.name.trim()).join(',')},${projectAliasVal.trim()}`
                        //         : projectAliasVal.trim()
                        //     }`,
                        //     currentUser.employeeID,
                        //     +funnelGenID
                        //   )
                        // );
                      }}
                    />
                  }
                />

                <Grid.Column className="ViewLabel" textAlign="center">
                  {projectAlias.map((item, i) => {
                    return (
                      <Label as="a" key={i} className="mb-5px">
                        {item.name}
                        <Icon
                          name="delete"
                          disabled={disableComponent}
                          onClick={() => {
                            setProjectAlias(projectAlias?.filter((e) => e.id !== item.id));
                            // dispatch(
                            //   FunnelActions.updateProjectAlias(
                            //     `${
                            //       projectAlias.length > 0
                            //         ? projectAlias
                            //             ?.filter((e) => e.id !== item.id)
                            //             .map((e) => e.name.trim())
                            //             .join(',')
                            //         : ''
                            //     }`,
                            //     currentUser.employeeID,
                            //     +funnelGenID
                            //   )
                            // );
                          }}
                        />
                      </Label>
                    );
                  })}
                </Grid.Column>
              </Grid.Column>
            </Grid.Row>
            <div className="ui divider FullHdivider"></div>
            <Grid.Row columns={2}>
              <Grid.Column className=" ViewLabel FullGrid1200">
                <Field
                  name="warrantyStart"
                  component={DateInput}
                  formated={'MM/dd/yyyy'}
                  placeholder="e.g.09/09/2020"
                  labelName="Customer Warranty Start Date"
                  date={true}
                  disabled={disableComponent}
                  mandatory={true}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="warrantyEnd"
                  component={DateInput}
                  formated={'MM/dd/yyyy'}
                  placeholder="e.g.09/09/2020"
                  labelName="Customer Warranty End Date"
                  date={true}
                  disabled={disableComponent}
                  mandatory={true}
                />
              </Grid.Column>
            </Grid.Row>
            <div className="ui divider FullHdivider"></div>
            <Grid.Row columns={2}>
              <Grid.Column className=" ViewLabel FullGrid1200">
                <Field
                  name="contractStart"
                  component={DateInput}
                  formated={'MM/dd/yyyy'}
                  placeholder="e.g.09/09/2020"
                  labelName="Start Contract"
                  date={true}
                  disabled={disableComponent}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="contractEnd"
                  component={DateInput}
                  formated={'MM/dd/yyyy'}
                  placeholder="e.g.09/09/2020"
                  labelName="End Contract"
                  date={true}
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>

            <div className="ui divider FullHdivider"></div>
            <Grid.Row columns={2}>
              <Grid.Column className=" ViewLabel FullGrid1200">
                <Field
                  name="estStartByPmo"
                  component={DateInput}
                  formated={'MM/dd/yyyy'}
                  placeholder="e.g.09/09/2020"
                  labelName="Est. Start Project"
                  date={true}
                  disabled={disableComponent}
                  mandatory={false}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="estEndByPmo"
                  component={DateInput}
                  formated={'MM/dd/yyyy'}
                  placeholder="e.g.09/09/2020"
                  labelName="Est. End Project"
                  date={true}
                  disabled={disableComponent}
                  mandatory={false}
                />
              </Grid.Column>
            </Grid.Row>

            <div className="ui divider FullHdivider"></div>
            <Grid.Row columns={2}>
              <Grid.Column className=" ViewLabel FullGrid1200">
                <Field
                  name="actStartByPmo"
                  component={DateInput}
                  formated={'MM/dd/yyyy'}
                  placeholder="e.g.09/09/2020"
                  labelName="Act. Start Project"
                  date={true}
                  disabled={true}
                  mandatory={true}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="actEndByPmo"
                  component={DateInput}
                  formated={'MM/dd/yyyy'}
                  placeholder="e.g.09/09/2020"
                  labelName="Act.End Project"
                  date={true}
                  disabled={true}
                  mandatory={true}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column className=" ViewLabel FullGrid1200 " width={6}>
                <Field
                  name="month"
                  component={TextInput}
                  placeholder="e.g.99"
                  labelName="Actual Duration"
                  disabled={true}
                  textAlign="right"
                  type="number"
                  min={true}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  // onChange={onDurationProjectChange}
                  labeled={
                    <Dropdown
                      className="dropdown-disabled"
                      disabled={true}
                      options={[{ key: 'months', text: 'Months', value: 'months' }]}
                      // onChange={onChangeDurationType}
                      value={'months'}
                    />
                  }
                  labelPosition="right"
                  // toolTipPosition="bottom center"
                  // toolTipContents="Project Duration Estimation base warranty to the customer (Not Vendor Warranty)"
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 " width={6}>
                <Field
                  name="day"
                  component={TextInput}
                  placeholder="e.g.99"
                  labelName=""
                  disabled={true}
                  textAlign="right"
                  type="number"
                  min={true}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  // onChange={onDurationProjectChange}
                  labeled={
                    <Dropdown
                      className="dropdown-disabled"
                      disabled={true}
                      options={[{ key: 'days', text: 'Days', value: 'days' }]}
                      // onChange={onChangeDurationType}
                      value={'days'}
                    />
                  }
                  labelPosition="right"
                  // toolTipPosition="bottom center"
                  // toolTipContents="Project Duration Estimation base warranty to the customer (Not Vendor Warranty)"
                />
              </Grid.Column>
            </Grid.Row>

            <div className="ui divider FullHdivider"></div>
            <Grid.Row columns="equal">
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="thirdPartyName"
                  component={TextInput}
                  labelName="3rd Party Name"
                  placeholder="e.g. PT. Karya Cipta Abadi."
                  mandatory={pmoViewEditStatus.projectStatus !== 'Handover 3rd'}
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="thirdPartyPicName"
                  component={TextInput}
                  labelName="PIC Name"
                  placeholder="e.g. Marvin McKinney."
                  mandatory={pmoViewEditStatus.projectStatus !== 'Handover 3rd'}
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="thirdPartyPhoneNumber"
                  labelName="PIC Phone Number"
                  component={TextInput}
                  type="number"
                  min={true}
                  placeholder="e.g. 08123456789"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  mandatory={pmoViewEditStatus.projectStatus !== 'Handover 3rd'}
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="serviceLocation"
                  component={TextInput}
                  placeholder="e.g.Location.."
                  labelName="Service Location"
                  disabled={disableComponent}
                  // mandatory={false}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="serviceDescription"
                  editorId="customer-serviceDescription"
                  component={RichTextEditor}
                  placeholder="e.g.Description.."
                  labelName="Service Description"
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>

            {/* <Grid.Row columns="equal">
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="phone"
                  component={TextInput}
                  disabled={disableComponent}
                  // labelPosition="right"
                  // placeholder="Enter weight..."
                  // labelName="PIC Phone Number"
                  // labeled={{ basic: true, content: 'Kg' }}
                  // icon="tags"
                  // iconPosition="left"
                  labeled={{ tag: true, content: 'Add Tag' }}
                  labelPosition="right"
                  placeholder="Enter tags"
                />
              </Grid.Column>
            </Grid.Row> */}
          </Grid>
        </Form>
      )}
    />
  );
};

export default PMOEditCustomer;
