import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { format } from 'date-fns';
import { CheckBox } from 'views/components/UI';
import IStore from 'models/IStore';

interface LocationState {
  from: {
    pathname: string;
  };
  funnelGenID: string;
  projectId: string;
}

interface IProps {
  readonly rowData: any;
  listAttacment: any;
  onCheckedAttachment: any;
  type: string;
}

const GeneralAttachmentTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData, listAttacment, onCheckedAttachment, type } = props;

  const listWorkAttachmentAll = useSelector((state: IStore) => state.workList.listWorkAttachmentAll);

  return (
    <Fragment>
      <Table.Row>
        <Table.Cell>
          <CheckBox
            checked={
              (listAttacment.length > 0 && listAttacment.find((e) => e.funnelAttachmentID === rowData.funnelAttachmentID)) ||
              (type === 'EDIT' && listWorkAttachmentAll.rows?.find((e) => e.fileDownload === rowData.fileDownload))
                ? true
                : false
            }
            type="checkbox"
            value={rowData.funnelAttachmentID}
            onChange={() => onCheckedAttachment(rowData)}
          />
        </Table.Cell>
        <Table.Cell>{rowData.documentName}</Table.Cell>
        <Table.Cell>{rowData.documentType}</Table.Cell>
        <Table.Cell>{rowData.versionNumber}</Table.Cell>
        <Table.Cell>{format(new Date(rowData.uploadTime), 'dd-MM-yyyy hh:mm:ss')}</Table.Cell>
        <Table.Cell>{rowData.uploadBy}</Table.Cell>
        <Table.Cell>{rowData.topNumber}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default GeneralAttachmentTableRow;
