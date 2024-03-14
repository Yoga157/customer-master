import React, { useEffect, Fragment, useState } from 'react'
import {SelectInput, TextInput, Button } from 'views/components/UI'
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field} from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { combineValidators, isRequired } from 'revalidate'
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as BondIssuerAction from 'stores/bond-issuer/BondIssuerAction'
import { 
        selectBondIssuerOptions,
} from 'selectors/select-options';
import * as BankGaransiAction from 'stores/bank-garansi/BankGaransiActions'
import AttachmentModel from 'stores/attachment/models/AttachmentModel';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import MasterInsuranceModel from 'stores/bank-garansi/models/MasterInsuranceModel'

interface IProps {
    //history:History
}

const MasterInsuranceForm:React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();

    const [bondIssuer, setBondIssuer] = useState(''); 
    const [currentDate] = useState(new Date());

    const funnelAttachment:AttachmentModel[] =  useSelector((state: IStore) => state.attachment.listData.rows); 
    const [pageSize] = useState(15)
    const [activePage, setActivePage] = useState(1);

    let bRefreshPage : boolean = useSelector((state: IStore) => state.bankGaransi.refreshPage);
    
    const attach = funnelAttachment.filter((item:any) => {
        return item.documentTypeID === 298
    })

    useEffect(() => {
        dispatch(BondIssuerAction.requestBondIssuer())
    }, []);

    const onBondIssuer = (values:any) => {
        setBondIssuer(values);
    }

    const onSubmitHandler = (values:any) =>
    {
        //Initialize object
        const masterInsurance = new MasterInsuranceModel(values)
        if(values.bondIssuer == 'Bank')
        {
            masterInsurance.entryKey = 'Bank';
            masterInsurance.rekening = values.rekening;
        }
        else 
        {
            masterInsurance.entryKey = 'Insurance';
            masterInsurance.rekening = "";
        }
        masterInsurance.activeFlag = 1;

        dispatch(BankGaransiAction.postMasterInsurance(masterInsurance)) 
    }
    
    const cancelClick = () => {
        dispatch(ModalFirstLevelActions.CLOSE());
    }
    
    if(bRefreshPage)
    {
        dispatch(BankGaransiAction.requestMasterInsurance(activePage,pageSize,""))

        dispatch(ToastsAction.add('Success', ToastStatusEnum.Success));
        cancelClick(); 
    }
   
    const bondIssuerStore = useSelector((state:IStore) => selectBondIssuerOptions(state));

    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [BankGaransiAction.POST_MASTER_INSURANCE_FINISHED]));

    return (
        <Fragment>
            <Card.Header>MASTER BOND ISSUER FORM</Card.Header>
            <Divider></Divider>
            <FinalForm
                //validate={validate} 
                onSubmit={(values:any) => onSubmitHandler(values)}
                render={({
                    handleSubmit,
                    pristine
                }) => (
                <Form onSubmit={handleSubmit} loading={isRequesting}>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Field
                                    name='bondIssuer'
                                    options={bondIssuerStore}
                                    component={SelectInput}
                                    mandatory={false}
                                    placeholder='e.g.Bank..'
                                    onChanged={onBondIssuer}
                                    labelName='Bond Issuer'
                                />
                            </Grid.Column>
                            {bondIssuer == 'Bank' && 
                                <Grid.Column>
                                    <Field
                                        name='rekening'
                                        component={TextInput}
                                        placeholder="Rekening"
                                        labelName='Rekening'
                                    />
                                </Grid.Column>
                            }
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Field
                                    name='name'
                                    component={TextInput}
                                    placeholder="Insurance / Bank Name"
                                    labelName='Name'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Field
                                    name='email'
                                    component={TextInput}
                                    placeholder="Email"
                                    labelName='Email'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Field
                                    name='addr1'
                                    component={TextInput}
                                    placeholder="Address 1"
                                    labelName='Address 1'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Field
                                    name='addr2'
                                    component={TextInput}
                                    placeholder="Address 2"
                                    labelName='Address 2'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Field
                                    name='city'
                                    component={TextInput}
                                    placeholder="City"
                                    labelName='City'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Field
                                    name='postalCode'
                                    component={TextInput}
                                    placeholder="Postal Code"
                                    labelName='Postal Code'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Field
                                    name='waktuProses'
                                    component={TextInput}
                                    placeholder="Waktu Proses"
                                    labelName='Waktu Proses'
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid> <br/>
                    <Button type="submit" color='blue' floated='right' disabled={pristine}>Save</Button>
                    <Button type="button" onClick={cancelClick} floated='right'>Cancel</Button>
                   
                </Form>
            )} />
        </Fragment>
    )

};

export default MasterInsuranceForm;
