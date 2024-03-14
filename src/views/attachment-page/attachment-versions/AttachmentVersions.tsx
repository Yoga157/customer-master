import React, { Fragment, useEffect } from 'react';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import AttachmentVersionsTable from './table/AttachmentVersionsTable';
import { Form as FinalForm, Field } from 'react-final-form';
import { CheckBoxInput, ButtonMicro } from 'views/components/UI';
import IAttachmentVersionsTable from 'selectors/attachment-versions/models/IAttachmentVersionsTable';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectAttachmentVersions } from 'selectors/attachment-versions/AttachmentVersionsSelector';
import IAttachmentTableRow from 'selectors/attachment/models/IAttachmentTableRow';
import { Dispatch } from 'redux';
import IUserResult from 'selectors/user/models/IUserResult';
import * as AttachmentVersionsActions from 'stores/attachment-versions/AttachmentVersionsActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IAttachmentAndAcceptenceTableRow from 'selectors/attachment/models/IAttachmentAndAcceptenceTableRow';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  readonly rowData: IAttachmentTableRow | IAttachmentAndAcceptenceTableRow;
  isChild: boolean;
  modul: number;
  page: string;
}

const AttachmentVersions: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, modul, page } = props;

  const onSubmitHandler = (values: any) => {
    console.log('submit');
  };
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    if (page === 'pmo-view-edit') {
      dispatch(AttachmentVersionsActions.requestAttachmentVersionsPMO(+rowData.docNumber, rowData.fileName, rowData.documentTypeID, 1));
    } else {
      dispatch(
        AttachmentVersionsActions.requestAttachmentVersions(
          rowData.funnelGenID,
          rowData.fileName,
          rowData.documentTypeID,
          modul,
          currentUser.employeeID
        )
      );
    }
  }, []);

  const attachmentVersion: IAttachmentVersionsTable = useSelector((state: IStore) =>
    selectAttachmentVersions(state, [AttachmentVersionsActions.REQUEST_ATTACHMENT_VERSIONS])
  );
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AttachmentVersionsActions.REQUEST_ATTACHMENT_VERSIONS_HISTORY_PMO,
      AttachmentVersionsActions.REQUEST_ATTACHMENT_VERSIONS,
    ])
  );

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Card.Header>Version History Of {`${rowData.documentName} - ${rowData.fileName}`}</Card.Header>
      <Divider></Divider>
      <Grid padded>
        <Grid.Row>
          <AttachmentVersionsTable tableData={attachmentVersion} modul={modul} />
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default AttachmentVersions;
