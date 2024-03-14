import React from 'react';
import { Container, Divider, Grid, Image, Header } from 'semantic-ui-react';
import { Button } from 'views/components/UI';

interface IProps {
  handleSave: any;
  handleCancle: any;
}

const Confirm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { handleSave, handleCancle } = props;

  return (
    <>
      <Grid>
        <Grid.Row className="mv-10">
          <Image src="/info.png" size="tiny" centered rounded />
          <Grid.Column width={16} className=" mt-2r mb-1r text-center">
            <Header as="p" className=" text-gray bold-2 mb-0">
              There is some change in this product
            </Header>
            <Header as="p" className=" text-gray bold-8 mv-5">
              Serial Number/Details Item
            </Header>
            <Header as="p" className=" text-gray bold-2 mb-0">
              Are you sure want to save it ?
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider />
      <Grid className="ph-1-5r mt-1">
        <Grid.Row columns={1} centered className="pb-0">
          <Grid.Column textAlign="center" className="pb-0">
            <Button type="button" className="mr-1r " size="small" onClick={handleCancle}>
              Cancel
            </Button>
            <Button className="ph-2r " color="blue" size="small" onClick={handleSave}>
              Yes
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Confirm;
