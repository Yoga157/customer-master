import React, { useCallback } from "react";
import { Grid, Icon, Item } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import { CheckBox } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import CompleteActionPlan from "./Form/CompleteActionPlan";
import '../../../CollabToolsPage.scss'
import * as CollabToolsActions from "stores/collab-tools/CollabToolsActions"
import IStore from "models/IStore";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
interface IProps {
  readonly rowData: any;
  funnelGenId: number;
}

const ActivitiesList: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { rowData, funnelGenId} = props;
  const dispatch: Dispatch = useDispatch();
  const DetailCollabTools = (data: any) => {
    dispatch(
      ModalSecondLevelActions.OPEN(
        <CompleteActionPlan funnelGenId={funnelGenId} funnelActivityID={rowData.funnelActivityID} reviewActivity={rowData.reviewActivity} />,
        ModalSizeEnum.Tiny
      )
    );
  };

  return (
      <Item key={rowData.funnelActivityID}>
        {/* <Item.Image size="tiny" src={"/assets/no-avatar.png"} /> */}
        <Item.Content>
          <Item.Header as="a">
            {rowData.reviewCategory === "Discussion" ? (
              <Icon name="discussions" color="green" />
            ) : rowData.reviewCategory === "Suggestion" ? (
              <Icon name="bullhorn" color="green" />
            ) : (
              <Icon name="check circle" color="green" />
            )}{" "}
            {rowData.reviewCategory} -{" "}
            {moment(rowData.createDate).format("yyyy-MM-DD , h:mm")}
          </Item.Header>
          <Item.Meta className="ml-3 reset-p">{ReactHtmlParser(rowData.reviewActivity)}</Item.Meta>
          <Item.Description>
            By {rowData.createUser} - {rowData.roleName}
          </Item.Description>
          {rowData.reviewCategory === "Action Plan" && (
            <Item.Description>
                <Icon name="clock outline" /> Due on {moment(rowData.dueDate).format("DD/MM/yyyy")}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {rowData.activityStatusID === parseInt('0') ? 
                  <span role="button" onClick={(rowData)=>DetailCollabTools(rowData)}> <CheckBox checked={false} disabled className="justifycenter"/> &nbsp;&nbsp;&nbsp;<ins>Set as Completed</ins></span>
                  : 
                  <span> <CheckBox checked={true} disabled className="justifycenter"/> &nbsp;&nbsp;&nbsp;<ins>Activity Completed</ins></span>
                }  
                
            </Item.Description>
          )}
        </Item.Content>
      </Item>
  );
};

export default ActivitiesList;
