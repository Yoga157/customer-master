import React, { useEffect, Fragment, useState } from 'react';
import { TextInput, Button } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider, Segment } from 'semantic-ui-react';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { combineValidators, isRequired } from 'revalidate';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as BankGaransiAction from 'stores/bank-garansi/BankGaransiActions';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectViewFunnelSelling, selectViewFunnelStatus } from 'selectors/funnel/FunnelSelector';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import * as CustomerActions from 'stores/customer/CustomerActions';
import { selectObjectFunnelSA } from "selectors/generated-form/GenerateFormSelector";
import MasterInsuranceModel from 'stores/bank-garansi/models/MasterInsuranceModel'
import { selectFunnelSAOutside } from "selectors/bank-garansi/BankGaransiSelector";
import FunnelSARowModel from 'stores/bank-garansi/models/FunnelSARowModel'
import * as GeneratedFormAction from "stores/generated-form/GenerateFormActions";
import { selectInsuranceEdit } from 'selectors/bank-garansi/BankGaransiSelector';

interface IProps {
  //history:History
  id: number;
}

const MasterInsuranceFormEdit:React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    
    //const { popupLevel } = props
    const [mandatory, setMandatory] = useState({
        sTenderNo: true,
        sTenderDate: true,
        sNilai: true,
    })
    const [currentDate] = useState(new Date());

    const funnelAttachment:AttachmentModel[] =  useSelector((state: IStore) => state.attachment.listData.rows); 
    const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const [pageSize] = useState(15)
    const [activePage, setActivePage] = useState(1);

    let bRefreshPage : boolean = useSelector((state: IStore) => state.bankGaransi.refreshPage);

    useEffect(() => {
        dispatch(BankGaransiAction.requestMasterInsuranceById(props.id));
    }, [props.id]);

    const insurance = useSelector((state:IStore) => selectInsuranceEdit(state));
    const onResultSelectFunnelSA = (data: any) => {
        const {projectName, funnelDate, customerName, customerGenID, funnelGenID, saDate, saNo, salesName} = data.result
        const selectedFunnelSA = new FunnelSARowModel({})
        selectedFunnelSA.customerName = customerName
        selectedFunnelSA.funnelDate = funnelDate
        selectedFunnelSA.projectName = projectName
        selectedFunnelSA.saDate = saDate
        selectedFunnelSA.saNo = saNo
        selectedFunnelSA.salesName = salesName
        selectedFunnelSA.customerGenID = customerGenID
        selectedFunnelSA.funnelGenID = funnelGenID
        dispatch(BankGaransiAction.insertFunnelSAObject(selectedFunnelSA))
    };

    const onSubmitHandler = (values:any) =>
    {

        //Initialize object
        const masterInsurance = new MasterInsuranceModel(values)

        masterInsurance.entryKey = insurance.entryKey;
        masterInsurance.udcId = props.id;
        masterInsurance.userLoginID = currentUser.userName;
        masterInsurance.name = values.text1;
        masterInsurance.email = values.text2;
        masterInsurance.addr1 = values.text3;
        masterInsurance.addr2 = values.text4;
        masterInsurance.city = values.text5;
        masterInsurance.postalCode = values.text6;
        masterInsurance.waktuProses = +values.inum1;
        masterInsurance.rekening = values.rekening;
        masterInsurance.activeFlag = 1;
        dispatch(BankGaransiAction.putMasterInsurance(masterInsurance)) 
    }
    
    const cancelClick = () => {
        dispatch(ModalFirstLevelActions.CLOSE());
    }

  if (bRefreshPage) {
    dispatch(BankGaransiAction.requestMasterInsurance(activePage, pageSize, ''));
    dispatch(BankGaransiAction.setActivePage(activePage));

        dispatch(ToastsAction.add('Success', ToastStatusEnum.Success));
        cancelClick(); 
    }
   
    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [BankGaransiAction.POST_MASTER_INSURANCE_FINISHED]));

    return (
        <Fragment>
            <Card.Header>MASTER BOND ISSUER FORM</Card.Header>
            <Divider></Divider>
            <FinalForm
                //validate={validate} 
                onSubmit={(values:any) => onSubmitHandler(values)}
                initialValues={insurance}
                render={({
                    handleSubmit,
                    pristine
                }) => (
                <Form onSubmit={handleSubmit} loading={isRequesting}>
                    <Grid>
                        <Grid.Row columns={(insurance.entryKey === 'Insurance')?2:3}>
                            <Grid.Column>
                                <Field
                                    name='text1'
                                    component={TextInput}
                                    placeholder="Insurance Name"
                                    //values={projectName}
                                    labelName='Insurance Name'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Field
                                    name='text2'
                                    component={TextInput}
                                    placeholder="Email"
                                    //values={email}
                                    labelName='Email'
                                />
                            </Grid.Column>
                            {insurance.entryKey === 'Bank' &&
                                <Grid.Column>
                                    <Field
                                        name='text7'
                                        component={TextInput}
                                        placeholder="Rekening"
                                        //values={email}
                                        labelName='Rekening'
                                    />
                                </Grid.Column>
                            }
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Field
                                    name='text3'
                                    component={TextInput}
                                    placeholder="Address 1"
                                    //values={projectName}
                                    labelName='Address 1'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Field
                                    name='text4'
                                    component={TextInput}
                                    placeholder="Address 2"
                                    //values={projectName}
                                    labelName='Address 2'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Field
                                    name='text5'
                                    component={TextInput}
                                    placeholder="City"
                                    //values={projectName}
                                    labelName='City'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Field
                                    name='text6'
                                    component={TextInput}
                                    placeholder="Postal Code"
                                    //values={projectName}
                                    labelName='Postal Code'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Field
                                    name='inum1'
                                    component={TextInput}
                                    placeholder="Waktu Proses"
                                    //values={projectName}
                                    labelName='Waktu Proses'
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid> <br/>
                    <Button type="submit" color='blue' floated='right'>Save</Button>
                    <Button type="button" onClick={cancelClick} floated='right'>Cancel</Button>
                   
                </Form>
            )} />
        </Fragment>
    )

};

export default MasterInsuranceFormEdit;
