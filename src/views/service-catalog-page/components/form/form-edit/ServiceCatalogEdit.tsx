import React from "react";
import { Grid } from "semantic-ui-react";
import { History } from "history";
import {
  ServiceCatalogHeader,
  ServiceCatalogService,
  ServiceCatalogPrice,
  ServiceCatalogManHours,
  ServiceCatalogProduct,
} from "../form-edit/child-edit";
import { useSelector } from "react-redux";
import IStore from "models/IStore";
import { selectServiceCatalog } from "selectors/service-catalog/ServiceCatalogSelector";
import "./ServiceCatalogEditStyle.scss";

interface IProps {
  svcCatGenID: number;
  history: History;
}

const ServiceCatalogEdit: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const serviceCatalog = useSelector((state: IStore) =>
    selectServiceCatalog(state)
  );
  return (
    <Grid>
      <Grid.Row className="pt-0">
        <Grid.Column className="BlueBg">
          <ServiceCatalogHeader serviceCatalog={serviceCatalog} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column className="FullGrid767">
          <ServiceCatalogProduct serviceCatalog={serviceCatalog} />
        </Grid.Column>
        <Grid.Column className="FullGrid767 mt-1r-767">
          <ServiceCatalogManHours serviceCatalog={serviceCatalog} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ServiceCatalogService serviceCatalog={serviceCatalog} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ServiceCatalogPrice serviceCatalog={serviceCatalog} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ServiceCatalogEdit;
