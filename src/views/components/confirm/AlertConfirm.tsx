import React from 'react';
import { Container, Divider, Grid, Image, Header, Card } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import { Button } from 'views/components/UI';

interface Icontent {
  header?: string;
  title: string;
  body: any;
  footer?: string;
}

interface IProps {
  img?: string;
  handleSave?: any;
  handleCancle: any;
  type?: string;
  content: Icontent;
}

const AlertConfirm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { img, handleSave, handleCancle, type, content } = props;

  return (
    <>
      {content.header && (
        <>
          <Card.Header>{content.header}</Card.Header>
          <div className="ui divider FullHdivider"></div>
        </>
      )}
      <Grid>
        <Grid.Row className="mv-10">
          {img && <Image src={img} size="tiny" centered rounded />}
          <Grid.Column width={16} className=" mt-2r mb-1r text-center">
            <Header as="p" className=" text-gray bold-8 mb-0">
              {content?.title}
            </Header>
            <Header as="p" className=" text-gray mv-5">
              {content?.body ? ReactHtmlParser(content.body) : ''}
            </Header>
            <Header as="p" className=" text-gray bold-2 mb-0">
              {content?.footer}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <div className="ui divider FullHdivider"></div>
      <Grid className="ph-1-5r mt-1">
        <Grid.Row columns={1} centered className="pb-0">
          <Grid.Column textAlign="center" className="pb-0">
            {type === 'info' && (
              <Button type="button" className="" color="blue" size="small" onClick={handleCancle}>
                Close
              </Button>
            )}

            {type !== 'info' && (
              <>
                <Button type="button" className="mr-1r " size="small" onClick={handleCancle}>
                  Cancel
                </Button>
                <Button className="ph-2r " color="blue" size="small" onClick={handleSave}>
                  Yes
                </Button>
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AlertConfirm;
