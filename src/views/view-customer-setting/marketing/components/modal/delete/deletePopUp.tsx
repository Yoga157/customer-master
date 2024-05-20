import React, { Fragment } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import "../Modal.scss";

interface IProps {
  deleteFunc: (data?: any, a?, b?) => any;
  refreshFunc: (data?: any) => any;
  id: number;
  customerID: number;
  content: string;
  jenis?: string;
  isView?: boolean;
}

const DeletePopUp: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const {
    deleteFunc,
    refreshFunc,
    id,
    customerID,
    content,
    jenis,
    isView,
  } = props;

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const deleteClick = async () => {
    if (jenis == "ADDRESSOFFICENUMBER") {
      if (isView) {
        await dispatch(deleteFunc(id, null, customerID));
      } else {
        await dispatch(deleteFunc(id, customerID, null));
      }
    } else {
      await dispatch(deleteFunc(id));
    }

    await dispatch(refreshFunc(customerID));
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
    </Fragment>
  );
};

export default DeletePopUp;
