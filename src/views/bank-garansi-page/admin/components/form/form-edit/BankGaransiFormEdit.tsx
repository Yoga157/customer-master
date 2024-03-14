import React, { useEffect, Fragment, useCallback } from 'react';
import { Grid, Divider, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import IStore from 'models/IStore';
import { AdminForm, RequesterForm, CustInfoForm } from './components';
import Attachment from 'views/bank-garansi-page/admin/components/attachment/Attachment';
import { selectBGEditAdmin, selectBGEditRequester, selectBankGaransi } from 'selectors/bank-garansi/BankGaransiSelector';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import BankGaransiHistory from 'views/bank-garansi-page/components/history/BankGaransiHistory';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Form as FinalForm } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { Button } from 'views/components/UI';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import PrintBG from 'views/bank-garansi-page/components/prints/PrintBG';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';

interface IProps {
  bankGuaranteeGenID: number;
  linkTo: string;
  bankGuaranteeNo: string;
  status: string;
  expireds: boolean;
  process: string;
  so: string;
}

const BankGaransiFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshPage);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(BankGaransiActions.requestBankGaransiById(props.bankGuaranteeGenID));
    dispatch(BankGaransiActions.requestBGViewEditAdmin(props.bankGuaranteeGenID));
    dispatch(BankGaransiActions.requestBGViewEditRequester(props.bankGuaranteeGenID));
    dispatch(BankGaransiActions.requestCompanyApplicant());
    dispatch(BankGaransiActions.requestBankCG());
  }, [dispatch, props.bankGuaranteeGenID]);

  const bankGaransiMain = useSelector((state: IStore) => selectBankGaransi(state));
  const bankGaransi = useSelector((state: IStore) => selectBGEditAdmin(state));
  const bankGaransiRequester = useSelector((state: IStore) => selectBGEditRequester(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      BankGaransiActions.REQUEST_BG_VIEWEDIT_ADMIN,
      BankGaransiActions.REQUEST_BG_VIEWEDIT_REQUESTER,
      BankGaransiActions.REQUEST_LINKTO_FUNNEL_SA,
    ])
  );

  const onPrintBG = useCallback((): void => {
    //.dispatch(ModalSecondLevelActions.OPEN(<SelectPrint popup={'second'} IdBG={props.bankGuaranteeNo} Issuer={props.}/>,ModalSizeEnum.Small));
  }, [dispatch]);

  const onSubmitHandler = (values: any) => {
    console.log('submit');
  };

  return (
    <Fragment>
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Header>
              <Grid>
                <Grid.Row columns={1}>
                  <Grid.Column width={16} className="FullGrid767">
                    <Header>
                      <Header.Content>
                        BG#{bankGaransi.bankGuaranteeNo} for {bankGaransiRequester.projectName}
                        <Header.Subheader>
                          Status: {bankGaransiRequester.status},Last Update on {bankGaransi.modifiedDate} by {bankGaransi.modifyByUser}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Header>
            <Divider />
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <AdminForm expireds={props.expireds} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <RequesterForm expireds={props.expireds} process={props.process} funnelGenID={bankGaransiMain.funnelGenID} so={props.so} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <CustInfoForm linkTo={bankGaransiRequester.linkTo} username={bankGaransiRequester.createUserdomain} expireds={props.expireds} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Attachment
                    modul={2}
                    isLocalFirst={false}
                    funnelGenID={'0'}
                    bankGuaranteeID={props.bankGuaranteeNo}
                    popupLevel={bankGaransiMain.funnelGenID > 0 ? 3 : 2}
                    expireds={props.expireds}
                    bgNo={props.bankGuaranteeNo}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <BankGaransiHistory DocNumber={props.bankGuaranteeNo} />
                </Grid.Column>
              </Grid.Row>
              {currentUser.userName === 'lindawati.halim' && (
                <Grid.Row>
                  <Grid.Column>
                    <Button type="button" color="blue" floated="right" size="small" content="PrintBG"  onClick={() => dispatch(ModalFirstLevelActions.OPEN(<PrintBG bankGuaranteeGenID={`${props.bankGuaranteeGenID}`} />, ModalSizeEnum.Large))}  />
                  </Grid.Column>
                </Grid.Row>
              )}
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default BankGaransiFormEdit;
