import React from 'react';
import { Table, Dropdown, Icon, Popup, Header } from 'semantic-ui-react';
import IFunnelTableRow from 'selectors/funnel/models/IFunnelTableRow';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import ReAssignSales from 'views/customer-transfer-page/components/reassign/ReAssignSales';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { format } from 'date-fns';
import IVerificationFunnelTableRow from 'selectors/verification-funnel/models/IVerificationFunnelTableRow';
import ReactHtmlParser from 'react-html-parser';
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';

interface IProps {
  readonly rowData: IVerificationFunnelTableRow;
}

const VerificationTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const { rowData } = props;

  return (
    <Table.Row key={rowData.no}>
      <Table.Cell>{rowData.no}</Table.Cell>
      <Table.Cell>{rowData.verificationItem}</Table.Cell>
      <Table.Cell>
        <Icon
          name={rowData.verificationStatus.length > 0 ? 'close' : 'checkmark'}
          color={rowData.verificationStatus.length > 0 ? 'red' : 'green'}
          size="large"
        />
        {rowData.verificationStatus.length > 0 && (
          <Popup trigger={<Icon name="talk" />} hideOnScroll position="right center">
            <Header as="h4" dividing>
              Please check the data below
            </Header>
            {ReactHtmlParser(rowData.verificationStatus)}
          </Popup>
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default VerificationTableRow;
