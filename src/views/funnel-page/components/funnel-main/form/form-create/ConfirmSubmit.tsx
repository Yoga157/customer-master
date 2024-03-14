import React, { Fragment, useState, useEffect } from 'react';
import { CheckBoxInput, Button } from 'views/components/UI';
import { Dispatch } from 'redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import BankGaransiForm from 'views/bank-garansi-page/components/form/form-create/BankGaransiForm';
import MeetingRequestForm from 'views/meeting-request-page/components/form/MeetingRequestForm';
import FunnelModel from 'stores/funnel/models/FunnelModel';
import FunnelsModel from 'stores/funnel/models/FunnelsModel';
import * as FunnelAction from 'stores/funnel/FunnelActions';
import * as FunnelOpportunityActions from 'stores/funnel-opportunity/FunnelActivityActions';
import IStore from 'models/IStore';
import { History } from 'history';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import RouteEnum from 'constants/RouteEnum';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import FunnelHeaderNameModel from 'stores/funnel/models/FunnelHeaderNameModel';
import FunnelOpportunityCheck from 'stores/funnel-opportunity/models/FunnelOpportunityCheck';
import environment from 'environment';
import axios from 'axios';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  funnels: FunnelsModel;
  history: History;
  dealCloseDate: any;
  brandList: string;
  tab: string;
}

const ConfirmSubmit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [confirmBG, setConfirmBG] = useState(0);
  const [confirmMeeting, setConfirmMeeting] = useState(0);
  const [confirmOpp, setConfirmOpp] = useState(0);
  const [opportunityValue, setOpportunityValue] = useState('');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  /* const onChangeBrand = (event:any, data:any) => {
        const value = serviceOptions.filter((item:any) => {
            return item.value === event
        })
        setBrandName(value[0].text);
    } */

  const { funnels, history, brandList, tab } = props;
  const onSubmitHandler = (values: any) => {
    // funnels.SalesFunnelItems.map

    // .map((arrValues: any) => (
    //     listBrand = (listBrand.length > 0 ? listBrand + "," + arrValues.value : arrValues.value)
    // ))

    const newFunnel = new FunnelsModel();
    newFunnel.SalesFunnel = new FunnelModel(funnels.SalesFunnel);
    newFunnel.FunnelHeaderName = new FunnelHeaderNameModel(funnels.FunnelHeaderName);

    if (confirmOpp === 1) {
      if (funnels.FunnelHeaderName.funnelOpportunityID === '') {
        newFunnel.FunnelHeaderName.funnelOpportunityID = opportunityValue;
      }
      dispatch(FunnelAction.postFunnel(newFunnel));
      dispatch(FunnelAction.postFunnelHeaderLocal(funnels.FunnelHeaderName));
    } else {
      dispatch(FunnelAction.postFunnel(funnels));
      dispatch(FunnelAction.postFunnelHeaderLocal(funnels.FunnelHeaderName));
    }
  };

  const result = useSelector((state: IStore) => state.funnel.resultActions);

  useEffect(() => {
    if (result?.errorNumber == '0') {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
      dispatch(FunnelAction.removeResult());
    } else if (result?.bSuccess === false) {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Warning));
      dispatch(FunnelAction.removeResult());
    }
  }, [result]);

  useEffect(() => {
    // const checkOpp = new FunnelOpportunityCheck({})
    // checkOpp.brandID = "1679"
    // checkOpp.salesID = 864
    // checkOpp.customerGenID  = 11980
    // dispatch(FunnelOpportunityActions.checkToFunnelOpportunity(checkOpp))
    const listBrand = '';
    checkToFunnelOpportunity(brandList, currentUser.employeeID, funnels.SalesFunnel.customerGenID);
  }, []);

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onMeeting = (values: any) => {
    if (values === true) {
      setConfirmMeeting(1);
    } else {
      setConfirmMeeting(0);
    }
  };

  const onBG = (values: any) => {
    if (values === true) {
      setConfirmBG(1);
    } else {
      setConfirmBG(0);
    }
  };

  const onOpportunity = (values: any) => {
    if (values === true) {
      setConfirmOpp(1);
    } else {
      setConfirmOpp(0);
    }
  };

  const checkToFunnelOpportunity = (brandID, salesID, customerGenID) => {
    const controllerName = `Funnel/CheckFunnelToOpportunity`;
    axios
      .post(environment.api.funnel.replace(':controller', controllerName), {
        brandID,
        salesID,
        customerGenID,
      })
      .then((res) => {
        if (res.data != '') {
          setOpportunityValue(res.data.toString());
          //setConfirmOpp(1);
        }
      });
  };

  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnel.refreshPage);
  const resultObj = useSelector((state: IStore) => state.funnel.resultActions?.resultObj);

  if (bRefreshPage) {
    if (resultObj !== null && resultObj?.funnelGenID !== undefined) {
      localStorage.removeItem('productService');
      localStorage.removeItem('funnelAttachment');
      localStorage.removeItem('funnelTop');

      history.replace({
        pathname: RouteEnum.Funnel,
        state: { tab: tab },
      });

      if (confirmMeeting === 1) {
        dispatch(
          ModalAction.OPEN(
            <MeetingRequestForm dealCloseDate={props.dealCloseDate} funnelGenID={resultObj?.funnelGenID} confirmBG={confirmBG} />,
            ModalSizeEnum.Small
          )
        );
      } else if (confirmBG === 1) {
        dispatch(
          ModalAction.OPEN(
            <BankGaransiForm dealCloseDate={props.dealCloseDate} funnelGenID={resultObj?.funnelGenID} popupLevel={1} />,
            ModalSizeEnum.Small
          )
        );
      } else {
        dispatch(ModalAction.CLOSE());
        dispatch(ToastsAction.add(`Submit funnel success - Funnel ID:${resultObj.funnelGenID}`, ToastStatusEnum.Success));
      }
    }
  }

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelAction.REQUEST_POST_FUNNEL]));

  return (
    <Fragment>
      <Card.Header>Submit Confirmation</Card.Header>
      <Divider></Divider>
      <FinalForm
        //valiate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Field name="initialMeeting" onChange={onMeeting} component={CheckBoxInput} label="Want to create initial meeting ?" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="bidBond" component={CheckBoxInput} onChange={onBG} label="Want to create bid bond ?" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="opp"
                    component={CheckBoxInput}
                    onChange={onOpportunity}
                    label="Process Opportunity ?"
                    isChecked={confirmOpp == 1 ? true : false}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>{' '}
            <br /> <br />
            <Button type="submit" color="blue" floated="right">
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

export default ConfirmSubmit;
