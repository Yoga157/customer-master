import React from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';
import HtmlParser from 'react-html-parser';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import { WorkActivityReportRowModel } from 'stores/work-list/models/WorkActivityReportModel';
import * as ModalSecoundActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { ActivityReportFormInput } from '../../../../childs';
import { Link } from 'react-router-dom';

interface IProps {
  tableRow: WorkActivityReportRowModel;
}
const ActivityReportTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableRow } = props;
  const dispatch: Dispatch = useDispatch();

  return (
    <Table.Row>
      <Table.Cell>
        <Icon
          className="bg-blue text-white hover-pointer"
          name="eye"
          size="small"
          circular
          onClick={() =>
            dispatch(
              ModalSecoundActions.OPEN(
                <ActivityReportFormInput type={'ViewDetail'} rowData={tableRow} activePage={{}} setActivePage={() => {}} />,
                ModalSizeEnum.Large
              )
            )
          }
        />

        {/* <Menu.Item as={Link} to={`/activity-report-form/${tableRow.activityReportGenID}`} header target={'_blank'}>
          <Icon className="bg-blue text-white hover-pointer" name="eye" size="small" circular />
        </Menu.Item> */}
      </Table.Cell>
      <Table.Cell>{tableRow.activityReportGenId}</Table.Cell>
      <Table.Cell>{tableRow.engineerList}</Table.Cell>
      <Table.Cell>{tableRow.activityCategory}</Table.Cell>
      <Table.Cell>{tableRow.status}</Table.Cell>
      <Table.Cell>{HtmlParser(tableRow.actionTaken)}</Table.Cell>
      <Table.Cell>{tableRow.startDate ? moment(tableRow.startDate).format('DD/MM/YYYY') : ''}</Table.Cell>
      <Table.Cell>{tableRow.endDate ? moment(tableRow.endDate).format('DD/MM/YYYY') : ''}</Table.Cell>
    </Table.Row>
  );
};

export default ActivityReportTableRow;
