import React, { useCallback, useState, useEffect } from 'react';
import { Field } from 'react-final-form';
import { Grid, Header, Icon, List, Segment } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DateInput, CheckBox, NumberInput } from 'views/components/UI';
import FunnelWarrantySLAVendorTable from '../../table/FunnelWarrantySLAVendorTable';
import SLAVendorForm from '../form-sla-vendor/SLAVendorForm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import IFunnelWarrantySLAVendorTable from 'selectors/funnel-warranty-sla-vendor/models/IFunnelWarrantySLAVendorTable';
import IStore from 'models/IStore';
import { selectFunnelWarrantyVendors } from 'selectors/funnel-warranty-sla-vendor/FunnelWarrantySLAVendorSelector';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import ButtonMicro from 'views/components/UI/Button/ButtonMicro';
import moment from 'moment';

interface IProps {}
const WarrantySLAVendorForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [warrantyEndP, setWarrantyEndP] = useState(moment().format('DD/MM/YY'));
  const [warrantyEndL, setWarrantyEndL] = useState(moment().format('DD/MM/YY'));
  const [warrantyEndO, setWarrantyEndO] = useState(moment().format('DD/MM/YY'));
  const [startVendor, setStartVendor] = useState('');

  useEffect(() => {
    dispatch(FunnelWarrantyActions.requestWarrantyCustomerLocal());
  }, [activePage, dispatch, pageSize]);

  const onAdd = useCallback((): void => {
    dispatch(ModalThirdLevelActions.OPEN(<SLAVendorForm type="add" warrantySLADetailID={0} warrantySLAGenID={0} />, ModalSizeEnum.Small));
  }, [dispatch]);
  const onChangeP = (values: any) => {
    const startDate = moment(startVendor);
    const endDate = startDate.add(values, 'years');

    setWarrantyEndP(endDate.format('DD/MM/YY'));
  };

  const onChangeL = (values: any) => {
    const startDate = moment(startVendor);
    const endDate = startDate.add(values, 'years');

    setWarrantyEndL(endDate.format('DD/MM/YY'));
  };

  const onChangeO = (values: any) => {
    const startDate = moment(startVendor);
    const endDate = startDate.add(values, 'years');

    setWarrantyEndO(endDate.format('DD/MM/YY'));
  };
  const onChangeDate = (values: any) => {
    setStartVendor(values);
  };
  const warrantyVendor: IFunnelWarrantySLAVendorTable = useSelector((state: IStore) =>
    selectFunnelWarrantyVendors(state, [FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_DETAILS])
  );
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column>
          <Field
            name="startWarrantyVendor"
            component={DateInput}
            mandatory={false}
            placeholder="Start Warranty"
            labelName="Start Warranty"
            date={true}
            onChange={onChangeDate}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Field name="pVendor" component={NumberInput} placeholder="P" labelName="P" onChange={onChangeP} />
        </Grid.Column>
        <Grid.Column>
          <Field name="lVendor" component={NumberInput} placeholder="L" labelName="L" onChange={onChangeL} />
        </Grid.Column>
        <Grid.Column>
          <Field name="oVendor" component={NumberInput} placeholder="O" labelName="O" onChange={onChangeO} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Segment className="LightYellowNotif p-1r">
            <Grid centered columns={2}>
              <Grid.Row className="mb-0">
                <Grid.Column>
                  <List>
                    <List.Item>
                      <List.Icon name="warning circle" />
                      <List.Content>
                        Parts Warranty End On <strong>{warrantyEndP}</strong>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="warning circle" />
                      <List.Content>
                        Labour Warranty End On <strong>{warrantyEndL}</strong>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="warning circle" />
                      <List.Content>
                        OnSite Warranty End On <strong>{warrantyEndO}</strong>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns="equal">
        <Grid.Column>
          <h4 className="ml-m-1r">SLA Data</h4>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <CheckBox label="Select All" />
        <ButtonMicro type="button" icon="trash" color="yellow" floated="right" size="mini" content="Delete" />
        <Grid.Column>
          <Button type="button" icon="plus" color="green" floated="right" size="small" content="Add" onClick={onAdd} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <FunnelWarrantySLAVendorTable tableData={warrantyVendor} />
      </Grid.Row>
    </Grid>
  );
};
export default WarrantySLAVendorForm;
