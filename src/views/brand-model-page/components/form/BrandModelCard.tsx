import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import classes from "./BrandModelCard.module.scss";

//import ServiceCatalogPlaceholder from './ServiceCatalogPlaceHolder'
import BrandModelForm from "./form-create/BrandModelForm";
import {
  Button,
  Card,
  CardGroup,
  CardHeader,
  CardMeta,
  Grid,
  Icon,
} from "semantic-ui-react";
import { History } from "history";
import { RouteComponentProps, withRouter } from "react-router-dom";
import BrandModelFormEdit from "./form-edit/BrandModelFormEdit";
import * as BrandTypeAction from "stores/brand-model/BrandTypeAction";
import ChangePM from "./form-edit/main-content/brand-change-pm/ChangePM";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const BrandModelCard: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [contentConfirm, setContentConfirm] = useState("");

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const okConfirm = () => {
    setOpenConfirm(false);
  };

  const onInactive = () => {
    setOpenConfirm(true);
    setContentConfirm("Are you sure want to deactive this brand ?");
  };

  const onChangePM = useCallback((): void => {
    dispatch(ModalAction.OPEN(<ChangePM />, ModalSizeEnum.Mini));
  }, [dispatch]);

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(BrandTypeAction.requestBrandModelById(+props.match.params.id));
    }
  }, [dispatch, props.match.params.id]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      BrandTypeAction.REQUEST_BRAND_MODEL_BY_ID,
      /* ServiceCatalogCategoryAction.REQUEST_SERVICE_CATALOG_CATEGORY, 
                            ServiceOwnerAction.REQUEST_SERVICE_OWNER,
                            ProductCategoryAction.REQUEST_PRODUCT_CATEGORY,
                            SubBrandAction.REQUEST_SUB_BRAND,
                            ServiceCatalogAction.REQUEST_SERVICE_CATALOG */
    ])
  );

  //let form = <ServiceCatalogPlaceholder />
  let form;

  if (!isRequesting) {
    if (props.match.params.id) {
      form = (
        <BrandModelFormEdit
          brandModelGenID={props.match.params.id ? +props.match.params.id : 0}
          history={props.history}
          closeConfirm={closeConfirm}
          okConfirm={okConfirm}
          openConfirm={openConfirm}
          contentConfirm={contentConfirm}
        />
      );
    } else {
      form = <BrandModelForm history={props.history} />;
    }
  }

  return (
    <Card centered raised className={classes.Card}>
      <Grid>
        <Grid.Row columns={2} style={{padding:"20px"}}>
          <Grid.Column verticalAlign="middle">
            <Card.Content>
              <Card.Header>
                <h4>{props.match.params.id
                  ? "Update Brand Model"
                  : "Add Brand Model"}</h4>
              </Card.Header>
            </Card.Content>
          </Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="right">
            {props.match.params.id && (
              <>
                <Button type="button" color="yellow" onClick={onInactive}>
                  {" "}
                  <Icon name="eye slash" />
                  Make Inactive
                </Button>
                <Button
                  className="mt-1r-767"
                  type="button"
                  color="blue"
                  onClick={onChangePM}
                >
                  <Icon name="random" />
                  Change PM
                </Button>
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Card.Content style={{padding:"20px"}}>{form}</Card.Content>
    </Card>
  );
};

export default withRouter(BrandModelCard);
