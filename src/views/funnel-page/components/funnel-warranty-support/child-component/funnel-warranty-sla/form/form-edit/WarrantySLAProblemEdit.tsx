import React, { useState, useEffect } from 'react';
import { Grid, Header, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput, Button } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import * as SubBrandActions from 'stores/brand-sub/SubBrandAction';
import { selectBrandOptions, selectSubBrandOptions } from 'selectors/select-options';
import * as BrandActions from 'stores/brand/BrandAction';
import { problemClassOptions } from 'constants/problemClassOptions';
import { selectWarrantySLA } from 'selectors/funnel-warranty-sla/FunnelWarrantySLASelector';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';

interface IProps {
  //funnelGenID:string
}

const WarrantySLAProblemEdit: React.FC<IProps> = () => {
  const [disableComponent, setDisableComponent] = useState(true);
  const dispatch: Dispatch = useDispatch();
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnel.refreshPage);

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onSubmitHandler = (values: any) => {
    if (!disableComponent) {
      setDisableComponent(true);
      dispatch(FunnelWarrantyActions.putSLAHeader(values));
    }
  };

  const brandOptions = useSelector((state: IStore) => selectBrandOptions(state));
  const subBrandOptions = useSelector((state: IStore) => selectSubBrandOptions(state));
  const warrantySLA = useSelector((state: IStore) => selectWarrantySLA(state));
  const vBrandID = warrantySLA.brandID;

  useEffect(() => {
    dispatch(BrandActions.requestBrand());
    dispatch(SubBrandActions.requestSubBrand(vBrandID,''));
  }, [dispatch, vBrandID]);

  const onChangeBrand = (event: any) => {
    dispatch(SubBrandActions.requestSubBrand(event,''));
  };

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={warrantySLA}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid padded>
            <Grid.Row>
              <Grid.Column>
                <Header className="ml-m-1r" as="h4">
                  <Header.Content>
                    {disableComponent && <Button basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} />}
                    {!disableComponent && <Button basic compact icon="save" />}
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="problemClassID"
                  component={SelectInput}
                  placeholder="Problem Class"
                  labelName="Problem Class"
                  options={problemClassOptions}
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="brandID"
                  component={SelectInput}
                  options={brandOptions}
                  onChanged={onChangeBrand}
                  placeholder="Brand"
                  labelName="Brand"
                  disabled={disableComponent}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="subBrandID"
                  component={SelectInput}
                  options={subBrandOptions}
                  placeholder="Sub Brand"
                  labelName="Sub Brand"
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default WarrantySLAProblemEdit;
