import React from 'react';
import { Card, Divider, Dropdown, Form, Grid, Header, Input, Tab } from 'semantic-ui-react';
import { Field, Form as FinalForm } from 'react-final-form';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import GeneralAttachment from '../general-attachment/table/GeneralAttachment';
import { FileUpload, Pagination } from 'views/components/UI';

interface IProps {
  fileChange: any;
  isRequestingAttachment: boolean;
  generalList: any;
  setListAttachment: any;
  listAttacment: any;
  task: any;
  docTypeId: any;
  getAttachment: any;
  setPaginConfig: any;
  paginConfig: any;
  activePage: any;
  handlePaginationChange: any;
}

const TabPanesAttachment = (props: IProps) => {
  const {
    fileChange,
    isRequestingAttachment,
    generalList,
    setListAttachment,
    listAttacment,
    task,
    docTypeId,
    getAttachment,
    setPaginConfig,
    paginConfig,
    activePage,
    handlePaginationChange,
  } = props;

  const panes = [
    {
      menuItem: { key: 'upload', icon: 'upload', content: 'Upload' },
      render: () => (
        <Tab.Pane attached={false}>
          <Field
            name="file"
            component={FileUpload}
            onChanged={fileChange}
            placeholder="e.g..."
            labelName="Upload File"
            mandatory={true}
            // values={picJobTitle}
            // onChanged={(e) => setFileAttachment(e.target.files[0])}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'general', icon: 'tasks', content: 'General' },
      render: () => (
        <Tab.Pane attached={false}>
          <Grid className="pv-1r">
            <LoadingIndicator isActive={isRequestingAttachment}>
              <Grid.Column width={16}>
                <GeneralAttachment
                  tableData={generalList}
                  setListAttachment={setListAttachment}
                  listAttacment={listAttacment}
                  type={task}
                  docTypeId={docTypeId}
                  getAttachment={getAttachment}
                  setPaginConfig={setPaginConfig}
                  paginConfig={paginConfig}
                />
                <Pagination
                  activePage={activePage}
                  onPageChange={(e, data) => handlePaginationChange(e, data)}
                  totalPage={generalList.totalRow}
                  pageSize={5}
                />
              </Grid.Column>
            </LoadingIndicator>
          </Grid>
        </Tab.Pane>
      ),
    },
  ];

  return { panes };
};

export default TabPanesAttachment;
