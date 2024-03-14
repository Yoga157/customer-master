import React, { Fragment } from "react";
import { Divider, Grid, Header } from "semantic-ui-react";
import ProductListTable from "./table/ProductListTable";
// import ServiceFormARGrouping from "./form/ServiceFormARGrouping";

interface IProps {
  productList: any;
}

const ProductList: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { productList } = props
  return (
    <Fragment>
      {/* <LoadingIndicator isActive={isRequesting}> */}
        <Grid columns="equal">
          <Grid.Column>
            <Divider />
            <Header as="h4">
              <Header.Content className="ml-1r-767">
                Product List
              </Header.Content>
            </Header>
            <Divider />
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column>
            <div className="x-ovflo-auto mb-1">
              <ProductListTable tableData={productList} />
            </div>
          </Grid.Column>
        </Grid>

        <br />
      {/* </LoadingIndicator> */}
    </Fragment>
  );
};

export default ProductList;
