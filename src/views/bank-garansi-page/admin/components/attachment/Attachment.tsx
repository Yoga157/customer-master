import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import AttachmentTable from './table/AttachmentTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Button, Pagination } from 'views/components/UI';
import IStore from 'models/IStore';
import { selectAttachment } from 'selectors/bank-garansi/BankGaransiSelector';
import AttachmentForm from 'views/bank-garansi-page/admin/components/attachment/form/AttachmentForm';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import IAttachmentTable from 'selectors/bank-garansi/models/IAttachmentTable';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  modul: number;
  isLocalFirst: boolean;
  funnelGenID: string;
  bankGuaranteeID: string;
  popupLevel: number;
  expireds: boolean;
  bgNo: string;
}

const Attachment: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const { bankGuaranteeID, popupLevel, isLocalFirst, modul, funnelGenID, bgNo } = props;

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    if (isLocalFirst) {
      dispatch(AttachmentActions.requestAttachmentLocal());
    } else {
      dispatch(BankGaransiActions.requestAttachmentServer(activePage, pageSize, bankGuaranteeID, currentUser.employeeID, 2));
    }
  }, [activePage, dispatch, bankGuaranteeID, isLocalFirst, modul, pageSize]);

  const onChecked = () => {
    console.log('onchecked');
  };

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    //dispatch(AttachmentActions.requestAttachmentServer(+funnelGenID, modul, activePage, pageSize));
  };

  const onAddAttachment = useCallback((): void => {
    if (popupLevel === 1) {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <AttachmentForm
            modul={modul}
            isLocalFirst={isLocalFirst}
            popupLevel={popupLevel}
            funnelGenID={funnelGenID}
            bankGuaranteeID={bankGuaranteeID}
          />,
          ModalSizeEnum.Small
        )
      );
    } else if (popupLevel === 2) {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <AttachmentForm
            modul={modul}
            isLocalFirst={isLocalFirst}
            popupLevel={popupLevel}
            funnelGenID={bankGuaranteeID}
            bankGuaranteeID={bankGuaranteeID}
          />,
          ModalSizeEnum.Small
        )
      );
    } else if (popupLevel === 3) {
      dispatch(
        ModalThirdLevelActions.OPEN(
          <AttachmentForm
            modul={modul}
            isLocalFirst={isLocalFirst}
            popupLevel={popupLevel}
            funnelGenID={bankGuaranteeID}
            bankGuaranteeID={bankGuaranteeID}
          />,
          ModalSizeEnum.Small
        )
      );
    }
  }, [popupLevel, dispatch, modul, isLocalFirst, bankGuaranteeID]);

  const attachment: IAttachmentTable = useSelector((state: IStore) =>
    selectAttachment(state, [
      AttachmentActions.REQUEST_ATTACHMENT_LOCAL,
      BankGaransiActions.REQUEST_ATTACHMENT_BG_SERVER,
      AttachmentActions.REQUEST_POST_ATTACHMENT_LOCAL,
      AttachmentActions.POST_ATTACHMENT,
    ])
  );

  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AttachmentActions.REQUEST_ATTACHMENT_LOCAL,
      AttachmentActions.REQUEST_ATTACHMENT_SERVER,
      BankGaransiActions.REQUEST_ATTACHMENT_BG_SERVER,
    ])
  );
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid padded>
          <Grid.Row columns="equal">
            <Grid.Column>
              <h4 className="ml-m-1r">
                Attachment Documents {props.bankGuaranteeID !== '0' && viewFunnelCustomer && 'for #' && viewFunnelCustomer.projectName}
              </h4>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            {/* <CheckBox label='Select All' onChange={onChecked}  />
                  <ButtonMicro 
                      type='button'
                      icon='trash' 
                      color='yellow' 
                      floated="right" 
                      size='mini' 
                      content='Delete'
                  /> */}
            <Grid.Column>
              {!props.expireds && (
                <Button type="button" icon="plus" color="green" floated="right" size="small" content="Attach Document" onClick={onAddAttachment} />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <AttachmentTable tableData={attachment} isLocalFirst={isLocalFirst} modul={modul} bankGuaranteeID={bankGuaranteeID} bgNo={bgNo} />
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={attachment.totalRow}
              pageSize={pageSize}
            />
          </Grid.Row>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default Attachment;
