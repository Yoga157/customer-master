import React, { useState } from 'react';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { gantt } from 'dhtmlx-gantt';

import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ProjectGundamActions from 'stores/project-gundam/ProjectGundamActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import SubmitExcel from './hooks/SubmitExcel';
import { Button } from 'views/components/UI';
import UploadFile from './hooks/UploadFile';
import IStore from 'models/IStore';

function UploadProjectGundam({ projectId, funnelGenID }) {
  const dispatch = useDispatch();

  const [uploadFile] = UploadFile();
  const [isRequesting, setRequesting] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [disable, setDisable] = useState(false);
  const [file, setFile] = useState(null);

  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
    console.log('target.files[0].name', e.target.files[0].name);
    if (e.target.files[0].name.match(/\.(xlsx)$/)) {
      setFileType('xlsx');
      setDisable(false);
    } else if (e.target.files[0].name.match(/\.(mpp)$/)) {
      setFileType('mpp');
      setDisable(false);
    } else {
      showMsg('Please select a valid file', 'error');
      setFileType(null);
      setDisable(true);
      setFile(null);
    }
  };

  const showMsg = (msg: string, type: string) => {
    gantt.message({ type: type, text: msg, expire: -1 });
  };

  const isRequestingService: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [ProjectGundamActions.IMPORT_EXCEL, ProjectGundamActions.IMPORT_MPP])
  );
  const [requesting, onSubmitHandler]: any = SubmitExcel();

  function upload() {
    uploadFile(true, file, projectId, funnelGenID);
    // setRequesting(true);
    // gantt.importFromMSProject({
    //   data: file,
    //   callback: function(project) {
    //     if (project) {
    //       gantt.clearAll();

    //       if (project.config.duration_unit) {
    //         gantt.config.duration_unit = project.config.duration_unit;
    //       }

    //       gantt.parse(project.data);
    //       dispatch(ModalFirstLevelActions.CLOSE());
    //       setRequesting(false);
    //     }

    //     // if (callback) callback(project);
    //   },
    // });
  }

  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => (fileType === 'xlsx' ? onSubmitHandler(file, projectId, funnelGenID) : upload())}
      //initialValues={serviceCatalog}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Card.Header>Import Timeline</Card.Header>
          <Divider />
          <input type="file" name="file" onChange={onChangeFile} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: 14,
            }}
          >
            <p className="BtmFormNote">xlsx, mpp</p>
          </div>
          <Grid>
            <Grid.Column>
              <Button
                className="mt-1r"
                color="blue"
                floated="right"
                content={`Save from ${fileType === 'xlsx' ? 'Excel' : fileType === 'mpp' ? 'Microsoft Project' : '...'}`}
                loading={isRequesting || requesting || isRequestingService}
                disabled={disable || isRequesting || requesting || isRequestingService || file === null}
              />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
}

export default UploadProjectGundam;
