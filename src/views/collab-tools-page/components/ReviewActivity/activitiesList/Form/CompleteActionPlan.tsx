import React, { useEffect } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Divider, Form, Grid } from "semantic-ui-react";
import {
  RichTextEditor,
} from "views/components/UI";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/second-level/ModalSecondLevelActions";
import "../../../../CollabToolsPage.scss"
import { combineValidators, isRequired } from "revalidate";
import IStore from "models/IStore";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import * as CollabToolsActions from "stores/collab-tools/CollabToolsActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import ToastStatusEnum from "constants/ToastStatusEnum";
import * as ToastAction from "stores/toasts/ToastsAction";
import * as CollabToolsAction from "stores/collab-tools/CollabToolsActions";
import ReactHtmlParser from "react-html-parser";
interface IProps {
  funnelActivityID: number;
  reviewActivity: string;
  funnelGenId: number;
}

const CompleteActionPlan: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const{funnelActivityID, reviewActivity, funnelGenId } = props;
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const dispatch: Dispatch = useDispatch();
  const resultMessage = useSelector(
    (state: IStore) => state.collabTools.resultActions
  );
  const onSubmitHandler = (values: any) => {
    dispatch(CollabToolsActions.postCompleted({funnelActivityID: funnelActivityID, remark: values.remark, modifiedUserID: currentUser.employeeID}))
    .then(
      ()=>dispatch(CollabToolsActions.getReviewActivityHistoryList(funnelGenId, ""))
    )
    .then(
      ()=>onClose()
    );
  };
  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };
  const validation = combineValidators({
    remark: isRequired('Remark')
  });

  useEffect(() => {
    if (resultMessage?.errorNumber === "666") {
      dispatch(
        ToastAction.add(resultMessage?.message, ToastStatusEnum.Warning)
      );
    } else if (resultMessage?.errorNumber === "0") {
      dispatch(
        ToastAction.add(resultMessage?.message, ToastStatusEnum.Success)
      );
      onClose();
    }
    dispatch(CollabToolsAction.removeResult());
  }, [resultMessage]);
  return (
    <> 
      <div className="CompleteAction">
      <FinalForm
        onSubmit={(values) => onSubmitHandler(values)}
        validate={validation}
        initialValues={{}}
        render={({ handleSubmit, invalid }) => (
          // loading={isRequesting}
          <Form onSubmit={handleSubmit}>
            <Card.Header>Complete Action Plan</Card.Header>
            <Divider></Divider>
            {/* <Segment className="LightYellowNotif PadPmoNotif"> */}
            <Grid>
              <>
                <Grid.Row className="p-0">
                  <Grid.Column textAlign="center">
                    <h5>Are You Sure to Complete This Action Plan?</h5>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="p-0">
                  <Grid.Column className="reset-p" textAlign="center">
                    <h3>{ReactHtmlParser(reviewActivity)}</h3>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="p-0" style={{ paddingLeft: "15px" }}>
                  <Grid.Column
                    className="ViewLabel"
                    mobile={16}
                    tablet={16}
                    computer={16}
                    textAlign="left"
                  >
                    <Field
                      name="remark"
                      component={RichTextEditor}
                      labelName="Remark"
                      mandatorys={false}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    {/* || !errorCustomerName */}
                    <Button color="blue" floated="right" content="Submit" disabled={invalid}/>
                    <Button
                      type="button"
                      floated="right"
                      content="Cancel"
                      onClick={onClose}
                    />
                  </Grid.Column>
                </Grid.Row>
              </>
            </Grid>
            {/* </Segment> */}
          </Form>
          
        )}
      />
      </div>
    </>
  );
};

export default CompleteActionPlan;
