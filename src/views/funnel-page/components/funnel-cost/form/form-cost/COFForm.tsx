import React, { Fragment, useState, useEffect } from 'react';
import { Button, NumberInput, SelectInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Card, Divider, Grid } from 'semantic-ui-react';
import * as ModalAction from 'stores/modal/second-level/ModalSecondLevelActions';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as BankGaransiAction from 'stores/bank-garansi/BankGaransiActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { combineValidators, isRequired } from 'revalidate';
import * as COSTAction from 'stores/funnel-cost/COSTAction';
import { selectPMT, selectDropdownCOF, selectPersenCOF, selectRows } from 'selectors/funnel-cost/FunnelCostSelector';
import { selectViewFunnelCustomer, selectViewFunnelSelling } from 'selectors/funnel/FunnelSelector';
import IFunnelTopTable from 'selectors/funnel-top/models/IFunnelTopTable';
import { selectFunnelTop } from 'selectors/funnel-top/FunnelTopSelector';
import * as FunnelTopActions from 'stores/funnel-top/FunnelTopActions';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import IProductServiceTable from 'selectors/funnel-product-service/models/IProductServiceTable';
import { selectProductServiceAll } from 'selectors/funnel-product-service/ProductServiceSelector';

interface IProps {}

const COFForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [cost, setCost] = useState(0);
  const [training, setTraining] = useState(0);
  const [freight, setFreight] = useState(0);
  const [bond, setBond] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [bunga, setBunga] = useState(0);
  const [others, setOthers] = useState(0);
  const [productDesc, setProductDesc] = useState('');
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const viewFunnelSelling = useSelector((state: IStore) => selectViewFunnelSelling(state));
  const viewDropdownCOF = useSelector((state: IStore) => selectDropdownCOF(state));
  const viewPersenCOF = useSelector((state: IStore) => selectPersenCOF(state));
  const productStorage = JSON.parse(localStorage.getItem('productService'));
  const funnelTopStorage = JSON.parse(localStorage.getItem('funnelTop'));
  const funnelCostStorage = JSON.parse(localStorage.getItem('funnelCost'));
  const funnelTop: IFunnelTopTable = useSelector((state: IStore) => selectFunnelTop(state, [FunnelTopActions.REQUEST_FUNNEL_TOP]));
  const funnelCost: any = useSelector((state: IStore) => selectRows(state));
  const funnelProductServiceAll: IProductServiceTable = useSelector((state: IStore) =>
    selectProductServiceAll(state, [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE])
  );

  const pmtRequest = useSelector((state: IStore) => selectPMT(state));
  let costFunnel: any;

  const validate = combineValidators({
    cost: isRequired('Cost'),
    percent: isRequired('i'),
  });

  const onSubmitHandler = (values: any) => {
    localStorage.setItem('totalFinancing', (values.totalPmt - (cost + others + training + freight + bond + insurance)).toString());
    cancelClick();
    dispatch(COSTAction.requestPMTLocal());
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  useEffect(() => {
    setBunga(viewPersenCOF[0].rnum1);
    onChangeBunga(viewPersenCOF[0].rnum1);
    //dispatch(COSTAction.requestDropdownCOF(viewFunnelSelling.funnelGenID));
    if (funnelCostStorage != null) {
      costFunnel = funnelCostStorage;
    } else {
      costFunnel = funnelCost;
    }

    if (productStorage != null) {
      const lengthProduct = productStorage.filter((item: any) => item.itemType === 18 && item.isDelete !== 1 && item.isRental == 1);
      const totalOrdering = lengthProduct.reduce((a, v) => (a = a + v.orderingPrice), 0);
      setCost(totalOrdering);
    } else {
      const lengthProduct = funnelProductServiceAll.rows.filter((item: any) => item.itemType === 18 && item.isDelete !== 1 && item.isRental == 1);
      const totalOrdering = lengthProduct.reduce((a, v) => (a = a + v.orderingPrice), 0);
      setCost(totalOrdering);
      //setCost(viewFunnelSelling.totalOrderingPriceProduct);
    }
    //training
    const trainings = costFunnel.filter((item: any) => {
      return item.costName.toLowerCase().startsWith('training');
    });

    const sum = trainings.reduce((a, b) => (a = a + b.cost), 0);
    setTraining(sum);
    //-------------------------------------------------------

    //freight
    const freights = costFunnel.filter((item: any) => {
      return item.costName.toLowerCase().startsWith('freight');
    });

    const sumf = freights.reduce((a, b) => (a = a + b.cost), 0);
    setFreight(sumf);
    //---------------------------------------------------

    //financing
    /* const finances = costFunnel.filter((item: any) => {
        return item.costName.toLowerCase().startsWith('financing');
      });

      const sumfi = finances.reduce((a, b) => (a = a + b.cost), 0);
      setFinancing(sumfi);
      //--------------------------------------------------- */

    //insurance
    const insurances = costFunnel.filter((item: any) => {
      return item.costName.toLowerCase().startsWith('insurance & financing admin');
    });

    const financings = costFunnel.filter((item: any) => {
      return item.costName.toLowerCase().startsWith('financing admin cost');
    });

    const asuransi = costFunnel.filter((item: any) => {
      return item.costName.toLowerCase().startsWith('insurance cost');
    });

    const sumin = insurances.reduce((a, b) => (a = a + b.cost), 0);
    const sumasuransi = asuransi.reduce((a, b) => (a = a + b.cost), 0);
    const sumfinancings = financings.reduce((a, b) => (a = a + b.cost), 0);

    const costs = sumin + sumasuransi + sumfinancings;

    setInsurance(costs);
    //---------------------------------------------------

    //others
    const othersx = costFunnel.filter((item: any) => {
      return item.costName.toLowerCase().startsWith('other');
    });

    const sumo = othersx.reduce((a, b) => (a = a + b.cost), 0);
    setOthers(sumo);
    //---------------------------------------------------

    //bond
    const bonds = costFunnel.filter((item: any) => {
      return item.costName.toLowerCase().startsWith('bond');
    });

    const sumb = bonds.reduce((a, b) => (a = a + b.cost), 0);
    setBond(sumb);
    //---------------------------------------------------
  }, [viewFunnelSelling.totalOrderingPriceProduct, viewFunnelCustomer.estDurationProject]);

  const onChangeBunga = (e: any) => {
    if (e != undefined) {
      let testing;
      if (funnelTopStorage != null) {
        testing = funnelTopStorage.rows.filter((item: any) => {
          return (
            item.productDescStr === 'Monthly' ||
            item.productDescStr === 'Yearly' ||
            item.productDescStr === 'Quaterly' ||
            item.productDescStr === 'Per 6 Months' ||
            item.productDescStr === 'Per 4 Months'
          );
        });
      } else {
        testing = funnelTop.rows.filter((item: any) => {
          return (
            item.productDescStr === 'Monthly' ||
            item.productDescStr === 'Yearly' ||
            item.productDescStr === 'Quaterly' ||
            item.productDescStr === 'Per 6 Months' ||
            item.productDescStr === 'Per 4 Months'
          );
        });
      }
      if (testing.length > 0) {
        dispatch(
          COSTAction.requestPMT(
            cost === undefined ? 0 : cost + others + training + freight + bond + insurance,
            viewFunnelCustomer.estDurationProject.toString() === 'NaN'
              ? Number(localStorage.getItem('projectDuration'))
              : viewFunnelCustomer.estDurationType === 'years'
              ? viewFunnelCustomer.estDurationProject * 12
              : viewFunnelCustomer.estDurationProject,
            testing.length > 0 ? testing[0].productDescStr : '',
            e
          )
        );
      }
    }

    setBunga(e);
  };

  const onChangeCost = (e: any) => {
    /* let testing;
    if (funnelTopStorage != null) {
      testing = funnelTopStorage.rows.filter((item: any) => {
        return (
          item.productDescStr === 'Monthly' ||
          item.productDescStr === 'Yearly' ||
          item.productDescStr === 'Quaterly' ||
          item.productDescStr === 'Per 6 Months' ||
          item.productDescStr === 'Per 4 Months'
        );
      });
    } else {
      testing = funnelTop.rows.filter((item: any) => {
        return (
          item.productDescStr === 'Monthly' ||
          item.productDescStr === 'Yearly' ||
          item.productDescStr === 'Quaterly' ||
          item.productDescStr === 'Per 6 Months' ||
          item.productDescStr === 'Per 4 Months'
        );
      });
    }
    if (testing.length > 0) {
      dispatch(
        COSTAction.requestPMT(
          e === undefined ? 0 : e + others + training + freight + bond + insurance,
          viewFunnelCustomer.estDurationProject.toString() === 'NaN'
            ? Number(localStorage.getItem('projectDuration'))
            : viewFunnelCustomer.estDurationType === 'years'
            ? viewFunnelCustomer.estDurationProject * 12
            : viewFunnelCustomer.estDurationProject,
          testing.length > 0 ? testing[0].productDescStr : '',
          bunga
        )
      );
    } */

    setCost(e);
  };

  /* const onChangeProduct = (values: any) => {
    setProductDesc(values);
    dispatch(
      COSTAction.requestPMT(cost === undefined ? viewFunnelSelling.totalOrderingPriceProduct : cost, viewFunnelCustomer.estDurationProject, values)
    );
  }; */

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      BankGaransiAction.REQUEST_POST_APPROVE_BANK_GARANSI,
      BankGaransiAction.REQUEST_POST_RETURN_EXTEND,
      BankGaransiAction.REQUEST_POST_VOID_BANK_GARANSI,
    ])
  );
  return (
    <Fragment>
      <Card.Header>COF</Card.Header>
      <Divider></Divider>
      <FinalForm
        validate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Field
                    name="cost"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Total Ordering"
                    mandatory={false}
                    disabled={true}
                    thousandSeparator={true}
                    onChange={onChangeCost}
                    values={cost}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="month"
                    component={NumberInput}
                    placeholder="e.g.36"
                    labelName="n"
                    mandatory={false}
                    disabled={true}
                    values={
                      localStorage.getItem('projectDuration') != null
                        ? localStorage.getItem('projectDuration')
                        : viewFunnelCustomer.estDurationType === 'years'
                        ? viewFunnelCustomer.estDurationProject * 12
                        : viewFunnelCustomer.estDurationProject
                    }
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="percent"
                    component={NumberInput}
                    placeholder="e.g.9"
                    labelName="i"
                    mandatory={false}
                    onChange={onChangeBunga}
                    values={bunga}
                    disabled={true}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Field
                    name="training"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Training"
                    mandatory={false}
                    disabled={true}
                    thousandSeparator={true}
                    values={training}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="insurance"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Insurance & Financing Admin Cost"
                    mandatory={false}
                    disabled={true}
                    thousandSeparator={true}
                    values={insurance}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Field
                    name="bond"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Bond Cost"
                    mandatory={false}
                    disabled={true}
                    thousandSeparator={true}
                    values={bond}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="freight"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Freight Cost"
                    mandatory={false}
                    disabled={true}
                    thousandSeparator={true}
                    values={freight}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="other"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Others"
                    mandatory={false}
                    disabled={true}
                    thousandSeparator={true}
                    values={others}
                  />
                </Grid.Column>
              </Grid.Row>
              {/* <Grid.Row columns={2}>
                <Grid.Column>
                  <Field
                    name="financing"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Financing Admin Cost"
                    mandatory={false}
                    disabled={true}
                    thousandSeparator={true}
                    values={financing}
                  />
                </Grid.Column>
                
              </Grid.Row> */}
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Field
                    name="pmt"
                    component={NumberInput}
                    placeholder="e.g.36"
                    labelName="PMT"
                    mandatory={false}
                    disabled={true}
                    thousandSeparator={true}
                    values={cost === 0 ? 0 : pmtRequest.pmt}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="totalPmt"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Total PMT"
                    mandatory={false}
                    disabled={true}
                    thousandSeparator={true}
                    values={cost === 0 ? 0 : pmtRequest.totalPMT}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <br />
            <Button type="submit" color="blue" floated="right" disabled={pristine || invalid}>
              Submit
            </Button>
            <Button type="button" onClick={cancelClick} floated="right">
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default COFForm;
