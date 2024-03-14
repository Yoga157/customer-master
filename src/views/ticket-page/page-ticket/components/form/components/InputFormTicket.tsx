import React, { useState } from "react";
import { Grid, Form, Icon, Divider, Header, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import tinymce from "tinymce";

import {
  Button,
  CheckBoxInput,
  DateInput,
  InfoInputEnter,
  LabelName,
  Pagination,
  RadioButton,
  RichTextEditor,
  SearchInput,
  SearchInputList,
  SelectInput,
  TextInput,
} from "views/components/UI";
// import { ActivityReportTable, AttachmentTable, ConfigItemTable } from './Table';
import ActivityReportTable from "views/work-list-page/main/components/form/components/components/table/ActivityReportTable";
import { ActivityReportFormInput } from "views/work-list-page/main/components/form/childs";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalSecoundActions from "stores/modal/second-level/ModalSecondLevelActions";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import LabelNameMultiValue from "views/components/UI/Label/LabelNameMultiValue";
import { AttachmentTable, ConfigItemTable } from "./Table";
import FormTicketValHook from "../hooks/FormTicketValHook";
import FormTicketHooks from "../hooks/FormTicketHooks";
import ModalSizeEnum from "constants/ModalSizeEnum";
import TaskHistory from "./TaskHistory/TaskHistory";
import styles from "./InputFormTicket.module.scss";

interface IProps {
  type: string;
  page: string;
  projectId?: any;
  rowData?: any;
}

const InputFormTicket: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { type, page, projectId, rowData } = props;
  const dispatch: Dispatch = useDispatch();

  const {
    isRequesting,
    setInitialValues,
    initialValues,
    taskTemplate,
    initValTemplate,
    setInitValTemplate,
    getValueSearchBy,
    isReqSearchBy,
    handleSearchProjSummary,
    onSelectProjSumamary,
    projectSummary,
    valSearchSummary,
    searchSummary,
    taskCategory,
    taskSubCategory,
    ticketStatus,
    sla,
    slaCustomer,
    taskIssueType,
    taskSubIssue,
    drpComplexity,
    drpPriority,
    estDate,
    setEstDate,
    handleSelect,
    handleSearch,
    empHirarcy,
    employeeStoreSearch,
    resourceList,
    setResourceList,
    secondResourceList,
    setSecondResourceList,
    status,
    setStatus,
    fileChange,
    listAttacment,
    setListAttachment,
    valueRadio,
    setValueRadio,
    onSubmitHandler,
    isReqConfigList,
    resSearchSN,
    valSNSearchList,
    setValSNSearchList,
    configList,
    paginConfig,
    setPaginConfig,
    onCancel,

    sendEmail,
    setSendEmail,
    sendEmailValues,
    setEmailValues,
    emailReceiverList,
    setEmailReceiverList,
    employeeSearchValEmail,
    emailCcList,
    setEmailCcList,

    searchInput,
    getList,
    getEndDate,

    setForValueEndDate,
    forValueEndDate,

    listAttachment,
    ticketDetail,
    activePage,
    setActivePage,
    activityHeader,
    activityReport,
    history,
  } = FormTicketHooks({ type, page, projectId, rowData });

  const { validate } = FormTicketValHook({
    status,
    valSearchSummary,
    configList,
    valSNSearchList,
    resourceList,
    secondResourceList,
    initValTemplate,
    taskCategory,
    taskSubCategory,
    ticketDetail,
    type,
    page,

    setEstDate,
    estDate,

    emailReceiverList,
    emailCcList,
    sendEmail,
  });

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={validate}
      initialValues={type === "EDIT" && initialValues}
      render={({ handleSubmit, pristine, invalid, submitting }) => (
        <Form
          // onSubmit={handleSubmit}
          loading={isRequesting}
        >
          <Grid>
            <Grid.Row columns={2} className="pb-0 ph-1-5r">
              <Grid.Column
                width={4}
                className={`pb-0 ${styles.containerProjectSummary}`}
              >
                {type !== "EDIT" && (
                  <Grid>
                    <Grid.Row className="wrap-white-no-padding ticket-add-new">
                      <Grid.Column width={16}>
                        <Field
                          name="ticketTemplate"
                          component={SelectInput}
                          placeholder="e.g.Choose Ticket Template.."
                          labelName="Choose Ticket Template "
                          options={[...taskTemplate]}
                          // options={[{ value: '- Select Template -', entrykey: '- Select Template -', text: '- Select Template -' }, ...taskTemplate]}
                          onChanged={(e) => handleSelect(e, "ticketTemplate")}
                          mandatory={true}
                        />
                      </Grid.Column>

                      {page !== "pmo-view-edit" && (
                        <>
                          <Grid.Column width="16">
                            <Grid className={styles.gridContentSearchBy}>
                              <Header
                                size="tiny"
                                className={styles.headerContentSearchBy}
                              >
                                Search By{" "}
                                <label className="mandatory">{" *"}</label>
                              </Header>
                              <Grid.Row className={`pv-3px`} columns="equal">
                                <Grid.Column width={8}>
                                  <Field
                                    name="SearchProjectId"
                                    className="checked-purple2-text-gray"
                                    component={RadioButton}
                                    label="Project ID"
                                    checked={valueRadio === "SearchProjectId"}
                                    onChange={() =>
                                      setValueRadio("SearchProjectId")
                                    }
                                    // disabled={disableComponent}
                                  />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                  <Field
                                    name="SearchFunnelGenId"
                                    className="checked-purple2-text-gray"
                                    component={RadioButton}
                                    label="Funnel ID"
                                    checked={valueRadio === "SearchFunnelGenId"}
                                    onChange={() =>
                                      setValueRadio("SearchFunnelGenId")
                                    }
                                    // disabled={disableComponent}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                              <Grid.Row className={`pv-3px`} columns="equal">
                                <Grid.Column width={8}>
                                  <Field
                                    name="SearchSO"
                                    className="checked-purple2-text-gray"
                                    component={RadioButton}
                                    label="SO Number"
                                    checked={valueRadio === "SearchSO"}
                                    onChange={() => setValueRadio("SearchSO")}
                                    // disabled={disableComponent}
                                  />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                  <Field
                                    name="SearchCustomerName"
                                    className="checked-purple2-text-gray"
                                    component={RadioButton}
                                    label="Customer"
                                    checked={
                                      valueRadio === "SearchCustomerName"
                                    }
                                    onChange={() =>
                                      setValueRadio("SearchCustomerName")
                                    }
                                    // disabled={disableComponent}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Grid.Column>

                          <Grid.Column
                            width={16}
                            className={` ViewLabel FullGrid1200 ${styles.ColSearch}`}
                          >
                            <Field
                              name="searchProjSummary"
                              id="searchProjSummary"
                              component={SearchInput}
                              placeholder={`e.g. ${
                                valueRadio === "SearchProjectId"
                                  ? "Type 146"
                                  : valueRadio === "SearchFunnelGenId"
                                  ? "Type 47712"
                                  : valueRadio === "SearchSO"
                                  ? "Type 89271"
                                  : valueRadio === "SearchCustomerName"
                                  ? "Type A W Faber Castell"
                                  : "Select Type in The Top"
                              }..`}
                              labelName=""
                              mandatory={true}
                              loading={isReqSearchBy}
                              handleSearchChange={handleSearchProjSummary}
                              results={searchSummary}
                              onResultSelect={onSelectProjSumamary}
                              minCharacters={2}
                              useValues={true}
                              values={valSearchSummary.title}
                              onKeyPress={(event) => {
                                if (event.charCode == 13) {
                                  getValueSearchBy();
                                }
                              }}
                              // input={ value = valSearchSummary.title}
                              // resultRenderer={resultRenderer}
                              // disabled={!valueRadio}
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              <p
                                className="BlackListText"
                                style={{ fontWeight: "lighter" }}
                              >
                                Select Search by
                                {valueRadio === "SearchProjectId"
                                  ? " Project ID "
                                  : valueRadio === "SearchFunnelGenId"
                                  ? " Funnel ID "
                                  : valueRadio === "SearchSO"
                                  ? " SO "
                                  : valueRadio === "SearchCustomerName"
                                  ? " Customer "
                                  : " ... "}
                                and min{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {!valueRadio
                                    ? ".."
                                    : valueRadio === "SearchCustomerName"
                                    ? "5"
                                    : "2"}
                                </span>{" "}
                                character and Press{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  enter
                                </span>{" "}
                                to show results.
                              </p>
                            </div>
                          </Grid.Column>
                        </>
                      )}
                    </Grid.Row>
                  </Grid>
                )}

                <Grid>
                  <Grid.Row>
                    <Grid.Column className="ViewLabel pr-2">
                      <Header as="h5" className=" mt-05r">
                        <Header.Content>PROJECT SUMMARY</Header.Content>
                      </Header>
                      <Divider />

                      <Grid className="mb-5px">
                        <Grid.Row columns={2}>
                          <Grid.Column
                            className=" ViewLabel FullGrid1200 "
                            width={8}
                          >
                            <Field
                              name="projectIds"
                              component={TextInput}
                              placeholder="e.g.Your Project Id"
                              labelName="Project Id"
                              disabled={true}
                              values={projectSummary.projectId}
                              defaultValue={projectSummary.projectId}
                            />
                          </Grid.Column>
                          <Grid.Column
                            className=" ViewLabel FullGrid1200 "
                            width={8}
                          >
                            <Field
                              name="soNumber"
                              component={TextInput}
                              placeholder="e.g.Your So Number"
                              labelName="SO Number"
                              disabled={true}
                              values={projectSummary.so}
                              defaultValue={projectSummary.so}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Field
                        name="soidc"
                        component={LabelNameMultiValue}
                        labelName="SO IDC"
                        placeholder="e.g.3124123.."
                        values={projectSummary.soidc}
                      />

                      <Field
                        name="projectName"
                        component={TextInput}
                        placeholder="e.g.Your Project Name"
                        labelName="Project Name"
                        disabled={true}
                        values={projectSummary.projectName}
                        defaultValue={projectSummary.projectName}
                      />
                      <Field
                        name="customerName"
                        component={TextInput}
                        placeholder="e.g.Customer Name.."
                        labelName="Customer Name"
                        disabled={true}
                        values={projectSummary.customerName}
                        defaultValue={projectSummary.customerName}
                      />

                      <Field
                        name="projectAlias"
                        component={LabelNameMultiValue}
                        labelName="Project Alias"
                        placeholder="e.g.Project.."
                        values={projectSummary.projectAlias}
                      />
                      <Field
                        name="custemerAddress"
                        component={RichTextEditor}
                        placeholder="e.g.Customer Address.."
                        labelName="Customer Address"
                        disabled={true}
                        values={projectSummary.customerAddress}
                        initialValues={projectSummary.customerAddress}
                      />
                      <Field
                        name="pmos"
                        component={TextInput}
                        placeholder="e.g.PMO/S.."
                        labelName="PMO/S"
                        disabled={true}
                        values={projectSummary.pmoName}
                        defaultValue={projectSummary.pmoName}
                      />
                      <Field
                        name="picName"
                        component={TextInput}
                        placeholder="e.g.PIC Name.."
                        labelName="PIC Name"
                        disabled={true}
                        values={projectSummary.customerPicName}
                        defaultValue={projectSummary.customerPicName}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2} className="pb-0">
                    <Grid.Column className=" ViewLabel FullGrid1200 " width={8}>
                      <Field
                        name="startProject"
                        component={DateInput}
                        labelName="Start Project"
                        placeholder="e.g.09/09/2022"
                        date={true}
                        disabled={true}
                        values={projectSummary.startProject}
                        defaultValue={projectSummary.startProject}
                        // minDate={currentDate}
                        // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                      />
                    </Grid.Column>
                    <Grid.Column className=" ViewLabel FullGrid1200 " width={8}>
                      <Field
                        name="endProject"
                        component={DateInput}
                        labelName=" End Project"
                        placeholder="e.g.09/09/2022"
                        date={true}
                        disabled={true}
                        values={projectSummary.endProject}
                        defaultValue={projectSummary.endProject}
                        // minDate={currentDate}
                        // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2} className="pb-0">
                    <Grid.Column className=" ViewLabel FullGrid1200 " width={8}>
                      <Field
                        name="startWarranty"
                        component={DateInput}
                        labelName="Start Warranty"
                        placeholder="e.g.09/09/2022"
                        date={true}
                        disabled={true}
                        values={projectSummary.startWarranty}
                        defaultValue={projectSummary.startWarranty}
                        // minDate={currentDate}
                        // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                      />
                    </Grid.Column>
                    <Grid.Column className=" ViewLabel FullGrid1200 " width={8}>
                      <Field
                        name="endWarranty"
                        component={DateInput}
                        labelName="End Warranty"
                        placeholder="e.g.09/09/2022"
                        date={true}
                        disabled={true}
                        values={projectSummary.endWarranty}
                        defaultValue={projectSummary.endWarranty}
                        // minDate={currentDate}
                        // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  {/* <Grid.Row>
                    <Grid.Column>
                      <Field
                        name="itemDescription"
                        component={RichTextEditor}
                        placeholder="e.g.Item Description.."
                        labelName="Item Description"
                        disabled={true}
                      />
                    </Grid.Column>
                  </Grid.Row> */}
                </Grid>
              </Grid.Column>

              <Grid.Column
                width={12}
                className={`pb-0 ${
                  type === "EDIT" ? "bg-gray-superlight" : ""
                } `}
              >
                <Grid className="bg-fix-white m-0r">
                  <Grid.Row className="bg-fix-white pb-0">
                    <Grid.Column className="pb-0">
                      <Header as="h5" className="mt-05r mb-0">
                        <Header.Content>TICKET DETAILS</Header.Content>
                      </Header>
                      <Divider />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns="equal" className="pt-0">
                    <Grid.Column className="p-1r">
                      <Grid>
                        <Grid.Row columns="equal">
                          <Grid.Column className=" ViewLabel FullGrid1200 ">
                            <Field
                              name="category"
                              values={initValTemplate.category}
                              defaultValue={initValTemplate.category}
                              component={SelectInput}
                              placeholder="e.g.Corrective.."
                              labelName="Category"
                              options={taskCategory?.filter(
                                (e) => e.text !== "Implementation"
                              )}
                              onChanged={(e) => handleSelect(e, "category")}
                              mandatory={false}
                            />
                          </Grid.Column>

                          {/* <Grid.Column className="  FullGrid1200 ">
                            <Field
                              name="subcategory"
                              component={SelectInput}
                              values={initValTemplate.subcategory}
                              defaultValue={initValTemplate.subcategory}
                              placeholder="e.g.Service Request.."
                              labelName="Sub Category"
                              options={taskSubCategory}
                              onChanged={(e) => setInitValTemplate({ ...initValTemplate, subcategory: e })}
                              disabled={taskSubCategory?.length === 0}
                              mandatory={false}
                            />
                          </Grid.Column> */}
                        </Grid.Row>

                        <Grid.Row columns="equal">
                          <Grid.Column
                            className=" ViewLabel FullGrid1200 "
                            width="8"
                          >
                            <Field
                              name="status"
                              component={SelectInput}
                              placeholder="e.g.New.."
                              labelName="Status"
                              options={
                                type !== "EDIT"
                                  ? [{ text: "New", value: "New" }]
                                  : ticketStatus
                              }
                              onChanged={(e) => setStatus(e)}
                              mandatory={false}
                              disabled={type !== "EDIT"}
                              defaultValue={type === "EDIT" ? "" : "New"}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column className=" ViewLabel FullGrid1200 ">
                            <Field
                              name="remark"
                              editorId="ticket-remark"
                              component={RichTextEditor}
                              placeholder="e.g.Type your remarks here.."
                              labelName="Remarks"
                              mandatorys={
                                status !== "Void" && status !== "Hold"
                              }
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              {
                                <p
                                  className="BlackListText"
                                  style={{ fontWeight: "lighter" }}
                                >
                                  Mandatory when status change to{" "}
                                  <span style={{ fontWeight: "bold" }}>
                                    On Hold
                                  </span>{" "}
                                  or{" "}
                                  <span style={{ fontWeight: "bold" }}>
                                    Void
                                  </span>
                                </p>
                              }
                            </div>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column
                            className={` ViewLabel FullGrid1200 ${styles.ColSearch} ${styles.searchInputList}`}
                          >
                            <Field
                              name="resource"
                              component={SearchInputList}
                              placeholder="e.g.Han.Solo@berca.co.id"
                              labelName="Resource"
                              handleSearchChange={(val, data) =>
                                handleSearch(val, data, "resource")
                              }
                              onKeyPress={(event) => {
                                if (event.charCode === 13) {
                                  searchInput.searchResource &&
                                    getList("resource");
                                }
                              }}
                              results={empHirarcy}
                              listSoftware={resourceList}
                              setListSoftware={setResourceList}
                              mandatory={
                                type === "EDIT"
                                  ? status === "New" ||
                                    status === "Hold" ||
                                    status === "Void"
                                  : true
                              }
                            />
                            {resourceList.length === 0 && <InfoInputEnter />}
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column
                            className={` ViewLabel FullGrid1200 ${styles.ColSearch} ${styles.searchInputList}`}
                          >
                            <Field
                              name="secondaryResource"
                              component={SearchInputList}
                              placeholder="e.g.Han.Solo@berca.co.id"
                              labelName="Secondary Resource"
                              handleSearchChange={(val, data) =>
                                handleSearch(val, data, "secondaryResource")
                              }
                              onKeyPress={(event) => {
                                if (event.charCode === 13) {
                                  searchInput.searchSecondResource &&
                                    getList("secondaryResource");
                                }
                              }}
                              results={employeeStoreSearch}
                              listSoftware={secondResourceList}
                              setListSoftware={setSecondResourceList}
                              mandatory={false}
                            />
                            {secondResourceList.length === 0 && (
                              <InfoInputEnter />
                            )}
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column>
                            <Field
                              name="ticketName"
                              component={TextInput}
                              placeholder="e.g.Cisco server Maintenance .."
                              labelName="Ticket Title"
                              mandatory={false}
                              // values={picJobTitle}
                              // onChange={onJobTitle}
                            />
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column>
                            <Field
                              name="description"
                              editorId={"ticket-description"}
                              component={RichTextEditor}
                              placeholder="e.g.Type your description here.."
                              labelName="Description"
                              mandatorys={false}
                              onChange={(e) =>
                                setInitValTemplate({
                                  ...initValTemplate,
                                  description: e,
                                })
                              }
                              initialValues={initValTemplate.description}
                              values={initValTemplate.description}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>

                    <Grid.Column className="p-1r">
                      <Grid className="p-1r">
                        <Grid.Row columns="equal">
                          <Grid.Column
                            className=" ViewLabel FullGrid1200 "
                            width="8"
                          >
                            <Field
                              name="slaName"
                              component={SelectInput}
                              placeholder="e.g. 2 + 1 BD .."
                              labelName="SLA Assignment"
                              options={sla}
                              // onChanged={[]}
                              mandatory={type !== "EDIT"}
                            />
                          </Grid.Column>

                          {initValTemplate.category === "Change Request" && (
                            <Grid.Column
                              className=" ViewLabel FullGrid1200 "
                              width="8"
                            >
                              <Field
                                name="slaCustomer"
                                component={SelectInput}
                                placeholder="e.g.SLA 12x5/8.."
                                labelName="SLA Customer"
                                options={slaCustomer}
                                onChanged={(e) => {
                                  setForValueEndDate({
                                    ...forValueEndDate,
                                    slaCustomer: e,
                                  });
                                  getEndDate(
                                    estDate.estStartDate,
                                    e,
                                    forValueEndDate.priority
                                  );
                                }}
                                mandatory={true}
                              />
                            </Grid.Column>
                          )}
                        </Grid.Row>

                        <Grid.Row
                          columns="equal"
                          className={styles.bgGrayRounded}
                        >
                          <Grid.Column className=" ViewLabel FullGrid1200 ">
                            <Field
                              name="issueType"
                              values={initValTemplate.issueType}
                              defaultValue={initValTemplate.issueType}
                              component={SelectInput}
                              placeholder="e.g.Choose type.."
                              labelName="Issue Type"
                              options={taskIssueType}
                              onChanged={(e) => handleSelect(e, "issueType")}
                              mandatory={false}
                            />
                          </Grid.Column>
                          <Grid.Column className=" FullGrid1200 ">
                            <Field
                              name="issueSubtype"
                              values={initValTemplate.issueSubtype}
                              defaultValue={initValTemplate.issueSubtype}
                              component={SelectInput}
                              placeholder="e.g.Choose sub type.."
                              labelName="Sub Type"
                              options={taskSubIssue}
                              // onChanged={[]}
                              disabled={taskSubIssue?.length === 0}
                              mandatory={true}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row
                          columns="equal"
                          className={styles.bgGrayRounded}
                        >
                          <Grid.Column>
                            <Field
                              name="priority"
                              component={SelectInput}
                              placeholder="e.g.Choose priority.."
                              labelName="Priority"
                              options={drpPriority}
                              onChanged={(e) => {
                                setForValueEndDate({
                                  ...forValueEndDate,
                                  priority: e,
                                });
                                getEndDate(
                                  estDate.estStartDate,
                                  forValueEndDate.slaCustomer,
                                  e
                                );
                              }}
                              mandatory={false}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Field
                              name="complexity"
                              component={SelectInput}
                              placeholder="e.g.Choose complexity.."
                              labelName="Complexity"
                              options={drpComplexity}
                              // onChanged={[]}
                              mandatory={false}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="equal">
                          <Grid.Column className="pb-0">
                            <Field
                              name="estStartDate"
                              component={DateInput}
                              values={estDate.estStartDate}
                              labelName="Est. Start Date"
                              mandatory={false}
                              placeholder="e.g.11/05/2023, 09:00 AM"
                              time={true}
                              date={true}
                              formated="MM/dd/yyyy, hh:mm a"
                              onChange={(e) => {
                                setEstDate({ ...estDate, estStartDate: e });
                                getEndDate(
                                  e,
                                  forValueEndDate.slaCustomer,
                                  forValueEndDate.priority
                                );
                              }}
                              // minDate={currentDate}
                              // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                            />
                          </Grid.Column>
                          <Grid.Column className="pb-0">
                            <Field
                              name="estEndDate"
                              component={DateInput}
                              values={estDate.estEndDate}
                              labelName="Est. End Date"
                              mandatory={false}
                              placeholder="e.g.11/05/2023, 09:00 AM"
                              time={true}
                              date={true}
                              formated="MM/dd/yyyy, hh:mm a"
                              onChange={(e) => {
                                setEstDate({ ...estDate, estEndDate: e });
                              }}
                              // minDate={currentDate}
                              // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column className="">
                            <Field
                              name="attachment"
                              component={LabelName}
                              labelName="Attachment"
                              placeholder="e.g.01234"
                            />
                            <input
                              type="file"
                              name="file"
                              onChange={fileChange}
                              disabled={
                                !projectSummary.funnelGenId &&
                                !ticketDetail.funnelGenId
                              }
                            />
                            {!projectSummary.funnelGenId &&
                              !ticketDetail.funnelGenId && (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    marginTop: 14,
                                  }}
                                >
                                  {
                                    <p
                                      className="BlackListText"
                                      style={{ fontWeight: "lighter" }}
                                    >
                                      Need{" "}
                                      <span style={{ fontWeight: "bold" }}>
                                        Project Summary.
                                      </span>
                                    </p>
                                  }
                                </div>
                              )}
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className="ph-1r">
                          <AttachmentTable
                            tableData={
                              type === "EDIT"
                                ? listAttachment.rows
                                : listAttacment
                            }
                            setListAttachment={setListAttachment}
                            rowData={rowData}
                            type={type}
                            setPaginConfig={setPaginConfig}
                            paginConfig={paginConfig}
                          />
                          {type === "EDIT" && (
                            <Pagination
                              activePage={paginConfig.pageAttach}
                              onPageChange={(e, data) =>
                                setPaginConfig({
                                  ...paginConfig,
                                  pageAttach: data.activePage,
                                })
                              }
                              totalPage={listAttachment.totalRows}
                              pageSize={paginConfig.pageSizeAttach}
                            />
                          )}
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid className="m-0r">
                  {/* {type === 'EDIT' && ( */}
                  <>
                    <Grid.Row
                      verticalAlign="middle"
                      columns="equal"
                      className="bg-fix-white"
                    >
                      <Grid.Column>
                        <Divider />
                        <Grid className="m-0r">
                          <Grid.Row columns="equal" className="p-0">
                            <Grid.Column verticalAlign="middle">
                              <Header as="h5">
                                <Header.Content>Activity Report</Header.Content>
                              </Header>
                            </Grid.Column>

                            <Grid.Column
                              verticalAlign="middle"
                              textAlign="right"
                            >
                              <Button
                                type="button"
                                icon="plus"
                                color="yellow"
                                size="small"
                                content="Add New"
                                disabled={
                                  type !== "EDIT" ||
                                  initialValues.status?.toLowerCase() ===
                                    "closed"
                                }
                                onClick={() =>
                                  dispatch(
                                    ModalSecoundActions.OPEN(
                                      <ActivityReportFormInput
                                        type={"ADD NEW"}
                                        rowData={activityHeader}
                                        activePage={activePage}
                                        setActivePage={setActivePage}
                                      />,
                                      ModalSizeEnum.Large
                                    )
                                  )
                                }
                              />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        <Divider />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="bg-fix-white pt-0">
                      <Grid.Column>
                        <div className="mb-1r">
                          <ActivityReportTable
                            tableData={activityReport.rows}
                          />
                        </div>
                        <Pagination
                          activePage={activePage.activityReport}
                          onPageChange={(e, data) =>
                            setActivePage({
                              ...activePage,
                              activityReport: data.activePage,
                            })
                          }
                          totalPage={activityReport.totalRows}
                          pageSize={5}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row
                      verticalAlign="middle"
                      columns="equal"
                      className="bg-fix-white"
                    >
                      <Grid.Column>
                        <Divider />
                        <Grid>
                          <Grid.Row columns="equal">
                            <Grid.Column verticalAlign="middle">
                              <Header as="h5">
                                <Header.Content>CONFIG ITEM</Header.Content>
                              </Header>
                            </Grid.Column>
                            {/* <Grid.Column verticalAlign="middle" textAlign="right">
                                <Button type="button" icon="plus" color="yellow" size="small" content="Add New" />
                              </Grid.Column> */}
                          </Grid.Row>
                        </Grid>
                        <Divider />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="bg-fix-white pt-0">
                      <Grid.Column
                        width={8}
                        className={` ViewLabel FullGrid1200 ${styles.ColSearch} ${styles.searchInputList}`}
                      >
                        <Field
                          name="serialNumber"
                          component={SearchInputList}
                          placeholder="Search here.."
                          labelName="Search by SN/Product Number"
                          // mandatory={configList?.rows?.length === 0}
                          loading={false}
                          minCharacters={2}
                          handleSearchChange={(val, data) =>
                            handleSearch(val, data, "serialNumber")
                          }
                          onKeyPress={(event) => {
                            if (event.charCode === 13) {
                              searchInput.serialNumber &&
                                getList("serialNumber");
                            }
                          }}
                          results={resSearchSN}
                          listSoftware={valSNSearchList}
                          setListSoftware={setValSNSearchList}
                          // onResultSelect={}
                        />
                        {valSNSearchList.length === 0 && <InfoInputEnter />}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="bg-fix-white pt-0">
                      <Grid.Column>
                        <LoadingIndicator isActive={isReqConfigList}>
                          <ConfigItemTable tableData={configList.rows} />
                          <Pagination
                            activePage={paginConfig.page}
                            onPageChange={(e, data) =>
                              setPaginConfig({
                                ...paginConfig,
                                page: data.activePage,
                              })
                            }
                            totalPage={configList.totalRows}
                            pageSize={paginConfig.pageSize}
                          />
                        </LoadingIndicator>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className="bg-fix-white pt-0">
                      <Grid.Column
                        width="sixteen"
                        verticalAlign="top"
                        className="pb-05"
                      >
                        <Divider />
                        <Field
                          name="isSendEmailNotification"
                          component={CheckBoxInput}
                          label="Send Email Notification"
                          onChange={(e) => {
                            setSendEmail(!sendEmail);
                          }}
                        />
                        {!sendEmail && <Divider />}
                      </Grid.Column>
                    </Grid.Row>

                    {sendEmail && (
                      <>
                        {type === "EDIT" && (
                          <Grid.Row className="bg-fix-white pt-0">
                            <Grid.Column
                              className=" ViewLabel FullGrid1200 "
                              width={16}
                            >
                              <Field
                                name="subject"
                                values={sendEmailValues.subject}
                                component={TextInput}
                                placeholder="e.g.Task UID: TS2023.1081 Name: Task Title #1.19 Edit has been updated"
                                labelName="Subject"
                                disabled={true}
                                mandatory={false}
                              />
                            </Grid.Column>
                          </Grid.Row>
                        )}

                        <Grid.Row columns="equal" className="bg-fix-white pt-0">
                          <Grid.Column
                            className={`${styles.searchInputList} ViewLabel FullGrid1200 `}
                          >
                            <Field
                              name="emailReceiver"
                              component={SearchInputList}
                              placeholder="e.g.Han.Solo@berca.co.id"
                              labelName="Sent Email To"
                              handleSearchChange={(val, data) =>
                                handleSearch(val, data, "secondaryResource")
                              }
                              onKeyPress={(event) => {
                                if (event.charCode === 13) {
                                  searchInput.searchSecondResource &&
                                    getList("secondaryResource");
                                }
                              }}
                              results={employeeSearchValEmail}
                              listSoftware={emailReceiverList}
                              setListSoftware={setEmailReceiverList}
                              mandatory={!sendEmail}
                            />
                            {emailReceiverList.length === 0 && (
                              <InfoInputEnter />
                            )}
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns="equal" className="bg-fix-white pt-0">
                          <Grid.Column
                            className={`${styles.searchInputList} ViewLabel FullGrid1200 `}
                          >
                            <Field
                              name="emailCc"
                              component={SearchInputList}
                              placeholder="e.g.Han.Solo@berca.co.id"
                              labelName="CC To"
                              handleSearchChange={(val, data) =>
                                handleSearch(val, data, "secondaryResource")
                              }
                              onKeyPress={(event) => {
                                if (event.charCode === 13) {
                                  searchInput.searchSecondResource &&
                                    getList("secondaryResource");
                                }
                              }}
                              results={employeeSearchValEmail}
                              listSoftware={emailCcList}
                              setListSoftware={setEmailCcList}
                              mandatory={true}
                            />
                            {emailCcList.length === 0 && <InfoInputEnter />}
                          </Grid.Column>
                        </Grid.Row>

                        {type === "EDIT" && (
                          <Grid.Row className="bg-fix-white pt-0">
                            <Grid.Column>
                              <Field
                                name="body"
                                initialValues={sendEmailValues.body}
                                editorId="work-message"
                                component={RichTextEditor}
                                disabled={true}
                                placeholder="e.g.Type your message here.."
                                labelName="Message"
                              />

                              <Divider />
                            </Grid.Column>
                          </Grid.Row>
                        )}
                      </>
                    )}

                    {type === "EDIT" && (
                      <Grid.Row>
                        <Grid.Column>
                          <Field
                            name="resolution"
                            editorId={"ticket-resolution"}
                            component={RichTextEditor}
                            placeholder="e.g.This field will be enable when status change to COMPLETED.."
                            labelName="Resolution"
                            mandatorys={ticketDetail.status !== "Resolved"}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    )}
                  </>
                  {/* )} */}
                </Grid>

                <Grid>
                  {type === "EDIT" && (
                    <>
                      <Grid.Row verticalAlign="middle" columns="equal">
                        <Grid.Column>
                          <Grid>
                            <Grid.Row columns="equal">
                              <Grid.Column verticalAlign="middle">
                                <Header as="h5">
                                  <Header.Content>Task History</Header.Content>
                                </Header>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                          <Divider />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="pt-0">
                        <Grid.Column>
                          <TaskHistory page="ticket" history={history} />
                        </Grid.Column>
                      </Grid.Row>
                    </>
                  )}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider />

          <Grid className="ph-1-5r mt-1">
            <Grid.Row columns={1} centered className="pb-0">
              <Grid.Column textAlign="center" className="pb-0">
                <Button
                  type="button"
                  className="mr-1r"
                  size="small"
                  onClick={() => {
                    dispatch(ModalFirstLevelActions.CLOSE());
                    onCancel();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className=""
                  color="blue"
                  size="small"
                  disabled={submitting || isRequesting}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default InputFormTicket;
