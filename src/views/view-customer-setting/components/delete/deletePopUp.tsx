import React, { Fragment } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import "../modal/Modal.scss";

interface IProps {
  deleteFunc: (data: any) => any;
  refreshFunc: (data: any) => any;
  id: number;
  customerSettingID: number;
  content: string;
}

const DeletePopUp: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const deleteClick = async () => {
    await dispatch(props.deleteFunc(props.id));
    await dispatch(props.refreshFunc(props.customerSettingID));
    await dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <FinalForm
        onSubmit={deleteClick}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid.Row>
              <div className="img-container">
                <div className="ui segment" style={{ padding: "0px" }}>
                  <img
                    className="ui centered medium"
                    src="/assets/info.png"
                    sizes="small"
                  />
                </div>
              </div>
            </Grid.Row>
            <Grid.Row centered className="text-align-center">
              <span style={{ padding: "10px" }}>
                Are you sure you want to DELETE this {props.content}?
              </span>
            </Grid.Row>
            <Divider></Divider>
            <div className="text-align-center">
              <Button type="button" onClick={cancelClick}>
                Cancel
              </Button>
              <Button className="MarBot10" type="submit" color="blue">
                Submit
              </Button>
            </div>
          </Form>
        )}
      />
      {/* </LoadingIndicator> */}
    </Fragment>
  );
};

export default DeletePopUp;
