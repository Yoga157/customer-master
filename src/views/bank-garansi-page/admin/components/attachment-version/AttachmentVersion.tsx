import React, { Fragment, useEffect } from 'react';
import { Grid, Card, Divider } from 'semantic-ui-react';
import AttachmentVersionTable from './table/AttachmentVersionTable';
import IAttachmentVersionTable from 'selectors/bank-garansi/models/IAttachmentVersionTable';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectAttachmentVersions } from 'selectors/bank-garansi/BankGaransiSelector';
import IAttachmentTableRow from 'selectors/bank-garansi/models/IAttachmentTableRow';
import { Dispatch } from 'redux';
import IUserResult from 'selectors/user/models/IUserResult';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  readonly rowData: IAttachmentTableRow;
  isChild: boolean;
  modul: number;
  bgNo: string;
}

const AttachmentVersion: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, modul } = props;
 
  const onSubmitHandler = (values: any) => {};
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(
        BankGaransiActions.requestAttachmentVersions(
        props.bgNo,
        rowData.fileName,
        modul,
        0,
        currentUser.employeeID
      )
    );
  }, []);

  const attachmentVersion: IAttachmentVersionTable = useSelector((state: IStore) =>
    selectAttachmentVersions(state)
  );

  return (
    <Fragment>
      <Card.Header>Version History Of {`${rowData.documentName} - ${rowData.fileName}`}</Card.Header>
      <Divider></Divider>
      <Grid padded>
        <Grid.Row>
          <AttachmentVersionTable tableData={attachmentVersion} modul={modul} /> 
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default AttachmentVersion;
