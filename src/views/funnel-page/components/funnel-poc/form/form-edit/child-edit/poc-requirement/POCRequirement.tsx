import ButtonMicro from 'views/components/UI/Button/ButtonMicro';
import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import { Button, CheckBox, Pagination } from 'views/components/UI';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as POCRequirementActions from 'stores/funnel-poc-requirement/POCRequirementActions';
import IStore from 'models/IStore';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import POCRequirementTable from './table/POCRequirementTable';
import POCRequirementForm from './form/POCRequirementForm';
import { selectPOCRequirement, selectTotalPOCCompleted } from 'selectors/funnel-poc-requirement/POCRequirementSelector';
import IPOCRequirementTable from 'selectors/funnel-poc-requirement/models/IPOCRequirementTabel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
  pocGenHID: number;
  popupLevel: number;
}

const POCRequirement: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const { pocGenHID, popupLevel } = props;

  useEffect(() => {
    dispatch(POCRequirementActions.requestPOCReqByPOCGenHID(pocGenHID, activePage, pageSize));
  }, [dispatch, pocGenHID]);

  const onAddRequirement = useCallback((): void => {
    if (popupLevel === 1) {
      dispatch(
        ModalFirstLevelActions.OPEN(<POCRequirementForm popupLevel={popupLevel} pocGenHID={pocGenHID} pocGenReqID={0} />, ModalSizeEnum.Small)
      );
    } else if (popupLevel === 2) {
      dispatch(
        ModalSecondLevelActions.OPEN(<POCRequirementForm popupLevel={popupLevel} pocGenHID={pocGenHID} pocGenReqID={0} />, ModalSizeEnum.Small)
      );
    } else if (popupLevel === 3) {
      dispatch(
        ModalThirdLevelActions.OPEN(<POCRequirementForm popupLevel={popupLevel} pocGenHID={pocGenHID} pocGenReqID={0} />, ModalSizeEnum.Small)
      );
    }
  }, [popupLevel, dispatch, pocGenHID, popupLevel]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(POCRequirementActions.requestPOCReqByPOCGenHID(pocGenHID, activePage, pageSize));
  };

  const pocRequirementTable: IPOCRequirementTable = useSelector((state: IStore) =>
    selectPOCRequirement(state, [POCRequirementActions.REQUEST_POC_REQUIREMENT])
  );
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [AttachmentActions.REQUEST_ATTACHMENT_LOCAL, AttachmentActions.REQUEST_ATTACHMENT_SERVER])
  );
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid padded>
        <Grid.Row columns="equal">
          <Grid.Column>
            <h4 className="ml-m-1r">Requirement List </h4>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal">
          {/* <CheckBox label='Select All'/>
                <ButtonMicro 
                    type='button'
                    icon='trash' 
                    color='yellow' 
                    floated="right" 
                    size='mini' 
                    content='Delete'
                /> */}
          <Grid.Column>
            <Button
              type="button"
              icon="plus"
              color="green"
              floated="right"
              size="small"
              content="Add Requirement"
              onClick={onAddRequirement}
              disabled={currentUser.role !== 'Presales'}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <POCRequirementTable tableData={pocRequirementTable} />
          <Pagination
            activePage={activePage}
            onPageChange={(e, data) => handlePaginationChange(e, data)}
            totalPage={pocRequirementTable.totalRow}
            pageSize={pageSize}
          />
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default POCRequirement;
