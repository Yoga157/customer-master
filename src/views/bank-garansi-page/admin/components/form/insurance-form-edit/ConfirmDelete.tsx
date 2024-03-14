import React, { Fragment, useEffect, useState } from 'react'
import { Button } from 'views/components/UI'
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm} from 'react-final-form';
import { Form, Card, Divider } from 'semantic-ui-react';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as FunnelAction from 'stores/funnel/FunnelActions';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import * as BankGaransiAction from 'stores/bank-garansi/BankGaransiActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectInsuranceEdit } from 'selectors/bank-garansi/BankGaransiSelector';
import MasterInsuranceModel from 'stores/bank-garansi/models/MasterInsuranceModel';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface IProps {
  id: number;
}

const ConfirmDelete:React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [textConfirm, setTextConfirm] = useState('');
    const [pageSize] = useState(15)
    const [activePage, setActivePage] = useState(1);
    const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const [returnDate, setReturnDate] = useState(new Date());
    let bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshPage);

    useEffect(() => {
        dispatch(BankGaransiAction.requestMasterInsuranceById(props.id));
    }, [props.id]); 

    const insurance = useSelector((state:IStore) => selectInsuranceEdit(state));

    const onSubmitHandler = (values:any) =>
    {
        const masterInsurance = new MasterInsuranceModel(values)

        masterInsurance.entryKey = 'Insurance';
        masterInsurance.udcId = props.id;
        masterInsurance.userLoginID = currentUser.userName;
        masterInsurance.name = insurance.text1;
        masterInsurance.email = insurance.text2;
        masterInsurance.addr1 = insurance.text3;
        masterInsurance.addr2 = insurance.text4;
        masterInsurance.city = insurance.text5;
        masterInsurance.postalCode = insurance.text6;
        masterInsurance.waktuProses = +insurance.inum1;
        masterInsurance.activeFlag = 0;
        dispatch(BankGaransiAction.putMasterInsurance(masterInsurance)) 
    }

    const onReturnDate = (values:any) => {
        setReturnDate(values)
    }
   
    const cancelClick = () => {
        dispatch(ModalAction.CLOSE());
    }

  if (bRefreshPage) {
    dispatch(BankGaransiAction.requestMasterInsurance(activePage, pageSize, ''));
    dispatch(BankGaransiAction.setActivePage(activePage));

        dispatch(ToastsAction.add('Success', ToastStatusEnum.Success));
        cancelClick(); 
    }
   
    let isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelAction.REQUEST_POST_FUNNEL]));

    return (
        <Fragment>
            <Card.Header>Confirmation</Card.Header>
            <Divider></Divider>
            <FinalForm
                //valiate={validate} 
                onSubmit={(values:any) => onSubmitHandler(values)}
                render={({
                    handleSubmit
                }) => (
                <Form onSubmit={handleSubmit} loading={isRequesting} >
                    <p>Are you sure ?</p>
                    <Button type="submit" color='blue' floated='right'>Submit</Button>
                    <Button type="button" onClick={cancelClick} floated='right' >Cancel</Button>
                </Form>
            )} />
        </Fragment>
    )
};

export default ConfirmDelete