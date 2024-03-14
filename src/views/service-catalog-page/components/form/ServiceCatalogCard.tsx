import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';

import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ServiceCatalogCategoryAction from 'stores/service-catalog-category/ServiceCatalogCategoryAction';
import * as ServiceOwnerAction from 'stores/service-owner/ServiceOwnerAction';
import * as ServiceCatalogAction from 'stores/service-catalog/ServiceCatalogActions';
import * as SubBrandAction from 'stores/brand-sub/SubBrandAction';
import classes from './ServiceCatalogCard.module.scss';

import ServiceCatalogPlaceholder from './ServiceCatalogPlaceHolder';
import ServiceCatalogForm from './form-create/ServiceCatalogForm';
import { Card } from 'semantic-ui-react';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ServiceCatalogEdit from './form-edit/ServiceCatalogEdit';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const ServiceCatalogCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(ServiceCatalogCategoryAction.requestServiceCatalogCategory());
    dispatch(ServiceOwnerAction.requestServiceOwner());
    if (props.match.params.id) {
      dispatch(ServiceCatalogAction.requestServiceCatalogById(+props.match.params.id));
      dispatch(SubBrandAction.requestSubBrandGroup(+props.match.params.id));
    } else {
      dispatch(ServiceCatalogAction.requestServiceCatalogById(0));
      dispatch(SubBrandAction.requestSubBrandGroup(0));
    }
  }, [dispatch, props.match.params.id]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ServiceCatalogCategoryAction.REQUEST_SERVICE_CATALOG_CATEGORY,
      ServiceOwnerAction.REQUEST_SERVICE_OWNER,
      SubBrandAction.REQUEST_SUB_BRAND_GROUP,
      ServiceCatalogAction.REQUEST_SERVICE_CATALOG,
    ])
  );
  let form = <ServiceCatalogPlaceholder />;

  if (!isRequesting) {
    if (props.match.params.id) {
      form = <ServiceCatalogEdit svcCatGenID={props.match.params.id ? +props.match.params.id : 0} history={props.history} />;
    } else {
      form = <ServiceCatalogForm history={props.history} />;
    }
  }

  return (
    <Card centered raised className={classes.Card}>
      <Card.Content>
        <Card.Header>{props.match.params.id ? 'Update Service Catalog' : 'Add Service Catalog'}</Card.Header>
      </Card.Content>
      <Card.Content>{form}</Card.Content>
    </Card>
  );
};

export default withRouter(ServiceCatalogCard);
